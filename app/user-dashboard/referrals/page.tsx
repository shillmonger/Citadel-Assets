"use client";

import React, { useState, useEffect } from "react";
import { 
  Copy, 
  CheckCircle2, 
  Users, 
  Link as LinkIcon, 
  UserPlus, 
  Search,
  ChevronLeft,
  ChevronRight,
  InboxIcon,
} from "lucide-react";
import Header from "@/components/user-dashboard/header";
import Sidebar from "@/components/user-dashboard/sidebar";
import Navbar from "@/components/user-dashboard/navbar";

interface Referral {
  id: string;
  clientName: string;
  username: string;
  email: string;
  status: string;
  dateRegistered: string;
  totalDeposit: number;
  referralLevel: string;
  parent: string;
}

interface UserData {
  id: string;
  username: string;
  referralId?: string;
  myReferralId: string;
  totalReferrals: number;
  activeReferrals: number;
  referralBonus: number;
  accountBalance: number;
  referralLink?: string;
}

const ReferralPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch user data and referrals
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Get user data first
      const userResponse = await fetch('/api/user/me');
      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUserData(userData.data);

        // Get referrals data after we have the user ID
        const referralsResponse = await fetch(`/api/referrals?userId=${userData.data.id}`);
        if (referralsResponse.ok) {
          const referralsData = await referralsResponse.json();
          setReferrals(referralsData.data.referrals);
        }
      }
    } catch (error) {
      console.error('Error fetching referral data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (userData?.referralLink) {
      try {
        await navigator.clipboard.writeText(userData.referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  // Filter referrals based on search term
  const filteredReferrals = referrals.filter(referral =>
    referral.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    referral.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    referral.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredReferrals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedReferrals = filteredReferrals.slice(startIndex, startIndex + itemsPerPage);

  // Get referrer info
  const getReferrerInfo = async () => {
    if (userData?.referralId) {
      try {
        const response = await fetch(`/api/user/by-referral-id?referralId=${userData.referralId}`);
        if (response.ok) {
          const referrerData = await response.json();
          return referrerData.data;
        }
      } catch (error) {
        console.error('Error fetching referrer info:', error);
      }
    }
    return null;
  };

  const [referrerInfo, setReferrerInfo] = useState<any>(null);

  useEffect(() => {
    getReferrerInfo().then(setReferrerInfo);
  }, [userData?.referralId]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#F9F9FB] font-sans relative overflow-x-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className="flex-1 w-full flex flex-col min-w-0 mb-24 md:mb-0">
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
          <div className="flex items-center justify-center flex-1">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D429A]"></div>
          </div>
        </main>
        <Navbar />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F9F9FB] font-sans relative overflow-x-hidden">
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 w-full flex flex-col min-w-0 mb-24 md:mb-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="p-4 md:p-8 w-full max-w-full lg:max-w-[1200px] mx-auto">
          {/* Page Title */}
          <div className="flex items-center gap-2 mb-6 md:mb-8">
            <div className="w-1 h-5 bg-[#76EAD7] rounded-full flex-shrink-0"></div>
            <h2 className="text-[#1D429A] text-lg md:text-3xl font-light leading-tight">
              Refer users to <span className="font-bold">Cetadel</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">

              {/* Referral Link Card */}
              <div className="bg-white p-5 md:p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-5">
                  <div className="bg-[#1D429A]/10 p-2 rounded-lg flex-shrink-0">
                    <LinkIcon className="w-5 h-5 text-[#1D429A]" />
                  </div>
                  <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">
                    Your Referral Link
                  </h3>
                </div>

                {/* Link + Icon-only copy button */}
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                  <p className="flex-1 text-xs md:text-sm text-gray-600 font-medium truncate">
                    {userData?.referralLink || 'Generating referral link...'}
                  </p>
                  <button
                    onClick={handleCopy}
                    title={copied ? "Copied!" : "Copy link"}
                    className="cursor-pointer flex-shrink-0 bg-[#1D429A] text-white p-3 rounded-lg hover:bg-[#16357a] transition-all shadow-sm"
                  >
                    {copied
                      ? <CheckCircle2 className="w-5 h-5 text-[#76EAD7]" />
                      : <Copy className="w-5 h-5" />
                    }
                  </button>
                </div>

                <div className="mt-6 flex flex-col items-center justify-center border-t border-gray-100 pt-6">
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                    Your Referral ID
                  </p>
                  <div className="bg-[#76EAD7]/30 text-[#1D429A] px-6 py-2 rounded-[10px] font-bold text-lg">
                    {userData?.myReferralId || 'Loading...'}
                  </div>
                </div>
              </div>

              {/* Referral Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 md:p-6 border-b border-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest flex-shrink-0">
                    Your Referrals
                  </h3>
                  <div className="relative w-full sm:w-56 md:w-64">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search referrals..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-[#76EAD7] w-full"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left min-w-[500px]">
                    <thead className="bg-gray-50 text-gray-400 text-[10px] font-bold uppercase tracking-tighter border-b border-gray-100">
                      <tr>
                        <th className="px-5 py-4">Client Name</th>
                        <th className="px-5 py-4">Ref. Level</th>
                        <th className="px-5 py-4">Parent</th>
                        <th className="px-5 py-4">Status</th>
                        <th className="px-5 py-4">Date Registered</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedReferrals.length > 0 ? (
                        paginatedReferrals.map((referral) => (
                          <tr key={referral.id} className="border-b border-gray-50 hover:bg-gray-50">
                            <td className="px-5 py-4">
                              <div>
                                <p className="font-medium text-sm">{referral.clientName}</p>
                                <p className="text-xs text-gray-500">{referral.username}</p>
                              </div>
                            </td>
                            <td className="px-5 py-4">
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                                Level 1
                              </span>
                            </td>
                            <td className="px-5 py-4 text-sm text-gray-600">
                              {userData?.username}
                            </td>
                            <td className="px-5 py-4">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                referral.status === 'Active' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {referral.status}
                              </span>
                            </td>
                            <td className="px-5 py-4 text-sm text-gray-600">
                              {new Date(referral.dateRegistered).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center">
                            <div className="flex flex-col items-center gap-3">
                              <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center">
                                <InboxIcon className="w-10 h-10 text-gray-300" />
                              </div>
                              <p className="text-gray-400 text-sm italic">
                                {searchTerm ? 'No referrals found matching your search' : 'No referrals yet'}
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="p-4 bg-gray-50 flex items-center justify-between border-t border-gray-100">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredReferrals.length)} of {filteredReferrals.length} entries
                  </p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="cursor-pointer p-2 rounded-lg bg-white border border-gray-200 text-gray-400 hover:border-[#1D429A]/30 transition-colors disabled:opacity-40"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages || totalPages === 0}
                      className="cursor-pointer p-2 rounded-lg bg-white border border-gray-200 text-gray-400 hover:border-[#1D429A]/30 transition-colors disabled:opacity-40"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Referred By Card */}
              <div className="bg-[#1D429A] p-6 md:p-8 rounded-2xl shadow-lg text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full"></div>
                <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-5 relative z-10">
                  You were referred by
                </p>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 border border-white/20">
                  <Users className="w-8 h-8 md:w-10 md:h-10 text-[#76EAD7]" />
                </div>
                <h4 className="text-white font-bold text-xl md:text-2xl relative z-10">
                  {referrerInfo?.username || 'No referrer'}
                </h4>
              </div>

              {/* Referral Stats */}
              <div className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#76EAD7]/10 p-2 rounded-lg flex-shrink-0">
                    <UserPlus className="w-5 h-5 text-[#1D429A]" />
                  </div>
                  <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">
                    Referral Stats
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 text-xs font-medium">Total Referrals</span>
                    <span className="text-[#1D429A] font-bold">{userData?.totalReferrals || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 text-xs font-medium">Active Referrals</span>
                    <span className="text-[#1D429A] font-bold">{userData?.activeReferrals || 0}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="text-gray-500 text-xs font-medium">Referral Bonus</span>
                    <span className="text-[#1D429A] font-bold">${userData?.referralBonus || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Navbar />
    </div>
  );
};

export default ReferralPage;