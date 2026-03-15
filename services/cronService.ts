import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import InvestmentPlan from '@/lib/models/InvestmentPlan';

export interface CronResult {
  plansProcessed: number;
  totalProfitDistributed: number;
  timestamp: Date;
}

export async function runDailyBalanceUpdate(): Promise<CronResult> {
  try {
    console.log('Starting daily balance update...');
    
    // Connect to database
    await connectDB();
    console.log('Database connected successfully');

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

      // Check if profit was already distributed today
      const today = new Date();
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
      
      // Check if there's already a profit entry for today
      const profitAlreadyDistributedToday = plan.profitHistory.some((entry: { date: Date; amount: number; percentage: number }) => {
        const entryDate = new Date(entry.date);
        return entryDate >= todayStart && entryDate < todayEnd;
      });

      if (profitAlreadyDistributedToday) {
        console.log(`Plan ${plan._id} already processed today. Skipping.`);
        continue;
      }

      // Calculate daily profit (full percentage per day)
      const dailyProfit = (plan.amount * plan.profit) / 100;
      console.log(`Plan amount: ${plan.amount}, profit %: ${plan.profit}, daily profit: ${dailyProfit}`);
      
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
      
      console.log(`Plan ${plan._id} processed successfully. Total profit distributed: ${totalProfitDistributed}`);
    }

    console.log(`Daily balance update completed. Processed ${plansProcessed} plans, distributed ${totalProfitDistributed} profit`);

    return {
      plansProcessed,
      totalProfitDistributed,
      timestamp: new Date()
    };

  } catch (error) {
    console.error('Error in daily balance update:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    throw error;
  }
}
