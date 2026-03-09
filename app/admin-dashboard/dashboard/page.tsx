"use client";

import React, { useState } from "react";
import { 
  Users, 
  UserMinus, 
  UserCheck, 
  TrendingUp, 
  Clock, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Layers,
  Search,
  Filter,
  DollarSign
} from "lucide-react";
import AdminHeader from "@/components/admin-dashboard/header";
import AdminSidebar from "@/components/admin-dashboard/sidebar";
import AdminNav from "@/components/admin-dashboard/navbar";

export default function AdminDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { label: "Total Users", value: "12,842", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Users", value: "8,210", icon: UserCheck, color: "text-teal-600", bg: "bg-teal-50" },
    { label: "Blocked Users", value: "142", icon: UserMinus, color: "text-red-600", bg: "bg-red-50" },
    { label: "Investment Plans", value: "12", icon: Layers, color: "text-purple-600", bg: "bg-purple-50" },
    { label: "Total Deposit", value: "$420,500", icon: TrendingUp, color: "text-teal-600", bg: "bg-teal-50" },
    { label: "Pending Deposit", value: "$12,300", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
    { label: "Total Withdrawal", value: "$180,200", icon: ArrowDownLeft, color: "text-[#1D429A]", bg: "bg-blue-50" },
    { label: "Pending Withdrawal", value: "$5,400", icon: ArrowUpRight, color: "text-red-500", bg: "bg-red-50" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9F9FB]">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1 h-4 bg-[#76EAD7] rounded-full"></div>
              <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">Platform Overview</h3>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#1D429A]">Dashboard</h1>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Live</span>
                </div>
                <div>
                  <h4 className="text-gray-500 text-xs font-medium mb-1">{stat.label}</h4>
                  <p className="text-xl font-bold text-[#1D429A]">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Transactions Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <div>
                <h2 className="text-[#1D429A] font-bold text-sm uppercase tracking-wider">Recent Transactions</h2>
                <p className="text-xs text-gray-400 mt-1">Latest financial activities across the platform</p>
              </div>
              <button className="text-xs font-bold text-[#76EAD7] hover:text-[#1D429A] transition-colors">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#F8FAFC] text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                  <tr>
                    <th className="px-6 py-4">Transaction ID</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[1, 2, 3, 4].map((item) => (
                    <tr key={item} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-600">#TRX-9402{item}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {item % 2 === 0 ? (
                            <ArrowDownLeft className="w-3 h-3 text-teal-500" />
                          ) : (
                            <ArrowUpRight className="w-3 h-3 text-blue-500" />
                          )}
                          <span className="text-sm text-[#1D429A] font-semibold">
                            {item % 2 === 0 ? "Deposit" : "Withdrawal"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-[#1D429A]">
                        ${(Math.random() * 1000).toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-[10px] font-bold uppercase rounded-full bg-teal-50 text-teal-600 border border-teal-100">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        <AdminNav />
      </div>
    </div>
  );
}