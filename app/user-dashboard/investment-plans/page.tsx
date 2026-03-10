"use client";

import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  Wallet, 
  CheckCircle2, 
  ChevronDown, 
  AlertCircle,
  Info,
  Sprout
} from "lucide-react";
import Header from "@/components/user-dashboard/header";
import Sidebar from "@/components/user-dashboard/sidebar";
import Navbar from "@/components/user-dashboard/navbar";
import { toast } from "sonner";

// Updated with all provided plans
const PLANS = [
  {
    id: "rudiments",
    name: "Rudiments Plan",
    minDeposit: 100,
    maxDeposit: 499,
    duration: "45 Days",
    profit: "4% Daily",
  },
  {
    id: "gold",
    name: "Gold Plan",
    minDeposit: 500,
    maxDeposit: 999,
    duration: "30 Days",
    profit: "5% Daily",
  },
  {
    id: "antminer",
    name: "ANTMINER",
    minDeposit: 1000,
    maxDeposit: 4999,
    duration: "30 Days",
    profit: "5.5% Daily",
  },
  {
    id: "innosilicon",
    name: "INNOSILICON",
    minDeposit: 5000,
    maxDeposit: 14999,
    duration: "30 Days",
    profit: "8% Daily",
  },
  {
    id: "variable",
    name: "VARIABLE PLAN",
    minDeposit: 15000,
    maxDeposit: 10000000, // Unlimited representation
    duration: "31 Days",
    profit: "20% Daily",
  },
  {
    id: "vip",
    name: "VIP",
    minDeposit: 22000,
    maxDeposit: 10000000, // Unlimited representation
    duration: "31 Days",
    profit: "25% Daily",
  },
  {
    id: "shareholder",
    name: "SHAREHOLDER",
    minDeposit: 100000,
    maxDeposit: 10000000, // Unlimited representation
    duration: "35 Days",
    profit: "30% Daily",
  },
  {
    id: "shareholder-pro",
    name: "SHAREHOLDER PRO",
    minDeposit: 200000,
    maxDeposit: 10000000, // Unlimited representation
    duration: "45 Days",
    profit: "50% Daily",
  }
];

const InvestmentPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(PLANS[0]);
  const [amount, setAmount] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [accountBalance, setAccountBalance] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  // Generate 5 balanced quick amounts based on the selected plan's range
  const getQuickAmounts = (min: number, max: number) => {
    const safeMax = max > 2000000 ? min * 5 : max; 
    const step = (safeMax - min) / 4;
    return [
      min,
      Math.round(min + step),
      Math.round(min + step * 2),
      Math.round(min + step * 3),
      safeMax
    ];
  };

  useEffect(() => {
    setAmount(selectedPlan.minDeposit.toString());
  }, [selectedPlan]);

  useEffect(() => {
    fetchAccountBalance();
  }, []);

  const fetchAccountBalance = async () => {
    try {
      const response = await fetch('/api/user/balance', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAccountBalance(data.accountBalance);
        }
      }
    } catch (error) {
      console.error('Error fetching account balance:', error);
    }
  };

  const handleInvestment = async () => {
    if (!isValidAmount || !amount) {
      toast.error('Please enter a valid investment amount');
      return;
    }

    const investmentAmount = Number(amount);
    
    // Check if user has sufficient balance
    if (accountBalance < investmentAmount) {
      toast.error('Please upgrade your balance to continue in the deposit page');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('/api/user/investment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          selectedPlan: selectedPlan.name,
          amount: investmentAmount,
          duration: parseInt(selectedPlan.duration.replace(' Days', '')),
          profit: parseFloat(selectedPlan.profit.replace('% Daily', ''))
        }),
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        toast.success('Investment plan created successfully!');
        // Update the account balance
        setAccountBalance(prev => prev - investmentAmount);
        // Reset form
        setAmount(selectedPlan.minDeposit.toString());
      } else {
        toast.error(data.error || 'Failed to create investment plan');
      }
    } catch (error) {
      console.error('Error creating investment plan:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isValidAmount = 
    Number(amount) >= selectedPlan.minDeposit && 
    Number(amount) <= selectedPlan.maxDeposit;

  return (
    <div className="flex min-h-screen bg-[#F9F9FB] font-sans relative overflow-x-hidden">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 w-full flex flex-col min-w-0 mb-32 lg:mb-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="p-4 md:p-8 w-full max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 mb-8 px-1 md:px-0">
            <div className="w-1 h-4 bg-[#76EAD7] rounded-full"></div>
            <h2 className="text-[#1D429A] text-xl md:text-3xl font-light">
              Investment <span className="font-bold">Plans</span>
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="w-full lg:flex-1 bg-white p-6 md:p-10 rounded-2xl shadow-sm border border-gray-100">
              
              {/* Select Plan Dropdown */}
              <div className="mb-10 relative">
                <label className="text-[#1D429A] font-bold text-[10px] uppercase tracking-widest mb-3 block">Select Plan</label>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white transition-all text-[#1D429A] font-bold text-sm cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Sprout className="w-5 h-5 text-[#76EAD7]" />
                    {selectedPlan.name}
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 shadow-xl rounded-xl z-30 max-h-60 overflow-y-auto">
                    {PLANS.map((plan) => (
                      <div 
                        key={plan.id}
                        onClick={() => {
                          setSelectedPlan(plan);
                          setIsDropdownOpen(false);
                        }}
                        className="p-4 hover:bg-[#1D429A]/5 cursor-pointer transition-colors border-b border-gray-50 last:border-0"
                      >
                        <p className="text-[#1D429A] font-bold text-sm">{plan.name}</p>
                        <p className="text-gray-400 text-[10px] uppercase tracking-tighter">
                          Min: ${plan.minDeposit.toLocaleString()} — {plan.maxDeposit > 2000000 ? 'Unlimited' : `Max: $${plan.maxDeposit.toLocaleString()}`}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Amount Buttons */}
              <div className="mb-10">
                <label className="text-[#1D429A] font-bold text-[10px] uppercase tracking-widest mb-4 block">Choose Quick Amount to Invest</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {getQuickAmounts(selectedPlan.minDeposit, selectedPlan.maxDeposit).map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setAmount(amt.toString())}
                      className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                        amount === amt.toString() 
                        ? "bg-[#1D429A] text-white border-[#1D429A] shadow-md" 
                        : "bg-gray-50 text-gray-500 border-gray-100 hover:border-[#76EAD7]"
                      }`}
                    >
                      ${amt.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Manual Input */}
              <div className="mb-10">
                <label className="text-[#1D429A] font-bold text-[10px] uppercase tracking-widest mb-3 block">Or Enter Your Amount</label>
                <div className="relative">
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className={`w-full p-4 bg-gray-50 border rounded-xl text-[#1D429A] font-bold focus:outline-none focus:ring-2 transition-all ${
                            isValidAmount ? 'border-gray-100 focus:ring-[#76EAD7]/30' : 'border-red-200 focus:ring-red-100'
                        }`}
                        placeholder="0.00"
                    />
                    {!isValidAmount && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-red-500 text-[10px] font-bold uppercase">
                            <AlertCircle className="w-3 h-3" /> Out of range
                        </div>
                    )}
                </div>
              </div>

              {/* Balance Card */}
              <label className="text-[#1D429A] font-bold text-[10px] uppercase tracking-widest mb-3 block">Choose Payment Method</label>
              <div className="p-4 border-2 border-[#1D429A] bg-[#1D429A]/5 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-[#1D429A] p-2 rounded-lg">
                      <Wallet className="w-5 h-5 text-white" />
                  </div>
                  <div>
                      <p className="text-[#1D429A] font-bold text-sm">Account Balance</p>
                      <p className="text-gray-400 text-[10px]">Balance: ${accountBalance.toFixed(2)}</p>
                  </div>
                </div>
                <CheckCircle2 className="w-5 h-5 text-[#1D429A]" />
              </div>
            </div>

            {/* Sticky Sidebar Summary */}
            <div className="w-full lg:w-[400px] space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-8 pb-4 border-b border-gray-50">
                    <Info className="w-4 h-4 text-[#76EAD7]" />
                    <h3 className="text-[#1D429A] font-bold text-[10px] uppercase tracking-widest">Plan Details</h3>
                </div>

                <div className="grid grid-cols-2 gap-y-8 gap-x-4">
                  <div className="col-span-2">
                    <p className="text-gray-400 text-[9px] font-bold uppercase mb-1">Name of plan</p>
                    <p className="text-[#1D429A] text-sm font-bold">{selectedPlan.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[9px] font-bold uppercase mb-1">Duration</p>
                    <p className="text-[#1D429A] text-xs font-bold">{selectedPlan.duration}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[9px] font-bold uppercase mb-1">Profit</p>
                    <p className="text-[#76EAD7] text-xs font-bold">{selectedPlan.profit}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[9px] font-bold uppercase mb-1">Min Deposit</p>
                    <p className="text-[#1D429A] text-xs font-bold">${selectedPlan.minDeposit.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[9px] font-bold uppercase mb-1">Max Deposit</p>
                    <p className="text-[#1D429A] text-xs font-bold">
                      {selectedPlan.maxDeposit > 2000000 ? 'Unlimited' : `$${selectedPlan.maxDeposit.toLocaleString()}`}
                    </p>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-gray-50 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs font-medium">Payment method:</span>
                    <span className="text-[#1D429A] font-bold text-xs uppercase">Account Balance</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-[#1D429A] font-bold text-sm">Total to Invest:</span>
                    <span className="text-[#1D429A] font-bold text-2xl">${Number(amount || 0).toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  disabled={!isValidAmount || !amount || isLoading || accountBalance < Number(amount)}
                  onClick={handleInvestment}
                  className={`w-full mt-8 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg ${
                    isValidAmount && amount && !isLoading && accountBalance >= Number(amount)
                    ? "bg-[#1D429A] text-white hover:scale-[1.02] cursor-pointer" 
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isLoading ? 'Processing...' : 'Confirm & Invest'}
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

export default InvestmentPage;