"use client";

import React, { useState } from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex-shrink-0">
          <img 
            src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2022/12/CitSec-Logo.png" 
            alt="Citadel Securities" 
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-10">
          {['Who We Are', 'What We Do', 'News & Insights', 'Careers'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-[15px] font-medium text-[#00205B] transition-colors hover:text-blue-700"
              style={{ fontFamily: 'serif' }} // Emulating the brand font
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Action Buttons (Replaced Translator) */}
        <div className="flex items-center space-x-4">
          <button className="text-[14px] font-semibold text-[#00205B] hover:opacity-70 transition-opacity px-4 py-2">
            Sign In
          </button>
          <button className="bg-[#00205B] text-white text-[14px] font-semibold px-6 py-2 rounded-sm hover:bg-blue-900 transition-colors">
            Sign Up
          </button>
          
          {/* Optional: Mobile Menu Toggle could go here */}
        </div>

      </div>
    </header>
  );
};

export default Header;