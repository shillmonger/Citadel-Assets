import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
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

    // Get all users (excluding passwords)
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });

    // Transform users to match the expected format
    const transformedUsers = users.map(user => ({
      id: user._id.toString(),
      name: user.fullName,
      email: user.email,
      status: user.isActive ? 'Active' : 'Blocked',
      balance: user.accountBalance.toString(),
      profit: user.totalProfit.toString(),
      username: user.username,
      country: user.country,
      phoneNumber: user.phoneNumber,
      welcomeBonus: user.welcomeBonus,
      referralBonus: user.referralBonus,
      totalWithdrawal: user.totalWithdrawal,
      totalDeposit: user.totalDeposit,
      roles: user.roles,
      withdrawalAddresses: user.withdrawalAddresses,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));

    return NextResponse.json({
      success: true,
      users: transformedUsers
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    
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

export async function PUT(request: NextRequest) {
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

    // Get request body
    const { userId, accountBalance, totalProfit } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      );
    }

    // Validate input
    if (accountBalance !== undefined && (typeof accountBalance !== 'number' || accountBalance < 0)) {
      return NextResponse.json(
        { error: 'Account balance must be a non-negative number' },
        { status: 400 }
      );
    }

    if (totalProfit !== undefined && (typeof totalProfit !== 'number' || totalProfit < 0)) {
      return NextResponse.json(
        { error: 'Total profit must be a non-negative number' },
        { status: 400 }
      );
    }

    // Find and update user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update fields
    if (accountBalance !== undefined) {
      user.accountBalance = accountBalance;
    }
    if (totalProfit !== undefined) {
      user.totalProfit = totalProfit;
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      user: {
        id: user._id.toString(),
        name: user.fullName,
        email: user.email,
        status: user.isActive ? 'Active' : 'Blocked',
        balance: user.accountBalance.toString(),
        profit: user.totalProfit.toString()
      }
    });

  } catch (error) {
    console.error('Error updating user:', error);
    
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
