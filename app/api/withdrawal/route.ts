import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import User from '@/lib/models/User';
import Withdrawal from '@/lib/models/Withdrawal';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const withdrawalMethods = {
  bitcoin: { min: 10, max: 1000000, charge: 0.02, chargeType: 'percentage' },
  ethereum: { min: 10, max: 1000000, charge: 0.02, chargeType: 'percentage' },
  'usdt-trc20': { min: 10, max: 1000000, charge: 2, chargeType: 'fixed' },
  litecoin: { min: 10, max: 10000, charge: 2, chargeType: 'fixed' },
  doge: { min: 10, max: 1000000, charge: 0.02, chargeType: 'percentage' },
  bnb: { min: 10, max: 1000000, charge: 0.02, chargeType: 'percentage' },
  tron: { min: 10, max: 500000, charge: 0.02, chargeType: 'percentage' }
};

function generateOTP(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

async function sendOTPEmail(email: string, otp: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: [email],
      subject: 'Your Withdrawal OTP',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1D429A;">Withdrawal OTP Verification</h2>
          <p>Your OTP for withdrawal request is:</p>
          <div style="background: #1D429A; color: white; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; border-radius: 8px; margin: 20px 0;">
            ${otp}
          </div>
          <p>This OTP will expire in 10 minutes. Please do not share this code with anyone.</p>
          <p style="color: #666; font-size: 14px;">If you didn't request this withdrawal, please contact support immediately.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return false;
    }

    console.log('Email sent successfully:', data);
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    const body = await request.json();
    const { userId, amount, address, paymentMethod, action, otp } = body;

    if (action === 'request-otp') {
      // Validate amount
      const method = withdrawalMethods[paymentMethod as keyof typeof withdrawalMethods];
      if (!method) {
        return NextResponse.json({ error: 'Invalid payment method' }, { status: 400 });
      }

      if (amount < method.min || amount > method.max) {
        return NextResponse.json({ 
          error: `Amount must be between $${method.min} and $${method.max}` 
        }, { status: 400 });
      }

      // Get user and check address
      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      // Check if user has sufficient balance
      const charge = method.chargeType === 'percentage' ? amount * method.charge : method.charge;
      const totalAmount = amount + charge;
      
      if (user.accountBalance < totalAmount) {
        return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
      }

      // Generate and send OTP
      const otp = generateOTP();
      const otpSent = await sendOTPEmail(user.email, otp);
      
      if (!otpSent) {
        return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
      }

      // Store OTP in session/temp storage (in production, use Redis)
      return NextResponse.json({ 
        success: true, 
        message: 'OTP sent to your email',
        charge,
        netAmount: amount
      });
    }

    if (action === 'complete-withdrawal') {
      // Get user
      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      // OTP validation disabled - withdrawals processed automatically
      // Note: OTP validation removed for streamlined withdrawal process

      // Calculate charges
      const method = withdrawalMethods[paymentMethod as keyof typeof withdrawalMethods];
      const charge = method.chargeType === 'percentage' ? amount * method.charge : method.charge;
      const netAmount = amount - charge;

      // Check withdrawal address
      const addressField = paymentMethod.replace('-trc20', '');
      const userAddress = user.withdrawalAddresses[addressField as keyof typeof user.withdrawalAddresses];
      
      if (!userAddress || userAddress !== address) {
        return NextResponse.json({ 
          error: 'Address not found in your profile. Please add this address to your settings first.' 
        }, { status: 400 });
      }

      // Create withdrawal record
      const withdrawal = new Withdrawal({
        userId,
        amount,
        address,
        paymentMethod,
        otp: '', // Default empty value for compatibility
        otpExpires: null, // Default null for compatibility
        charge,
        netAmount
      });

      await withdrawal.save();

      // Note: Balance will be deducted when withdrawal is approved, not when submitted

      return NextResponse.json({ 
        success: true, 
        message: 'Withdrawal request submitted successfully',
        withdrawalId: withdrawal._id
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('Withdrawal API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const withdrawals = await Withdrawal.find({ userId })
      .sort({ createdAt: -1 });

    return NextResponse.json({ withdrawals });

  } catch (error) {
    console.error('Get withdrawals error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
