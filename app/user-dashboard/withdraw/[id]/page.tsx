"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Mail, ChevronRight, Lock } from "lucide-react";
import Header from "@/components/user-dashboard/header";
import Sidebar from "@/components/user-dashboard/sidebar";
import Navbar from "@/components/user-dashboard/navbar";

const WithdrawalDetailsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const params = useParams();
  const methodId = params.id || "Usdt trc20"; 

  const displayName = typeof methodId === 'string' 
    ? methodId.charAt(0).toUpperCase() + methodId.slice(1).replace(/-/g, ' ') 
    : "Payment Method";

  return (
    <div className="flex min-h-screen bg-[#F9F9FB] font-sans relative overflow-x-hidden">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 w-full flex flex-col min-w-0 mb-32 lg:mb-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Reduced the max-width of the outer container slightly for a tighter feel on large screens */}
        <div className="p-4 md:p-8 w-full max-w-full lg:max-w-[900px] mx-auto">
          {/* Page Header */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1 h-5 bg-[#76EAD7] rounded-full flex-shrink-0"></div>
            <h2 className="text-[#1D429A] text-lg md:text-3xl font-light leading-tight">
              Withdrawal<span className="font-bold"> Details</span>
            </h2>
          </div>

          {/* Form Container: Reduced padding from p-12 to p-8 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8">
            {/* Removed max-w-2xl to prevent the form from being artificially narrow on wide screens */}
            <div className="w-full space-y-6">
              
              {/* Method Badge */}
              <div className="flex justify-start">
                <div className="flex items-center gap-3 bg-[#E8F8F5] border border-[#76EAD7]/30 rounded-full px-4 py-2">
                  <span className="bg-[#1D429A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Your payment method
                  </span>
                  <span className="text-[#1D429A] font-semibold text-sm flex items-center gap-1">
                    {displayName} <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <label className="text-[#1D429A] font-bold text-sm">Enter Amount to withdraw($)</label>
                <input 
                  type="number" 
                  placeholder="Enter Amount"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#76EAD7] transition-colors text-[#1D429A]"
                />
              </div>

              {/* OTP Section */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <label className="text-[#1D429A] font-bold text-sm">Enter OTP</label>
                  <button className="bg-[#1D429A] text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-[#16357a] transition-all cursor-pointer">
                    <Mail className="w-3 h-3" /> Request OTP
                  </button>
                </div>
                <input 
                  type="text" 
                  placeholder="Enter OTP"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#76EAD7] transition-colors text-[#1D429A]"
                />
                <p className="text-gray-400 text-[11px] italic">
                  OTP will be sent to your email when you request
                </p>
              </div>

              {/* Wallet Address Input */}
              <div className="space-y-2">
                <label className="text-[#1D429A] font-bold text-sm">Enter {displayName} Address</label>
                <input 
                  type="text" 
                  placeholder={`Enter ${displayName} Address`}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#76EAD7] transition-colors text-[#1D429A]"
                />
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  {displayName} is not a default withdrawal option in your account, please enter the correct wallet address to receive your funds.
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button className="w-full md:w-auto bg-[#1D429A] text-white px-12 py-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-900/10 hover:bg-[#16357a] transition-all cursor-pointer flex items-center justify-center gap-2">
                  Complete Request
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Navbar />
    </div>
  );
};

export default WithdrawalDetailsPage;