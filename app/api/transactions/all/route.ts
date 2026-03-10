import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Deposit from '@/lib/models/Deposit';
import Withdrawal from '@/lib/models/Withdrawal';
import { authMiddleware } from '@/lib/auth';

// GET /api/transactions/all - Get all user's transactions (deposits + withdrawals)
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
    const type = searchParams.get('type'); // 'deposit', 'withdrawal', or 'all'
    
    const skip = (page - 1) * limit;

    let allTransactions: any[] = [];
    let total = 0;

    // Build base filter
    const baseFilter = { userId };

    if (type === 'all' || type === null || type === 'deposit') {
      // Build deposit filter
      const depositFilter: any = { ...baseFilter };
      
      if (status && status !== 'all') {
        depositFilter.status = status;
      }
      
      if (search) {
        depositFilter.$or = [
          { paymentMethod: { $regex: search, $options: 'i' } },
          { network: { $regex: search, $options: 'i' } },
          { walletAddress: { $regex: search, $options: 'i' } }
        ];
      }

      // Get deposits
      const deposits = await Deposit.find(depositFilter)
        .sort({ createdAt: -1 })
        .select('-__v');

      // Format deposits
      const formattedDeposits = deposits.map(deposit => ({
        id: deposit._id,
        amount: deposit.amount,
        paymentMode: `${deposit.paymentMethod} - ${deposit.network}`,
        status: deposit.status,
        dateCreated: deposit.createdAt.toISOString(),
        type: 'deposit',
        paymentMethod: deposit.paymentMethod,
        network: deposit.network,
        walletAddress: deposit.walletAddress,
        proofImageUrl: deposit.proofImageUrl,
        updatedAt: deposit.updatedAt
      }));

      allTransactions = allTransactions.concat(formattedDeposits);
      
      if (type === 'deposit') {
        total = await Deposit.countDocuments(depositFilter);
      }
    }

    if (type === 'all' || type === null || type === 'withdrawal') {
      // Build withdrawal filter
      const withdrawalFilter: any = { ...baseFilter };
      
      if (status && status !== 'all') {
        withdrawalFilter.status = status;
      }
      
      if (search) {
        withdrawalFilter.$or = [
          { paymentMethod: { $regex: search, $options: 'i' } },
          { address: { $regex: search, $options: 'i' } }
        ];
      }

      // Get withdrawals
      const withdrawals = await Withdrawal.find(withdrawalFilter)
        .sort({ createdAt: -1 })
        .select('-__v -otp'); // Exclude OTP from response

      // Format withdrawals
      const formattedWithdrawals = withdrawals.map(withdrawal => ({
        id: withdrawal._id,
        amount: withdrawal.amount,
        paymentMode: withdrawal.paymentMethod,
        status: withdrawal.status,
        dateCreated: withdrawal.createdAt.toISOString(),
        type: 'withdrawal',
        address: withdrawal.address,
        charge: withdrawal.charge,
        netAmount: withdrawal.netAmount,
        updatedAt: withdrawal.updatedAt
      }));

      allTransactions = allTransactions.concat(formattedWithdrawals);
      
      if (type === 'withdrawal') {
        total = await Withdrawal.countDocuments(withdrawalFilter);
      }
    }

    // Sort all transactions by date (newest first)
    allTransactions.sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime());

    // Get total count for combined transactions
    if (type === 'all' || type === null) {
      const depositFilter: any = { ...baseFilter };
      const withdrawalFilter: any = { ...baseFilter };
      
      if (status && status !== 'all') {
        depositFilter.status = status;
        withdrawalFilter.status = status;
      }
      
      if (search) {
        const searchCondition = [
          { paymentMethod: { $regex: search, $options: 'i' } },
          { network: { $regex: search, $options: 'i' } },
          { walletAddress: { $regex: search, $options: 'i' } },
          { address: { $regex: search, $options: 'i' } }
        ];
        depositFilter.$or = searchCondition;
        withdrawalFilter.$or = searchCondition;
      }

      const depositCount = await Deposit.countDocuments(depositFilter);
      const withdrawalCount = await Withdrawal.countDocuments(withdrawalFilter);
      total = depositCount + withdrawalCount;
    }

    // Apply pagination to combined results
    const paginatedTransactions = allTransactions.slice(skip, skip + limit);

    return NextResponse.json({
      success: true,
      data: paginatedTransactions,
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
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
