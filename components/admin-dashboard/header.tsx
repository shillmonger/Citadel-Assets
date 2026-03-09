"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, ChevronDown, LogOut, User, Settings } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function AdminHeader({ setSidebarOpen }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Static front-end data
  const user = {
    firstName: "Evelyn",
    fullName: "Evelyn W.",
    email: "evelyn@snowtrade.com",
    initial: "E"
  };

  return (
    <header className="sticky top-0 z-20 flex items-center h-20 px-6 bg-white border-b border-gray-100 shadow-sm transition-colors">
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

        {/* User Controls */}
        <div className="flex items-center gap-4 ml-auto">
          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center space-x-3 focus:outline-none cursor-pointer group"
            >
              {/* Profile Avatar */}
              <div className="w-10 h-10 bg-[#1D429A] border-2 border-[#76EAD7]/20 rounded-full flex items-center justify-center text-[#76EAD7] font-bold shadow-sm transition-transform group-hover:scale-105">
                {user.initial}
              </div>
              
              <div className="hidden sm:flex flex-col items-start leading-tight">
                <span className="text-sm font-bold text-[#1D429A]">
                  {user.firstName}
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                  Admin
                </span>
              </div>
              
              <ChevronDown className={`hidden sm:block h-4 w-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-60 bg-white border border-gray-100 rounded-xl shadow-xl z-30 overflow-hidden animate-in fade-in zoom-in duration-150">
                <div className="px-5 py-4 bg-gray-50/50 border-b border-gray-50">
                  <p className="text-sm font-bold text-[#1D429A]">
                    {user.fullName}
                  </p>
                  <p className="text-[11px] text-gray-400 font-medium truncate">{user.email}</p>
                </div>

                <div className="p-2">
                  <Link href="/admin-dashboard/profile">
                    <button className="flex items-center w-full px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:bg-gray-50 hover:text-[#1D429A] rounded-lg transition-colors">
                      <User className="h-4 w-4 mr-3 text-[#76EAD7]" /> Profile
                    </button>
                  </Link>

                  <Link href="/admin-dashboard/settings">
                    <button className="flex items-center w-full px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-500 hover:bg-gray-50 hover:text-[#1D429A] rounded-lg transition-colors">
                      <Settings className="h-4 w-4 mr-3 text-[#76EAD7]" /> Settings
                    </button>
                  </Link>

                  <div className="my-1 border-t border-gray-50" />

                  <button className="flex items-center w-full px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-red-400 hover:bg-red-50 transition-colors rounded-lg cursor-pointer">
                    <LogOut className="h-4 w-4 mr-3" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}