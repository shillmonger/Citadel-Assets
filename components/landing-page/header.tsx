"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: "Who We Are", href: "/landing-page/who-we-are" },
  { name: "What We Do", href: "/landing-page/what-we-do" },
  { name: "News & Insights", href: "/landing-page/news-insights" },
  { name: "Careers", href: "/landing-page/careers" },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white px-4 lg:px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo Logic: Swaps based on screen size */}
          <div className="flex-shrink-0 cursor-pointer">
            {/* Desktop Logo */}
            <img
              src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2022/12/CitSec-Logo.png"
              alt="Citadel Securities"
              className="hidden md:block h-6 w-auto object-contain"
            />
            {/* Mobile Logo (The Icon) */}
            <img
              src="https://i.postimg.cc/fTn5RHNM/mobile-logo.png"
              alt="Citadel Logo"
              className="block md:hidden h-6 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-[15px] font-bold cursor-pointer text-[#00205B] transition-colors hover:text-blue-700 relative`}
              >
                {item.name}
                {pathname === item.href && (
                  <span className="absolute bottom-[-2px] left-0 right-0 h-[1px] bg-[#00205B]"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-[14px] cursor-pointer font-semibold text-[#00205B] hover:opacity-70 transition-opacity px-4 py-2">
              Sign In
            </button>
            <button className="bg-[#00205B] cursor-pointer text-white text-[14px] font-semibold px-6 py-2 rounded-sm hover:bg-blue-900 transition-colors">
              Sign Up
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div
            className="md:hidden cursor-pointer text-[#00205B]"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={30} />
          </div>
        </div>
      </header>

      {/* Mobile Slide Menu - 100% Width */}
      <div
        className={`fixed inset-0 z-[100] bg-white transform transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-90">
            <img
              src="https://i.postimg.cc/fTn5RHNM/mobile-logo.png"
              className="h-5"
              alt="Logo"
            />
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 cursor-pointer text-[#00205B]"
            >
              <X size={30} />
            </button>
          </div>

          {/* Mobile Links */}
          <nav className="flex flex-col space-y-8 p-8 mt-4">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-lg font-bold text-[#00205B] cursor-pointer transition-transform active:scale-95 relative`}
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
                {pathname === item.href && (
                  <span className="absolute bottom-[-2px] left-0 right-0 h-[1px] bg-[#00205B]"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Auth Buttons - Pushed to the bottom */}
          <div className="mt-auto p-8 flex flex-col gap-4 bg-gray-50/50">
            <button className="w-full border-2 border-[#00205B] text-[#00205B] rounded-lg py-3 cursor-pointer font-bold active:bg-gray-100 transition">
              Sign In
            </button>

            <button className="w-full bg-[#00205B] text-white py-4 rounded-lg cursor-pointer font-bold active:bg-blue-900 transition shadow-lg">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
