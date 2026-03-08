"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      // Validation
      if (!email || !password) {
        toast.error('Please fill in all fields');
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        
        // Store token in localStorage for client-side access
        if (data.token) {
          localStorage.setItem('auth-token', data.token);
          // Store user data
          localStorage.setItem('user-data', JSON.stringify(data.user));
        }
        
        // Redirect to dashboard after 1 second
        setTimeout(() => {
          router.push('/user-dashboard/dashboard');
        }, 1000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 font-sans">
      
      {/* Form Container */}
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-100 border border-gray-100">
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-[#1e40af] mb-10">
          User Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div className="text-left">
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">
              Your Email 
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] bg-gray-50"
                placeholder="name@example.com"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="text-left">
            <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-1">
              Password 
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1e40af] focus:border-[#1e40af] bg-gray-50"
                placeholder="Password"
                required
                disabled={isLoading}
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
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
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
              disabled={isLoading}
              className="w-full flex justify-center cursor-pointer py-3 px-6 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#1e40af] hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1e40af] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
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