import { NextRequest, NextResponse } from 'next/server';
import { runDailyBalanceUpdate } from '@/services/cronService';

export async function POST(request: NextRequest) {
  try {
    console.log("External cron triggered at:", new Date().toISOString());

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

// For testing purposes - GET endpoint
export async function GET(request: NextRequest) {
  try {
    console.log("External cron test endpoint called at:", new Date().toISOString());
    
    return NextResponse.json({
      success: true,
      message: "External cron endpoint is working",
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: "Test endpoint failed",
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date()
      },
      { status: 500 }
    );
  }
}
