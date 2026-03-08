"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Download, History, Sprout, User } from "lucide-react";

export default function UserNav() {
  const pathname = usePathname();
  
  // Matching the main sidebar links for consistency
  const navItems = [
    { name: "Home", href: "/user-dashboard/dashboard", icon: Home },
    { name: "Deposit", href: "/user-dashboard/deposit", icon: Download },
    { name: "History", href: "/user-dashboard/profit-history", icon: History },
    { name: "Plans", href: "/user-dashboard/investment-plans", icon: Sprout },
    { name: "Profile", href: "/user-dashboard/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center bg-white/95 backdrop-blur-xl py-3 rounded-t-[2rem] border-t border-gray-100 shadow-[0_-10px_40px_-15px_rgba(29,66,154,0.2)] lg:hidden">
      {navItems.map(({ name, href, icon: Icon }) => {
        const isActive = pathname === href;
        
        return (
          <Link
            key={name}
            href={href}
            className={`flex flex-col items-center transition-all duration-300 cursor-pointer ${
              isActive ? "scale-105" : "hover:scale-105"
            }`}
          >
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-2xl mb-1.5 transition-all duration-300 ${
                isActive
                  ? "bg-[#1D429A] text-white shadow-lg shadow-blue-200"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive ? "scale-110" : "group-hover:text-[#1D429A]"
                }`}
              />
            </div>

            <span
              className={`text-[9px] font-bold tracking-wider uppercase ${
                isActive ? "text-[#1D429A] opacity-100" : "text-gray-400 opacity-60"
              }`}
            >
              {name}
            </span>

            {/* Active Indicator Dot */}
            {isActive && (
              <div className="w-1 h-1 bg-[#76EAD7] rounded-full mt-1 animate-pulse" />
            )}
          </Link>
        );
      })}
    </nav>
  );
}