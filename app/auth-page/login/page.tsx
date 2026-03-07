"use client";
import React from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 font-sans">
      
      {/* Form Container */}
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-[#1e40af] mb-10">
          User Login
        </h1>

        <form className="space-y-5">

          {/* Email */}
          <div className="text-left">
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">
              Your Email *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] bg-gray-50"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="text-left">
            <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] bg-gray-50"
                placeholder="Password"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Remember / Forgot */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-[#1e40af] border-gray-300 rounded focus:ring-[#1e40af]"
              />
              <label htmlFor="remember" className="ml-2 text-gray-700">
                Remember me
              </label>
            </div>

            <Link href="#" className="font-medium text-[#1e40af] hover:text-[#1d4ed8]">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center cursor-pointer py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#1e40af] hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e40af]"
            >
              Sign In
            </button>
          </div>

        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/auth-page/register" className="font-bold text-gray-900 hover:underline">
            Sign Up
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-10 text-center text-gray-400 text-[10px]">
          © Copyright 2026 Citadel Trade Pty Limited All Rights Reserved.
        </div>

      </div>

    </div>
  );
};

export default LoginPage;