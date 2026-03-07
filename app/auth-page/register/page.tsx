"use client";
import React from 'react';
import Link from 'next/link';
// Assuming standard icon library like lucide-react for the input icons
import { User, Mail, Phone, Lock, Globe, Users, Eye, EyeOff } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 font-sans">
      {/* Form Container with Box Shadow */}
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-[#1e40af] mb-10">
          Create an Account
        </h1>

        <form className="space-y-5">
          {/* Username */}
          <div className="text-left">
            <label htmlFor="username" className="block text-sm font-bold text-gray-700 mb-1">
              Username *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="username"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] bg-gray-50"
                placeholder="Evelynwo19z@gmail.com"
                required
              />
            </div>
          </div>

          {/* Full Name */}
          <div className="text-left">
            <label htmlFor="fullname" className="block text-sm font-bold text-gray-700 mb-1">
              FullName *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="fullname"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af]"
                placeholder="Enter FullName"
                required
              />
            </div>
          </div>

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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af]"
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

          {/* Confirm Password */}
          <div className="text-left">
            <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700 mb-1">
              Confirm Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af]"
                placeholder="Confirm Password"
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          {/* Country Selection */}
          <div className="text-left">
            <label htmlFor="country" className="block text-sm font-bold text-gray-700 mb-1">
              Country *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
              <select
                id="country"
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e40af] appearance-none bg-white"
                required
              >
                <option value="Zambia">Zambia</option>
                <option value="Nigeria">Nigeria</option>
                <option value="USA">USA</option>
                {/* Add more options as needed */}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Phone Number (Moved after Country) */}
          <div className="text-left">
            <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-1">
              Phone Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af]"
                placeholder="Enter Phone number"
                required
              />
            </div>
          </div>

          {/* Referral ID */}
          <div className="text-left">
            <label htmlFor="referral" className="block text-sm font-bold text-gray-700 mb-1">
              Referral ID
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="referral"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af]"
                placeholder="optional referral id"
              />
            </div>
          </div>

          {/* hCaptcha Placeholder */}
          <div className="flex justify-center py-2">
            <div className="border border-gray-200 p-4 rounded bg-gray-50 flex items-center space-x-4 w-full max-w-[300px]">
              <input type="checkbox" className="h-6 w-6 cursor-pointer" />
              <span className="text-sm text-gray-600">I am human</span>
              <div className="ml-auto text-[10px] text-gray-400 text-right">
                hCaptcha<br/>Privacy - Terms
              </div>
            </div>
          </div>

          {/* Register Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center cursor-pointer py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#1e40af] hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e40af]"
            >
              Register
            </button>
          </div>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth-page/login" className="font-bold text-gray-900 hover:underline">
            Login
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

export default RegisterPage;