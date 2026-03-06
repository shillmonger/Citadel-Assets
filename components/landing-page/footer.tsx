"use client";

import React from 'react';
import { Linkedin, Instagram, Youtube } from 'lucide-react';
import Link from 'next/link';
import Translate from "@/components/landing-page/translate";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#101030] text-white px-8 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Logo and Primary Links */}
        <div className="flex flex-col md:flex-row justify-between mb-20">
          <div className="mb-10 md:mb-0">
            {/* Using the logo - filtered to white via CSS for that look */}
            <img 
              src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2022/09/citadel-securities-logo-1@2x.png" 
              alt="Citadel Securities" 
              className="h-6 brightness-0 invert" 
            />

          </div>

          <div className="flex flex-col md:flex-row gap-12 md:gap-24">
            <div>
              <a href="#" className="hover:text-blue-400 transition-colors text-[15px]">Counterparty Login</a>
            </div>
            <nav className="flex flex-col gap-4">
              {[
                { name: 'Who We Are', href: '/landing-page/who-we-are' },
                { name: 'What We Do', href: '/landing-page/what-we-do' },
                { name: 'News & Insights', href: '/landing-page/news-insights' },
                { name: 'Careers', href: '/landing-page/careers' }
              ].map((link) => (
                <Link key={link.name} href={link.href} className="hover:text-blue-400 transition-colors text-[15px]">
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Middle Section: Legal and Socials */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-wrap gap-6 text-[13px] text-gray-300">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-white transition-colors">Notices</a>
            <a href="#" className="hover:text-white transition-colors">Disclosures</a>
          </div>

          <div className="text-[12px] text-gray-400 max-w-md md:text-center">
            Copyright © {currentYear} Citadel Enterprise Americas LLC or one of its affiliates. All rights reserved.
          </div>

          <div className="flex gap-4">
            {[Linkedin, Instagram, Youtube].map((Icon, index) => (
              <a 
                key={index} 
                href="#" 
                className="p-3 border border-gray-600 rounded-full hover:bg-gray-700 transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Section: Footnotes */}
        <div className="mt-12 text-[13px] text-gray-400">
          <button className="hover:text-white transition-colors">
            View footnotes for this page.
          </button>
        </div>

      </div>

      <Translate />
    </footer>
    
  );
};

export default Footer;