import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const referralId = searchParams.get('referralId');

    if (!referralId) {
      return NextResponse.json(
        { success: false, error: 'Referral ID is required' },
        { status: 400 }
      );
    }

    // Find user by myReferralId
    const user = await User.findOne({ myReferralId: referralId }).select('username fullName email');
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Referrer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email
      }
    });

  } catch (error: any) {
    console.error('Error fetching user by referral ID:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
