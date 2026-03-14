import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import InvestmentPlan from '@/lib/models/InvestmentPlan';

export async function POST(request: NextRequest) {
  try {
    console.log('Cron job started at:', new Date().toISOString());
    
    // Verify this is a cron job request (you should add authentication in production)
    const authHeader = request.headers.get('authorization');
    console.log('Auth header:', authHeader ? 'Present' : 'Missing');
    
    if (!authHeader) {
      console.log('No authorization header found');
      return NextResponse.json(
        { error: 'Missing authorization header' },
        { status: 401 }
      );
    }
    
    const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;
    console.log('Expected auth:', expectedAuth.substring(0, 20) + '...');
    console.log('CRON_SECRET exists:', !!process.env.CRON_SECRET);
    
    if (authHeader !== expectedAuth) {
      console.log('Authorization failed');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Authorization successful, connecting to database...');
    
    // Connect to database
    await connectDB();
    console.log('Database connected successfully');

    // Get cron interval from environment (default to 1 minute)
    const CRON_INTERVAL = parseInt(process.env.CRON_INTERVAL as string) || 1;
    console.log('Cron interval:', CRON_INTERVAL);

    // Get all active investment plans that haven't completed their duration
    console.log('Fetching active investment plans...');
    const activePlans = await InvestmentPlan.find({
      isActive: true,
      endDate: { $gt: new Date() }
    }).populate('userId');
    
    console.log(`Found ${activePlans.length} active plans`);

    let totalProfitDistributed = 0;
    let plansProcessed = 0;

    console.log(`Processing ${activePlans.length} plans...`);
    
    for (const plan of activePlans) {
      const user = plan.userId as any;
      
      if (!user) {
        console.error(`User not found for plan ${plan._id}`);
        continue;
      }

      console.log(`Processing plan ${plan._id} for user ${user.username}`);

      // Calculate profit for the configured interval (full percentage per interval)
      const intervalProfit = (plan.amount * plan.profit) / 100;
      console.log(`Plan amount: ${plan.amount}, profit %: ${plan.profit}, interval profit: ${intervalProfit}`);
      
      // Add profit to user's account balance and total profit
      user.accountBalance += intervalProfit;
      user.totalProfit += intervalProfit;
      
      // Update investment plan
      plan.totalProfitEarned += intervalProfit;
      plan.daysCompleted += 1;
      
      // Add to profit history
      plan.profitHistory.push({
        date: new Date(),
        amount: intervalProfit,
        percentage: plan.profit
      });
      
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
      
      totalProfitDistributed += intervalProfit;
      plansProcessed++;
      
      console.log(`Plan ${plan._id} processed successfully. Total profit distributed: ${totalProfitDistributed}`);
    }

    console.log(`Cron job completed. Processed ${plansProcessed} plans, distributed ${totalProfitDistributed} profit`);

    return NextResponse.json({
      success: true,
      message: 'Profits distributed successfully',
      stats: {
        plansProcessed,
        totalProfitDistributed,
        cronInterval: CRON_INTERVAL,
        timestamp: new Date()
      }
    });

  } catch (error) {
    console.error('Error distributing profits:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date()
      },
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
