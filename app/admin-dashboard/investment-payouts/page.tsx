"use client";

import React, { useState } from "react";
import { 
  Check, 
  X, 
  Clock, 
  Wallet, 
  Filter, 
  Search, 
  History,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { toast, Toaster } from "sonner"; // <-- Sonner import
import AdminHeader from "@/components/admin-dashboard/header";
import AdminSidebar from "@/components/admin-dashboard/sidebar";
import AdminNav from "@/components/admin-dashboard/navbar";

export default function AdminPayoutsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock Data with State Management
  const [payouts, setPayouts] = useState([
    { id: "1", name: "John Doe", email: "john@example.com", investment: "$5,000", wallet: "BTC...4x92", status: "Pending", date: "Mar 08, 2026" },
    { id: "2", name: "Sarah Smith", email: "sarah@design.co", investment: "$1,200", wallet: "ETH...2p11", status: "Paid", date: "Mar 07, 2026" },
    { id: "3", name: "Mike Ross", email: "mike@legal.com", investment: "$10,000", wallet: "USDT...9l00", status: "Rejected", date: "Mar 05, 2026" },
  ]);

  const handleAction = (id: string, newStatus: "Paid" | "Rejected", name: string) => {
    setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    if (newStatus === "Paid") {
      toast.success(`${name}'s payout marked as Paid`);
    } else {
      toast.error(`${name}'s payout marked as Rejected`);
    }
  };

  const stats = [
    { label: "Total Records", value: "1,240", icon: History, color: "text-[#1D429A]", bg: "bg-blue-50" },
    { label: "Pending", value: "18", icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Paid", value: "1,192", icon: CheckCircle2, color: "text-teal-600", bg: "bg-teal-50" },
    { label: "Rejected", value: "30", icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9F9FB]">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />


      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24">
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 bg-[#76EAD7] rounded-full"></div>
                <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">Payout Requests</h3>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1D429A]">Investment Payouts</h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search investor..." className="bg-white border border-gray-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#76EAD7]/50 w-full md:w-64" />
              </div>
              <button className="p-2 bg-white border border-gray-100 rounded-xl text-[#1D429A]"><Filter className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${stat.bg}`}><stat.icon className={`w-5 h-5 ${stat.color}`} /></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
                </div>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl font-bold text-[#1D429A]">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Payouts Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#F8FAFC] text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                  <tr>
                    <th className="px-6 py-4">Investor</th>
                    <th className="px-6 py-4">Investment</th>
                    <th className="px-6 py-4 hidden md:table-cell">Wallet</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 hidden sm:table-cell">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {payouts.map((payout) => (
                    <tr key={payout.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#1D429A]">{payout.name}</span>
                          <span className="text-[11px] text-gray-400">{payout.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-teal-600">{payout.investment}</span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Wallet className="w-3 h-3" />
                          <span className="text-xs font-mono">{payout.wallet}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`flex items-center w-fit px-3 py-1 text-[10px] font-bold uppercase rounded-full border ${
                          payout.status === 'Paid' ? 'bg-teal-50 text-teal-600 border-teal-100' : 
                          payout.status === 'Rejected' ? 'bg-red-50 text-red-600 border-red-100' : 
                          'bg-blue-50 text-[#1D429A] border-blue-100'
                        }`}>
                          {payout.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="text-xs text-gray-400 font-medium">{payout.date}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          {payout.status === "Pending" ? (
                            <>
                              <button 
                                onClick={() => handleAction(payout.id, 'Paid', payout.name)}
                                className="p-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-600 hover:text-white transition-all shadow-sm"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleAction(payout.id, 'Rejected', payout.name)}
                                className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter italic px-2">Completed</span>
                          )}
                        </div>
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