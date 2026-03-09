"use client";

import React, { useState } from "react";
import { Check, X, Clock, DollarSign, Search, Filter, ExternalLink } from "lucide-react";
import { toast } from "sonner";

import AdminHeader from "@/components/admin-dashboard/header";
import AdminSidebar from "@/components/admin-dashboard/sidebar";
import AdminNav from "@/components/admin-dashboard/navbar";

// Helpers using brand colors
const getStatusClasses = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-teal-50 text-teal-600 border border-teal-100";
    case "Rejected":
      return "bg-red-50 text-red-600 border border-red-100";
    default:
      return "bg-blue-50 text-[#1D429A] border border-blue-100";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Approved":
      return <Check className="w-3 h-3 mr-1" />;
    case "Rejected":
      return <X className="w-3 h-3 mr-1" />;
    default:
      return <Clock className="w-3 h-3 mr-1" />;
  }
};

export default function AdminPaymentsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data updated with proofUrl
  const payments = [
    { id: "1", userName: "John Doe", user: "john@example.com", amount: 5000, plan: "Gold Plan", date: "Oct 24, 2023", status: "Pending", proofUrl: "https://example.com/receipt1.jpg" },
    { id: "2", userName: "Sarah Smith", user: "sarah@design.co", amount: 1200, plan: "Starter Plan", date: "Oct 23, 2023", status: "Approved", proofUrl: "https://example.com/receipt2.jpg" },
    { id: "3", userName: "Mike Ross", user: "mike@legal.com", amount: 10000, plan: "Platinum Plan", date: "Oct 22, 2023", status: "Rejected", proofUrl: "https://example.com/receipt3.jpg" },
  ];

  const approvePayment = (name: string) => {
    toast.success(`Payment from ${name} approved`);
  };

  const rejectPayment = (name: string) => {
    toast.error(`Payment from ${name} rejected`);
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
                  className="bg-white border border-gray-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#76EAD7]/50 w-full md:w-64 shadow-sm"
                />
              </div>
              <button className="p-2 bg-white border border-gray-100 rounded-xl text-[#1D429A] shadow-sm hover:bg-gray-50">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex items-center justify-between">
              <h2 className="text-[#1D429A] font-bold text-sm uppercase tracking-wider">Transaction History</h2>
              <DollarSign className="w-5 h-5 text-[#76EAD7]" />
            </div>

            <div className="overflow-x-auto">
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
                  {payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#1D429A]">{payment.userName}</span>
                          <span className="text-xs text-gray-400">{payment.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-[#1D429A]">${payment.amount.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium text-gray-600 px-2 py-1 bg-gray-100 rounded-md">
                          {payment.plan}
                        </span>
                      </td>
                      {/* NEW PROOF COLUMN */}
                      <td className="px-6 py-4">
                        <a 
                          href={payment.proofUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#76EAD7] hover:text-[#1D429A] text-xs font-medium underline flex items-center gap-1 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {payment.proofUrl.substring(0, 15)}...
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-gray-500 font-medium">{payment.date}</span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusPill status={payment.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          {payment.status === "Pending" ? (
                            <>
                              <button
                                onClick={() => approvePayment(payment.userName)}
                                className="p-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-600 hover:text-white transition-all shadow-sm"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => rejectPayment(payment.userName)}
                                className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <span className="text-[10px] font-bold text-gray-300 uppercase italic">Locked</span>
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