"use client";

import React, { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Calendar, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Camera
} from "lucide-react";
import Header from "@/components/user-dashboard/header";
import Sidebar from "@/components/user-dashboard/sidebar";
import Navbar from "@/components/user-dashboard/navbar";

const KYCVerificationPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [docType, setDocType] = useState("passport");

  return (
    <div className="flex min-h-screen bg-[#F9F9FB] font-sans relative overflow-x-hidden">
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 w-full flex flex-col min-w-0 mb-32 lg:mb-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="p-4 md:p-8 w-full max-w-full lg:max-w-[1000px] mx-auto">
          {/* Page Header */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-1 h-5 bg-[#76EAD7] rounded-full flex-shrink-0"></div>
            <h2 className="text-[#1D429A] text-lg md:text-3xl font-light leading-tight">
              Identity<span className="font-bold"> Verification (KYC)</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Step 1: Basic Account Information */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
                <div className="bg-[#1D429A] p-2 rounded-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-[#1D429A] font-bold text-lg">Basic Account Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[#1D429A] font-bold text-xs uppercase tracking-wider">Full Legal Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="John Doe" className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-4 focus:outline-none focus:border-[#76EAD7] text-[#1D429A]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[#1D429A] font-bold text-xs uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="email" placeholder="john@example.com" className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-4 focus:outline-none focus:border-[#76EAD7] text-[#1D429A]" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[#1D429A] font-bold text-xs uppercase tracking-wider">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-4 focus:outline-none focus:border-[#76EAD7] text-[#1D429A]" />
                  </div>
                </div>


                <div className="space-y-2">
                  <label className="text-[#1D429A] font-bold text-xs uppercase tracking-wider">Country of Residence</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="tel" placeholder="Country" className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-4 focus:outline-none focus:border-[#76EAD7] text-[#1D429A]" />
                  </div>
                </div>
              </div>
            </section>

            {/* Step 2: Identity Document Upload */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
                <div className="bg-[#1D429A] p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-[#1D429A] font-bold text-lg">Identity Document Upload</h3>
              </div>

              {/* Document Type Selector */}
              <div className="mb-8">
                <label className="text-[#1D429A] font-bold text-xs uppercase tracking-wider block mb-4">Select Document Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["Passport", "Driver's License", "National ID Card"].map((type) => (
                    <button
                      key={type}
                      onClick={() => setDocType(type.toLowerCase())}
                      className={`py-3 px-4 rounded-xl cursor-pointer border text-sm font-bold transition-all ${
                        docType === type.toLowerCase() 
                        ? "bg-[#1D429A] text-white border-[#1D429A]" 
                        : "bg-white text-gray-500 border-gray-200 hover:border-[#76EAD7]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-3">
                  <p className="text-[#1D429A] font-bold text-xs">Front of ID</p>
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                    <Camera className="w-10 h-10 text-gray-300 group-hover:text-[#1D429A] mb-3 transition-colors" />
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Click to upload front</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[#1D429A] font-bold text-xs">Back of ID (If applicable)</p>
                  <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                    <Camera className="w-10 h-10 text-gray-300 group-hover:text-[#1D429A] mb-3 transition-colors" />
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Click to upload back</p>
                  </div>
                </div>
              </div>

              {/* Rules/Guidelines */}
              <div className="bg-[#E8F8F5] border border-[#76EAD7]/30 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#1D429A] flex-shrink-0 mt-0.5" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
                  <div className="flex items-center gap-2 text-[11px] font-bold text-[#1D429A] uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3 text-[#1D429A]" /> Clear Photo
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-[#1D429A] uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3 text-[#1D429A]" /> No Glare
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-bold text-[#1D429A] uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3 text-[#1D429A]" /> Entire Doc Visible
                  </div>
                </div>
              </div>
            </section>

            {/* Step 3: Agreement & Declaration */}
            <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <div className="space-y-4 mb-8">
                {[
                  "I confirm the information is correct",
                  "I agree to identity verification",
                  "I accept the Terms & Privacy Policy"
                ].map((text, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input type="checkbox" className="peer appearance-none w-5 h-5 border-2 border-gray-200 rounded-md checked:bg-[#1D429A] checked:border-[#1D429A] transition-all" />
                      <CheckCircle2 className="absolute w-3.5 h-3.5 text-white left-[3px] opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-[#1D429A] transition-colors">{text}</span>
                  </label>
                ))}
              </div>

              <button className="w-full bg-[#1D429A] text-white cursor-pointer py-4 rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-900/10 hover:bg-[#16357a] transition-all flex items-center justify-center gap-2">
                Submit Verification
              </button>
            </section>
          </div>
        </div>
      </main>

      <Navbar />
    </div>
  );
};

export default KYCVerificationPage;