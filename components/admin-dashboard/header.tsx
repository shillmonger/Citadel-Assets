"use client";

import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function AdminHeader({ setSidebarOpen }: HeaderProps) {
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

  // Generate user initials from full name
  const getUserInitials = (fullName: string) => {
    if (!fullName) return 'U';
    return fullName.split(' ').map(n => n[0]).join('.').toUpperCase();
  };

  return (
    <header className="sticky top-0 z-20 flex items-center h-16 px-6 bg-white border-b border-gray-100 shadow-sm transition-colors">
      <div className="flex w-full items-center justify-between">
        {/* Mobile Sidebar Toggle */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-50 cursor-pointer"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6 text-[#1D429A]" />
        </button>

        {/* Dashboard Title */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:block w-1 h-5 bg-[#76EAD7] rounded-full"></div>
          <h1 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest hidden sm:block">
            Management Portal
          </h1>
        </div>

        {/* User Info Section (No Dropdown) */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex flex-col items-end leading-tight text-right">
              <span className="text-sm font-bold text-[#1D429A]">
                {isLoading ? 'Loading...' : (userData?.fullName || 'Admin User')}
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                {isLoading ? 'Loading...' : (userData?.email || 'admin@example.com')}
              </span>
            </div>

            {/* Profile Avatar */}
            <div className="w-10 h-10 bg-[#1D429A] border-2 border-[#76EAD7]/20 rounded-full flex items-center justify-center text-[#76EAD7] font-bold shadow-sm">
              {isLoading ? 'U' : getUserInitials(userData?.fullName || 'User')}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
