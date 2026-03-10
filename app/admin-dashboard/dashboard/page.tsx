"use client";

import React, { useState, useEffect } from "react";
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

interface DashboardStats {
  label: string;
  value: string;
  icon: any;
  color: string;
  bg: string;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  status: string;
  user: string;
  email: string;
  paymentMethod: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const iconMap: { [key: string]: any } = {
    Users,
    UserCheck,
    UserMinus,
    Layers,
    TrendingUp,
    Clock,
    ArrowDownLeft,
    ArrowUpRight
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }

      const data = await response.json();
      
      if (data.success) {
        // Transform stats to include icon components
        const transformedStats = data.stats.map((stat: any) => ({
          ...stat,
          icon: iconMap[stat.icon] || Users
        }));
        
        setStats(transformedStats);
        setRecentTransactions(data.recentTransactions || []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set fallback data
      setStats([
        { label: "Total Users", value: "0", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Active Users", value: "0", icon: UserCheck, color: "text-teal-600", bg: "bg-teal-50" },
        { label: "Blocked Users", value: "0", icon: UserMinus, color: "text-red-600", bg: "bg-red-50" },
        { label: "Investment Plans", value: "0", icon: Layers, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Total Deposit", value: "$0", icon: TrendingUp, color: "text-teal-600", bg: "bg-teal-50" },
        { label: "Pending Deposit", value: "$0", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
        { label: "Total Withdrawal", value: "$0", icon: ArrowDownLeft, color: "text-[#1D429A]", bg: "bg-blue-50" },
        { label: "Pending Withdrawal", value: "$0", icon: ArrowUpRight, color: "text-red-500", bg: "bg-red-50" },
      ]);
    } finally {
      setLoading(false);
    }
  };

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
            {loading ? (
              [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div key={item} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-xl bg-gray-200 animate-pulse">
                      <div className="w-5 h-5 bg-gray-300 rounded"></div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Live</span>
                  </div>
                  <div>
                    <div className="h-3 bg-gray-200 rounded w-20 mb-2 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : (
              stats.map((stat, index) => (
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
              ))
            )}
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
                  {loading ? (
                    [1, 2, 3, 4].map((item) => (
                      <tr key={item} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                        </td>
                      </tr>
                    ))
                  ) : recentTransactions.length > 0 ? (
                    recentTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-600">#{transaction.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <ArrowDownLeft className="w-3 h-3 text-teal-500" />
                            <span className="text-sm text-[#1D429A] font-semibold">
                              {transaction.type}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-[#1D429A]">
                          ${transaction.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full border ${
                            transaction.status === 'Approved' 
                              ? 'bg-teal-50 text-teal-600 border-teal-100'
                              : transaction.status === 'Pending'
                              ? 'bg-orange-50 text-orange-600 border-orange-100'
                              : 'bg-red-50 text-red-600 border-red-100'
                          }`}>
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500 text-sm">
                        No recent transactions found
                      </td>
                    </tr>
                  )}
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