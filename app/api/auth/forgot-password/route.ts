import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import PasswordReset from '@/lib/models/PasswordReset';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validation
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
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

    // Connect to database
    await connectDB();

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      // Don't reveal that email doesn't exist for security
      return NextResponse.json(
        { success: true, message: 'If an account with this email exists, a verification code has been sent.' },
        { status: 200 }
      );
    }

    // Invalidate any existing reset codes for this email
    await PasswordReset.invalidateAllCodes(email);

    // Generate 4-digit code
    const resetCode = Math.floor(1000 + Math.random() * 9000).toString();

    // Create password reset record
    const passwordReset = new PasswordReset({
      email: email.toLowerCase(),
      code: resetCode,
    });

    await passwordReset.save();

    // Send email with reset code
    try {
      await sendEmail({
        to: email.toLowerCase(),
        subject: 'Password Reset Code - Citadel Trade',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e40af;">Password Reset Request</h2>
            <p>Hello ${user.fullName || user.username},</p>
            <p>You requested to reset your password. Use the following 4-digit code to proceed:</p>
            <div style="background: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
              <span style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1e40af;">${resetCode}</span>
            </div>
            <p><strong>This code will expire in 5 minutes.</strong></p>
            <p>If you didn't request this password reset, please ignore this email or contact our support team.</p>
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px;">
              © 2026 Citadel Trade Pty Limited. All Rights Reserved.
            </p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send reset email:', emailError);
      // Delete the reset code if email fails
      await PasswordReset.findByIdAndDelete(passwordReset._id);
      return NextResponse.json(
        { success: false, message: 'Failed to send verification email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Verification code sent to your email' },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Forgot password error:', error);
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
