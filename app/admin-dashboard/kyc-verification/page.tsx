"use client";

import React, { useState, useEffect } from "react";
import { 
  Users, 
  UserCheck, 
  UserMinus, 
  FileText,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Eye,
  Download
} from "lucide-react";
import { toast } from "sonner";

import AdminHeader from "@/components/admin-dashboard/header";
import AdminSidebar from "@/components/admin-dashboard/sidebar";
import AdminNav from "@/components/admin-dashboard/navbar";

interface KYCSubmission {
  _id: string;
  userId: {
    _id: string;
    username: string;
    fullName: string;
    email: string;
  };
  fullName: string;
  email: string;
  phoneNumber: string;
  countryOfResidence: string;
  documentType: 'passport' | 'driver_license' | 'national_id';
  frontIdUrl: string;
  backIdUrl?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  rejectionReason?: string;
}

export default function AdminKYCVerificationPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [kycSubmissions, setKycSubmissions] = useState<KYCSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  // Calculate stats
  const stats = [
    { label: "Total Submissions", value: kycSubmissions.length.toString(), icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Pending Review", value: kycSubmissions.filter(k => k.status === 'pending').length.toString(), icon: Clock, color: "text-yellow-600", bg: "bg-yellow-50" },
    { label: "Approved", value: kycSubmissions.filter(k => k.status === 'approved').length.toString(), icon: CheckCircle, color: "text-green-600", bg: "bg-green-50" },
    { label: "Rejected", value: kycSubmissions.filter(k => k.status === 'rejected').length.toString(), icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
  ];

  // Fetch KYC submissions
  useEffect(() => {
    fetchKYCData();
  }, []);

  const fetchKYCData = async () => {
    try {
      const response = await fetch('/api/admin/kyc');
      if (response.ok) {
        const data = await response.json();
        setKycSubmissions(data.kycSubmissions || []);
      } else {
        toast.error('Failed to fetch KYC submissions');
      }
    } catch (error) {
      console.error('Error fetching KYC data:', error);
      toast.error('Error loading KYC submissions');
    } finally {
      setLoading(false);
    }
  };

  // Filter submissions
  const filteredSubmissions = kycSubmissions.filter(submission => {
    const matchesSearch = 
      submission.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.userId?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.userId?.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || submission.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleApprove = async (kycId: string) => {
    try {
      const response = await fetch(`/api/admin/kyc/${kycId}/approve`, {
        method: 'POST',
      });
      
      if (response.ok) {
        toast.success('KYC approved successfully');
        fetchKYCData(); // Refresh data
      } else {
        toast.error('Failed to approve KYC');
      }
    } catch (error) {
      console.error('Error approving KYC:', error);
      toast.error('Error approving KYC');
    }
  };

  const handleReject = async (kycId: string) => {
    try {
      const response = await fetch(`/api/admin/kyc/${kycId}/reject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
      
      if (response.ok) {
        toast.success('KYC rejected successfully');
        fetchKYCData(); // Refresh data
      } else {
        toast.error('Failed to reject KYC');
      }
    } catch (error) {
      console.error('Error rejecting KYC:', error);
      toast.error('Error rejecting KYC');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-50 text-yellow-600 border-yellow-100',
      approved: 'bg-green-50 text-green-600 border-green-100',
      rejected: 'bg-red-50 text-red-600 border-red-100'
    };
    return `px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${styles[status as keyof typeof styles]}`;
  };

  const getDocumentTypeLabel = (type: string) => {
    const labels = {
      passport: 'Passport',
      driver_license: 'Driver\'s License',
      national_id: 'National ID'
    };
    return labels[type as keyof typeof labels] || type;
  };

  if (loading) {
    return (
      <div className="flex h-screen overflow-hidden bg-[#F9F9FB]">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader setSidebarOpen={setSidebarOpen} />
          <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D429A]"></div>
              <p className="mt-4 text-gray-500">Loading KYC submissions...</p>
            </div>
          </main>
          <AdminNav />
        </div>
      </div>
    );
  }

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
                <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">KYC Management</h3>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#1D429A]">KYC Verification</h1>
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
              <button className="p-2 bg-white border border-gray-100 rounded-xl text-[#1D429A] shadow-sm">
                <Filter className="w-5 h-5" />
              </button>
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

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { key: 'all', label: 'All', count: kycSubmissions.length },
              { key: 'pending', label: 'Pending', count: kycSubmissions.filter(k => k.status === 'pending').length },
              { key: 'approved', label: 'Approved', count: kycSubmissions.filter(k => k.status === 'approved').length },
              { key: 'rejected', label: 'Rejected', count: kycSubmissions.filter(k => k.status === 'rejected').length },
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setFilterStatus(filter.key as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filterStatus === filter.key
                    ? 'bg-[#1D429A] text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>

          {/* KYC Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#F8FAFC] text-gray-400 text-[10px] uppercase tracking-widest font-bold">
                  <tr>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Document Type</th>
                    <th className="px-6 py-4">Submitted</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 hidden md:table-cell">Reviewed</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                  {filteredSubmissions.map((submission) => (
                    <tr key={submission._id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-[#1D429A]">{submission.userId?.fullName || 'Unknown User'}</span>
                          <span className="text-xs text-gray-400">@{submission.userId?.username || 'unknown'}</span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <FileText className="w-3 h-3" /> {submission.email || 'No email'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                          {getDocumentTypeLabel(submission.documentType)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-medium">
                        {new Date(submission.submittedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={getStatusBadge(submission.status)}>
                          {submission.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell text-gray-500 font-medium">
                        {submission.reviewedAt ? new Date(submission.reviewedAt).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => window.open(submission.frontIdUrl, '_blank')}
                            className="p-2 bg-blue-100 text-blue-600 cursor-pointer hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="View Front ID"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {submission.backIdUrl && (
                            <button
                              onClick={() => window.open(submission.backIdUrl, '_blank')}
                              className="p-2 bg-blue-100 text-blue-600 cursor-pointer hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                              title="View Back ID"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          )}
                          {submission.status === 'pending' && (
                            <>
                              <button
                                onClick={() => handleApprove(submission._id)}
                                className="p-2 bg-green-100 text-green-600 cursor-pointer hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                                title="Approve KYC"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleReject(submission._id)}
                                className="p-2 bg-red-100 text-red-600 cursor-pointer hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                title="Reject KYC"
                              >
                                <XCircle className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          {submission.status === 'rejected' && submission.rejectionReason && (
                            <button
                              onClick={() => alert(`Rejection reason: ${submission.rejectionReason}`)}
                              className="p-2 bg-orange-100 text-orange-600 cursor-pointer hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                              title="View Rejection Reason"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
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