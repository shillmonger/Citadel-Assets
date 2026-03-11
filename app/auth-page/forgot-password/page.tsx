"use client";
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Mail, Lock, ShieldCheck, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const ForgotPasswordPage: React.FC = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [email, setEmail] = useState('');
  const otpRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  // Handle OTP input focus logic
  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (step === 1) {
        // Step 1: Send reset code
        const formData = new FormData(e.currentTarget);
        const userEmail = formData.get('email') as string;
        
        const response = await fetch('/api/auth/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: userEmail }),
        });

        const data = await response.json();

        if (data.success) {
          setEmail(userEmail);
          toast.success(data.message || 'Verification code sent to your email');
          setStep(2);
        } else {
          toast.error(data.message || 'Failed to send verification code');
        }
      } else if (step === 2) {
        // Step 2: Verify code
        const code = otp.join('');
        if (code.length < 4) {
          toast.error('Please enter the full 4-digit code');
          return;
        }

        const response = await fetch('/api/auth/verify-code', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, code }),
        });

        const data = await response.json();

        if (data.success) {
          toast.success(data.message || 'Code verified successfully');
          setStep(3);
        } else {
          toast.error(data.message || 'Invalid verification code');
        }
      } else {
        // Step 3: Reset password
        const formData = new FormData(e.currentTarget);
        const newPassword = formData.get('newPassword') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        const response = await fetch('/api/auth/reset-password', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, newPassword, confirmPassword }),
        });

        const data = await response.json();

        if (data.success) {
          toast.success(data.message || 'Password reset successful!');
          // Redirect to login page after successful reset
          setTimeout(() => {
            window.location.href = '/auth-page/login';
          }, 2000);
        } else {
          toast.error(data.message || 'Failed to reset password');
        }
      }
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 font-sans">
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-100 border border-gray-100">
        
        {/* Back Button */}
        <Link href="/auth-page/login" className="inline-flex items-center text-sm text-gray-500 hover:text-[#1e40af] mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to Login
        </Link>

        <h1 className="text-2xl font-bold text-center text-[#1e40af] mb-2">
          {step === 1 && "Forgot Password"}
          {step === 2 && "Verify Code"}
          {step === 3 && "Reset Password"}
        </h1>
        <p className="text-center text-gray-500 text-sm mb-10">
          {step === 1 && "Enter your email to receive a reset code."}
          {step === 2 && "Enter the 4-digit code sent to your email."}
          {step === 3 && "Enter and confirm your new password."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* STEP 1: EMAIL FORM */}
          {step === 1 && (
            <div className="text-left">
              <label className="block text-sm font-bold text-gray-700 mb-1">Your Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] bg-gray-50"
                  placeholder="name@example.com"
                />
              </div>
            </div>
          )}

          {/* STEP 2: VERIFICATION CODE (4 BOXES) */}
          {step === 2 && (
            <div className="flex justify-center gap-4">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={otpRefs[idx]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-14 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-lg focus:border-[#1e40af] focus:ring-1 focus:ring-[#1e40af] bg-gray-50 outline-none"
                />
              ))}
            </div>
          )}

          {/* STEP 3: NEW PASSWORD FORM */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="text-left">
                <label className="block text-sm font-bold text-gray-700 mb-1">New Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    required
                    className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] bg-gray-50"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>

              <div className="text-left">
                <label className="block text-sm font-bold text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <ShieldCheck className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] bg-gray-50"
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center cursor-pointer py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#1e40af] hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e40af] disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : step === 3 ? 'Reset Password' : 'Continue'}
          </button>
        </form>

        <div className="mt-10 text-center text-gray-400 text-[10px]">
          © Copyright 2026 Citadel Trade Pty Limited All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;