import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Withdrawal from '@/lib/models/Withdrawal';
import User from '@/lib/models/User';

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
      
      // Deduct user balance (use the full amount, not netAmount)
      user.accountBalance -= withdrawal.amount;
      user.totalWithdrawal += withdrawal.amount;
      await user.save();
      
      return NextResponse.json({ 
        success: true, 
        message: 'Withdrawal approved and balance deducted',
        status: 'completed'
      });
      
    } else if (action === 'reject') {
      // Update withdrawal status
      withdrawal.status = 'rejected';
      await withdrawal.save();
      
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
