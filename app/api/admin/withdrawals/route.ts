import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Withdrawal from '@/lib/models/Withdrawal';
import User from '@/lib/models/User';
import { sendMail } from '@/lib/email';

async function sendWithdrawalNotification(email: string, fullName: string, amount: number, status: 'approved' | 'rejected', paymentMethod: string) {
  try {
    const subject = status === 'approved' ? 'Withdrawal Approved' : 'Withdrawal Rejected';
    const statusColor = status === 'approved' ? '#10b981' : '#ef4444';
    const statusText = status === 'approved' ? 'Approved' : 'Rejected';
    
    const result = await sendMail({
      to: email,
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1D429A; margin-bottom: 20px;">Withdrawal ${statusText}</h2>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0;">Dear ${fullName},</p>
            <p style="margin: 0 0 10px 0;">Your withdrawal request has been <strong style="color: ${statusColor};">${statusText}</strong>.</p>
            <div style="background: white; padding: 15px; border-radius: 6px; margin: 10px 0;">
              <p style="margin: 0 0 5px 0;"><strong>Amount:</strong> $${amount.toLocaleString()}</p>
              <p style="margin: 0 0 5px 0;"><strong>Method:</strong> ${paymentMethod.toUpperCase()}</p>
              <p style="margin: 0;"><strong>Status:</strong> <span style="color: ${statusColor}; font-weight: bold;">${statusText}</span></p>
            </div>
            ${status === 'approved' ? 
              `<p style="color: #10b981; margin: 10px 0;">The amount will be processed and sent to your wallet address shortly.</p>` :
              `<p style="color: #ef4444; margin: 10px 0;">If you believe this is an error, please contact our support team.</p>`
            }
          </div>
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #666; font-size: 12px; margin: 0;">This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      `,
    });

    if (!result.success) {
      console.error('Error sending withdrawal notification:', result.error);
      return false;
    }

    console.log('Withdrawal notification sent successfully:', result.data);
    return true;
  } catch (error) {
    console.error('Error sending withdrawal notification:', error);
    return false;
  }
}

export async function GET(request: NextRequest) {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    // Build query
    let query: any = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    
    // Fetch withdrawals with user data
    const withdrawals = await Withdrawal.find(query)
      .populate('userId', 'username fullName email')
      .sort({ createdAt: -1 });
    
    // Transform data for frontend
    const transformedWithdrawals = withdrawals.map(withdrawal => ({
      _id: withdrawal._id,
      userId: withdrawal.userId,
      amount: withdrawal.amount,
      netAmount: withdrawal.netAmount,
      charge: withdrawal.charge,
      address: withdrawal.address,
      paymentMethod: withdrawal.paymentMethod,
      status: withdrawal.status,
      createdAt: withdrawal.createdAt,
      updatedAt: withdrawal.updatedAt,
      user: withdrawal.userId // populated user data
    }));
    
    return NextResponse.json({ withdrawals: transformedWithdrawals });
    
  } catch (error) {
    console.error('Error fetching withdrawals:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    const { withdrawalId, action } = await request.json();
    
    if (!withdrawalId || !action) {
      return NextResponse.json({ error: 'Withdrawal ID and action required' }, { status: 400 });
    }
    
    // Find the withdrawal
    const withdrawal = await Withdrawal.findById(withdrawalId).populate('userId');
    if (!withdrawal) {
      return NextResponse.json({ error: 'Withdrawal not found' }, { status: 404 });
    }
    
    const user = withdrawal.userId as any;
    
    if (action === 'approve') {
      // Update withdrawal status
      withdrawal.status = 'completed';
      await withdrawal.save();
      
      // Deduct user balance (use full amount, not netAmount)
      user.accountBalance -= withdrawal.amount;
      user.totalWithdrawal += withdrawal.amount;
      await user.save();
      
      // Send email notification to user
      await sendWithdrawalNotification(
        user.email,
        user.fullName,
        withdrawal.amount,
        'approved',
        withdrawal.paymentMethod
      );
      
      return NextResponse.json({ 
        success: true, 
        message: 'Withdrawal approved and balance deducted',
        status: 'completed'
      });
      
    } else if (action === 'reject') {
      // Update withdrawal status
      withdrawal.status = 'rejected';
      await withdrawal.save();
      
      // Send email notification to user
      await sendWithdrawalNotification(
        user.email,
        user.fullName,
        withdrawal.amount,
        'rejected',
        withdrawal.paymentMethod
      );
      
      // Don't deduct balance for rejected withdrawals
      
      return NextResponse.json({ 
        success: true, 
        message: 'Withdrawal rejected',
        status: 'rejected'
      });
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    
  } catch (error) {
    console.error('Error updating withdrawal:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
