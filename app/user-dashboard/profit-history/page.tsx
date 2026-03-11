"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Database,
  ChevronDown,
  Loader2
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

interface ProfitItem {
  plan: string;
  amount: number;
  percentage: number;
  date: Date;
}

const ProfitHistory = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [profits, setProfits] = useState<ProfitItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();

  // Fetch profit history
  useEffect(() => {
    const fetchProfitHistory = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const response = await fetch('/api/user/profit-history');
        
        if (response.ok) {
          const data = await response.json();
          setProfits(data.profits);
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch profit history');
        }
      } catch (err) {
        console.error('Error fetching profit history:', err);
        setError('Failed to fetch profit history');
      } finally {
        setLoading(false);
      }
    };

    fetchProfitHistory();
  }, [user]);

  // Filter profits based on search term
  const filteredProfits = profits.filter(item =>
    item.plan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.amount.toString().includes(searchTerm) ||
    item.percentage.toString().includes(searchTerm)
  );

  // Pagination calculations
  const totalPages = Math.ceil(filteredProfits.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedProfits = filteredProfits.slice(startIndex, endIndex);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, entriesPerPage]);

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
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
              Your ROI<span className="font-bold"> history</span>
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            
            {/* Table Controls */}
            <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Show</span>
                
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1 border border-gray-200 rounded-md bg-white text-[#1D429A] font-medium focus:outline-none hover:border-[#D4A017] transition-colors">
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
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="p-4 text-[11px] uppercase tracking-wider font-bold text-[#1D429A] border-b border-gray-100">
                      Plan
                    </th>
                    <th className="p-4 text-[11px] uppercase tracking-wider font-bold text-[#1D429A] border-b border-gray-100">
                      Amount
                    </th>
                    <th className="p-4 text-[11px] uppercase tracking-wider font-bold text-[#1D429A] border-b border-gray-100">
                      Percentage
                    </th>
                    <th className="p-4 text-[11px] uppercase tracking-wider font-bold text-[#1D429A] border-b border-gray-100">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="py-24 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-400">
                          <Loader2 className="w-8 h-8 animate-spin mb-4" />
                          <p className="text-sm font-medium">Loading profit history...</p>
                        </div>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={4} className="py-24 text-center">
                        <div className="flex flex-col items-center justify-center text-red-400">
                          <Database className="w-8 h-8 mb-4" />
                          <p className="text-sm font-medium">Error loading data</p>
                          <p className="text-[11px] mt-1 opacity-70">{error}</p>
                        </div>
                      </td>
                    </tr>
                  ) : paginatedProfits.length > 0 ? (
                    paginatedProfits.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0">
                        <td className="p-4 text-sm text-gray-900 font-medium">
                          {item.plan}
                        </td>
                        <td className="p-4 text-sm text-gray-900">
                          ${item.amount.toFixed(6)}
                        </td>
                        <td className="p-4 text-sm text-gray-900">
                          {item.percentage}%
                        </td>
                        <td className="p-4 text-sm text-gray-900">
                          {formatDate(item.date)}
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
                          <p className="text-sm font-medium">No profit history available</p>
                          <p className="text-[11px] mt-1 opacity-70">
                            {searchTerm ? 'No results match your search criteria.' : 'Your investment returns will be displayed here.'}
                          </p>
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
                Showing {startIndex + 1} to {Math.min(endIndex, filteredProfits.length)} of {filteredProfits.length} entries
                {filteredProfits.length !== profits.length && ` (filtered from ${profits.length} total)`}
              </p>
              <div className="flex items-center gap-2">
                <button 
                  className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer disabled:opacity-50 transition-all"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-600 px-3">
                  Page {currentPage} of {totalPages || 1}
                </span>
                <button 
                  className="p-2 border border-gray-200 rounded-lg text-gray-400 hover:bg-gray-50 cursor-pointer disabled:opacity-50 transition-all"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
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

export default ProfitHistory;