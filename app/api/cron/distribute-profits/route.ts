import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import InvestmentPlan from '@/lib/models/InvestmentPlan';

export async function POST(request: NextRequest) {
  try {
    // Verify this is a cron job request (you should add authentication in production)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Connect to database
    await connectDB();

    // Get all active investment plans that haven't completed their duration
    const activePlans = await InvestmentPlan.find({
      isActive: true,
      endDate: { $gt: new Date() }
    }).populate('userId');

    let totalProfitDistributed = 0;
    let plansProcessed = 0;

    for (const plan of activePlans) {
      const user = plan.userId as any;
      
      if (!user) {
        console.error(`User not found for plan ${plan._id}`);
        continue;
      }

      // Calculate daily profit
      const dailyProfit = (plan.amount * plan.profit) / 100;
      
      // Add profit to user's account balance and total profit
      user.accountBalance += dailyProfit;
      user.totalProfit += dailyProfit;
      
      // Update investment plan
      plan.totalProfitEarned += dailyProfit;
      plan.daysCompleted += 1;
      
      // Check if plan has reached its duration
      const today = new Date();
      const daysSinceStart = Math.floor((today.getTime() - plan.startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysSinceStart >= plan.duration) {
        plan.isActive = false;
        console.log(`Plan ${plan._id} completed after ${plan.duration} days`);
      }
      
      // Save changes
      await user.save();
      await plan.save();
      
      totalProfitDistributed += dailyProfit;
      plansProcessed++;
    }

    return NextResponse.json({
      success: true,
      message: 'Profits distributed successfully',
      stats: {
        plansProcessed,
        totalProfitDistributed,
        timestamp: new Date()
      }
    });

  } catch (error) {
    console.error('Error distributing profits:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// For testing purposes - GET endpoint to see active plans
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const activePlans = await InvestmentPlan.find({
      isActive: true,
      endDate: { $gt: new Date() }
    }).populate('userId', 'username email accountBalance');

    return NextResponse.json({
      success: true,
      activePlans: activePlans.map(plan => ({
        id: plan._id,
        selectedPlan: plan.selectedPlan,
        amount: plan.amount,
        duration: plan.duration,
        profit: plan.profit,
        daysCompleted: plan.daysCompleted,
        totalProfitEarned: plan.totalProfitEarned,
        startDate: plan.startDate,
        endDate: plan.endDate,
        user: {
          username: (plan.userId as any).username,
          email: (plan.userId as any).email,
          accountBalance: (plan.userId as any).accountBalance
        }
      }))
    });

  } catch (error) {
    console.error('Error fetching active plans:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
