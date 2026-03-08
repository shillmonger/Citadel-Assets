"use client";

import React from "react";
import {
  Menu,
  Globe,
  ShieldCheck,
  User,
} from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
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
        {/* Title: hidden on mobile, visible on lg+ */}
        <h1 className="font-bold text-base md:text-lg tracking-tight truncate hidden lg:block">
           Citadel Assets Limited
        </h1>
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Globe */}
        <button className="cursor-pointer hover:text-[#76EAD7] transition-colors">
          <Globe className="w-5 h-5" />
        </button>

        {/* KYC */}
        <button className="cursor-pointer hover:text-[#76EAD7] transition-colors" title="KYC Verification">
          <ShieldCheck className="w-5 h-5" />
        </button>

        {/* User */}
        <button className="cursor-pointer flex items-center gap-2 bg-white/10 px-2.5 py-1.5 rounded-full hover:bg-white/20 transition-all border border-white/10">
          <div className="w-6 h-6 bg-[#76EAD7] rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-[#1D429A]" />
          </div>
          {/* Username hidden on mobile */}
          <span className="text-[10px] font-bold uppercase hidden lg:inline">Evelyn W</span>
        </button>
      </div>
    </header>
  );
};

export default Header;