"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Mail, ChevronRight, Lock, Check, X, AlertCircle } from "lucide-react";
import Header from "@/components/user-dashboard/header";
import Sidebar from "@/components/user-dashboard/sidebar";
import Navbar from "@/components/user-dashboard/navbar";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const WithdrawalDetailsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const params = useParams();
  const methodId = params.id || "Usdt trc20"; 
  const { user: authUser } = useAuth();
  const [amount, setAmount] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpDisabled, setOtpDisabled] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [address, setAddress] = useState("");
  const [amountValid, setAmountValid] = useState<boolean | null>(null);
  const [charge, setCharge] = useState(0);
  const [netAmount, setNetAmount] = useState(0);

  const displayName = typeof methodId === 'string' 
    ? methodId.charAt(0).toUpperCase() + methodId.slice(1).replace(/-/g, ' ') 
    : "Payment Method";

  const withdrawalMethods = {
    bitcoin: { min: 5, max: 1000000, charge: 0, chargeType: 'percentage' },
    ethereum: { min: 4, max: 1000000, charge: 0, chargeType: 'percentage' },
    'usdt-trc20': { min: 4, max: 1000000, charge: 0, chargeType: 'fixed' },
    litecoin: { min: 4, max: 10000, charge: 0, chargeType: 'fixed' },
    doge: { min: 4, max: 1000000, charge: 0, chargeType: 'percentage' },
    bnb: { min: 4, max: 1000000, charge: 0, chargeType: 'percentage' },
    tron: { min: 4, max: 500000, charge: 0, chargeType: 'percentage' }
  };

  useEffect(() => {
    // Get current user using auth system
    if (authUser?.id) {
      fetchUser(authUser.id);
    }
  }, [authUser]);

  useEffect(() => {
    // Validate amount and calculate charges
    if (amount && !isNaN(Number(amount))) {
      const amountNum = Number(amount);
      const method = withdrawalMethods[methodId as keyof typeof withdrawalMethods];
      
      if (method) {
        const isValid = amountNum >= method.min && amountNum <= method.max;
        setAmountValid(isValid);
        
        if (isValid) {
          const calculatedCharge = method.chargeType === 'percentage' 
            ? amountNum * method.charge 
            : method.charge;
          setCharge(calculatedCharge);
          setNetAmount(amountNum - calculatedCharge);
        } else {
          setCharge(0);
          setNetAmount(0);
        }
      }
    } else {
      setAmountValid(null);
      setCharge(0);
      setNetAmount(0);
    }
  }, [amount, methodId]);

  useEffect(() => {
    // Set user address if available
    if (user && user.withdrawalAddresses) {
      const methodIdStr = Array.isArray(methodId) ? methodId[0] : methodId;
      const addressField = methodIdStr.replace('-trc20', '');
      const userAddress = user.withdrawalAddresses[addressField as keyof typeof user.withdrawalAddresses];
      if (userAddress) {
        setAddress(userAddress);
      }
    }
  }, [user, methodId]);

  const fetchUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/user?userId=${userId}`);
      const data = await response.json();
      if (data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const completeWithdrawal = async () => {
    if (!authUser?.id) {
      toast.error('User not authenticated');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/withdrawal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: authUser.id,
          amount: Number(amount),
          address,
          paymentMethod: methodId,
          action: 'complete-withdrawal'
        })
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success('Withdrawal request submitted successfully!');
        // Reset form
        setAmount("");
        setOtp("");
        setOtpSent(false);
        setAddress("");
        setAmountValid(null);
        // Refresh user data
        fetchUser(authUser.id);
      } else {
        toast.error(data.error || 'Failed to complete withdrawal');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setIsLoading(false);
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

        {/* Reduced the max-width of the outer container slightly for a tighter feel on large screens */}
        <div className="p-4 md:p-8 w-full max-w-full lg:max-w-[900px] mx-auto">
          {/* Page Header */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1 h-5 bg-[#76EAD7] rounded-full flex-shrink-0"></div>
            <h2 className="text-[#1D429A] text-lg md:text-3xl font-light leading-tight">
              Withdrawal<span className="font-bold"> Details</span>
            </h2>
          </div>

          {/* Form Container: Reduced padding from p-12 to p-8 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8">
            {/* Removed max-w-2xl to prevent the form from being artificially narrow on wide screens */}
            <div className="w-full space-y-6">
              
              {/* Method Badge */}
              <div className="flex justify-start">
                <div className="flex items-center gap-3 bg-[#E8F8F5] border border-[#76EAD7]/30 rounded-full px-4 py-2">
                  <span className="bg-[#1D429A] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Your payment method
                  </span>
                  <span className="text-[#1D429A] font-semibold text-sm flex items-center gap-1">
                    {displayName} <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <label className="text-[#1D429A] font-bold text-sm">Enter Amount to withdraw($)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    placeholder="Enter Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className={`w-full bg-gray-50 border rounded-xl px-4 py-3 focus:outline-none transition-colors text-[#1D429A] ${
                      amountValid === true 
                        ? 'border-green-500 bg-green-50' 
                        : amountValid === false 
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 focus:border-[#76EAD7]'
                    }`}
                  />
                  {amountValid !== null && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {amountValid ? (
                        <Check className="w-5 h-5 text-green-500" />
                      ) : (
                        <X className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  )}
                </div>
                {amountValid === false && (
                  <p className="text-red-500 text-xs flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    Amount must be between ${withdrawalMethods[methodId as keyof typeof withdrawalMethods]?.min || 10} and ${withdrawalMethods[methodId as keyof typeof withdrawalMethods]?.max || 1000000}
                  </p>
                )}
                {amountValid === true && charge > 0 && (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Charge:</span>
                      <span className="font-bold text-[#1D429A]">${charge.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                      <span className="text-gray-600">You will receive:</span>
                      <span className="font-bold text-green-600">${netAmount.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* OTP Section - Disabled/Pending */}
              <div className={`space-y-2 opacity-40 ${otpDisabled ? 'pointer-events-none' : ''}`}>
                <div className="flex justify-between items-end">
                  <label className="text-[#1D429A] font-bold text-sm">Enter OTP</label>
                  <button 
                    onClick={() => {}}
                    disabled={true}
                    className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 cursor-not-allowed"
                  >
                    <Mail className="w-3 h-3" /> OTP Disabled
                  </button>
                </div>
                <input 
                  type="text" 
                  placeholder="OTP verification disabled"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength={4}
                  className="w-full bg-gray-100 border border-gray-300 rounded-xl px-4 py-3 text-gray-400 cursor-not-allowed"
                  disabled={true}
                />
                <p className="text-gray-400 text-[11px] italic">
                  OTP verification is currently disabled - withdrawals are processed automatically
                </p>
              </div>

              {/* Wallet Address Display */}
              <div className="space-y-2">
                <label className="text-[#1D429A] font-bold text-sm">{displayName} Address</label>
                {address ? (
                  <div className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                    <p className="text-[#1D429A] font-mono text-sm break-all">{address}</p>
                  </div>
                ) : (
                  <div className="w-full bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                    <p className="text-red-600 text-sm">
                      No {displayName} address found in your profile. Please add your address in settings first.
                    </p>
                  </div>
                )}
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  {address 
                    ? `Using your saved ${displayName} address from your profile`
                    : `${displayName} withdrawal requires a saved address in your account settings`
                  }
                </p>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  onClick={completeWithdrawal}
                  disabled={isLoading || !amountValid || !address}
                  className="w-full md:w-auto bg-[#1D429A] text-white px-12 py-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-900/10 hover:bg-[#16357a] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Processing...' : 'Complete Request'}
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

export default WithdrawalDetailsPage;