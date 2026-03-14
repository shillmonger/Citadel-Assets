import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('Test endpoint called at:', new Date().toISOString());
    
    return NextResponse.json({
      success: true,
      message: 'Cron test endpoint working',
      timestamp: new Date(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        CRON_SECRET_EXISTS: !!process.env.CRON_SECRET,
        MONGODB_URI_EXISTS: !!process.env.MONGODB_URI,
      }
    });
  } catch (error) {
    console.error('Test endpoint error:', error);
    return NextResponse.json(
      { 
        error: 'Test endpoint failed',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date()
      },
      { status: 500 }
    );
  }
}
