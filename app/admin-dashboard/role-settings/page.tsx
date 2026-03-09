"use client";

import React, { useState } from "react";
import { Users, UserCheck, UserMinus, Mail, MoreVertical, ChevronDown } from "lucide-react";
import { toast, Toaster } from "sonner";
import AdminHeader from "@/components/admin-dashboard/header";
import AdminSidebar from "@/components/admin-dashboard/sidebar";
import AdminNav from "@/components/admin-dashboard/navbar";

// Shadcn UI Imports
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminRolesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock users
  const [users, setUsers] = useState([
    { id: "1", name: "Alex Johnson", email: "alex@example.com", status: "Active", role: "Admin" },
    { id: "2", name: "Maria Garcia", email: "m.garcia@work.io", status: "Blocked", role: "User" },
    { id: "3", name: "James Wilson", email: "j.wilson@tech.com", status: "Active", role: "User" },
    { id: "4", name: "Sarah Chen", email: "schen@global.net", status: "Active", role: "Admin" },
  ]);

  const changeRole = (id: string, newRole: "User" | "Admin") => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
    toast.success(`Role updated to ${newRole}`);
  };

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
                <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">Permissions</h3>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1D429A]">Role Management</h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search by name/email" 
                  className="bg-white border border-gray-100 rounded-xl py-2 pl-4 pr-4 text-sm focus:ring-2 focus:ring-[#76EAD7]/50 w-full md:w-64 shadow-sm" 
                />
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#F8FAFC] text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {users.map(user => (
                    <tr key={user.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#1D429A]/10 flex items-center justify-center text-[#1D429A] font-bold text-xs">
                            {user.name.charAt(0)}
                          </div>
                          <span className="font-bold text-[#1D429A]">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {user.email}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          user.status === 'Active' ? 'bg-teal-50 text-teal-600 border border-teal-100' : 'bg-red-50 text-red-600 border border-red-100'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {/* Shadcn Role Dropdown */}
                        <DropdownMenu>
                          <DropdownMenuTrigger className="flex items-center gap-2 bg-white border border-gray-100 rounded-lg px-3 py-1.5 text-xs font-semibold text-[#1D429A] hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#76EAD7]/50 shadow-sm">
                            {user.role}
                            <ChevronDown className="w-3 h-3 text-gray-400" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="bg-white border-gray-100 rounded-xl shadow-xl">
                            <DropdownMenuItem 
                              className="text-xs font-medium py-2 px-4 cursor-pointer focus:bg-teal-50 focus:text-teal-600"
                              onClick={() => changeRole(user.id, "User")}
                            >
                              User
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-xs font-medium py-2 px-4 cursor-pointer focus:bg-teal-50 focus:text-teal-600"
                              onClick={() => changeRole(user.id, "Admin")}
                            >
                              Admin
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            onClick={() => toast.info(`No further actions for ${user.name}`)}
                          >
                            <MoreVertical className="w-4 h-4" />
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