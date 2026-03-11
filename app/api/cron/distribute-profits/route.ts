import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import InvestmentPlan from '@/lib/models/InvestmentPlan';

export async function POST(request: NextRequest) {
  try {
    // Verify this is a cron job request (you should add authentication in production)
    const authHeader = request.headers.get('authorization');
    console.log('Cron job started at:', new Date().toISOString());
    console.log('Auth header present:', !!authHeader);
    
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      console.log('Auth failed. Expected:', `Bearer ${process.env.CRON_SECRET}`);
      console.log('Received:', authHeader);
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Authentication successful');
    
    // Connect to database
    await connectDB();
    console.log('Database connected');

    // Get all active investment plans that haven't completed their duration
    const now = new Date();
    console.log('Current time:', now.toISOString());
    
    const activePlans = await InvestmentPlan.find({
      isActive: true,
      endDate: { $gt: now }
    }).populate('userId');

    console.log(`Found ${activePlans.length} active investment plans`);

    let totalProfitDistributed = 0;
    let plansProcessed = 0;

    for (const plan of activePlans) {
      const user = plan.userId as any;
      
      if (!user) {
        console.error(`User not found for plan ${plan._id}`);
        continue;
      }

      console.log(`Processing plan ${plan._id} for user ${user.username}`);

      // Calculate daily profit
      const dailyProfit = (plan.amount * plan.profit) / 100;
      console.log(`Daily profit: $${dailyProfit.toFixed(2)} (${plan.profit}% of $${plan.amount})`);
      
      // Add profit to user's account balance and total profit
      user.accountBalance += dailyProfit;
      user.totalProfit += dailyProfit;
      
      // Update investment plan
      plan.totalProfitEarned += dailyProfit;
      plan.daysCompleted += 1;
      
      // Add to profit history
      plan.profitHistory.push({
        date: new Date(),
        amount: dailyProfit,
        percentage: plan.profit
      });
      
      // Check if plan has reached its duration
      const today = new Date();
      const daysSinceStart = Math.floor((today.getTime() - plan.startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      console.log(`Plan ${plan._id}: Day ${daysSinceStart}/${plan.duration}`);
      
      if (daysSinceStart >= plan.duration) {
        plan.isActive = false;
        console.log(`Plan ${plan._id} completed after ${plan.duration} days`);
      }
      
      // Save changes
      await user.save();
      await plan.save();
      
      console.log(`Updated user balance: $${user.accountBalance.toFixed(2)}`);
      console.log(`Updated plan total profit: $${plan.totalProfitEarned.toFixed(2)}`);
      
      totalProfitDistributed += dailyProfit;
      plansProcessed++;
    }

    console.log(`Cron job completed. Processed ${plansProcessed} plans, distributed $${totalProfitDistributed.toFixed(2)} total profit`);

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
