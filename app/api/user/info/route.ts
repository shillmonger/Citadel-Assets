import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header or cookies
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || 
                 request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
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

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        country: user.country,
        phoneNumber: user.phoneNumber,
        accountBalance: user.accountBalance,
        welcomeBonus: user.welcomeBonus,
        totalProfit: user.totalProfit,
        referralBonus: user.referralBonus,
        totalWithdrawal: user.totalWithdrawal,
        totalDeposit: user.totalDeposit,
        roles: user.roles,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });

  } catch (error) {
    console.error('Error fetching user info:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
