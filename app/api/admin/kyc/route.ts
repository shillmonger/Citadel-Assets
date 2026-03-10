import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import KYC from '@/lib/models/KYC';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Helper function to verify admin token
async function verifyAdminToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '') || 
               request.cookies.get('auth-token')?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    await connectDB();
    
    const user = await User.findById(decoded.userId);
    if (!user || !user.roles.includes('admin')) {
      return null;
    }
    
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const admin = await verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    // Fetch all KYC submissions with user details
    const kycSubmissions = await KYC.find({})
      .populate('userId', 'username fullName email')
      .sort({ submittedAt: -1 });

    return NextResponse.json({
      success: true,
      kycSubmissions
    });

  } catch (error: any) {
    console.error('Error fetching KYC submissions:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
