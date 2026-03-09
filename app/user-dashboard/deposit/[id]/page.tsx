"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import QRCode from "qrcode";

import { 
  ChevronRight, 
  Copy, 
  CheckCircle2, 
  Upload, 
  QrCode, 
  ArrowLeft 
} from "lucide-react";
import Header from "@/components/user-dashboard/header";
import Sidebar from "@/components/user-dashboard/sidebar";
import Navbar from "@/components/user-dashboard/navbar";

const MakePaymentPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const params = useParams();
  
  // Payment methods data
  const paymentMethods = {
    bitcoin: { name: "Bitcoin", address: "bc1qnw5qxtvsayve32042dkruqnrcwx32r8vw4yfmd", network: "BTC" },
    ethereum: { name: "Ethereum", address: "0xc28938a688215b45328068A6B5204f33e3051440", network: "ETH" },
    "usdt trc20": { name: "USDT TRC20", address: "TBdVHRagTQvoZ1o38Q3Gn5wUHFWFdLWuGX", network: "TRC20" },
    xrp: { name: "XRP", address: "rUABG73PfQR2616j9RjLCzv8WXsp7CkjLu", network: "XRP" },
    doge: { name: "DOGE", address: "DGPybWe6RMp4AyiNzphenLzgWciRw9wXmP", network: "DOGE" },
    litecoin: { name: "Litecoin", address: "ltc1qdl05yxg8k2qwvfxyxgt8vdlwmjg9h0vulau0rm", network: "LTC" },
    solana: { name: "Solana", address: "Cgt3agGCp4ce5SfSuixJn3N1ByizfvLcNJeeYDWJha4D", network: "SOL" }
  };
  
  const paymentMethod = paymentMethods[params.id as keyof typeof paymentMethods] || paymentMethods.doge;
  const paymentDetails = {
    method: paymentMethod.name,
    amount: "100",
    address: paymentMethod.address,
    network: paymentMethod.network
  };

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const qrData = `${paymentDetails.address}:${paymentDetails.amount}`;
        const url = await QRCode.toDataURL(qrData);
        setQrCodeUrl(url);
      } catch (err) {
        console.error('Error generating QR code:', err);
      }
    };
    
    generateQRCode();
  }, [paymentDetails.address, paymentDetails.amount]);

  const handleCopy = () => {
    navigator.clipboard.writeText(paymentDetails.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

      <main className="flex-1 w-full flex flex-col min-w-0 mb-30 md:mb-0">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="p-4 md:p-8 w-full max-w-[1000px] mx-auto">
          {/* Page Title & Back Nav */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-[#76EAD7] rounded-full"></div>
              <h2 className="text-[#1D429A] text-xl md:text-3xl font-bold">Make Payment</h2>
            </div>
            <Link href="/user-dashboard/deposit">
              <button className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-[#1D429A] transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Status Header */}
            <div className="bg-[#1D429A]/5 p-4 md:p-6 border-b border-gray-100">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-[#1D429A] text-white text-[10px] uppercase tracking-tighter px-3 py-1 rounded-full font-bold">
                  Your payment method
                </span>
                <div className="flex items-center gap-2 text-[#1D429A] font-bold">
                  {paymentDetails.method} <ChevronRight className="w-4 h-4 text-[#76EAD7]" />
                </div>
              </div>
            </div>

            <div className="p-6 md:p-10">
              {/* Payment Instructions */}
              <div className="text-center mb-10">
                <p className="text-gray-500 text-lg">
                  You are to make payment of <span className="text-[#1D429A] font-bold">${paymentDetails.amount}</span> using your selected payment method.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-10 items-center">
                {/* QR Code */}
                <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                  <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
                    {qrCodeUrl ? (
                      <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32" />
                    ) : (
                      <QrCode className="w-32 h-32 text-[#1D429A]" />
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest text-center">
                    Scan to pay via wallet app
                  </p>
                </div>

                {/* Address & Upload Section */}
                <div className="space-y-6">
                  <div>
                    <label className="text-[#1D429A] font-bold text-xs uppercase tracking-widest mb-3 block">
                      {paymentDetails.method} Address:
                    </label>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-600 break-all font-mono">
                        {paymentDetails.address}
                      </div>
                      <button 
                        onClick={handleCopy}
                        className="bg-[#1D429A] text-white cursor-pointer p-3 rounded-lg hover:bg-[#16357a] transition-colors shadow-md"
                      >
                        {copied ? <CheckCircle2 className="w-5 h-5 text-[#76EAD7]" /> : <Copy className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="mt-2 text-[10px] text-gray-400 font-bold">
                      NETWORK TYPE: <span className="text-[#1D429A]">{paymentDetails.network}</span>
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <label className="text-[#1D429A] font-bold text-xs uppercase tracking-widest mb-3 block">
                      Upload Payment Proof
                    </label>
                    <div className="relative group">
                      <input 
                        type="file" 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                      />
                      <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex items-center justify-center gap-3 group-hover:border-[#76EAD7] transition-colors bg-white">
                        <Upload className="w-5 h-5 text-gray-400 group-hover:text-[#1D429A]" />
                        <span className="text-sm text-gray-500 font-medium">Choose File</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Final Action */}
              <div className="mt-12 flex justify-center">
                <button className="cursor-pointer bg-[#1D429A] text-white px-12 py-4 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all flex items-center gap-3">
                  Submit Payment
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

export default MakePaymentPage;