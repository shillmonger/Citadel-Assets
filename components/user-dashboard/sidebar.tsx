"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  LineChart,
  LogOut,
  Lock
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  // Get user data from localStorage and API
  const [userData, setUserData] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      // First try to get from localStorage
      const storedUserData = localStorage.getItem('user-data');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }

      // Then try to get fresh data from API
      const token = localStorage.getItem('auth-token') ||
                   document.cookie.split('; ').find(row => row.startsWith('auth-token='))?.split('=')[1];
      
      if (token) {
        const response = await fetch('/api/user/info', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
          // Update localStorage with fresh data
          localStorage.setItem('user-data', JSON.stringify(data.user));
        }
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user has admin role
  const isAdmin = userData?.roles?.includes('admin') || false;

  const sidebarLinks = [
    { name: "Home", icon: <Home />, href: "/user-dashboard/dashboard" },
    { name: "Deposit", icon: <Download />, href: "/user-dashboard/deposit" },
    { name: "Profit History", icon: <History />, href: "/user-dashboard/profit-history" },
    { name: "Transactions", icon: <LayoutGrid />, href: "/user-dashboard/transactions" },
    { name: "Withdraw", icon: <ArrowUpCircle />, href: "/user-dashboard/withdraw" },
    { name: "Transfer funds", icon: <ArrowRightLeft />, href: "#" },
    { name: "Profile", icon: <User />, href: "/user-dashboard/profile" },
    { name: "Investment Plans", icon: <Sprout />, href: "/user-dashboard/investment-plans" },
    { name: "My Plans", icon: <LineChart />, href: "/user-dashboard/my-plans" },
    { name: "Referrals", icon: <Users />, href: "/user-dashboard/referrals" },
    // Only show Admin Hub if user has admin role
    ...(isAdmin ? [{ name: "Admin Hub", icon: <Lock />, href: "/admin-dashboard/dashboard" }] : []),
    { name: "Logout", icon: <LogOut />, href: "/auth-page/login" },
  ];

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-[500] bg-white border-r border-gray-100 flex flex-col py-6
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
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-2 border-2 border-[#1D429A]">
          <User className="w-12 h-12 text-gray-300" />
        </div>
        <h2 className="font-bold text-gray-800 text-lg">{isLoading ? 'Loading...' : (userData?.fullName || 'User')}</h2>
        <span className="text-xs text-[#76EAD7] flex items-center gap-1 font-semibold uppercase tracking-tighter mt-0.5">
          <span className="w-2 h-2 bg-[#76EAD7] rounded-full animate-pulse inline-block"></span> online
        </span>
        <div className="mt-3 bg-white border border-gray-100 rounded-full px-4 py-1 flex items-center gap-2 shadow-sm">
          <div className="bg-[#1D429A] p-1 rounded-full">
            <Wallet className="w-3 h-3 text-white" />
          </div>
          <span className="text-sm font-bold text-[#1D429A]">${isLoading ? '0.00' : (userData?.accountBalance?.toFixed(2) || '0.00')}</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="w-full px-4 grid grid-cols-2 gap-y-6 text-center">
        {sidebarLinks.map((link) => {
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={onClose} // Closes sidebar on mobile after clicking
              className="flex flex-col items-center group cursor-pointer"
            >
              <div
                className={`p-3 rounded-xl mb-1 transition-all duration-300 ${
                  isActive
                    ? "bg-[#1D429A] text-white shadow-lg shadow-blue-200"
                    : "text-gray-400 group-hover:text-[#1D429A] group-hover:bg-blue-50"
                }`}
              >
                {React.isValidElement(link.icon) 
                  ? React.cloneElement(link.icon as React.ReactElement<any>, { size: 20 }) 
                  : link.icon}
              </div>
              <span
                className={`text-[10px] font-bold uppercase tracking-tight transition-colors ${
                  isActive ? "text-[#1D429A]" : "text-gray-500 group-hover:text-[#1D429A]"
                }`}
              >
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Help Card */}
      <div className="mt-10 mx-4 p-5 rounded-2xl bg-[#1D429A] text-center relative overflow-hidden flex-shrink-0 mb-4">
        <div className="absolute top-5 right-3 w-20 h-20 bg-[#76EAD7] opacity-10 rounded-full -mr-8 -mt-8"></div>
        <h3 className="font-bold text-white mb-2 relative z-10">Need Help?</h3>
        <p className="text-[10px] text-blue-100 mb-4 relative z-10">
          Contact our 24/7 customer support center
        </p>

        <Link href="/user-dashboard/support">
        <button className="cursor-pointer bg-[#76EAD7] text-[#1D429A] text-xs font-bold py-2.5 px-6 rounded-full w-full shadow-md relative z-10 hover:bg-white transition-colors">
          Contact Us
        </button>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;