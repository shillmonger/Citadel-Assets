"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  CreditCard,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import Header from "@/components/user-dashboard/header";
import Sidebar from "@/components/user-dashboard/sidebar";
import Navbar from "@/components/user-dashboard/navbar";
import { toast } from "sonner";

const AccountSettings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [personalData, setPersonalData] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    country: ""
  });

  const [withdrawalData, setWithdrawalData] = useState({
    tron: "",
    doge: "",
    swiftCode: "",
    bitcoin: "",
    ethereum: "",
    litecoin: "",
    bnb: "",
    usdt: ""
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const tabs = [
    { id: "personal", label: "Personal Settings", icon: <User className="w-3.5 h-3.5" /> },
    { id: "withdrawal", label: "Withdrawal Settings", icon: <CreditCard className="w-3.5 h-3.5" /> },
    { id: "password", label: "Password/Security", icon: <Lock className="w-3.5 h-3.5" /> },
  ];

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('auth-token') || document.cookie.split('auth-token=')[1]?.split(';')[0];
      if (!token) {
        toast.error('Please login to access settings');
        return;
      }

      const response = await fetch('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setPersonalData({
          fullName: data.user.fullName || '',
          username: data.user.username || '',
          email: data.user.email || '',
          phoneNumber: data.user.phoneNumber || '',
          country: data.user.country || ''
        });
        setWithdrawalData(data.user.withdrawalAddresses || {
          tron: '',
          doge: '',
          swiftCode: '',
          bitcoin: '',
          ethereum: '',
          litecoin: '',
          bnb: '',
          usdt: ''
        });
      } else {
        toast.error(data.error || 'Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const handlePersonalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('auth-token') || document.cookie.split('auth-token=')[1]?.split(';')[0];
      
      const response = await fetch('/api/user/profile/personal', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(personalData)
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Personal settings updated successfully');
        fetchUserData();
      } else {
        toast.error(data.error || 'Failed to update personal settings');
      }
    } catch (error) {
      console.error('Error updating personal settings:', error);
      toast.error('Failed to update personal settings');
    } finally {
      setSaving(false);
    }
  };

  const handleWithdrawalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem('auth-token') || document.cookie.split('auth-token=')[1]?.split(';')[0];
      
      console.log('Sending withdrawal data:', withdrawalData);
      console.log('Token:', token ? 'exists' : 'missing');
      
      const response = await fetch('/api/user/profile/withdrawal', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(withdrawalData)
      });

      const data = await response.json();
      
      console.log('Response:', data);
      
      if (data.success) {
        toast.success('Withdrawal settings updated successfully');
        fetchUserData();
      } else {
        toast.error(data.error || 'Failed to update withdrawal settings');
      }
    } catch (error) {
      console.error('Error updating withdrawal settings:', error);
      toast.error('Failed to update withdrawal settings');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setSaving(true);

    try {
      const token = localStorage.getItem('auth-token') || document.cookie.split('auth-token=')[1]?.split(';')[0];
      
      const response = await fetch('/api/user/profile/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(passwordData)
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Password updated successfully');
        setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        toast.error(data.error || 'Failed to update password');
      }
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error('Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F9F9FB] font-sans relative overflow-x-hidden">
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col min-w-0 mb-30 md:mb-0">
        {/* Header */}
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        {/* Page Content */}
        <div className="p-4 md:p-8 w-full max-w-full lg:max-w-[1400px] mx-auto">
          <h2 className="text-[#1D429A] text-xl md:text-3xl font-light mb-8">
            Account <span className="font-bold">Settings</span>
          </h2>

          {/* Settings Card */}
          <section className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Tabs */}
            <div className="flex flex-wrap gap-1 p-4 md:p-6 border-b border-gray-100">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all
                    ${
                      activeTab === tab.id
                        ? "bg-[#1D429A] text-white shadow-md"
                        : "text-gray-400 hover:text-[#1D429A] hover:bg-blue-50"
                    }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
            {/* Tab Content */}
            <div className="p-6 md:p-8">

              {/* ====================== PERSONAL SETTINGS ====================== */}
              {activeTab === "personal" && (
                <form onSubmit={handlePersonalSubmit} className="space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-4 bg-[#76EAD7] rounded-full"></div>
                    <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">
                      Personal Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={personalData.fullName}
                        onChange={(e) => setPersonalData({ ...personalData, fullName: e.target.value })}
                        placeholder="Enter full name"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A] focus:ring-1 focus:ring-[#1D429A]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                        Username
                      </label>
                      <input
                        type="text"
                        value={personalData.username}
                        onChange={(e) => setPersonalData({ ...personalData, username: e.target.value })}
                        placeholder="Enter username"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A] focus:ring-1 focus:ring-[#1D429A]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={personalData.email}
                        onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
                        placeholder="evelyn@example.com"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A] focus:ring-1 focus:ring-[#1D429A]"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={personalData.phoneNumber}
                        onChange={(e) => setPersonalData({ ...personalData, phoneNumber: e.target.value })}
                        placeholder="+234 000 000 0000"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A] focus:ring-1 focus:ring-[#1D429A]"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                        Country
                      </label>
                      <input
                        type="text"
                        value={personalData.country}
                        onChange={(e) => setPersonalData({ ...personalData, country: e.target.value })}
                        placeholder="country"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A] focus:ring-1 focus:ring-[#1D429A]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-center md:justify-start pt-4">
                    <button 
                      type="submit"
                      disabled={saving}
                      className="cursor-pointer bg-[#1D429A] text-white px-12 py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#16357a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </form>
              )}

              {/* ====================== WITHDRAWAL SETTINGS ====================== */}
              {activeTab === "withdrawal" && (
                <form onSubmit={handleWithdrawalSubmit} className="space-y-8">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-4 bg-[#76EAD7] rounded-full"></div>
                    <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">
                      Withdrawal Settings
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Crypto */}
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Tron</label>
                      <input 
                        type="text" 
                        value={withdrawalData.tron}
                        onChange={(e) => setWithdrawalData({ ...withdrawalData, tron: e.target.value })}
                        placeholder="Enter Tron Address" 
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A]" 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Doge</label>
                      <input 
                        type="text" 
                        value={withdrawalData.doge}
                        onChange={(e) => setWithdrawalData({ ...withdrawalData, doge: e.target.value })}
                        placeholder="Enter Doge Address" 
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A]" 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Swift Code</label>
                      <input 
                        type="text" 
                        value={withdrawalData.swiftCode}
                        onChange={(e) => setWithdrawalData({ ...withdrawalData, swiftCode: e.target.value })}
                        placeholder="Enter Swift Code" 
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A]" 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Bitcoin</label>
                      <input 
                        type="text" 
                        value={withdrawalData.bitcoin}
                        onChange={(e) => setWithdrawalData({ ...withdrawalData, bitcoin: e.target.value })}
                        placeholder="Enter Bitcoin Address" 
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A]" 
                      />
                      <p className="text-[10px] text-gray-400 mt-1">Enter your Bitcoin Address that will be used to withdraw your funds</p>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Ethereum</label>
                      <input 
                        type="text" 
                        value={withdrawalData.ethereum}
                        onChange={(e) => setWithdrawalData({ ...withdrawalData, ethereum: e.target.value })}
                        placeholder="Enter Ethereum Address" 
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A]" 
                      />
                      <p className="text-[10px] text-gray-400 mt-1">Enter your Ethereum Address that will be used to withdraw your funds</p>
                    </div>

                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Litecoin</label>
                      <input 
                        type="text" 
                        value={withdrawalData.litecoin}
                        onChange={(e) => setWithdrawalData({ ...withdrawalData, litecoin: e.target.value })}
                        placeholder="Enter Litecoin Address" 
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A]" 
                      />
                      <p className="text-[10px] text-gray-400 mt-1">Enter your Litecoin Address that will be used to withdraw your funds</p>
                    </div>
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">BNB</label>
                      <input 
                        type="text" 
                        value={withdrawalData.bnb}
                        onChange={(e) => setWithdrawalData({ ...withdrawalData, bnb: e.target.value })}
                        placeholder="Enter BNB Address" 
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A]" 
                      />
                      <p className="text-[10px] text-gray-400 mt-1">Enter your BNB Address that will be used to withdraw your funds</p>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">USDT</label>
                      <input 
                        type="text" 
                        value={withdrawalData.usdt}
                        onChange={(e) => setWithdrawalData({ ...withdrawalData, usdt: e.target.value })}
                        placeholder="Enter USDT Address" 
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A]" 
                      />
                      <p className="text-[10px] text-gray-400 mt-1">Enter your USDT Address that will be used to withdraw your funds</p>
                    </div>
                  </div>

                  <div className="flex justify-center md:justify-start">
                    <button 
                      type="submit"
                      disabled={saving}
                      className="cursor-pointer bg-[#1D429A] text-white px-12 py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#16357a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? 'Saving...' : 'Save Address'}
                    </button>
                  </div>
                </form>
              )}

              {/* ====================== PASSWORD / SECURITY ====================== */}
              {activeTab === "password" && (
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-1 h-4 bg-[#76EAD7] rounded-full"></div>
                    <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">
                      Change Password
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Old Password */}
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Old Password</label>
                      <div className="relative">
                        <input
                          type={showOld ? "text" : "password"}
                          value={passwordData.oldPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                          placeholder="Enter old password"
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A] pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowOld(!showOld)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1D429A]"
                        >
                          {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">New Password</label>
                      <div className="relative">
                        <input
                          type={showNew ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          placeholder="Enter new password"
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A] pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNew(!showNew)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1D429A]"
                        >
                          {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">Confirm New Password</label>
                      <div className="relative">
                        <input
                          type={showConfirm ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          placeholder="Confirm new password"
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#1D429A] placeholder-gray-300 focus:outline-none focus:border-[#1D429A] pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1D429A]"
                        >
                          {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center md:justify-start pt-2">
                    <button 
                      type="submit"
                      disabled={saving}
                      className="cursor-pointer bg-[#1D429A] text-white px-12 py-3 rounded-lg font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#16357a] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </section>
        </div>
      </main>

      <Navbar />
    </div>
  );
};

export default AccountSettings;