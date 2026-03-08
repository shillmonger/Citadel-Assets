"use client";

import React, { useState } from "react";
import {
  Home,
  Download,
  History,
  ArrowRightLeft,
  ArrowUpCircle,
  User,
  LayoutGrid,
  Sprout,
  Users,
  Menu,
  Globe,
  Wallet,
  X,
  ShieldCheck,
} from "lucide-react";

const SnowTradeDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const summaryItems = [
    { label: "Account balance", value: "$0.00", icon: <Wallet className="w-5 h-5 text-white" /> },
    { label: "Bonus", value: "$0.00", icon: <History className="w-5 h-5 text-white" /> },
    { label: "Profit", value: "$0.00", icon: <History className="w-5 h-5 text-white" /> },
    { label: "Referral Bonus", value: "$0.00", icon: <Users className="w-5 h-5 text-white" /> },
    { label: "Total Deposit", value: "$0.00", icon: <Download className="w-5 h-5 text-white" /> },
    { label: "Total Withdrawal", value: "$0.00", icon: <ArrowUpCircle className="w-5 h-5 text-white" /> },
  ];

  const sidebarLinks = [
    { name: "Home", icon: <Home />, active: true },
    { name: "Deposit", icon: <Download /> },
    { name: "Profit History", icon: <History /> },
    { name: "Transactions", icon: <LayoutGrid /> },
    { name: "Withdraw", icon: <ArrowUpCircle /> },
    { name: "Withdraw Connect", icon: <ArrowRightLeft /> },
    { name: "Transfer funds", icon: <ArrowRightLeft /> },
    { name: "Profile", icon: <User /> },
    { name: "Investment Plans", icon: <Sprout /> },
    { name: "My Plans", icon: <Sprout /> },
    { name: "Referrals", icon: <Users /> },
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
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-100 flex flex-col py-6
          transform transition-transform duration-300 ease-in-out
          overflow-y-auto overscroll-contain
          w-full sm:w-80
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0 lg:w-64 lg:overflow-y-auto lg:flex-shrink-0
        `}
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Close button — mobile only */}
        <div className="flex justify-end w-full px-4 mb-2 lg:hidden">
          <button
            className="cursor-pointer text-gray-400 hover:text-gray-700 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* User profile */}
        <div className="flex flex-col items-center mb-8 px-4">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-2 border-2 border-[#76EAD7]">
            <User className="w-12 h-12 text-gray-300" />
          </div>
          <h2 className="font-bold text-gray-800 text-lg">Evelyn W</h2>
          <span className="text-xs text-[#76EAD7] flex items-center gap-1 font-semibold uppercase tracking-tighter mt-0.5">
            <span className="w-2 h-2 bg-[#76EAD7] rounded-full animate-pulse inline-block"></span> online
          </span>
          <div className="mt-3 bg-white border border-gray-100 rounded-full px-4 py-1 flex items-center gap-2 shadow-sm">
            <div className="bg-[#1D429A] p-1 rounded-full">
              <Wallet className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-bold text-[#1D429A]">$0.00</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="w-full px-4 grid grid-cols-2 gap-y-6 text-center">
          {sidebarLinks.map((link) => (
            <div
              key={link.name}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div
                className={`p-3 rounded-xl mb-1 transition-all duration-300 ${
                  link.active
                    ? "bg-[#1D429A] text-white shadow-lg shadow-blue-200"
                    : "text-gray-400 group-hover:text-[#1D429A] group-hover:bg-blue-50"
                }`}
              >
                {React.cloneElement(link.icon, { size: 20 })}
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-tight ${
                  link.active ? "text-[#1D429A]" : "text-gray-500"
                }`}
              >
                {link.name}
              </span>
            </div>
          ))}
        </nav>

        {/* Help Card */}
        <div className="mt-10 mx-4 p-5 rounded-2xl bg-[#1D429A] text-center relative overflow-hidden flex-shrink-0 mb-4">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#76EAD7] opacity-10 rounded-full -mr-8 -mt-8"></div>
          <h3 className="font-bold text-white mb-2 relative z-10">Need Help?</h3>
          <p className="text-[10px] text-blue-100 mb-4 relative z-10">
            Contact our 24/7 customer support center
          </p>
          <button className="cursor-pointer bg-[#76EAD7] text-[#1D429A] text-xs font-bold py-2.5 px-6 rounded-full w-full shadow-md relative z-10 hover:bg-white transition-colors">
            Contact Us
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col min-w-0">

        {/* Header */}
        <header className="bg-[#1D429A] px-4 py-3 flex justify-between items-center text-white sticky top-0 z-30 shadow-md">

          {/* Left: Hamburger (mobile) + Title (desktop only) */}
          <div className="flex items-center gap-3">
            <button
              className="cursor-pointer lg:hidden hover:text-[#76EAD7] transition-colors"
              onClick={() => setIsSidebarOpen(true)}
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

        {/* Page Content */}
        <div className="p-4 md:p-8 w-full max-w-full lg:max-w-[1400px] mx-auto">
          <h2 className="text-[#1D429A] text-xl md:text-3xl font-light mb-8">
            Welcome, <span className="font-bold">Evelyn W!</span>
          </h2>

          {/* Account Summary */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 md:p-6 mb-8 w-full">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-4 bg-[#76EAD7] rounded-full"></div>
              <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">Account Summary</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {summaryItems.map((item) => (
                <div
                  key={item.label}
                  className="cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center p-3 md:p-4 border border-gray-50 rounded-xl hover:border-[#76EAD7]/40 hover:bg-blue-50/30 transition-all duration-300 group"
                >
                  <div className="mb-2 md:mb-0">
                    <p className="text-gray-400 text-[9px] font-bold uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-lg md:text-xl font-bold text-[#1D429A]">{item.value}</p>
                  </div>
                  <div className="bg-[#1D429A] p-2 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Active Plans */}
          <section className="mb-8 w-full">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 bg-[#76EAD7] rounded-full"></div>
              <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">Active Plan(s) (0)</h3>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-10 md:p-16 flex flex-col items-center justify-center shadow-sm w-full">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Sprout className="w-8 h-8 text-gray-200" />
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
                <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">Recent transactions (0)</h3>
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
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-300 text-xs italic">
                        No transactions found in your history
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SnowTradeDashboard;