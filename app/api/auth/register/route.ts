import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User, { IUser } from '@/lib/models/User';

// hCaptcha verification function
async function verifyToken(token: string, ip?: string): Promise<[boolean, string[]]> {
  try {
    const payload: Record<string, string> = {
      secret: process.env.HCAPTCHA_SECRET_KEY!,
      response: token,
      sitekey: process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || "2052924e-7a20-4278-b446-702078c06440",
    };

    if (ip) {
      payload.remoteip = ip;
    }

    const params = new URLSearchParams(payload);

    const res = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      body: params,
    });

    const j = await res.json();

    console.log('hCaptcha verification response:', j);

    return j.success ? [true, []] : [false, j["error-codes"] || []];
  } catch (error) {
    console.error('hCaptcha verification error:', error);
    return [false, ['verification-failed']];
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      username,
      fullName,
      email,
      password,
      confirmPassword,
      country,
      phoneNumber,
      referralId,
      hcaptchaToken
    } = body;

    // Validation
    if (!username || !fullName || !email || !password || !confirmPassword || !country || !phoneNumber) {
      return NextResponse.json(
        { success: false, message: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'Passwords do not match' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // hCaptcha verification
    if (!hcaptchaToken) {
      return NextResponse.json(
        { success: false, message: 'Please complete the hCaptcha verification' },
        { status: 400 }
      );
    }

    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined;
    const [isHcaptchaValid, hcaptchaErrors] = await verifyToken(hcaptchaToken, clientIP);

    if (!isHcaptchaValid) {
      console.error('hCaptcha validation failed:', hcaptchaErrors);
      let errorMessage = 'hCaptcha verification failed. Please try again.';
      
      if (hcaptchaErrors.includes('invalid-input-secret')) {
        errorMessage = 'Server configuration error. Please contact support.';
      } else if (hcaptchaErrors.includes('invalid-input-response')) {
        errorMessage = 'Invalid hCaptcha response. Please complete the verification again.';
      } else if (hcaptchaErrors.includes('sitekey-secret-mismatch')) {
        errorMessage = 'Site configuration error. Please contact support.';
      }
      
      return NextResponse.json(
        { success: false, message: errorMessage, errors: hcaptchaErrors },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Check if user already exists
    const existingUserByEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingUserByEmail) {
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return NextResponse.json(
        { success: false, message: 'Username is already taken' },
        { status: 409 }
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(12);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser: IUser = new User({
      username: username.trim(),
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      country: country.trim(),
      phoneNumber: phoneNumber.trim(),
      referralId: referralId?.trim() || null,
      accountBalance: 0,
      welcomeBonus: 10,
      totalProfit: 0,
      referralBonus: 0,
      totalWithdrawal: 0,
      totalDeposit: 0
    });

    await newUser.save();

    // Remove password from response
    const userResponse = {
      id: newUser._id,
      username: newUser.username,
      fullName: newUser.fullName,
      email: newUser.email,
      country: newUser.country,
      phoneNumber: newUser.phoneNumber,
      referralId: newUser.referralId,
      accountBalance: newUser.accountBalance,
      welcomeBonus: newUser.welcomeBonus,
      totalProfit: newUser.totalProfit,
      referralBonus: newUser.referralBonus,
      totalWithdrawal: newUser.totalWithdrawal,
      totalDeposit: newUser.totalDeposit,
      createdAt: newUser.createdAt
    };

    return NextResponse.json(
      { 
        success: true, 
        message: 'Registration successful! Welcome bonus of $10 has been added to your account.',
        user: userResponse
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Registration error:', error);
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
