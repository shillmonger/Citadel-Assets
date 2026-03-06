"use client";
import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
      <section className="pt-24 pb-24 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col gap-20">
          {/* Part 1: Transformation */}
          <div className="flex flex-col md:flex-row md:justify-between items-start gap-12">
            <div className="md:max-w-xl">
              <h2 className="text-5xl md:text-5xl font-normal tracking-tight text-zinc-900 leading-[1.05]">
                A Force for <br /> Transformation
              </h2>
            </div>

            <div className="flex flex-col gap-6 md:max-w-xl pt-2">
              <p className="text-xl md:text-2xl text-zinc-900 leading-relaxed font-normal">
                We are the next-generation capital markets firm, operating at
                extraordinary pace and vast scale.
              </p>
              <p className="text-lg text-zinc-700 leading-relaxed">
                Our people—and the systems we build—are at the center of global
                markets. Engineers, traders and researchers harness leading-edge
                quantitative research and the accelerating power of compute,
                machine learning and AI to power our analytics and tackle the
                market’s most critical challenges.
              </p>
              <p className="text-lg text-zinc-700 leading-relaxed">
                Our scale creates a powerful network effect that continuously
                enhances the liquidity solutions we deliver for our clients.
              </p>
            </div>
          </div>

          {/* Part 2: Culture */}
          <div className="flex flex-col md:flex-row md:justify-between items-start gap-12">
            <div className="md:max-w-xl">
              <h2 className="text-5xl md:text-4xl font-normal tracking-tight text-zinc-900 leading-[1.05]">
                Empowered by Our Culture
              </h2>
            </div>

            <div className="flex flex-col items-start gap-10 md:max-w-xl pt-2">
              <p className="text-xl text-zinc-800 leading-relaxed">
                Our culture is one of a kind—shaping the way we work, socialize
                and support our communities.
              </p>

              <button className="bg-[#1D429A] text-white cursor-pointer text-sm font-semibold py-4 px-10 rounded-full hover:bg-[#16357a] transition-all shadow-sm">
                Discover Our Culture
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2*/}
      <section className="px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto">

          {/* MOBILE VIEW: Shadcn Carousel */}
          <div className="block md:hidden">
            <Carousel className="w-full">
              <CarouselContent>
                {["https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/03/425-Park-_12-fl_241216_340.jpg", "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/03/BeachCleanup_231112_172.jpg", "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2026/02/NYFireworkViewingCelebration_250704_1357.jpg", "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/03/RTF22016_234.jpg", "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/03/CitSecTownHall_240424_1484-1350x900.jpg"].map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-[4/3] overflow-hidden rounded-sm">
                      <img src={src} alt="Culture" className="w-full h-full object-cover" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-end gap-2 mt-4">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </div>

          {/* DESKTOP VIEW: Mosaic Grid */}
          <div className="hidden md:grid grid-cols-12 gap-4 h-[600px]">
            {/* Left Column: Two stacked images */}
            <div className="col-span-3 flex flex-col gap-4">
              <div className="flex-1 overflow-hidden rounded-sm">
                <img src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/03/425-Park-_12-fl_241216_340.jpg" className="w-full h-full object-cover" alt="Team" />
              </div>
              <div className="flex-1 overflow-hidden rounded-sm">
                <img src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/03/RTF22016_234.jpg" className="w-full h-full object-cover" alt="Volunteering" />
              </div>
            </div>

            {/* Center Column: Large focus image */}
            <div className="col-span-6 overflow-hidden rounded-sm">
              <img src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/03/BeachCleanup_231112_172.jpg" className="w-full h-full object-cover" alt="Community" />
            </div>

            {/* Right Column: Two stacked images */}
            <div className="col-span-3 flex flex-col gap-4">
              <div className="flex-1 overflow-hidden rounded-sm">
                <img src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2026/02/NYFireworkViewingCelebration_250704_1357.jpg" className="w-full h-full object-cover" alt="Celebration" />
              </div>
              <div className="flex-1 overflow-hidden rounded-sm">
                <img src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/03/CitSecTownHall_240424_1484-1350x900.jpg" className="w-full h-full object-cover" alt="Perspective" />
              </div>
            </div>
          </div>

          {/* CTA Button */}
         <div className="mt-5 md:hidden">
  <button className="bg-[#1D429A] text-white cursor-pointer text-sm font-semibold py-4 px-12 rounded-full hover:bg-[#16357a] transition-all w-full">
    Discover Our Culture
  </button>
</div>
        </div>
      </section>





      {/* Section 3 */}

      {/* Sextion 4 */}

      <Footer />
    </div>
  );
}
