"use client";

import React, { useState } from "react";
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

  const summaryItems = [
    {
      label: "Account balance",
      value: "$0.00",
      icon: <Wallet className="w-5 h-5 text-white" />,
    },
    {
      label: "Welcome Bonus",
      value: "$0.00",
      icon: <History className="w-5 h-5 text-white" />,
    },
    {
      label: "Total Profit",
      value: "$0.00",
      icon: <History className="w-5 h-5 text-white" />,
    },
    {
      label: "Referral Bonus",
      value: "$0.00",
      icon: <Users className="w-5 h-5 text-white" />,
    },
    {
      label: "Total Deposit",
      value: "$0.00",
      icon: <Download className="w-5 h-5 text-white" />,
    },
    {
      label: "Total Withdrawal",
      value: "$0.00",
      icon: <ArrowUpCircle className="w-5 h-5 text-white" />,
    },
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
          <h2 className="text-[#1D429A] text-xl md:text-3xl font-light mb-8">
            Welcome, <span className="font-bold">Evelyn W!</span>
          </h2>

          {/* Account Summary */}
          <section className="w-full mb-8 md:bg-white md:rounded-xl md:shadow-sm md:border md:border-gray-100 md:p-6">
            <div className="flex items-center gap-2 mb-6 px-1 md:px-0">
              <div className="w-1 h-4 bg-[#76EAD7] rounded-full"></div>
              <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">
                Account Summary
              </h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {summaryItems.map((item) => (
                <div
                  key={item.label}
                  className="cursor-pointer flex flex-col md:flex-row items-center md:items-center justify-between
                  p-3 md:p-4 border border-gray-50 rounded-xl
                  shadow-md hover:shadow-sm"
                >
                  {/* Icon */}
                  <div className="bg-[#1D429A] p-3 rounded-lg shadow-sm mb-2 md:mb-0 md:order-2 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>

                  {/* Text */}
                  <div className="text-center md:text-left md:order-1">
                    <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-lg md:text-xl font-bold text-[#1D429A]">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Active Plans */}
          <section className="mb-8 w-full">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-[#76EAD7] rounded-full"></div>
              <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">
                Active Plan(s) (0)
              </h3>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-10 md:p-16 flex flex-col items-center justify-center shadow-sm w-full">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Sprout className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-400 text-sm mb-6 text-center max-w-xs">
                You do not have an active investment plan at the moment.
              </p>
              <button className="cursor-pointer bg-[#1D429A] text-white px-10 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#16357a] transition-all">
                Buy a plan
              </button>
            </div>
          </section>

          {/* Recent Transactions */}
          <section className="w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-[#76EAD7] rounded-full"></div>
                <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">
                  Recent transactions (0)
                </h3>
              </div>
              <button className="cursor-pointer text-[#1D429A] text-[10px] font-bold flex items-center gap-1 hover:underline underline-offset-4">
                <History className="w-3 h-3" /> View all
              </button>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm w-full">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead className="bg-[#F8FAFC] text-gray-400 text-[10px] uppercase tracking-tighter border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">Date</th>
                      <th className="px-6 py-4 text-left font-bold">Type</th>
                      <th className="px-6 py-4 text-left font-bold">Amount</th>
                      <th className="px-6 py-4 text-right font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-12 text-center text-gray-300 text-xs italic"
                      >
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Wallet className="w-10 h-10 text-gray-400" />
                          <p className="text-gray-400 text-sm mb-6 text-center max-w-xs">
                            No transactions found in your history.{" "}
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Navbar />
    </div>
  );
};

export default SnowTradeDashboard;
