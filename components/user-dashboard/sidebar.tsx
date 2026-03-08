"use client";

import React from "react";
import {
  Home,
  Download,
  History,
  ArrowRightLeft,
  ArrowUpCircle,
  User,
  LayoutGrid,
  Sprout,
  Users,
  X,
  Wallet,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const sidebarLinks = [
    { name: "Home", icon: <Home />, active: true },
    { name: "Deposit", icon: <Download /> },
    { name: "Profit History", icon: <History /> },
    { name: "Transactions", icon: <LayoutGrid /> },
    { name: "Withdraw", icon: <ArrowUpCircle /> },
    { name: "Withdraw Connect", icon: <ArrowRightLeft /> },
    { name: "Transfer funds", icon: <ArrowRightLeft /> },
    { name: "Profile", icon: <User /> },
    { name: "Investment Plans", icon: <Sprout /> },
    { name: "My Plans", icon: <Sprout /> },
    { name: "Referrals", icon: <Users /> },
  ];

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-100 flex flex-col py-6
        transform transition-transform duration-300 ease-in-out
        overflow-y-auto overscroll-contain
        w-full sm:w-80
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:relative lg:translate-x-0 lg:w-64 lg:overflow-y-auto lg:flex-shrink-0
      `}
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {/* Close button — mobile only */}
      <div className="flex justify-end w-full px-4 mb-2 lg:hidden">
        <button
          className="cursor-pointer text-gray-400 hover:text-gray-700 transition-colors"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* User profile */}
      <div className="flex flex-col items-center mb-8 px-4">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-2 border-2 border-[#76EAD7]">
          <User className="w-12 h-12 text-gray-300" />
        </div>
        <h2 className="font-bold text-gray-800 text-lg">Evelyn W</h2>
        <span className="text-xs text-[#76EAD7] flex items-center gap-1 font-semibold uppercase tracking-tighter mt-0.5">
          <span className="w-2 h-2 bg-[#76EAD7] rounded-full animate-pulse inline-block"></span> online
        </span>
        <div className="mt-3 bg-white border border-gray-100 rounded-full px-4 py-1 flex items-center gap-2 shadow-sm">
          <div className="bg-[#1D429A] p-1 rounded-full">
            <Wallet className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-bold text-[#1D429A]">$0.00</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="w-full px-4 grid grid-cols-2 gap-y-6 text-center">
        {sidebarLinks.map((link) => (
          <div
            key={link.name}
            className="flex flex-col items-center cursor-pointer group"
          >
            <div
              className={`p-3 rounded-xl mb-1 transition-all duration-300 ${
                link.active
                  ? "bg-[#1D429A] text-white shadow-lg shadow-blue-200"
                  : "text-gray-400 group-hover:text-[#1D429A] group-hover:bg-blue-50"
              }`}
            >
              {React.cloneElement(link.icon, { size: 20 })}
            </div>
            <span
              className={`text-[10px] font-bold uppercase tracking-tight ${
                link.active ? "text-[#1D429A]" : "text-gray-500"
              }`}
            >
              {link.name}
            </span>
          </div>
        ))}
      </nav>

      {/* Help Card */}
      <div className="mt-10 mx-4 p-5 rounded-2xl bg-[#1D429A] text-center relative overflow-hidden flex-shrink-0 mb-4">
        <div className="absolute top-0 right-0 w-16 h-16 bg-[#76EAD7] opacity-10 rounded-full -mr-8 -mt-8"></div>
        <h3 className="font-bold text-white mb-2 relative z-10">Need Help?</h3>
        <p className="text-[10px] text-blue-100 mb-4 relative z-10">
          Contact our 24/7 customer support center
        </p>
        <button className="cursor-pointer bg-[#76EAD7] text-[#1D429A] text-xs font-bold py-2.5 px-6 rounded-full w-full shadow-md relative z-10 hover:bg-white transition-colors">
          Contact Us
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;