import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || 
                 request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const withdrawalAddresses = await request.json();
    
    console.log('Received withdrawal addresses:', withdrawalAddresses);
    console.log('User ID:', decoded.userId);

    await connectDB();

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Initialize withdrawalAddresses if it doesn't exist
    if (!user.withdrawalAddresses) {
      user.withdrawalAddresses = {
        tron: null,
        doge: null,
        swiftCode: null,
        bitcoin: null,
        ethereum: null,
        litecoin: null,
        bnb: null,
        usdt: null
      };
    }

    console.log('Current user withdrawal addresses:', user.withdrawalAddresses);

    user.withdrawalAddresses = {
      ...user.withdrawalAddresses,
      ...withdrawalAddresses
    };

    console.log('Updated withdrawal addresses:', user.withdrawalAddresses);

    await user.save();

    console.log('Saved user withdrawal addresses:', user.withdrawalAddresses);

    return NextResponse.json({
      success: true,
      message: 'Withdrawal settings updated successfully',
      withdrawalAddresses: user.withdrawalAddresses
    });

  } catch (error) {
    console.error('Error updating withdrawal settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
