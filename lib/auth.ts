import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

interface AuthResult {
  success: boolean;
  user?: any;
  error?: string;
  status?: number;
}

export async function authMiddleware(request: NextRequest): Promise<AuthResult> {
  try {
    // Get token from Authorization header or cookie
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || 
                 request.cookies.get('auth-token')?.value;

    if (!token) {
      return {
        success: false,
        error: 'No authentication token provided',
        status: 401
      };
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as any;
    
    if (!decoded || !decoded.userId) {
      return {
        success: false,
        error: 'Invalid token',
        status: 401
      };
    }

    // Connect to database
    await connectDB();

    // Find user by ID
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return {
        success: false,
        error: 'User not found',
        status: 404
      };
    }

    // Return user data
    const userResponse = {
      id: user._id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      country: user.country,
      phoneNumber: user.phoneNumber,
      referralId: user.referralId,
      accountBalance: user.accountBalance,
      welcomeBonus: user.welcomeBonus,
      totalProfit: user.totalProfit,
      referralBonus: user.referralBonus,
      totalWithdrawal: user.totalWithdrawal,
      totalDeposit: user.totalDeposit,
      roles: user.roles,
      createdAt: user.createdAt,
    };

    return {
      success: true,
      user: userResponse
    };

  } catch (error: any) {
    console.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return {
        success: false,
        error: 'Invalid or expired token',
        status: 401
      };
    }

    return {
      success: false,
      error: 'Internal server error',
      status: 500
    };
  }
}
