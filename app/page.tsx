"use client";
import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";

import React, { useState, useRef } from "react";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white dark:bg-black">
      <Header />

      {/* Hero Section*/}
      <main className="relative h-screen w-full">
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/04/Edit_9.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        {/* Overlapping Blue Box */}
        <div className="absolute -bottom-16 right-0 w-full md:w-[48%] lg:w-[43%] bg-[#1D429A] p-10 md:p-16 text-white border-l-4 border-[#70E0D8] z-10">
          <div className="max-w-md">
            <h1 className="text-4xl md:text-[40px] font-bold leading-[1.1] mb-8">
              Forging the Future of Global Capital Markets
            </h1>
            <p className="text-lg mb-10 text-blue-50 font-medium">
              We move markets forward through our trading, research and
              technology.
            </p>
            <button className="inline-block bg-[#70E0D8] text-[#00205B] font-bold py-3 px-10 rounded-full cursor-pointer hover:bg-white transition-all duration-300">
              Explore Who We Are
            </button>
          </div>
        </div>
      </main>

      {/* Section 1*/}
      <section className="pt-20 pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Top Row: Title and Description */}
          <div className="flex flex-col md:flex-row md:justify-between items-start gap-8 md:gap-12 py-16 max-w-7xl mx-auto">
            {/* Left Side: Heading */}
            <div className="md:max-w-xl">
              <h2 className="text-5xl md:text-5xl font-normal tracking-tight text-zinc-900 leading-[1.1]">
                Proven Innovators.
                <br />
                Trusted Partners.
              </h2>
            </div>

            {/* Right Side: Description and CTA */}
            <div className="flex flex-col items-start md:max-w-md pt-2">
              <p className="text-lg md:text-xl text-zinc-800 mb-10 leading-relaxed">
                Incredible people. Powerful predictive models. Systems that
                scale. We leverage our strengths to provide liquidity you depend
                on.
              </p>

              <button className="bg-[#1D429A] text-white cursor-pointer text-sm font-semibold py-4 px-10 rounded-full hover:bg-[#16357a] transition-all shadow-sm">
                Explore What We Do
              </button>
            </div>
          </div>

          {/* Bottom Row: Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-zinc-100">
            {/* Stat 1 */}
            <div className="py-12 border-l border-zinc-200 pl-6 first:border-l-0">
              <div className="flex items-baseline gap-1">
                <span className="text-6xl font-bold text-[#1D429A]">1,800</span>
                <span className="text-2xl font-bold text-[#1D429A]">+</span>
              </div>
              <p className="mt-4 text-zinc-600 text-sm">
                Employees <sup className="text-[10px]">1</sup>
              </p>
            </div>

            {/* Stat 2 */}
            <div className="py-12 border-l border-zinc-200 pl-6">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-[#1D429A] self-start mt-2">
                  $
                </span>
                <span className="text-6xl font-bold text-[#1D429A]">575B</span>
              </div>
              <p className="mt-4 text-zinc-600 text-sm">
                Notional traded a day across 50+ equity and fixed income markets{" "}
                <sup className="text-[10px]">2</sup>
              </p>
            </div>

            {/* Stat 3 */}
            <div className="py-12 border-l border-zinc-200 pl-6">
              <span className="text-6xl font-bold text-[#1D429A]">1,600</span>
              <p className="mt-4 text-zinc-600 text-sm">
                Institutional clients <sup className="text-[10px]">3</sup>
              </p>
            </div>

            {/* Stat 4 */}
            <div className="py-12 border-l border-zinc-200 pl-6">
              <span className="text-6xl font-bold text-[#1D429A]">8x</span>
              <p className="mt-4 text-zinc-600 text-sm leading-relaxed">
                years as a Risk Awards Flow Market Maker of the Year, from 2017
                to 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2*/}
      <section className="relative w-full">
        {/* Blue Header Background */}
        <div className="bg-[#1D429A] pt-20 pb-40 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-start gap-8 md:gap-12 py-16">
            <h2 className="text-5xl md:text-5xl text-white font-normal tracking-tight leading-[1.1] md:max-w-xl">
              More Than 20 Years
              <br />
              of Trailblazing
            </h2>
            <p className="text-white text-lg md:text-xl md:max-w-md pt-2 leading-relaxed opacity-90">
              Together, we’ve imagined, innovated and created a next-generation
              platform that operates at global scale.
            </p>
          </div>
        </div>

        {/* Video Player Container - Overlaps with matching max-width */}
        <div className="relative -mt-32 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="relative group cursor-pointer overflow-hidden rounded-sm shadow-2xl bg-black">
              <video
                ref={videoRef}
                className="w-full aspect-video object-cover"
                poster="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2024/09/Reverberations.jpg"
                src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/06/Reverberations_Updated_2-lowres-1.mp4"
                controls={isPlaying}
              />

              {!isPlaying && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/20"
                  onClick={handlePlayVideo}
                >
                  <button className="w-16 h-16 md:w-24 md:h-24 bg-[#76EAD7] cursor-pointer rounded-full flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-8 h-8 md:w-12 md:h-12 text-[#1D429A] fill-current"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Content - Styled exactly like Section 1 */}
        <div className="pt-24 pb-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            {/* Top Row: Title and Description */}
            <div className="flex flex-col md:flex-row md:justify-between items-start gap-8 md:gap-12 py-16">
              <div className="md:max-w-xl">
                <h2 className="text-5xl md:text-5xl font-normal tracking-tight text-zinc-900 leading-[1.1]">
                  Extraordinary Talent.
                  <br />
                  Exceptional Teamwork.
                </h2>
              </div>
              <div className="flex flex-col items-start md:max-w-md pt-2">
                <p className="text-lg md:text-xl text-zinc-800 leading-relaxed">
                  Our people succeed as a team. The brightest minds across a
                  range of disciplines collaborate to realize our ambitions. We
                  always seek a better way, and we're just getting started.
                </p>
              </div>
            </div>

            {/* Bottom Row: Stats Grid (Matching Section 1 Borders and Spacing) */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-zinc-100">
              {/* Stat 1 */}
              <div className="py-12 border-l border-zinc-200 pl-6 first:border-l-0">
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-bold text-[#1D429A]">45</span>
                  <span className="text-3xl font-bold text-[#1D429A]">%</span>
                </div>
                <p className="mt-4 text-zinc-600 text-sm leading-relaxed uppercase tracking-wider">
                  Team members who hold an advanced degree{" "}
                  <sup className="text-[10px]">4</sup>
                </p>
              </div>

              {/* Stat 2 */}
              <div className="py-12 border-l border-zinc-200 pl-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-bold text-[#1D429A]">270</span>
                  <span className="text-3xl font-bold text-[#1D429A]">+</span>
                </div>
                <p className="mt-4 text-zinc-600 text-sm leading-relaxed uppercase tracking-wider">
                  PhDs across 40+ fields of study{" "}
                  <sup className="text-[10px]">4</sup>
                </p>
              </div>

              {/* Stat 3 */}
              <div className="py-12 border-l border-zinc-200 pl-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-bold text-[#1D429A]">~90</span>
                </div>
                <p className="mt-4 text-zinc-600 text-sm leading-relaxed uppercase tracking-wider">
                  Countries represented <sup className="text-[10px]">4</sup>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
