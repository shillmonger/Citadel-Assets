"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ChevronDown, Database, Wallet } from "lucide-react";
import Header from "@/components/user-dashboard/header";
import Sidebar from "@/components/user-dashboard/sidebar";
import Navbar from "@/components/user-dashboard/navbar";

const WithdrawalPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Removed Solana as requested
  const withdrawalMethods = [
    { id: "bitcoin", name: "Bitcoin", min: "$4", max: "$1,000,000", charge: "0%", duration: "After Block Confirmation" },
    { id: "ethereum", name: "Ethereum", min: "$4", max: "$1,000,000", charge: "2%", duration: "After Block Confirmation" },
    { id: "usdt-trc20", name: "Usdt trc20", min: "$10", max: "$1,000,000", charge: "$2", duration: "After Block Confirmation" },
    { id: "litecoin", name: "Litecoin", min: "$4", max: "$10,000", charge: "$2", duration: "Instant" },
    { id: "doge", name: "DOGE", min: "$4", max: "$1,000,000", charge: "1%", duration: "After Block Confirmation" },
    { id: "bnb", name: "BNB Smart Chain", min: "$4", max: "$1,000,000", charge: "1%", duration: "After Block Confirmation" },
    { id: "tron", name: "TRON", min: "$5", max: "$500,000", charge: "0.5%", duration: "Instant" },
  ];

  const illustrationUrl = "https://i.postimg.cc/tJbTHjKq/transfer.png";

  return (
    <div className="flex min-h-screen bg-[#F9F9FB] font-sans relative overflow-x-hidden">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 w-full flex flex-col min-w-0 mb-32 lg:mb-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="p-4 md:p-8 w-full max-w-full lg:max-w-[1200px] mx-auto">
          
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1 h-5 bg-[#76EAD7] rounded-full flex-shrink-0"></div>
            <h2 className="text-[#1D429A] text-lg md:text-3xl font-light leading-tight">
              Place a<span className="font-bold"> withdrawal request</span>
            </h2>
          </div>

          {/* Withdrawal Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {withdrawalMethods.map((method) => (
              <div 
                key={method.id} 
                className="bg-white rounded-2xl p-6 flex flex-col items-center shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all duration-300"
              >
                {/* Method Label Badge - Using Dashboard Blue */}
                <div className="bg-[#1D429A] text-white px-4 py-1.5 rounded-md text-[10px] font-bold uppercase mb-6 shadow-sm">
                  {method.name}
                </div>

                {/* SVG Illustration wrapper */}
                <div className="mb-6 cursor-pointer bg-gray-50 p-4 rounded-full border border-gray-100 group-hover:scale-110 transition-transform">
                  <img 
                    src={illustrationUrl} 
                    alt="Withdrawal illustration" 
                    className="w-20 h-20"
                  />
                </div>

                {/* Details Section - Using Dashboard Blue text */}
                <div className="w-full space-y-4 text-center mb-8">
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1">Min amount</p>
                    <p className="text-xl font-bold text-[#1D429A]">{method.min}</p>
                  </div>
                  
                  <div>
                    <p className="text-[10px] uppercase text-gray-400 font-bold tracking-wider mb-1">Max amount</p>
                    <p className="text-xl font-bold text-[#1D429A]">{method.max}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-t border-gray-50 pt-4">
                    <div>
                      <p className="text-[9px] uppercase text-gray-400 font-bold">Charges</p>
                      <p className="text-sm font-bold text-[#1D429A]">{method.charge}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase text-gray-400 font-bold">Duration</p>
                      <p className="text-[10px] font-bold leading-tight text-[#1D429A]">{method.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Request Button - Themed to match your dashboard primary color */}
                <Link 
                  href={`/user-dashboard/withdraw/${method.id}`}
                  className="w-full"
                >
                  <button className="w-full bg-[#1D429A] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#16357a] transition-all cursor-pointer shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2">
                    <span className="text-lg">+</span> Request withdrawal
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Navbar />
    </div>
  );
};

export default WithdrawalPage;