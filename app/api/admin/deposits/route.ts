import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Deposit from '@/lib/models/Deposit';
import User from '@/lib/models/User';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // optional filter by status

    // Build query
    const query: any = {};
    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      query.status = status;
    }

    // Fetch deposits with user data populated
    const deposits = await Deposit.find(query)
      .populate('userId', 'username fullName email')
      .sort({ createdAt: -1 });

    return NextResponse.json(
      { deposits },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error fetching deposits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch deposits' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { depositId, action } = body;

    if (!depositId || !action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      );
    }

    // Find the deposit
    const deposit = await Deposit.findById(depositId);
    if (!deposit) {
      return NextResponse.json(
        { error: 'Deposit not found' },
        { status: 404 }
      );
    }

    // Update deposit status
    const newStatus = action === 'approve' ? 'approved' : 'rejected';
    deposit.status = newStatus;
    await deposit.save();

    // If approved, update user's total deposit
    if (action === 'approve') {
      const user = await User.findById(deposit.userId);
      if (user) {
        user.totalDeposit += deposit.amount;
        user.accountBalance += deposit.amount;
        await user.save();
      }
    }

    return NextResponse.json(
      { 
        message: `Deposit ${newStatus} successfully`,
        deposit: {
          id: deposit._id,
          status: deposit.status,
          amount: deposit.amount
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error updating deposit:', error);
    return NextResponse.json(
      { error: 'Failed to update deposit' },
      { status: 500 }
    );
  }
}
