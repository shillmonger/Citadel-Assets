"use client";

import React, { useState, useEffect } from "react";
import { Check, X, Clock, DollarSign, Search, Filter, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";

import AdminHeader from "@/components/admin-dashboard/header";
import AdminSidebar from "@/components/admin-dashboard/sidebar";
import AdminNav from "@/components/admin-dashboard/navbar";

interface Deposit {
  _id: string;
  paymentMethod: string;
  amount: number;
  proofImageUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  userId: {
    _id: string;
    username: string;
    fullName: string;
    email: string;
  };
  walletAddress: string;
  network: string;
  createdAt: string;
  updatedAt: string;
}

// Helpers using brand colors
const getStatusClasses = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-teal-50 text-teal-600 border border-teal-100";
    case "rejected":
      return "bg-red-50 text-red-600 border border-red-100";
    default:
      return "bg-blue-50 text-[#1D429A] border border-blue-100";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "approved":
      return <Check className="w-3 h-3 mr-1" />;
    case "rejected":
      return <X className="w-3 h-3 mr-1" />;
    default:
      return <Clock className="w-3 h-3 mr-1" />;
  }
};

export default function AdminPaymentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  useEffect(() => {
    fetchDeposits();
  }, [statusFilter]);

  const fetchDeposits = async () => {
    try {
      setLoading(true);
      const url = statusFilter 
        ? `/api/admin/deposits?status=${statusFilter}`
        : '/api/admin/deposits';
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setDeposits(data.deposits || []);
      } else {
        toast.error('Failed to fetch deposits');
      }
    } catch (error) {
      console.error('Error fetching deposits:', error);
      toast.error('Error loading deposits');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (depositId: string, userName: string) => {
    setActionLoading(depositId);
    try {
      const response = await fetch('/api/admin/deposits', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          depositId,
          action: 'approve'
        }),
      });

      if (response.ok) {
        toast.success(`Payment from ${userName} approved`);
        fetchDeposits(); // Refresh the list
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to approve payment');
      }
    } catch (error) {
      console.error('Error approving deposit:', error);
      toast.error('Error approving payment');
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (depositId: string, userName: string) => {
    setActionLoading(depositId);
    try {
      const response = await fetch('/api/admin/deposits', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          depositId,
          action: 'reject'
        }),
      });

      if (response.ok) {
        toast.error(`Payment from ${userName} rejected`);
        fetchDeposits(); // Refresh the list
      } else {
        const error = await response.json();
        toast.error(error.error || 'Failed to reject payment');
      }
    } catch (error) {
      console.error('Error rejecting deposit:', error);
      toast.error('Error rejecting payment');
    } finally {
      setActionLoading(null);
    }
  };

  const filteredDeposits = deposits.filter(deposit => {
    const matchesSearch = 
      deposit.userId.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deposit.userId.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deposit.userId.username.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const StatusPill = ({ status }: { status: string }) => (
    <div className={`flex items-center w-fit px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${getStatusClasses(status)}`}>
      {getStatusIcon(status)}
      {status}
    </div>
  );

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
                <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">Finance Management</h3>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1D429A]">Payments Review</h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-white border border-gray-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#76EAD7]/50 w-full md:w-64 shadow-sm"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-white border border-gray-100 rounded-xl py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#76EAD7]/50 shadow-sm"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-[#1D429A] font-bold text-sm uppercase tracking-wider">Transaction History</h2>
              <DollarSign className="w-5 h-5 text-[#76EAD7]" />
            </div>

            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-[#1D429A]" />
                  <span className="ml-2 text-gray-500">Loading deposits...</span>
                </div>
              ) : (
                <table className="w-full text-left">
                  <thead className="bg-[#F8FAFC] text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                    <tr>
                      <th className="px-6 py-4">User Details</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Payment Method</th>
                      <th className="px-6 py-4">Proof</th>
                      <th className="px-6 py-4">Submission Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredDeposits.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                          {searchTerm || statusFilter ? 'No deposits found matching your criteria' : 'No deposits found'}
                        </td>
                      </tr>
                    ) : (
                      filteredDeposits.map((deposit) => (
                        <tr key={deposit._id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-[#1D429A]">{deposit.userId.fullName}</span>
                              <span className="text-xs text-gray-400">{deposit.userId.email}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-bold text-[#1D429A]">${deposit.amount.toLocaleString()}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-medium text-gray-600 px-2 py-1 bg-gray-100 rounded-md">
                              {deposit.paymentMethod}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <a 
                              href={deposit.proofImageUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-[#76EAD7] hover:text-[#1D429A] text-xs font-medium underline flex items-center gap-1 transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" />
                              View Proof
                            </a>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs text-gray-500 font-medium">{formatDate(deposit.createdAt)}</span>
                          </td>
                          <td className="px-6 py-4">
                            <StatusPill status={deposit.status} />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-2">
                              {deposit.status === "pending" ? (
                                <>
                                  <button
                                    onClick={() => handleApprove(deposit._id, deposit.userId.fullName)}
                                    disabled={actionLoading === deposit._id}
                                    className="p-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-600 hover:text-white transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    {actionLoading === deposit._id ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <Check className="w-4 h-4" />
                                    )}
                                  </button>
                                  <button
                                    onClick={() => handleReject(deposit._id, deposit.userId.fullName)}
                                    disabled={actionLoading === deposit._id}
                                    className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    {actionLoading === deposit._id ? (
                                      <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                      <X className="w-4 h-4" />
                                    )}
                                  </button>
                                </>
                              ) : (
                                <span className="text-[10px] font-bold text-gray-300 uppercase italic">Locked</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>

        <AdminNav />
      </div>
    </div>
  );
}