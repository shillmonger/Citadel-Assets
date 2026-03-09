"use client";

import React, { useState } from "react";
import { 
  Users, 
  UserCheck, 
  UserMinus, 
  Briefcase,
  Search,
  Filter,
  Trash2,
  Ban,
  MoreVertical,
  Mail
} from "lucide-react";
import { toast } from "sonner";

import AdminHeader from "@/components/admin-dashboard/header";
import AdminSidebar from "@/components/admin-dashboard/sidebar";
import AdminNav from "@/components/admin-dashboard/navbar";

export default function AdminUsersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    { label: "Total Users", value: "2,540", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Users", value: "2,105", icon: UserCheck, color: "text-teal-600", bg: "bg-teal-50" },
    { label: "Blocked Users", value: "32", icon: UserMinus, color: "text-red-600", bg: "bg-red-50" },
    { label: "Invested Users", value: "842", icon: Briefcase, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const users = [
    { id: "1", name: "Alex Johnson", email: "alex@example.com", joined: "Jan 12, 2024", status: "Active", investment: "$12,500" },
    { id: "2", name: "Maria Garcia", email: "m.garcia@work.io", joined: "Feb 05, 2024", status: "Blocked", investment: "$0.00" },
    { id: "3", name: "James Wilson", email: "j.wilson@tech.com", joined: "Mar 20, 2024", status: "Active", investment: "$5,200" },
    { id: "4", name: "Sarah Chen", email: "schen@global.net", joined: "Apr 02, 2024", status: "Active", investment: "$25,000" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9F9FB]">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24">
          {/* Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 bg-[#76EAD7] rounded-full"></div>
                <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">Community Control</h3>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1D429A]">User Management</h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search by name/email" className="bg-white border border-gray-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#76EAD7]/50 w-full md:w-64 shadow-sm" />
              </div>
              <button className="p-2 bg-white border border-gray-100 rounded-xl text-[#1D429A] shadow-sm"><Filter className="w-5 h-5" /></button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white p-4 md:p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="text-lg md:text-xl font-bold text-[#1D429A]">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* User Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#F8FAFC] text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4 hidden md:table-cell">Joined</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 hidden sm:table-cell">Investment</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {users.map((user) => (
                    <tr key={user.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1D429A]/10 flex items-center justify-center text-[#1D429A] font-bold text-xs">
                            {user.name.charAt(0)}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-[#1D429A]">{user.name}</span>
                            <span className="text-xs text-gray-400 flex items-center gap-1"><Mail className="w-3 h-3"/> {user.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell text-gray-500 font-medium">
                        {user.joined}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          user.status === 'Active' ? 'bg-teal-50 text-teal-600 border border-teal-100' : 'bg-red-50 text-red-600 border border-red-100'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell font-bold text-[#1D429A]">
                        {user.investment}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => toast.error(`User ${user.name} suspended`)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                            title="Suspend User"
                          >
                            <Ban className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => toast.error(`User ${user.name} deleted`)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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