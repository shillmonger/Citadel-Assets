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
    const { fullName, username, email, country, phoneNumber } = await request.json();

    await connectDB();

    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.fullName = fullName || user.fullName;
    user.username = username || user.username;
    user.email = email || user.email;
    user.country = country || user.country;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Personal settings updated successfully'
    });

  } catch (error) {
    console.error('Error updating personal settings:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
