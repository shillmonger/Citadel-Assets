"use client";

import React, { useState, useEffect } from "react";
import { 
  Check, 
  X, 
  Clock, 
  Wallet, 
  Filter, 
  Search, 
  History,
  CheckCircle2,
  XCircle,
  DollarSign
} from "lucide-react";
import { toast } from "sonner";
import AdminHeader from "@/components/admin-dashboard/header";
import AdminSidebar from "@/components/admin-dashboard/sidebar";
import AdminNav from "@/components/admin-dashboard/navbar";

interface Withdrawal {
  _id: string;
  userId: {
    _id: string;
    username: string;
    fullName: string;
    email: string;
  };
  amount: number;
  netAmount: number;
  charge: number;
  address: string;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'rejected';
  createdAt: string;
  updatedAt: string;
}

export default function AdminPayoutsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    rejected: 0
  });
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchWithdrawals();
  }, [statusFilter]);

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/withdrawals${statusFilter !== 'all' ? `?status=${statusFilter}` : ''}`);
      const data = await response.json();
      
      if (data.withdrawals) {
        setWithdrawals(data.withdrawals);
        calculateStats(data.withdrawals);
      }
    } catch (error) {
      toast.error('Failed to fetch withdrawals');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (withdrawalData: Withdrawal[]) => {
    const newStats = {
      total: withdrawalData.length,
      pending: withdrawalData.filter(w => w.status === 'pending').length,
      completed: withdrawalData.filter(w => w.status === 'completed').length,
      rejected: withdrawalData.filter(w => w.status === 'rejected').length
    };
    setStats(newStats);
  };

  const handleAction = async (withdrawalId: string, action: 'approve' | 'reject', userName: string) => {
    try {
      const response = await fetch('/api/admin/withdrawals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          withdrawalId,
          action
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(data.message);
        // Refresh the data
        fetchWithdrawals();
      } else {
        toast.error(data.error || 'Failed to update withdrawal');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    }
  };

  const statsData = [
    { label: "Total Records", value: stats.total.toString(), icon: History, color: "text-[#1D429A]", bg: "bg-blue-50" },
    { label: "Pending", value: stats.pending.toString(), icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Approved", value: stats.completed.toString(), icon: CheckCircle2, color: "text-teal-600", bg: "bg-teal-50" },
    { label: "Rejected", value: stats.rejected.toString(), icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
  ];

  const filteredWithdrawals = withdrawals.filter(withdrawal => {
    const matchesSearch = searchTerm === '' || 
      withdrawal.userId?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.userId?.username?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const formatAmount = (amount: number) => `$${amount.toLocaleString()}`;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

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
                <input 
                  type="text" 
                  placeholder="Search investor..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white border border-gray-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-[#76EAD7]/50 w-full md:w-64" 
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white border border-gray-100 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-[#76EAD7]/50"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsData.map((stat, i) => (
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
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4 hidden md:table-cell">Net Amount</th>
                    <th className="px-6 py-4 hidden lg:table-cell">Wallet</th>
                    <th className="px-6 py-4 hidden md:table-cell">Method</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 hidden sm:table-cell">Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center text-gray-400">
                        Loading withdrawals...
                      </td>
                    </tr>
                  ) : filteredWithdrawals.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center text-gray-400">
                        No withdrawals found
                      </td>
                    </tr>
                  ) : (
                    filteredWithdrawals.map((withdrawal) => (
                      <tr key={withdrawal._id} className="group hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#1D429A]">{withdrawal.userId?.fullName || 'Unknown User'}</span>
                            <span className="text-[11px] text-gray-400">{withdrawal.userId?.email || 'No email'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-[#1D429A]">{formatAmount(withdrawal.amount)}</span>
                            {withdrawal.charge > 0 && (
                              <span className="text-[10px] text-gray-400">Fee: ${withdrawal.charge}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className="text-sm font-bold text-teal-600">{formatAmount(withdrawal.netAmount)}</span>
                        </td>
                        <td className="px-6 py-4 hidden lg:table-cell">
                          <div className="flex items-center gap-2 text-gray-500">
                            <Wallet className="w-3 h-3" />
                            <span className="text-xs font-mono">{formatAddress(withdrawal.address)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden md:table-cell">
                          <span className="text-xs font-medium text-gray-600 uppercase">{withdrawal.paymentMethod}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`flex items-center w-fit px-3 py-1 text-[10px] font-bold uppercase rounded-full border ${
                            withdrawal.status === 'completed' ? 'bg-teal-50 text-teal-600 border-teal-100' : 
                            withdrawal.status === 'rejected' ? 'bg-red-50 text-red-600 border-red-100' : 
                            'bg-blue-50 text-[#1D429A] border-blue-100'
                          }`}>
                            {withdrawal.status === 'completed' ? 'Approved' : withdrawal.status}
                          </div>
                        </td>
                        <td className="px-6 py-4 hidden sm:table-cell">
                          <span className="text-xs text-gray-400 font-medium">{formatDate(withdrawal.createdAt)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            {withdrawal.status === "pending" ? (
                              <>
                                <button 
                                  onClick={() => handleAction(withdrawal._id, 'approve', withdrawal.userId.fullName)}
                                  className="p-3 bg-teal-50 text-teal-600 cursor-pointer rounded-lg hover:bg-teal-600 hover:text-white transition-all shadow-sm"
                                  title="Approve"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button 
                                  onClick={() => handleAction(withdrawal._id, 'reject', withdrawal.userId.fullName)}
                                  className="p-3 bg-red-50 text-red-500 cursor-pointer rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                  title="Reject"
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