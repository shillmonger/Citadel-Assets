import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Deposit from '@/lib/models/Deposit';
import cloudinary from '@/lib/cloudinary';
import jwt from 'jsonwebtoken';
import User from '@/lib/models/User';
import { sendDepositNotificationToAdmins } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get token from Authorization header or cookie
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || 
                 request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'No authentication token provided' },
        { status: 401 }
      );
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET!) as any;
    
    if (!decoded || !decoded.userId) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Fetch user's deposits
    const deposits = await Deposit.find({ userId: decoded.userId })
      .sort({ createdAt: -1 });

    // Calculate total approved deposits
    const totalApproved = deposits
      .filter(deposit => deposit.status === 'approved')
      .reduce((sum, deposit) => sum + deposit.amount, 0);

    return NextResponse.json(
      { 
        deposits,
        totalApproved,
        totalDeposits: deposits.length
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('Error fetching user deposits:', error);
    
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to fetch deposits' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    
    const paymentMethod = formData.get('paymentMethod') as string;
    const amount = formData.get('amount') as string;
    const walletAddress = formData.get('walletAddress') as string;
    const network = formData.get('network') as string;
    const userId = formData.get('userId') as string;
    const imageFile = formData.get('proofImage') as File;

    if (!paymentMethod || !amount || !walletAddress || !network || !userId || !imageFile) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'deposit-proofs',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const cloudinaryResult = uploadResult as any;
    const proofImageUrl = cloudinaryResult.secure_url;

    // Create deposit record
    const deposit = new Deposit({
      paymentMethod,
      amount: parseFloat(amount),
      proofImageUrl,
      walletAddress,
      network,
      userId,
      status: 'pending'
    });

    await deposit.save();

    // Fetch user details for email notification
    const user = await User.findById(userId);
    
    if (user) {
      // Send email notification to all admins
      const emailResult = await sendDepositNotificationToAdmins({
        userName: user.fullName,
        userEmail: user.email,
        amount: parseFloat(amount),
        paymentMethod,
        network,
        walletAddress,
        proofImageUrl
      });

      if (!emailResult.success) {
        console.error('Failed to send admin notification:', emailResult);
        // Don't fail the deposit submission if email fails
      }
    }

    return NextResponse.json(
      { 
        message: 'Deposit submitted successfully',
        deposit: {
          id: deposit._id,
          paymentMethod: deposit.paymentMethod,
          amount: deposit.amount,
          status: deposit.status,
          proofImageUrl: deposit.proofImageUrl
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Deposit submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit deposit' },
      { status: 500 }
    );
  }
}
