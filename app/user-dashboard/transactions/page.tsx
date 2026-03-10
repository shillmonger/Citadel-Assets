"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Database,
  ChevronDown,
  Download,
  Upload,
  ArrowRightLeft
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Header from "@/components/user-dashboard/header";
import Sidebar from "@/components/user-dashboard/sidebar";
import Navbar from "@/components/user-dashboard/navbar";
import { useAuth } from "@/hooks/useAuth";

interface Transaction {
  id: string;
  amount: number;
  paymentMode: string;
  status: string;
  dateCreated: string;
  type?: 'deposit' | 'withdrawal';
  address?: string;
  charge?: number;
  netAmount?: number;
  proofImageUrl?: string;
  network?: string;
  walletAddress?: string;
}

interface PaginationData {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const TransactionPage = () => {
  const { user, loading: authLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("deposit");
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationData>({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
    hasNext: false,
    hasPrev: false
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch transactions based on active tab
  const fetchTransactions = async () => {
    if (!user || authLoading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      let url = `/api/transactions/${activeTab}s`;
      if (activeTab === 'others') {
        url = '/api/transactions/all';
      }
      
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: entriesPerPage.toString(),
        search: searchTerm
      });
      
      const response = await fetch(`${url}?${params}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      
      const data = await response.json();
      
      if (data.success) {
        setTransactions(data.data);
        setPagination(data.pagination);
      } else {
        throw new Error(data.error || 'Failed to fetch transactions');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchTerm, entriesPerPage]);

  // Fetch transactions when dependencies change
  useEffect(() => {
    fetchTransactions();
  }, [user, authLoading, activeTab, currentPage, entriesPerPage, searchTerm]);

  const tabs = [
    { id: "deposit", label: "Deposit", icon: Download },
    { id: "withdrawal", label: "Withdrawal", icon: Upload },
    { id: "others", label: "Others", icon: ArrowRightLeft },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9F9FB] font-sans relative overflow-x-hidden">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 w-full flex flex-col min-w-0 mb-32 lg:mb-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="p-4 md:p-8 w-full max-w-full lg:max-w-[1200px] mx-auto">
          
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1 h-5 bg-[#76EAD7] rounded-full flex-shrink-0"></div>
            <h2 className="text-[#1D429A] text-lg md:text-3xl font-light leading-tight">
              Transaction<span className="font-bold"> Records</span>
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            
            {/* Transaction Tabs */}
            <div className="grid grid-cols-3 gap-2 p-4 md:p-6 bg-gray-50/30">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center justify-center py-2 md:py-3 rounded-xl transition-all cursor-pointer ${
                      activeTab === tab.id 
                      ? "bg-[#1D429A] text-white shadow-lg shadow-[#1D429A]/20" 
                      : "bg-white text-gray-400 border border-gray-100 hover:border-[#76EAD7]"
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${activeTab === tab.id ? "text-white" : "text-gray-300"}`} />
                    <span className="text-[10px] md:text-sm font-bold uppercase tracking-wider">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Table Controls */}
            <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Show</span>
                
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1 border border-gray-200 rounded-md bg-white text-[#1D429A] font-medium focus:outline-none hover:border-[#D4A017] transition-colors cursor-pointer">
                    {entriesPerPage} <ChevronDown className="w-3 h-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="bg-white border border-gray-100 shadow-xl rounded-lg z-50">
                    {[10, 25, 50, 100].map((num) => (
                      <DropdownMenuItem 
                        key={num} 
                        onClick={() => setEntriesPerPage(num)}
                        className="cursor-pointer px-4 py-2 hover:bg-gray-50 text-[#1D429A] text-sm"
                      >
                        {num}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <span>entries</span>
              </div>

              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#D4A017] transition-all"
                />
              </div>
            </div>

            {/* Scrolling Table Wrapper */}
            <div className="w-full overflow-x-auto scrollbar-hide">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="p-4 text-[11px] uppercase tracking-wider font-bold text-[#1D429A] border-b border-gray-100">
                      Amount
                    </th>
                    <th className="p-4 text-[11px] uppercase tracking-wider font-bold text-[#1D429A] border-b border-gray-100">
                      Payment Mode
                    </th>
                    <th className="p-4 text-[11px] uppercase tracking-wider font-bold text-[#1D429A] border-b border-gray-100">
                      Status
                    </th>
                    <th className="p-4 text-[11px] uppercase tracking-wider font-bold text-[#1D429A] border-b border-gray-100">
                      Date Created
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="py-24 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Database className="w-8 h-8 text-gray-300 animate-pulse" />
                          </div>
                          <p className="text-sm font-medium">Loading transactions...</p>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={4} className="py-24 text-center">
                        <div className="flex flex-col items-center justify-center text-red-400">
                          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                            <Database className="w-8 h-8 text-red-300" />
                          </div>
                          <p className="text-sm font-medium">Error loading data</p>
                          <p className="text-[11px] mt-1 opacity-70 italic">{error}</p>
                        </div>
                      </td>
                    </tr>
                  ) : transactions.length > 0 ? (
                    transactions.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 cursor-pointer">
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900">${item.amount.toLocaleString()}</span>
                            {item.netAmount && item.netAmount !== item.amount && (
                              <span className="text-xs text-gray-500">Net: ${item.netAmount.toLocaleString()}</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900">{item.paymentMode}</span>
                            {item.type === 'deposit' && item.network && (
                              <span className="text-xs text-gray-500">Network: {item.network}</span>
                            )}
                            {item.type === 'withdrawal' && item.address && (
                              <span className="text-xs text-gray-500 truncate max-w-[200px]">{item.address}</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(item.status)}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-900">{formatDate(item.dateCreated)}</span>
                            {item.type && (
                              <span className="text-xs text-gray-500 capitalize">{item.type}</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-24 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <Database className="w-8 h-8 text-gray-300" />
                          </div>
                          <p className="text-sm font-medium">No data available in table</p>
                          <p className="text-[11px] mt-1 opacity-70 italic">Your {activeTab} history will appear here once processed.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          {/* Pagination */}
          <div className="p-6 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-tighter">
              Showing {pagination.total > 0 ? ((pagination.page - 1) * pagination.limit) + 1 : 0} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
            </p>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={!pagination.hasPrev}
                className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-600 px-3">
                Page {pagination.page} of {pagination.pages}
              </span>
              <button 
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={!pagination.hasNext}
                className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <Navbar />
  </div>
);
};

export default TransactionPage;