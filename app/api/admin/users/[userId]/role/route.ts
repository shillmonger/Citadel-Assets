import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    // Get token from Authorization header or cookies
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || 
                 request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    
    // Connect to database
    await connectDB();

    // Verify the requester is an admin
    const adminUser = await User.findById(decoded.userId);
    if (!adminUser || !adminUser.roles.includes('admin')) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    // Get request body
    const { roles } = await request.json();

    if (!roles || !Array.isArray(roles)) {
      return NextResponse.json(
        { error: 'Roles array is required' },
        { status: 400 }
      );
    }

    // Validate roles
    const validRoles = ['user', 'admin'];
    const invalidRoles = roles.filter(role => !validRoles.includes(role));
    if (invalidRoles.length > 0) {
      return NextResponse.json(
        { error: `Invalid roles: ${invalidRoles.join(', ')}` },
        { status: 400 }
      );
    }

    // Await params to get userId
    const { userId } = await params;

    // Find and update user
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update roles
    user.roles = roles;
    await user.save();

    return NextResponse.json({
      success: true,
      message: 'User roles updated successfully',
      user: {
        id: user._id.toString(),
        name: user.fullName,
        email: user.email,
        roles: user.roles,
        status: user.isActive ? 'Active' : 'Blocked'
      }
    });

  } catch (error) {
    console.error('Error updating user roles:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
