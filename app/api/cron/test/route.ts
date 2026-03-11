import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import InvestmentPlan from '@/lib/models/InvestmentPlan';

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

    // Get current time and active plans
    const now = new Date();
    const activePlans = await InvestmentPlan.find({
      isActive: true,
      endDate: { $gt: now }
    }).populate('userId', 'username email accountBalance');

    return NextResponse.json({
      success: true,
      message: 'Cron test endpoint working',
      timestamp: now,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      activePlansCount: activePlans.length,
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
        isActive: plan.isActive,
        user: {
          username: (plan.userId as any).username,
          accountBalance: (plan.userId as any).accountBalance
        }
      }))
    });

  } catch (error) {
    console.error('Error in cron test:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    // Simulate running the actual cron logic
    const now = new Date();
    const activePlans = await InvestmentPlan.find({
      isActive: true,
      endDate: { $gt: now }
    }).populate('userId');

    let totalProfitDistributed = 0;
    let plansProcessed = 0;

    for (const plan of activePlans) {
      const user = plan.userId as any;
      
      if (!user) {
        continue;
      }

      // Calculate daily profit
      const dailyProfit = (plan.amount * plan.profit) / 100;
      
      // Log what would happen (don't actually save in test mode)
      console.log(`Would add $${dailyProfit.toFixed(2)} to user ${user.username}`);
      
      totalProfitDistributed += dailyProfit;
      plansProcessed++;
    }

    return NextResponse.json({
      success: true,
      message: 'Cron test simulation completed',
      timestamp: now,
      stats: {
        plansProcessed,
        totalProfitDistributed,
        simulationMode: true
      }
    });

  } catch (error) {
    console.error('Error in cron test simulation:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
