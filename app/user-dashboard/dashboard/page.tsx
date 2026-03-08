"use client";
import React from "react";
import Link from "next/link";
import {
  Wallet,
  TrendingUp,
  Gift,
  Users,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  User,
} from "lucide-react";

const Dashboard: React.FC = () => {
  // Mock data - in a real app, this would come from an API call
  const userData = {
    username: "JohnDoe",
    fullName: "John Doe",
    email: "john.doe@example.com",
    accountBalance: 10.00,
    welcomeBonus: 10.00,
    totalProfit: 0.00,
    referralBonus: 0.00,
    totalWithdrawal: 0.00,
    totalDeposit: 0.00,
  };

  const stats = [
    {
      title: "Account Balance",
      value: `$${userData.accountBalance.toFixed(2)}`,
      icon: Wallet,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Welcome Bonus",
      value: `$${userData.welcomeBonus.toFixed(2)}`,
      icon: Gift,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Profit",
      value: `$${userData.totalProfit.toFixed(2)}`,
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Referral Bonus",
      value: `$${userData.referralBonus.toFixed(2)}`,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  const transactions = [
    {
      type: "bonus",
      description: "Welcome Bonus",
      amount: 10.00,
      date: new Date().toLocaleDateString(),
      status: "completed",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="bg-blue-100 p-3 rounded-full">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back, {userData.fullName}!
                </h1>
                <p className="text-gray-600">@{userData.username}</p>
              </div>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/auth-page/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-full`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Account Info */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Full Name</span>
                <span className="text-sm font-medium text-gray-900">{userData.fullName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Username</span>
                <span className="text-sm font-medium text-gray-900">@{userData.username}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Email</span>
                <span className="text-sm font-medium text-gray-900">{userData.email}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-600">Total Deposit</span>
                <span className="text-sm font-medium text-gray-900">${userData.totalDeposit.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-sm text-gray-600">Total Withdrawal</span>
                <span className="text-sm font-medium text-gray-900">${userData.totalWithdrawal.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>
            <div className="space-y-4">
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'bonus' ? 'bg-green-100' : 
                        transaction.type === 'deposit' ? 'bg-blue-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'bonus' ? (
                          <Gift className="h-4 w-4 text-green-600" />
                        ) : transaction.type === 'deposit' ? (
                          <ArrowDownLeft className="h-4 w-4 text-blue-600" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-xs text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${
                        transaction.type === 'bonus' || transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'bonus' || transaction.type === 'deposit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">{transaction.status}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <DollarSign className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No transactions yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <ArrowDownLeft className="h-5 w-5 mr-2" />
              Deposit
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <ArrowUpRight className="h-5 w-5 mr-2" />
              Withdraw
            </button>
            <button className="flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              <Users className="h-5 w-5 mr-2" />
              Refer Friends
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;