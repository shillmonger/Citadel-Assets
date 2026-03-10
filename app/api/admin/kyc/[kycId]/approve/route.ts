import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import KYC from '@/lib/models/KYC';
import User from '@/lib/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Helper function to verify admin token
async function verifyAdminToken(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '') || 
               request.cookies.get('auth-token')?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    await connectDB();
    
    const user = await User.findById(decoded.userId);
    if (!user || !user.roles.includes('admin')) {
      return null;
    }
    
    return decoded;
  } catch (error) {
    return null;
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ kycId: string }> }) {
  try {
    const admin = await verifyAdminToken(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Admin access required.' },
        { status: 401 }
      );
    }

    const { kycId } = await params;

    // Update KYC status to approved
    const updatedKYC = await KYC.findByIdAndUpdate(
      kycId,
      {
        status: 'approved',
        reviewedAt: new Date(),
        reviewedBy: admin.userId
      },
      { new: true }
    );

    if (!updatedKYC) {
      return NextResponse.json(
        { success: false, message: 'KYC submission not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'KYC approved successfully.',
      kyc: {
        id: updatedKYC._id,
        status: updatedKYC.status,
        reviewedAt: updatedKYC.reviewedAt
      }
    });

  } catch (error: any) {
    console.error('Error approving KYC:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
