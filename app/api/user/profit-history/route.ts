import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import InvestmentPlan from '@/lib/models/InvestmentPlan';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
}

export async function GET(request: NextRequest) {
  try {
    // Get auth token from cookies or headers
    const getAuthToken = () => {
      // Check Authorization header first
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
      }
      
      // Check cookies
      const cookies = request.headers.get('cookie');
      if (cookies) {
        const authCookie = cookies.split(';').find(cookie => 
          cookie.trim().startsWith('auth-token=')
        );
        if (authCookie) {
          return authCookie.split('=')[1];
        }
      }
      
      return null;
    };

    const token = getAuthToken();

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify and decode the JWT token
    const decoded = jwt.decode(token) as DecodedToken;
    
    if (!decoded || decoded.exp * 1000 < Date.now()) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Connect to database
    await connectDB();

    // Fetch investment plans for the user
    const investmentPlans = await InvestmentPlan.find({ 
      userId: decoded.userId,
      'profitHistory.0': { $exists: true } // Only get plans that have profit history
    })
    .select('selectedPlan profitHistory')
    .sort({ updatedAt: -1 });

    // Flatten all profit history entries
    const allProfits: Array<{
      plan: string;
      amount: number;
      percentage: number;
      date: Date;
    }> = [];

    investmentPlans.forEach(plan => {
      plan.profitHistory.forEach((profit: { date: Date; amount: number; percentage: number }) => {
        allProfits.push({
          plan: plan.selectedPlan,
          amount: profit.amount,
          percentage: profit.percentage,
          date: profit.date
        });
      });
    });

    // Sort by date (newest first)
    allProfits.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({
      success: true,
      profits: allProfits
    });

  } catch (error) {
    console.error('Error fetching profit history:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
