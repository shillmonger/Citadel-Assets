import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Deposit from '@/lib/models/Deposit';
import { authMiddleware } from '@/lib/auth';

// GET /api/transactions/deposits - Get user's deposit transactions
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
        { network: { $regex: search, $options: 'i' } },
        { walletAddress: { $regex: search, $options: 'i' } }
      ];
    }

    // Get deposits with pagination
    const deposits = await Deposit.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v');

    // Get total count for pagination
    const total = await Deposit.countDocuments(filter);

    // Format response
    const formattedDeposits = deposits.map(deposit => ({
      id: deposit._id,
      amount: deposit.amount,
      paymentMode: `${deposit.paymentMethod} - ${deposit.network}`,
      status: deposit.status,
      dateCreated: deposit.createdAt.toISOString(),
      paymentMethod: deposit.paymentMethod,
      network: deposit.network,
      walletAddress: deposit.walletAddress,
      proofImageUrl: deposit.proofImageUrl,
      updatedAt: deposit.updatedAt
    }));

    return NextResponse.json({
      success: true,
      data: formattedDeposits,
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
    console.error('Error fetching deposits:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
