"use client";

import React, { useState } from "react";
import {
  User,
  CreditCard,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import Header from "@/components/user-dashboard/header";
import Sidebar from "@/components/user-dashboard/sidebar";
import Navbar from "@/components/user-dashboard/navbar";

const AccountSettings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const tabs = [
    { id: "personal", label: "Personal Settings", icon: <User className="w-3.5 h-3.5" /> },
    { id: "withdrawal", label: "Withdrawal Settings", icon: <CreditCard className="w-3.5 h-3.5" /> },
    { id: "password", label: "Password/Security", icon: <Lock className="w-3.5 h-3.5" /> },
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
            Account <span className="font-bold">Settings</span>
          </h2>

          {/* Settings Card */}
          <section className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Tabs */}
            <div className="flex flex-wrap gap-1 p-4 md:p-6 border-b border-gray-100">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all
                    ${
                      activeTab === tab.id
                        ? "bg-[#1D429A] text-white shadow-md"
                        : "text-gray-400 hover:text-[#1D429A] hover:bg-blue-50"
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-8">

              {/* ====================== PERSONAL SETTINGS ====================== */}
              {activeTab === "personal" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-4 bg-[#76EAD7] rounded-full"></div>
                    <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">
                      Personal Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter full name"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A] focus:ring-1 focus:ring-[#1D429A]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                        Username
                      </label>
                      <input
                        type="text"
                        placeholder="Enter username"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A] focus:ring-1 focus:ring-[#1D429A]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="evelyn@example.com"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A] focus:ring-1 focus:ring-[#1D429A]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+234 000 000 0000"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A] focus:ring-1 focus:ring-[#1D429A]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                        Country
                      </label>
                      <input
                        type="tel"
                        placeholder="country"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A] focus:ring-1 focus:ring-[#1D429A]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center md:justify-start pt-4">
                    <button className="cursor-pointer bg-[#1D429A] text-white px-12 py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#16357a] transition-all">
                      Save Changes
                    </button>
                  </div>
                </div>
              )}

              {/* ====================== WITHDRAWAL SETTINGS ====================== */}
              {activeTab === "withdrawal" && (
                <div className="space-y-8">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-4 bg-[#76EAD7] rounded-full"></div>
                    <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">
                      Withdrawal Settings
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Crypto */}
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Tron</label>
                      <input type="text" placeholder="Enter bank name" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A]" />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Doge</label>
                      <input type="text" placeholder="Enter Account Number" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A]" />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Swift Code</label>
                      <input type="text" placeholder="Enter Swift Code" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A]" />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Bitcoin</label>
                      <input type="text" placeholder="Enter Bitcoin Address" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A]" />
                      <p className="text-[10px] text-gray-400 mt-1">Enter your Bitcoin Address that will be used to withdraw your funds</p>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Ethereum</label>
                      <input type="text" placeholder="Enter Ethereum Address" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A]" />
                      <p className="text-[10px] text-gray-400 mt-1">Enter your Ethereum Address that will be used to withdraw your funds</p>
                    </div>

                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Litecoin</label>
                      <input type="text" placeholder="Enter Litecoin Address" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A]" />
                      <p className="text-[10px] text-gray-400 mt-1">Enter your Litecoin Address that will be used to withdraw your funds</p>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">BNB</label>
                      <input type="text" placeholder="Enter BNB Address" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A]" />
                      <p className="text-[10px] text-gray-400 mt-1">Enter your BNB Address that will be used to withdraw your funds</p>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">USDT</label>
                      <input type="text" placeholder="Enter USDT Address" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A]" />
                      <p className="text-[10px] text-gray-400 mt-1">Enter your USDT Address that will be used to withdraw your funds</p>
                    </div>
                  </div>

                  <div className="flex justify-center md:justify-start">
                    <button className="cursor-pointer bg-[#1D429A] text-white px-12 py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#16357a] transition-all">
                      Save Address
                    </button>
                  </div>
                </div>
              )}

              {/* ====================== PASSWORD / SECURITY ====================== */}
              {activeTab === "password" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-4 bg-[#76EAD7] rounded-full"></div>
                    <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">
                      Change Password
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Old Password */}
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Old Password</label>
                      <div className="relative">
                        <input
                          type={showOld ? "text" : "password"}
                          placeholder="Enter old password"
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A] pr-10"
                        />
                        <button
                          onClick={() => setShowOld(!showOld)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1D429A]"
                        >
                          {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">New Password</label>
                      <div className="relative">
                        <input
                          type={showNew ? "text" : "password"}
                          placeholder="Enter new password"
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A] pr-10"
                        />
                        <button
                          onClick={() => setShowNew(!showNew)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1D429A]"
                        >
                          {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showConfirm ? "text" : "password"}
                          placeholder="Confirm new password"
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A] pr-10"
                        />
                        <button
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1D429A]"
                        >
                          {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center md:justify-start pt-2">
                    <button className="cursor-pointer bg-[#1D429A] text-white px-12 py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#16357a] transition-all">
                      Update Password
                    </button>
                  </div>
                </div>
              )}

            </div>
          </section>
        </div>
      </main>

      <Navbar />
    </div>
  );
};

export default AccountSettings;