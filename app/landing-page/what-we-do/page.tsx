"use client";
import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";

import React, { useState, useRef } from "react";

export default function Home() {
  
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white dark:bg-black">
      <Header />

      {/* Hero Section*/}
      <main className="relative h-screen w-full">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/04/425-Park_10-Floor_241217_135_.jpg"
            alt="Citadel Securities Office"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlapping Blue Box */}
        <div className="absolute -bottom-16 right-0 w-full md:w-[48%] lg:w-[43%] bg-[#1D429A] p-10 md:p-16 text-white border-l-4 border-[#70E0D8] z-10">
          <div className="max-w-md">
            <h1 className="text-4xl md:text-[40px] font-bold leading-[1.1] mb-8">
              Next-Generation Global Market Maker
            </h1>
            <p className="text-lg text-blue-50 font-medium">
              We’re a team of traders, researchers and technologists, solving
              the most critical problems in modern markets.
            </p>
          </div>
        </div>
      </main>

      {/* Section 1*/}

      {/* Section 2*/}

      {/* Section 3 */}

      {/* Sextion 4 */}

      <Footer />
    </div>
  );
}
