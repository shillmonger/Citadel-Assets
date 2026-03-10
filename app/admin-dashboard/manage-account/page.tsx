"use client";

import React, { useState, useEffect } from "react";
import { Save, Search, Filter, Mail, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import AdminHeader from "@/components/admin-dashboard/header";
import AdminSidebar from "@/components/admin-dashboard/sidebar";
import AdminNav from "@/components/admin-dashboard/navbar";

interface User {
  id: string;
  name: string;
  email: string;
  status: string;
  balance: string;
  profit: string;
  username: string;
  country: string;
  phoneNumber: string;
  welcomeBonus: number;
  referralBonus: number;
  totalWithdrawal: number;
  totalDeposit: number;
  roles: string[];
  withdrawalAddresses: any;
  createdAt: Date;
  updatedAt: Date;
}

export default function AdminManageUsersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users from database
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/users');
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.users);
      } else {
        toast.error(data.error || 'Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (
    id: string,
    field: "balance" | "profit",
    value: string
  ) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, [field]: value } : user
      )
    );
  };

  const handleSave = async (user: User) => {
    try {
      setSaving(user.id);
      
      const response = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          accountBalance: parseFloat(user.balance) || 0,
          totalProfit: parseFloat(user.profit) || 0,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        toast.success(`${user.name}'s account updated successfully`);
        // Refresh users to get latest data
        await fetchUsers();
      } else {
        toast.error(data.error || 'Failed to update user');
        // Revert changes on error
        await fetchUsers();
      }
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
      // Revert changes on error
      await fetchUsers();
    } finally {
      setSaving(null);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9F9FB]">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24">
          {/* Page Header */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 bg-[#76EAD7] rounded-full"></div>
                <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">
                  Account Control
                </h3>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-[#1D429A]">
                Manage Users
              </h1>
            </div>

            {/* Search and Refresh */}
            <div className="flex items-center gap-2">
              <button
                onClick={fetchUsers}
                disabled={loading}
                className="p-2 bg-white border border-gray-100 rounded-xl text-[#1D429A] shadow-sm hover:bg-gray-50 disabled:opacity-50"
                title="Refresh users"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              </button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search user..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white border border-gray-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#76EAD7]/50 w-full md:w-64 shadow-sm"
                />
              </div>

              <button className="p-2 bg-white border border-gray-100 rounded-xl text-[#1D429A] shadow-sm">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[700px]">
                <thead className="bg-[#F8FAFC] text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Account Balance</th>
                    <th className="px-6 py-4">Total Profit</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50 text-sm">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                        <div className="flex items-center justify-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Loading users...
                        </div>
                      </td>
                    </tr>
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-center text-gray-400">
                        {searchTerm ? 'No users found matching your search.' : 'No users found.'}
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50/50">
                        {/* User */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#1D429A]/10 flex items-center justify-center text-[#1D429A] font-bold text-xs">
                              {user.name.charAt(0)}
                            </div>

                            <div className="flex flex-col">
                              <span className="font-bold text-[#1D429A]">
                                {user.name}
                              </span>

                              <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                              user.status === "Active"
                                ? "bg-teal-50 text-teal-600 border border-teal-100"
                                : "bg-red-50 text-red-600 border border-red-100"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>

                        {/* Balance */}
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={user.balance}
                            onChange={(e) =>
                              handleChange(user.id, "balance", e.target.value)
                            }
                            className="w-32 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-[#1D429A] focus:ring-2 focus:ring-[#76EAD7]/50"
                            min="0"
                            step="0.01"
                          />
                        </td>

                        {/* Profit */}
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={user.profit}
                            onChange={(e) =>
                              handleChange(user.id, "profit", e.target.value)
                            }
                            className="w-32 bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-[#1D429A] focus:ring-2 focus:ring-[#76EAD7]/50"
                            min="0"
                            step="0.01"
                          />
                        </td>

                        {/* Save */}
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleSave(user)}
                            disabled={saving === user.id}
                            className="inline-flex items-center cursor-pointer gap-1 px-3 py-3 text-xs font-bold bg-[#1D429A] text-white rounded-lg hover:bg-[#162f73] transition disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {saving === user.id ? (
                              <>
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <Save className="w-4 h-4" />
                                Save
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
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