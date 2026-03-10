import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Withdrawal from '@/lib/models/Withdrawal';
import { authMiddleware } from '@/lib/auth';

// GET /api/transactions/withdrawals - Get user's withdrawal transactions
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authMiddleware(request);
    if (!authResult.success) {
      return NextResponse.json(
        { error: authResult.error },
        { status: authResult.status }
      );
    }

    const userId = authResult.user!.id;
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status');
    
    const skip = (page - 1) * limit;

    // Build filter
    const filter: any = { userId };
    
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    if (search) {
      filter.$or = [
        { paymentMethod: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } }
      ];
    }

    // Get withdrawals with pagination
    const withdrawals = await Withdrawal.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v -otp'); // Exclude OTP from response

    // Get total count for pagination
    const total = await Withdrawal.countDocuments(filter);

    // Format response
    const formattedWithdrawals = withdrawals.map(withdrawal => ({
      id: withdrawal._id,
      amount: withdrawal.amount,
      paymentMode: withdrawal.paymentMethod,
      status: withdrawal.status,
      dateCreated: withdrawal.createdAt.toISOString(),
      address: withdrawal.address,
      charge: withdrawal.charge,
      netAmount: withdrawal.netAmount,
      updatedAt: withdrawal.updatedAt
    }));

    return NextResponse.json({
      success: true,
      data: formattedWithdrawals,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching withdrawals:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
