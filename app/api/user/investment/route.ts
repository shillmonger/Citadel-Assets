import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import InvestmentPlan from '@/lib/models/InvestmentPlan';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
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

    // Get request body
    const { selectedPlan, amount, duration, profit } = await request.json();

    if (!selectedPlan || !amount || !duration || !profit) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find user by ID
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user has sufficient balance
    if (user.accountBalance < amount) {
      return NextResponse.json(
        { 
          error: 'Insufficient balance',
          message: 'Please upgrade your balance to continue in the deposit page'
        },
        { status: 400 }
      );
    }

    // Calculate end date
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration);

    // Create investment plan
    const investmentPlan = new InvestmentPlan({
      userId: decoded.userId,
      selectedPlan,
      amount,
      duration,
      profit,
      startDate,
      endDate,
      isActive: true,
      totalProfitEarned: 0,
      daysCompleted: 0
    });

    // Deduct amount from user balance
    user.accountBalance -= amount;
    await user.save();

    // Save investment plan
    await investmentPlan.save();

    return NextResponse.json({
      success: true,
      message: 'Investment plan created successfully',
      investmentPlan: {
        id: investmentPlan._id,
        selectedPlan: investmentPlan.selectedPlan,
        amount: investmentPlan.amount,
        duration: investmentPlan.duration,
        profit: investmentPlan.profit,
        startDate: investmentPlan.startDate,
        endDate: investmentPlan.endDate,
        isActive: investmentPlan.isActive
      }
    });

  } catch (error) {
    console.error('Error creating investment plan:', error);
    
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

    // Fetch user's investment plans
    const investmentPlans = await InvestmentPlan.find({ userId: decoded.userId })
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      investmentPlans
    });

  } catch (error) {
    console.error('Error fetching investment plans:', error);
    
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
