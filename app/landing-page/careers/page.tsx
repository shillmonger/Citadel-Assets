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
src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2024/03/CitadelSecurities_Careers.jpg"            alt="Citadel Securities Office"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlapping Blue Box */}
        <div className="absolute -bottom-16 right-0 w-full md:w-[48%] lg:w-[43%] bg-[#1D429A] p-10 md:p-16 text-white border-l-4 border-[#70E0D8] z-10">
          <div className="max-w-md">
            <h1 className="text-4xl md:text-[40px] font-bold leading-[1.1] mb-8">
               Achieve More Here
            </h1>
            <p className="text-lg mb-10 text-blue-50 font-medium">
              Collaborate with the world’s brightest minds to solve the markets’ most 
             interesting and complicated problems.
            </p>
            <button className="inline-block bg-[#70E0D8] text-[#00205B] font-bold py-3 px-10 rounded-full cursor-pointer hover:bg-white transition-all duration-300">
              View Open Roles
            </button>
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
