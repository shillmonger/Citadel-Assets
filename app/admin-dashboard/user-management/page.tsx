"use client";

import React, { useState, useEffect } from "react";
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
  Mail,
  Loader2,
  DollarSign
} from "lucide-react";
import { toast, Toaster } from "sonner";

import AdminHeader from "@/components/admin-dashboard/header";
import AdminSidebar from "@/components/admin-dashboard/sidebar";
import AdminNav from "@/components/admin-dashboard/navbar";

// Types
interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  status: string;
  balance: string;
  profit: string;
  totalDeposit: number;
  totalWithdrawal: number;
  roles: string[];
  country: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminUsersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [stats, setStats] = useState([
    { label: "Total Users", value: "0", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Users", value: "0", icon: UserCheck, color: "text-teal-600", bg: "bg-teal-50" },
    { label: "Blocked Users", value: "0", icon: UserMinus, color: "text-red-600", bg: "bg-red-50" },
    { label: "Invested Users", value: "0", icon: Briefcase, color: "text-purple-600", bg: "bg-purple-50" },
  ]);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('auth-token') || 
                   document.cookie.split('; ').find(row => row.startsWith('auth-token='))?.split('=')[1];
      
      if (!token) {
        toast.error('Authentication required');
        return;
      }

      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const data = await response.json();
      const fetchedUsers = data.users || [];
      setUsers(fetchedUsers);
      
      // Calculate stats
      const activeUsers = fetchedUsers.filter((u: User) => u.status === 'Active').length;
      const blockedUsers = fetchedUsers.filter((u: User) => u.status === 'Blocked').length;
      const investedUsers = fetchedUsers.filter((u: User) => u.totalDeposit > 0).length;
      
      setStats([
        { label: "Total Users", value: fetchedUsers.length.toString(), icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Active Users", value: activeUsers.toString(), icon: UserCheck, color: "text-teal-600", bg: "bg-teal-50" },
        { label: "Blocked Users", value: blockedUsers.toString(), icon: UserMinus, color: "text-red-600", bg: "bg-red-50" },
        { label: "Invested Users", value: investedUsers.toString(), icon: Briefcase, color: "text-purple-600", bg: "bg-purple-50" },
      ]);
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

  // Suspend/unsuspend user
  const toggleUserStatus = async (userId: string, currentStatus: string) => {
    setUpdatingUserId(userId);
    
    try {
      const token = localStorage.getItem('auth-token') || 
                   document.cookie.split('; ').find(row => row.startsWith('auth-token='))?.split('=')[1];
      
      if (!token) {
        toast.error('Authentication required');
        return;
      }

      const newStatus = currentStatus === 'Active' ? false : true;
      
      const response = await fetch(`/api/admin/users/${userId}/suspend`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ isActive: newStatus })
      });

      if (!response.ok) {
        throw new Error('Failed to update user status');
      }

      const data = await response.json();
      
      // Update local state
      setUsers(prev => prev.map(u => 
        u.id === userId ? { ...u, status: data.user.status } : u
      ));
      
      toast.success(data.message);
      
      // Refresh stats
      fetchUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('Failed to update user status');
    } finally {
      setUpdatingUserId(null);
    }
  };

  // Delete user
  const deleteUser = async (userId: string, userName: string) => {
    if (!window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
      return;
    }

    setUpdatingUserId(userId);
    
    try {
      const token = localStorage.getItem('auth-token') || 
                   document.cookie.split('; ').find(row => row.startsWith('auth-token='))?.split('=')[1];
      
      if (!token) {
        toast.error('Authentication required');
        return;
      }

      const response = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      const data = await response.json();
      
      // Remove user from local state
      setUsers(prev => prev.filter(u => u.id !== userId));
      
      toast.success(data.message);
      
      // Refresh stats
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    } finally {
      setUpdatingUserId(null);
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format currency
  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(num);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
                <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">Community Control</h3>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1D429A]">User Management</h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search by name/email/username" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white border border-gray-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#76EAD7]/50 w-full md:w-64 shadow-sm" 
                />
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
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#1D429A]" />
                <span className="ml-2 text-gray-500">Loading users...</span>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <Users className="w-8 h-8 text-gray-300" />
                <span className="ml-2 text-gray-500">
                  {searchTerm ? 'No users found matching your search' : 'No users found'}
                </span>
              </div>
            ) : (
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
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#1D429A]/10 flex items-center justify-center text-[#1D429A] font-bold text-xs">
                              {user.name.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-bold text-[#1D429A]">{user.name}</span>
                              <span className="text-xs text-gray-400 flex items-center gap-1"><Mail className="w-3 h-3"/> {user.email}</span>
                              <span className="text-xs text-gray-500">@{user.username}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell text-gray-500 font-medium">
                          {formatDate(user.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            user.status === 'Active' ? 'bg-teal-50 text-teal-600 border border-teal-100' : 'bg-red-50 text-red-600 border border-red-100'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 hidden sm:table-cell font-bold text-[#1D429A]">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            {formatCurrency(user.totalDeposit)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => toggleUserStatus(user.id, user.status)}
                              disabled={updatingUserId === user.id}
                              className={`p-3 cursor-pointer rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                                user.status === 'Active' 
                                  ? 'bg-orange-100 text-orange-500 hover:bg-orange-50' 
                                  : 'bg-green-100 text-green-500 hover:bg-green-50'
                              }`}
                              title={user.status === 'Active' ? 'Suspend User' : 'Activate User'}
                            >
                              {updatingUserId === user.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Ban className="w-4 h-4" />
                              )}
                            </button>
                            <button 
                              onClick={() => deleteUser(user.id, user.name)}
                              disabled={updatingUserId === user.id}
                              className="p-3 bg-red-100 text-red-500 cursor-pointer hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
            )}
          </div>
        </main>

        <AdminNav />
      </div>
    </div>
  );
}