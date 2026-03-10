import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import InvestmentPlan from '@/lib/models/InvestmentPlan';
import Deposit from '@/lib/models/Deposit';
import Withdrawal from '@/lib/models/Withdrawal';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    // Get token from Authorization header or cookies
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || 
                 request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    // Connect to database
    await connectDB();

    // Verify the requester is an admin
    const adminUser = await User.findById(decoded.userId);
    if (!adminUser || !adminUser.roles.includes('admin')) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Get dashboard statistics
    const [
      totalUsers,
      activeUsers,
      blockedUsers,
      totalInvestmentPlans,
      totalDeposits,
      pendingDeposits,
      totalWithdrawals,
      pendingWithdrawals
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ isActive: true }),
      User.countDocuments({ isActive: false }),
      InvestmentPlan.countDocuments(),
      Deposit.aggregate([
        { $match: { status: 'approved' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      Deposit.aggregate([
        { $match: { status: 'pending' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      Withdrawal.aggregate([
        { $match: { status: { $in: ['approved', 'completed'] } } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      Withdrawal.aggregate([
        { $match: { status: 'pending' } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ])
    ]);

    // Get recent transactions (deposits)
    const recentDeposits = await Deposit.find({})
      .populate('userId', 'fullName email')
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    // Transform recent deposits to transaction format
    const recentTransactions = recentDeposits.map((deposit: any, index: number) => ({
      id: `TRX-${Date.now()}-${index}`,
      type: 'Deposit',
      amount: deposit.amount,
      status: deposit.status.charAt(0).toUpperCase() + deposit.status.slice(1),
      user: deposit.userId?.fullName || 'Unknown',
      email: deposit.userId?.email || 'unknown@example.com',
      paymentMethod: deposit.paymentMethod,
      createdAt: deposit.createdAt
    }));

    // Format statistics
    const stats = [
      { label: "Total Users", value: totalUsers.toLocaleString(), icon: "Users", color: "text-blue-600", bg: "bg-blue-50" },
      { label: "Active Users", value: activeUsers.toLocaleString(), icon: "UserCheck", color: "text-teal-600", bg: "bg-teal-50" },
      { label: "Blocked Users", value: blockedUsers.toLocaleString(), icon: "UserMinus", color: "text-red-600", bg: "bg-red-50" },
      { label: "Investment Plans", value: totalInvestmentPlans.toLocaleString(), icon: "Layers", color: "text-purple-600", bg: "bg-purple-50" },
      { label: "Total Deposit", value: `$${(totalDeposits[0]?.total || 0).toLocaleString()}`, icon: "TrendingUp", color: "text-teal-600", bg: "bg-teal-50" },
      { label: "Pending Deposit", value: `$${(pendingDeposits[0]?.total || 0).toLocaleString()}`, icon: "Clock", color: "text-orange-600", bg: "bg-orange-50" },
      { label: "Total Withdrawal", value: `$${(totalWithdrawals[0]?.total || 0).toLocaleString()}`, icon: "ArrowDownLeft", color: "text-[#1D429A]", bg: "bg-blue-50" },
      { label: "Pending Withdrawal", value: `$${(pendingWithdrawals[0]?.total || 0).toLocaleString()}`, icon: "ArrowUpRight", color: "text-red-500", bg: "bg-red-50" }
    ];

    return NextResponse.json({
      success: true,
      stats,
      recentTransactions
    });

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
