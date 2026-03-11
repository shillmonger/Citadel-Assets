import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { sendSupportNotificationToAdmins } from '@/lib/email';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    // Get token from Authorization header or cookie
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || 
                 request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'No authentication token provided' },
        { status: 401 }
      );
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as any;
    
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { message } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Fetch user details
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Send email notification to all admins
    const emailResult = await sendSupportNotificationToAdmins({
      userName: user.fullName,
      userEmail: user.email,
      userPhone: user.phoneNumber,
      message: message.trim(),
      userId: user._id.toString()
    });

    if (!emailResult.success) {
      console.error('Failed to send support notification:', emailResult);
      // Don't fail the submission if email fails
    }

    return NextResponse.json(
      { 
        message: 'Support message sent successfully',
        ticketId: `SUP-${Date.now()}` // Generate a simple ticket ID
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Support submission error:', error);
    
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to send support message' },
      { status: 500 }
    );
  }
}
