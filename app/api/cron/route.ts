import { NextRequest, NextResponse } from 'next/server';
import { runDailyBalanceUpdate } from '@/services/cronService';

export async function GET(request: NextRequest) {
  try {
    // Verify CRON_SECRET for security
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (!cronSecret) {
      console.error('CRON_SECRET environment variable not set');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      console.error('Unauthorized cron job attempt');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log("Vercel cron job triggered at:", new Date().toISOString());

    // Call the business logic
    const result = await runDailyBalanceUpdate();

    return NextResponse.json({
      success: true,
      message: "Daily cron executed successfully",
      stats: {
        plansProcessed: result.plansProcessed,
        totalProfitDistributed: result.totalProfitDistributed,
        timestamp: result.timestamp
      }
    });

  } catch (error) {
    console.error("Cron error:", error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
    return NextResponse.json({
      success: false,
      error: "Cron job failed",
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date()
    }, { status: 500 });
  }
}
