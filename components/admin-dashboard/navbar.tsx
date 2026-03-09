"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Wallet,
  Settings,
  User,
  GraduationCap,
} from "lucide-react";

export default function UserNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin-dashboard/dashboard", icon: LayoutGrid },
    { name: "Payments", href: "/admin-dashboard/payments", icon: LayoutGrid },
    {
      name: "Payouts",
      href: "/admin-dashboard/investment-payouts",
      icon: Wallet,
    },
    { name: "Users", href: "/admin-dashboard/user-management", icon: User },
    { name: "Settings", href: "/admin-dashboard/settings", icon: Settings },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-50 
        flex justify-around items-center 
        bg-white py-2 rounded-t-[1rem] 
        shadow-[0_-8px_30px_rgb(0,0,0,0.06)] 
        border-t border-gray-50
        lg:hidden
      "
    >
      {navItems.map(({ name, href, icon: Icon }) => (
        <Link
          key={name}
          href={href}
          className={`
            flex flex-col items-center transition-all duration-300
            ${
              isActive(href)
                ? "text-[#1D429A]"
                : "text-gray-400 hover:text-[#1D429A]"
            }
          `}
        >
          {/* Icon Container */}
          <div
            className={`
              flex items-center justify-center 
              w-12 h-12 rounded-2xl mb-1.5 
              transition-all duration-300
              ${
                isActive(href)
                  ? "bg-[#1D429A] text-[#76EAD7] shadow-lg shadow-[#1D429A]/20 scale-110"
                  : "bg-gray-50 text-gray-400"
              }
            `}
          >
            <Icon className="w-5 h-5" />
          </div>

          {/* Label */}
          <span
            className={`text-[9px] font-bold uppercase tracking-widest ${isActive(href) ? "opacity-100" : "opacity-60"}`}
          >
            {name}
          </span>
        </Link>
      ))}
    </nav>
  );
}
