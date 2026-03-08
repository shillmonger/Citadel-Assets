import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User, { IUser } from '@/lib/models/User';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, rememberMe } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const tokenPayload = {
      userId: user._id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(tokenPayload, process.env.NEXTAUTH_SECRET!, {
      expiresIn: rememberMe ? '30d' : '7d', // 30 days if remember me, else 7 days
    });

    // Create response with user data (excluding password)
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
      createdAt: user.createdAt,
    };

    // Create response with token
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful! Welcome back.',
        user: userResponse,
        token,
      },
      { status: 200 }
    );

    // Set HTTP-only cookie for additional security
    const cookieOptions = {
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60, // 30 days or 7 days in seconds
      path: '/',
    };

    response.cookies.set(cookieOptions.name, cookieOptions.value, cookieOptions);

    return response;

  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
