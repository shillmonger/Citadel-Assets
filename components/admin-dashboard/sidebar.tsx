"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  Settings,
  LogOut,
  GraduationCap,
  Briefcase,
  Wallet,
  X,
  LayoutGrid,
  ArrowDownCircle,
  User,
  UserCog,
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) {
  const pathname = usePathname();

  const sidebarItems = [
    {
      name: "Dashboard",
      icon: LayoutGrid, // 📊 Grid icon for overview
      href: "/admin-dashboard/dashboard",
    },
    {
      name: "User Management",
      icon: Users, // 👥 Group icon for managing multiple users
      href: "/admin-dashboard/user-management",
    },
    {
      name: "Manage Deposite",
      icon: Wallet, // 📥 Inward arrow for incoming deposits
      href: "/admin-dashboard/manage-deposite",
    },
    {
      name: "Manage Account",
      icon: UserCog, // ⚙️ User with gear for account-level settings
      href: "/admin-dashboard/manage-account",
    },
    {
      name: "Investment Payouts",
      icon: Briefcase, // 💼 Suitcase for professional/investment payouts
      href: "/admin-dashboard/investment-payouts",
    },
    {
      name: "Role Settings",
      icon: Settings, // 🛠️ Gear for system roles/permissions
      href: "/admin-dashboard/role-settings",
    },
    {
      name: "Switch to User",
      icon: User, // 🎓 Cap for switching perspective/roles
      href: "/user-dashboard/dashboard",
    },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-500
w-full lg:w-70 transform bg-white border-r border-gray-100
transition-transform duration-300 ease-in-out
lg:translate-x-0 lg:static lg:inset-0 shadow-sm`}
      >
        {/* Header/Logo Section */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-50">
          <Link
            href="/admin-dashboard/dashboard"
            className="flex items-center gap-3"
          >
            <img
              src="https://i.postimg.cc/fTn5RHNM/mobile-logo.png"
              alt="Citadel Assets"
              className="h-6 w-auto"
            />
          </Link>

          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-50 cursor-pointer"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5 text-[#1D429A]" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-8 space-y-2">
          {sidebarItems.map(({ name, icon: Icon, href }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                isActive(href)
                  ? "bg-[#1D429A] text-white shadow-md"
                  : "text-gray-400 hover:bg-gray-50 hover:text-[#1D429A]"
              }`}
            >
              <Icon
                className={`w-5 h-5 mr-3 ${isActive(href) ? "text-[#76EAD7]" : ""}`}
              />
              {name}
            </Link>
          ))}

          {/* Spacer */}
          <div className="pt-4 pb-2">
            <div className="border-t border-gray-50 mx-4" />
          </div>

          {/* Logout */}
          <button className="flex items-center w-full px-4 py-3 text-gray-400 font-bold text-xs uppercase tracking-widest hover:bg-red-50 hover:text-red-500 transition-all rounded-xl cursor-pointer">
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}
