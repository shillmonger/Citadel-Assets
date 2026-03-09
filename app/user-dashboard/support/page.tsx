"use client";

import React, { useState, FormEvent } from "react";
import { Mail, MessageSquare, Send } from "lucide-react";
import Header from "@/components/user-dashboard/header";
import Sidebar from "@/components/user-dashboard/sidebar";
import Navbar from "@/components/user-dashboard/navbar";

const SnowTradeSupport = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Message sent:", message);
    setSent(true);
    setMessage("");
    setTimeout(() => setSent(false), 3000);
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

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 w-full flex flex-col min-w-0 mb-24 md:mb-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="p-4 md:p-8 w-full max-w-full lg:max-w-[1200px] mx-auto">
          {/* Page Title */}
          <div className="flex items-center gap-2 mb-6 md:mb-8">
            <div className="w-1 h-5 bg-[#76EAD7] rounded-full flex-shrink-0"></div>
            <h2 className="text-[#1D429A] text-lg md:text-3xl font-light leading-tight">
              24/7 Customer <span className="font-bold">Support</span>
            </h2>
          </div>

          {/* Support Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Blue top banner */}
            <div className="bg-[#1D429A] px-6 md:px-12 py-10 md:py-14 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 border border-white/20">
                <MessageSquare className="w-8 h-8 text-[#76EAD7]" />
              </div>
              <h2 className="text-white text-xl md:text-3xl font-light mb-2">
                Snow Trade Pty Limited Support
              </h2>
              <p className="text-blue-200 text-sm mb-4">
                For inquiries, suggestions or complaints — mail us
              </p>
              <a
                href="mailto:support@snowtradeptylimited.com"
                className="cursor-pointer inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors border border-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-full"
              >
                <Mail className="w-4 h-4 text-[#76EAD7]" />
                citadellimited@gmail.com
              </a>
            </div>

            {/* Form area */}
            <div className="px-6 md:px-12 py-8 md:py-10 max-w-2xl mx-auto w-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-4 bg-[#76EAD7] rounded-full"></div>
                <h3 className="text-[#1D429A] font-bold text-xs uppercase tracking-widest">
                  Send us a message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-5">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    className="w-full h-40 p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1D429A]/20 focus:border-[#1D429A]/40 resize-none text-sm text-gray-700 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="cursor-pointer w-full bg-[#1D429A] hover:bg-[#16357a] text-white font-bold py-3.5 rounded-full transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
                >
                  {sent ? (
                    <>Message Sent ✓</>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Navbar />
    </div>
  );
};

export default SnowTradeSupport;