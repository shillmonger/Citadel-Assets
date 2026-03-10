import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import KYC, { IKYC } from '@/lib/models/KYC';
import cloudinary from '@/lib/cloudinary';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    // Debug: Check Cloudinary configuration
    console.log('Cloudinary config check:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'configured' : 'missing',
      api_key: process.env.CLOUDINARY_API_KEY ? 'configured' : 'missing',
      api_secret: process.env.CLOUDINARY_API_SECRET ? 'configured' : 'missing'
    });

    // Get authenticated user
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || 
                 request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Please login first.' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Parse form data
    const formData = await request.formData();
    
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const countryOfResidence = formData.get('countryOfResidence') as string;
    const documentType = formData.get('documentType') as string;
    const frontIdFile = formData.get('frontId') as File;
    const backIdFile = formData.get('backId') as File;

    // Validation
    if (!fullName || !email || !phoneNumber || !countryOfResidence || !documentType || !frontIdFile) {
      return NextResponse.json(
        { success: false, message: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Validate document type
    const validDocTypes = ['passport', 'driver_license', 'national_id'];
    if (!validDocTypes.includes(documentType)) {
      return NextResponse.json(
        { success: false, message: 'Invalid document type' },
        { status: 400 }
      );
    }

    // Validate file types
    const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validFileTypes.includes(frontIdFile.type)) {
      return NextResponse.json(
        { success: false, message: 'Front ID must be a valid image file (JPEG, PNG, or WebP)' },
        { status: 400 }
      );
    }

    if (backIdFile && backIdFile.size > 0 && !validFileTypes.includes(backIdFile.type)) {
      return NextResponse.json(
        { success: false, message: 'Back ID must be a valid image file (JPEG, PNG, or WebP)' },
        { status: 400 }
      );
    }

    // Validate file sizes (max 10MB)
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    if (frontIdFile.size > maxFileSize) {
      return NextResponse.json(
        { success: false, message: 'Front ID file size must be less than 10MB' },
        { status: 400 }
      );
    }

    if (backIdFile && backIdFile.size > maxFileSize) {
      return NextResponse.json(
        { success: false, message: 'Back ID file size must be less than 10MB' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Check if KYC already exists for this user
    const existingKYC = await KYC.findOne({ userId: decoded.userId });
    if (existingKYC) {
      return NextResponse.json(
        { success: false, message: 'KYC verification already submitted. Please wait for review.' },
        { status: 409 }
      );
    }

    // Upload images to Cloudinary
    const uploadToCloudinary = async (file: File, folder: string, identifier: string) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      return new Promise<string>((resolve, reject) => {
        // Add timeout to prevent hanging
        const timeout = setTimeout(() => {
          reject(new Error('Upload timeout - please try again'));
        }, 30000); // 30 second timeout

        cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: `kyc/${folder}`,
            public_id: `${identifier}-${Date.now()}`,
            format: 'webp',
            quality: 'auto:good',
            fetch_format: 'auto',
            timeout: 30000
          },
          (error, result) => {
            clearTimeout(timeout);
            if (error) {
              console.error('Cloudinary upload error:', error);
              reject(error);
            } else {
              resolve(result?.secure_url || '');
            }
          }
        ).end(buffer);
      });
    };

    // Upload front ID
    const frontIdUrl = await uploadToCloudinary(
      frontIdFile, 
      'front-id', 
      decoded.userId
    );

    // Upload back ID if provided
    let backIdUrl: string | undefined;
    if (backIdFile && backIdFile.size > 0) {
      backIdUrl = await uploadToCloudinary(
        backIdFile, 
        'back-id', 
        decoded.userId
      );
    }

    // Create KYC record
    const kycData: IKYC = new KYC({
      userId: decoded.userId,
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      phoneNumber: phoneNumber.trim(),
      countryOfResidence: countryOfResidence.trim(),
      documentType,
      frontIdUrl,
      backIdUrl,
      status: 'pending'
    });

    await kycData.save();

    return NextResponse.json(
      { 
        success: true, 
        message: 'KYC verification submitted successfully. Your documents are now under review.',
        kyc: {
          id: kycData._id,
          status: kycData.status,
          submittedAt: kycData.submittedAt
        }
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('KYC submission error:', error);
    console.error('Error details:', {
      message: error.message,
      name: error.name,
      stack: error.stack,
      http_code: error.http_code
    });
    
    // Check if it's a Cloudinary error
    if (error.name === 'Error' && error.http_code) {
      console.error('Cloudinary configuration check:', {
        cloud_name: !!process.env.CLOUDINARY_CLOUD_NAME,
        api_key: !!process.env.CLOUDINARY_API_KEY,
        api_secret: !!process.env.CLOUDINARY_API_SECRET
      });
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Internal server error. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? {
          message: error.message,
          name: error.name,
          http_code: error.http_code
        } : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '') || 
                 request.cookies.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Please login first.' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Connect to database
    await connectDB();

    // Get user's KYC status
    const kyc = await KYC.findOne({ userId: decoded.userId })
      .select('-frontIdUrl -backIdUrl -rejectionReason');

    if (!kyc) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'No KYC submission found',
          kyc: null 
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        kyc: {
          id: kyc._id,
          status: kyc.status,
          submittedAt: kyc.submittedAt,
          reviewedAt: kyc.reviewedAt
        }
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('KYC status check error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
