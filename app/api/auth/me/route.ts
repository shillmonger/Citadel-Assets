import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function GET(request: NextRequest) {
  try {
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

    // Connect to database
    await connectDB();

    // Find user by ID
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Return user data
    const userResponse = {
      id: user._id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      country: user.country,
      phoneNumber: user.phoneNumber,
      referralId: user.referralId,
      accountBalance: user.accountBalance,
      welcomeBonus: user.welcomeBonus,
      totalProfit: user.totalProfit,
      referralBonus: user.referralBonus,
      totalWithdrawal: user.totalWithdrawal,
      totalDeposit: user.totalDeposit,
      roles: user.roles,
      createdAt: user.createdAt,
    };

    return NextResponse.json(
      { user: userResponse },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Auth me error:', error);
    
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
