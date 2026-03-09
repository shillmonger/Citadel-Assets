"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DollarSign, History, Wallet } from "lucide-react";
import Header from "@/components/user-dashboard/header";
import Sidebar from "@/components/user-dashboard/sidebar";
import Navbar from "@/components/user-dashboard/navbar";

const DepositPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [amount, setAmount] = useState("100");
  const [paymentMethod, setPaymentMethod] = useState("DOGE");

  // Wallet addresses included in data but not rendered in the UI
  const paymentMethods = [
    { name: "Ripple", address: "rPVMhWB...your_address" },
    { name: "DOGE", address: "D866...your_address" },
    { name: "BNB Smart Chain", address: "0x123...your_address" },
    { name: "Usdt trc20", address: "TX...your_address" },
    { name: "Litecoin", address: "L...your_address" },
    { name: "Ethereum", address: "0xabc...your_address" },
    { name: "Bitcoin", address: "1...your_address" },
  ];

  return (
    <div className="flex min-h-screen bg-[#F9F9FB] font-sans relative overflow-x-hidden">
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col min-w-0 mb-30 md:mb-0">
        {/* Header */}
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Page Content */}
        <div className="p-4 md:p-8 w-full max-w-full lg:max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 mb-8 px-1 md:px-0">
            <div className="w-1 h-4 bg-[#76EAD7] rounded-full"></div>
            <h2 className="text-[#1D429A] text-xl md:text-3xl font-light">
              <span className="font-bold">Fund</span> your account balance
            </h2>
          </div>

          {/* Flex container for large screens: Content Left, Stats Right */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left: Payment Section (Flex-1 to grow) */}
            <div className="w-full lg:flex-1 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
              {/* Amount Input */}
              <div className="mb-10">
                <label className="text-[#1D429A] font-bold text-xs uppercase tracking-widest mb-3 block">
                  Enter Amount
                </label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-lg text-[#1D429A] text-lg focus:ring-1 focus:ring-[#76EAD7] focus:border-[#76EAD7] focus:outline-none placeholder:text-gray-300"
                  placeholder="100"
                />
              </div>

              {/* Payment Methods */}
              <div className="mb-10">
                <label className="text-[#1D429A] font-bold text-xs uppercase tracking-widest mb-4 block">
                  Choose Payment Method from the list below
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.name}
                      onClick={() => setPaymentMethod(method.name)}
                      className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${
                        paymentMethod === method.name
                          ? "bg-[#1D429A]/5 border-[#1D429A]"
                          : "bg-white border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <span className="text-[#1D429A] text-sm font-medium">
                        {method.name}
                      </span>
                      <input
                        type="checkbox"
                        checked={paymentMethod === method.name}
                        readOnly
                        className="form-checkbox h-5 w-5 rounded border-gray-300 text-[#1D429A] focus:ring-[#1D429A]/20 transition"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-center sm:justify-start">
  <Link href="/user-dashboard/deposit/id">
    <button className="cursor-pointer bg-[#1D429A] text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#16357a] transition-all flex items-center gap-3">
      <DollarSign className="w-5 h-5" />
      Proceed to Payment
    </button>
  </Link>
</div>
            </div>

            {/* Right: Total Deposit and History (Fixed width on large screens) */}
            <div className="w-full lg:w-[350px] space-y-4">
              {/* Total Deposit Card */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between gap-6">
                <div>
                  <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider mb-1">
                    Total Deposit
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-[#1D429A]">
                    $0.00
                  </p>
                </div>
                <div className="bg-[#1D429A] p-3 rounded-lg shadow-sm">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* History Card with Empty State */}
              <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider">
                    History
                  </p>
                  <button className="text-[#1D429A] text-[10px] font-bold flex items-center gap-1.5 hover:underline underline-offset-4">
                    <History className="w-4 h-4" /> View all
                  </button>
                </div>
                
                {/* Empty State */}
                <div className="flex flex-col items-center justify-center py-4 text-center">
                  <div className="bg-gray-50 p-4 rounded-full mb-3">
                    <Wallet className="w-8 h-8 text-gray-300" />
                  </div>
                  <p className="text-gray-400 text-xs italic font-medium">
                    No history yet
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Navbar />
    </div>
  );
};

export default DepositPage;