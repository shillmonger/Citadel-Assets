import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function GET(request: NextRequest) {
  try {
    // Test Cloudinary configuration
    console.log('Testing Cloudinary configuration...');
    console.log('Config:', {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'configured' : 'missing',
      api_key: process.env.CLOUDINARY_API_KEY ? 'configured' : 'missing',
      api_secret: process.env.CLOUDINARY_API_SECRET ? 'configured' : 'missing'
    });

    // Test a simple API call to verify connectivity
    const result = await cloudinary.api.resources({
      type: 'upload',
      max_results: 1
    });

    return NextResponse.json({
      success: true,
      message: 'Cloudinary is working correctly',
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'configured' : 'missing',
        api_key: process.env.CLOUDINARY_API_KEY ? 'configured' : 'missing',
        api_secret: process.env.CLOUDINARY_API_SECRET ? 'configured' : 'missing'
      },
      test_result: result
    });

  } catch (error: any) {
    console.error('Cloudinary test error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Cloudinary configuration error',
        error: {
          message: error.message,
          name: error.name,
          http_code: error.http_code
        },
        config: {
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME ? 'configured' : 'missing',
          api_key: process.env.CLOUDINARY_API_KEY ? 'configured' : 'missing',
          api_secret: process.env.CLOUDINARY_API_SECRET ? 'configured' : 'missing'
        }
      },
      { status: 500 }
    );
  }
}
