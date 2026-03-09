"use client";

import React, { useState } from "react";
import Link from "next/link"; // Added for the button wrapper
import {
  Wallet,
  History,
  Download,
  ArrowUpCircle,
  Users,
  LayoutGrid,
  Sprout,
} from "lucide-react";
import Header from "@/components/user-dashboard/header";
import Sidebar from "@/components/user-dashboard/sidebar";
import Navbar from "@/components/user-dashboard/navbar";

const SnowTradeDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ... (summaryItems array remains the same)

  return (
    <div className="flex min-h-screen bg-[#F9F9FB] font-sans relative overflow-x-hidden">
      {/* Sidebar Overlay and Sidebar components remain here... */}

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 w-full flex flex-col min-w-0 mb-30 md:mb-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="p-4 md:p-8 w-full max-w-full lg:max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 mb-6 md:mb-8">
            <div className="w-1 h-5 bg-[#76EAD7] rounded-full flex-shrink-0"></div>
            <h2 className="text-[#1D429A] text-lg md:text-3xl font-light leading-tight">
              Invesment <span className="font-bold">Overview</span>
            </h2>
          </div>

          <section className="mb-8 w-full">
            <div className="bg-[#1D429A] p-4 rounded-t-xl">
              <h3 className="text-white text-lg font-medium">
                My Investment plans (All)
              </h3>
            </div>
            
            <div className="bg-white rounded-b-xl border border-gray-100 p-12 md:p-20 flex flex-col items-center justify-center shadow-sm w-full">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <Sprout className="w-10 h-10 text-gray-300" />
              </div>

              <p className="text-gray-400 text-sm md:text-base mb-8 text-center max-w-md italic">
                You do not have an investment plan at the moment or no value match your query.
              </p>

              <Link href="/user-dashboard/investment-plans">
                <button className="cursor-pointer bg-[#1D429A] cursor-pointer text-white px-10 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#16357a] transition-all">
                  Buy a plan
                </button>
              </Link>
            </div>
          </section>

          {/* Recent Transactions Section remains here... */}
        </div>
      </main>

      <Navbar />
    </div>
  );
};

export default SnowTradeDashboard;