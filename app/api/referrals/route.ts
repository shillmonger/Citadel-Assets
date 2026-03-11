import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get user ID from auth token or query param for development
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId') || url.searchParams.get('id');

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Get all referred users
    const referredUsers = await User.find({ referralId: user.myReferralId })
      .select('username fullName email createdAt totalDeposit')
      .sort({ createdAt: -1 });

    // Calculate active referrals (those who have made deposits)
    const activeReferrals = referredUsers.filter(user => user.totalDeposit > 0);

    // Update user's referral counts
    user.totalReferrals = referredUsers.length;
    user.activeReferrals = activeReferrals.length;
    await user.save();

    // Format referral data for the table
    const referralData = referredUsers.map(referral => ({
      id: referral._id,
      clientName: referral.fullName,
      username: referral.username,
      email: referral.email,
      status: referral.totalDeposit > 0 ? 'Active' : 'Pending',
      dateRegistered: referral.createdAt,
      totalDeposit: referral.totalDeposit
    }));

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          myReferralId: user.myReferralId,
          totalReferrals: user.totalReferrals,
          activeReferrals: user.activeReferrals,
          referralBonus: user.referralBonus,
          accountBalance: user.accountBalance
        },
        referrals: referralData
      }
    });

  } catch (error: any) {
    console.error('Error fetching referrals:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Generate referral link if user doesn't have one
    if (!user.myReferralId) {
      user.myReferralId = user.username.toLowerCase().replace(/\s+/g, '') + '-cetadel';
      await user.save();
    }

    const referralLink = user.myReferralId 
      ? `${process.env.NEXT_PUBLIC_APP_URL || 'https://citadel-assets.vercel.app'}/ref/${user.myReferralId}`
      : null;

    return NextResponse.json({
      success: true,
      data: {
        referralId: user.myReferralId,
        referralLink
      }
    });

  } catch (error: any) {
    console.error('Error generating referral link:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
