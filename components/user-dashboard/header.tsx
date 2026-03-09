"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  Globe,
  IdCard,
  User,
  Settings,
  LogOut,
  Headphones,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const pathname = usePathname();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('auth-token') || 
                   document.cookie.split('; ').find(row => row.startsWith('auth-token='))?.split('=')[1];
      
      if (!token) {
        console.error('No auth token found');
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/user/info', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
      } else {
        console.error('Failed to fetch user info');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="bg-[#1D429A] px-4 py-3 flex justify-between items-center text-white sticky top-0 z-30 shadow-md">
      {/* Left: Hamburger (mobile) + Title (desktop only) */}
      <div className="flex items-center gap-3">
        <button
          className="cursor-pointer lg:hidden hover:text-[#76EAD7] transition-colors"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="font-bold text-base md:text-lg tracking-tight truncate hidden lg:block">
          Citadel Assets Limited
        </h1>
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* KYC */}
        <Link
          href="/user-dashboard/kyc"
          className="flex items-center justify-center"
        >
          <button
            className="cursor-pointer hover:text-[#76EAD7] transition-colors"
            title="KYC Verification"
          >
            <IdCard className="w-6 h-6" />
          </button>
        </Link>

        {/* Globe */}
        <button className="cursor-pointer hover:text-[#76EAD7] transition-colors">
          <Globe className="w-6 h-6" />
        </button>

        {/* Shadcn Dropdown for User */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="cursor-pointer flex items-center justify-center lg:justify-start gap-2 
              bg-white/10 p-2 lg:px-2.5 lg:py-1.5 
              rounded-full hover:bg-white/20 transition-all border border-white/10 outline-none"
            >
              <div className="w-6 h-6 bg-[#76EAD7] rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-[#1D429A]" />
              </div>

              <span className="text-[10px] font-bold uppercase hidden lg:inline">
                {isLoading ? 'Loading...' : (userData?.fullName?.split(' ').map((n: string) => n[0]).join('.') || 'User')}
              </span>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-64 mt-0 bg-white border border-slate-200 shadow-2xl rounded-xl overflow-hidden p-1"
            align="end"
          >
            {/* Header Section with a subtle background */}
            <div className="px-3 py-4 bg-slate-50/50 rounded-lg mb-1">
              <DropdownMenuLabel className="p-0 font-bold text-[#1D429A] text-sm">
                My Account
              </DropdownMenuLabel>
              <p className="text-[11px] text-slate-500 font-medium">
                {isLoading ? 'Loading...' : (userData?.email || 'user@example.com')}
              </p>
            </div>

            <DropdownMenuSeparator className="bg-slate-100" />

            <div className="py-1">
              <Link href="/user-dashboard/profile">
                <DropdownMenuItem
                  className={`cursor-pointer flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors rounded-md ${
                    pathname === "/user-dashboard/profile"
                      ? "bg-[#1D429A] text-white"
                      : "text-slate-700 focus:bg-[#1D429A]/5 focus:text-[#1D429A]"
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-md ${
                      pathname === "/user-dashboard/profile"
                        ? "bg-white/20"
                        : "bg-slate-100 group-focus:bg-white"
                    }`}
                  >
                    <Settings
                      className={`w-4 h-4 ${
                        pathname === "/user-dashboard/profile"
                          ? "text-white"
                          : "text-[#1D429A]"
                      }`}
                    />
                  </div>
                  <span>Profile & Settings</span>
                </DropdownMenuItem>
              </Link>

              <Link href="/user-dashboard/support">
                <DropdownMenuItem
                  className={`cursor-pointer flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors rounded-md ${
                    pathname === "/user-dashboard/support"
                      ? "bg-[#1D429A] text-white"
                      : "text-slate-700 focus:bg-[#1D429A]/5 focus:text-[#1D429A]"
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-md ${
                      pathname === "/user-dashboard/support"
                        ? "bg-white/20"
                        : "bg-slate-100"
                    }`}
                  >
                    <Headphones
                      className={`w-4 h-4 ${
                        pathname === "/user-dashboard/support"
                          ? "text-white"
                          : "text-[#1D429A]"
                      }`}
                    />
                  </div>
                  <span>24/7 Support</span>
                </DropdownMenuItem>
              </Link>
            </div>

            <DropdownMenuSeparator className="bg-slate-100" />

            <Link href="/auth-page/login">
              <DropdownMenuItem className="cursor-pointer mt-1 flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-red-600 focus:bg-red-50 focus:text-red-700 transition-colors rounded-md">
                <div className="p-1.5 bg-red-50 rounded-md">
                  <LogOut className="w-4 h-4" />
                </div>
                <span>Logout Account</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;