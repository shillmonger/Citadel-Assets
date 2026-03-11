"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Wallet,
  History,
  Download,
  ArrowUpCircle,
  Users,
  LayoutGrid,
  Sprout,
  TrendingUp,
  Calendar,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import Header from "@/components/user-dashboard/header";
import Sidebar from "@/components/user-dashboard/sidebar";
import Navbar from "@/components/user-dashboard/navbar";

interface InvestmentPlan {
  _id: string;
  selectedPlan: string;
  amount: number;
  duration: number;
  profit: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  totalProfitEarned: number;
  daysCompleted: number;
  profitHistory?: Array<{
    date: string;
    amount: number;
    percentage: number;
  }>;
}

const SnowTradeDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [investmentPlans, setInvestmentPlans] = useState<InvestmentPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchInvestmentPlans();
  }, []);

  const fetchInvestmentPlans = async () => {
    try {
      const response = await fetch("/api/user/investment", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setInvestmentPlans(data.investmentPlans);
        }
      }
    } catch (error) {
      console.error("Error fetching investment plans:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="flex min-h-screen bg-[#F9F9FB] font-sans relative overflow-x-hidden">
      {/* Sidebar Overlay and Sidebar components remain here... */}

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 w-full flex flex-col min-w-0 mb-30 md:mb-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="p-4 md:p-8 w-full max-w-full lg:max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 mb-6 md:mb-8">
            <div className="w-1 h-5 bg-[#76EAD7] rounded-full flex-shrink-0"></div>
            <h2 className="text-[#1D429A] text-lg md:text-3xl font-light leading-tight">
              Invesment <span className="font-bold">Overview</span>
            </h2>
          </div>

          <section className="mb-8 w-full">
            <div className="bg-[#1D429A] p-4 rounded-t-xl mb-4">
              <h3 className="text-white text-lg font-medium">
                My Investment plans (All)
              </h3>
            </div>

            {isLoading ? (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 md:p-20 flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1D429A] mb-4"></div>
                <p className="text-gray-400">Loading investment plans...</p>
              </div>
            ) : investmentPlans.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 md:p-20 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                  <Sprout className="w-10 h-10 text-gray-300" />
                </div>
                <p className="text-gray-400 text-sm md:text-base mb-8 text-center max-w-md italic">
                  You do not have an investment plan at the moment or no value
                  match your query.
                </p>
                <Link href="/user-dashboard/investment-plans">
                  <button className="cursor-pointer bg-[#1D429A] text-white px-10 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#16357a] transition-all">
                    Buy a plan
                  </button>
                </Link>
              </div>
            ) : (
              /* Demarcation: Space-y-6 adds gap between the cards */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {investmentPlans.map((plan) => (
                  <div
                    key={plan._id}
                    className="bg-white rounded-xl border-l-4 border-l-[#1D429A] border border-gray-100 shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    {/* Plan Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-[#1D429A] font-bold text-lg">
                            {plan.selectedPlan}
                          </h4>
                          {plan.isActive ? (
                            <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                              <CheckCircle className="w-3 h-3" />
                              Active
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                              <XCircle className="w-3 h-3" />
                              Completed
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-400 text-xs uppercase mb-1">
                              Investment Amount
                            </p>
                            <p className="text-[#1D429A] font-bold">
                              {formatCurrency(plan.amount)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs uppercase mb-1">
                              Daily Profit
                            </p>
                            <p className="text-[#76EAD7] font-bold">
                              {plan.profit}%
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs uppercase mb-1">
                              Duration
                            </p>
                            <p className="text-[#1D429A] font-bold">
                              {plan.duration} days
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-400 text-xs uppercase mb-1">
                              Progress
                            </p>
                            <p className="text-[#1D429A] font-bold">
                              {plan.daysCompleted}/{plan.duration} days
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress Status</span>
                        <span className="font-bold">
                          {Math.round(
                            (plan.daysCompleted / plan.duration) * 100,
                          )}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5">
                        <div
                          className="bg-[#76EAD7] h-2.5 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min((plan.daysCompleted / plan.duration) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Financial Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2 mb-1">
                          <DollarSign className="w-4 h-4 text-[#1D429A]" />
                          <p className="text-gray-400 text-xs uppercase font-semibold">
                            Total Profit Earned
                          </p>
                        </div>
                        <p className="text-[#76EAD7] font-bold text-lg">
                          {formatCurrency(plan.totalProfitEarned)}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4 text-[#1D429A]" />
                          <p className="text-gray-400 text-xs uppercase font-semibold">
                            Start Date
                          </p>
                        </div>
                        <p className="text-[#1D429A] font-bold">
                          {formatDate(plan.startDate)}
                        </p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-[#1D429A]" />
                          <p className="text-gray-400 text-xs uppercase font-semibold">
                            End Date
                          </p>
                        </div>
                        <p className="text-[#1D429A] font-bold">
                          {formatDate(plan.endDate)}
                        </p>
                      </div>
                    </div>

                    {/* Profit History */}
                    {plan.profitHistory && plan.profitHistory.length > 0 && (
                      <div className="bg-blue-50/30 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className="w-4 h-4 text-[#1D429A]" />
                          <h5 className="text-[#1D429A] font-bold text-sm">
                            Recent Profit History
                          </h5>
                          <span className="text-gray-400 text-xs">
                            ({plan.profitHistory.length} total)
                          </span>
                        </div>
                        <div className="max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                          <div className="space-y-2">
                            {plan.profitHistory
                              .slice(-5)
                              .reverse()
                              .map((profit, index) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between text-xs bg-white p-2.5 rounded border border-gray-100 shadow-sm"
                                >
                                  <div className="flex items-center gap-3">
                                    <span className="text-gray-500">
                                      {formatDate(profit.date)}
                                    </span>
                                    <span className="text-green-600 bg-green-50 px-1.5 py-0.5 rounded font-medium">
                                      +{profit.percentage}%
                                    </span>
                                  </div>
                                  <span className="text-[#1D429A] font-bold">
                                    {formatCurrency(profit.amount)}
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Recent Transactions Section remains here... */}
        </div>
      </main>

      <Navbar />
    </div>
  );
};

export default SnowTradeDashboard;
