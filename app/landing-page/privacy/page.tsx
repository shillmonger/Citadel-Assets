"use client";
import Link from "next/link";
import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";
import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <Header />

      <main className="flex-grow">
        {/* Blue Hero Banner */}
        <section className="bg-[#1e40af] py-16 px-6 md:px-20">
          <div className="max-w-7xl mx-auto border-l-2 border-cyan-400 pl-6">
            <h1 className="text-4xl md:text-5xl font-medium text-white">
              Privacy
            </h1>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-12 px-6 md:px-20 max-w-7xl mx-auto text-gray-800">
          
        </section>
      </main>

      <Footer />
    </div>
  );
}