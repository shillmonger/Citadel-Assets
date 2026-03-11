import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import { authMiddleware } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authMiddleware(request);
    if (!authResult.success) {
      return NextResponse.json(
        { success: false, error: authResult.error },
        { status: authResult.status }
      );
    }

    const userId = authResult.user!.id;
    
    await connectDB();
    
    // Find user and populate referral data
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Generate referral link if user doesn't have one
    if (!user.myReferralId) {
      user.myReferralId = user.username.toLowerCase().replace(/\s+/g, '') + '-cetadel';
      await user.save();
    }

    const referralLink = user.myReferralId 
      ? `${process.env.NEXT_PUBLIC_APP_URL || 'https://citadelassetsmanagement'}/ref/${user.myReferralId}`
      : null;

    return NextResponse.json({
      success: true,
      data: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        country: user.country,
        phoneNumber: user.phoneNumber,
        referralId: user.referralId,
        myReferralId: user.myReferralId,
        totalReferrals: user.totalReferrals,
        activeReferrals: user.activeReferrals,
        accountBalance: user.accountBalance,
        welcomeBonus: user.welcomeBonus,
        totalProfit: user.totalProfit,
        referralBonus: user.referralBonus,
        totalWithdrawal: user.totalWithdrawal,
        totalDeposit: user.totalDeposit,
        roles: user.roles,
        isActive: user.isActive,
        referralLink
      }
    });

  } catch (error: any) {
    console.error('Error fetching user data:', error);
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
