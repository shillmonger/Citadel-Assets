import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PasswordReset from '@/lib/models/PasswordReset';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, code } = body;

    // Validation
    if (!email || !code) {
      return NextResponse.json(
        { success: false, message: 'Email and verification code are required' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Code format validation (4 digits)
    if (!/^\d{4}$/.test(code)) {
      return NextResponse.json(
        { success: false, message: 'Verification code must be 4 digits' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Find valid reset code
    const resetRecord = await PasswordReset.findValidCode(email, code);
    
    if (!resetRecord) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired verification code' },
        { status: 400 }
      );
    }

    // Check if code is expired (double check)
    if (resetRecord.isExpired()) {
      return NextResponse.json(
        { success: false, message: 'Verification code has expired' },
        { status: 400 }
      );
    }

    // Mark code as used to prevent reuse
    resetRecord.isUsed = true;
    await resetRecord.save();

    return NextResponse.json(
      { 
        success: true, 
        message: 'Code verified successfully. You can now reset your password.',
        resetId: resetRecord._id 
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Verify code error:', error);
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
