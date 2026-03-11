const cron = require('node-cron');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const InvestmentPlan = require('./models/InvestmentPlan');

// Load environment variables
dotenv.config({ path: '.env.local' });

// Get cron interval from environment (default to 1 minute)
const CRON_INTERVAL = parseInt(process.env.CRON_INTERVAL) || 1;

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Profit distribution function
const distributeProfits = async () => {
  try {
    // Get all active investment plans that haven't completed their duration
    const activePlans = await InvestmentPlan.find({
      isActive: true,
      endDate: { $gt: new Date() }
    }).populate('userId');

    if (activePlans.length === 0) {
      return {
        plansProcessed: 0,
        totalProfitDistributed: 0,
        timestamp: new Date()
      };
    }

    let totalProfitDistributed = 0;
    let plansProcessed = 0;

    for (const plan of activePlans) {
      const user = plan.userId;
      
      if (!user) {
        console.error(`User not found for plan ${plan._id}`);
        continue;
      }

      // Calculate profit for the configured interval (full percentage per interval)
      const intervalProfit = (plan.amount * plan.profit) / 100;
      
      // Add profit to user's account balance and total profit
      user.accountBalance += intervalProfit;
      user.totalProfit += intervalProfit;
      
      // Update investment plan
      plan.totalProfitEarned += intervalProfit;
      plan.daysCompleted += 1; // Still increment as a cycle
      
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
      }
      
      // Save changes
      await user.save();
      await plan.save();
      
      totalProfitDistributed += intervalProfit;
      plansProcessed++;
    }

    return {
      plansProcessed,
      totalProfitDistributed,
      timestamp: new Date()
    };

  } catch (error) {
    console.error('Error distributing profits:', error);
    throw error;
  }
};

// Manual trigger function
const runManually = async () => {
  await connectDB();
  const result = await distributeProfits();
  console.log(`Profit distribution completed: ${result.plansProcessed} plans, $${result.totalProfitDistributed.toFixed(2)} distributed`);
  process.exit(0);
};

// Start cron scheduler
const startCronScheduler = async () => {
  await connectDB();

  // Schedule job to run based on configured interval
  const cronPattern = CRON_INTERVAL === 1 ? '*/1 * * * *' : `*/${CRON_INTERVAL} * * * *`;
  cron.schedule(cronPattern, async () => {
    try {
      const result = await distributeProfits();
      if (result.plansProcessed > 0) {
        console.log(`${new Date().toISOString()}: Distributed $${result.totalProfitDistributed.toFixed(2)} to ${result.plansProcessed} plans (${CRON_INTERVAL}-minute interval)`);
      }
    } catch (error) {
      console.error('Scheduled profit distribution failed:', error);
    }
  });

  console.log(`Profit distribution scheduler started - running every ${CRON_INTERVAL} minute(s)`);
  console.log('Press Ctrl+C to stop');

  // Keep the process running
  process.on('SIGINT', () => {
    console.log('Shutting down cron scheduler...');
    mongoose.connection.close();
    process.exit(0);
  });
};

// Check if script is run with --manual flag
if (process.argv.includes('--manual')) {
  runManually();
} else {
  startCronScheduler();
}
