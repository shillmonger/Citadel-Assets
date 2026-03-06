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
            src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2022/10/Citadel_Securities_What_We_Do.jpg"
            alt="Citadel Securities Office"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlapping Blue Box */}
        <div className="absolute -bottom-16 right-0 w-full md:w-[48%] lg:w-[43%] bg-[#1D429A] p-10 md:p-16 text-white border-l-4 border-[#70E0D8] z-10">
          <div className="max-w-md">
            <h1 className="text-4xl md:text-[40px] font-bold leading-[1.1] mb-8">
              Innovating Global Trading{" "}
            </h1>
            <p className="text-lg text-blue-50 font-medium">
              We provide liquidity to ensure institutions and retail investors
              can trade what they want, when they want—in all market conditions
              around the world.
            </p>
          </div>
        </div>
      </main>

      {/* Section 1*/}
      <section className="bg-[#EDEDED] py-20 px-6 font-sans">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {/* Row 1: Main Title & Intro Paragraph */}
            <div className="flex flex-col">
              <h2 className="text-4xl md:text-5xl tracking-tight text-[#1A1A1A] leading-[1.1]">
                Only at Citadel Securities
              </h2>
            </div>

            <div className="pt-2">
              <p className="text-[17px] leading-[1.4] text-[#1A1A1A] max-w-prose">
                We constantly look to improve how markets work. Determined to
                drive change, we envision and execute a range of ambitious
                initiatives that could only happen here.
              </p>
            </div>

            {/* Row 2: MEMX Title & Detailed Text */}
            <div className="mt-8 md:mt-0">
              <h3 className="text-[28px] md:text-2xl font-medium text-[#1A1A1A] leading-tight">
                MEMX: Building an Equities <br className="hidden md:block" />
                Exchange from the Ground Up
              </h3>

              {/* MEMX Logo Card */}
              <div className="mt-10 bg-white aspect-[4/3] flex items-center justify-center p-12 max-w-[400px]">
                <img
                  src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2022/11/MEMX_Logo_RBG_blueandyellow-e1668533542971.png"
                  alt="MEMX Logo"
                  className="w-full h-auto"
                />
              </div>
            </div>

            <div className="space-y-6 text-[15px] leading-[1.6] text-[#1A1A1A] pt-4">
              <p>
                As we assessed public exchanges in the U.S., we asked: How can
                we create an exchange today that leverages the most modern
                technology available? We believed a new kind of exchange could
                increase competition, drive operational transparency and enable
                lower costs for investors. We were confident we could create it.
              </p>

              <p>
                Convening leading financial services firms, including major
                banks, broker-dealers and even other market makers, we led the
                creation of an exchange founded and run by its members. An
                all-electronic exchange leveraging industry-leading technology,
                MEMX enables its members to provide even more liquidity to the
                market.
              </p>

              <p>
                In just over two years, MEMX went from being an idea on a
                whiteboard to the fastest growing US equities exchange. Today,
                MEMX is at 6.5% market share excluding TRF, with an average
                daily notional volume of $18.7 billion in May 2022—up from $6.7
                billion in May 2021.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2*/}
      <section className="relative bg-[#1D429A] pt-10 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Heading Area - Updated to match image */}
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            {/* Left: Big Title */}
            <div>
              <h2 className="text-5xl md:text-5xl font-normal tracking-tighter text-white leading-[1.05]">
                Expertise Across
                <br /> Asset Classes
              </h2>
            </div>

            {/* Right: Paragraph - exactly as in the screenshot */}
            <div className="text-white text-lg leading-relaxed pt-3">
              We meet clients’ liquidity needs across a range of asset classes.
              For more than two decades we’ve been a trusted partner to the
              world’s most important financial institutions, from public pension
              programs to central banks and broker-dealers.
            </div>
          </div>

          {/* Overlapping Cards Grid - Updated content + styling to match image */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative -mb-32">
            {/* Card 1: Equities */}
            <div className="bg-[#F4F4F4] rounded-lg p-8 flex flex-col justify-between min-h-[240px] shadow-lg group hover:-translate-y-2 transition-transform duration-300">
              <div>
                <h3 className="text-3xl font-semibold text-zinc-900 mb-6">
                  Equities
                </h3>
                <p className="text-zinc-700 leading-relaxed text-[15px]">
                  The largest provider of equities liquidity across global
                  capital markets.
                </p>
              </div>
              <a
                href="#"
                className="flex items-center gap-2 text-[#1D429A] font-semibold text-sm group-hover:gap-4 transition-all mt-auto"
              >
                Explore Equities <span className="text-xl">›</span>
              </a>
            </div>

            {/* Card 2: Options */}
            <div className="bg-[#F4F4F4] rounded-lg p-8 flex flex-col justify-between min-h-[240px] shadow-lg group hover:-translate-y-2 transition-transform duration-300">
              <div>
                <h3 className="text-3xl font-semibold text-zinc-900 mb-6">
                  Options
                </h3>
                <p className="text-zinc-700 leading-relaxed text-[15px]">
                  The largest U.S. options market maker for all major options
                  classes.
                </p>
              </div>
              <a
                href="#"
                className="flex items-center gap-2 text-[#1D429A] font-semibold text-sm group-hover:gap-4 transition-all mt-auto"
              >
                Explore Options <span className="text-xl">›</span>
              </a>
            </div>

            {/* Card 3: Fixed Income & FX */}
            <div className="bg-[#F4F4F4] rounded-lg p-8 flex flex-col justify-between min-h-[240px] shadow-lg group hover:-translate-y-2 transition-transform duration-300">
              <div>
                <h3 className="text-3xl font-semibold text-zinc-900 mb-6">
                  Fixed Income &amp; FX
                </h3>
                <p className="text-zinc-700 leading-relaxed text-[15px]">
                  Firm prices, fast quotes and consistent liquidity in fixed
                  income and currencies in over 50 markets.
                </p>
              </div>
              <a
                href="#"
                className="flex items-center gap-2 text-[#1D429A] font-semibold text-sm group-hover:gap-4 transition-all mt-auto"
              >
                Explore Fixed Income &amp; FX <span className="text-xl">›</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for the overlap effect - kept exactly as you had */}
      <div className="h-30 bg-white" />

      {/* Section 3 */}
      <section className="bg-white font-sans">
        {/* Top Section: Competitive Advantage */}
        <div className="max-w-7xl mx-auto px-6 py-20 lg:px-0">
          <div>
            <h2 className="text-5xl md:text-5xl font-normal tracking-tight text-[#1a1a1a] mb-16 leading-[1.1]">
              Our Competitive
              <br />
              Advantage
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Exceptional Talent */}
              <div className="border-l border-gray-300 pl-6">
                <h3 className="text-[28px] font-normal text-[#1a1a1a] mb-6 leading-tight">
                  Exceptional Talent
                </h3>
                <p className="text-[14px] leading-relaxed text-[#4a4a4a]">
                  The brightest minds in finance, mathematics and technology
                  solve consequential problems here. Our people drive
                  operational excellence and help create more dependable global
                  markets.
                </p>
              </div>

              {/* Industry-Leading Analytics */}
              <div className="border-l border-gray-300 pl-6">
                <h3 className="text-[28px] font-normal text-[#1a1a1a] mb-6 leading-tight">
                  Industry-Leading Analytics
                </h3>
                <p className="text-[14px] leading-relaxed text-[#4a4a4a]">
                  We build and deploy powerful, industry-leading predictive
                  models. We continuously price hundreds of thousands of
                  securities simultaneously across markets and geographies,
                  while effectively absorbing risk on behalf of our clients.
                </p>
              </div>

              {/* Scalable, Resilient Platform */}
              <div className="border-l border-gray-300 pl-6">
                <h3 className="text-[28px] font-normal text-[#1a1a1a] mb-6 leading-tight">
                  Scalable, Resilient Platform
                </h3>
                <p className="text-[14px] leading-relaxed text-[#4a4a4a]">
                  Our platform is built to scale, meeting client needs with
                  virtually unmatched speed. We pay special attention to systems
                  design, so we can manage and minimize complexity and adapt to
                  evolving market dynamics.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Market Maker (Full width background) */}
        <div className="bg-[#f2f2f2] py-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-0">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left Title */}
              <div>
                <h2 className="text-5xl md:text-5xl font-normal tracking-tight text-[#1a1a1a] leading-[1.1]">
                  What Is a<br />
                  Market Maker?
                </h2>
              </div>

              {/* Right Content */}
              <div className="max-w-xl">
                <div className="space-y-6 text-[16px] leading-snug text-[#1a1a1a]">
                  <p>
                    One of the functions we perform is market making. A market
                    maker participates in the market at all times, providing
                    liquidity to investors by buying securities from sellers and
                    selling securities to buyers.
                  </p>
                  <p>
                    We innovate and compete with other market makers to deliver
                    better outcomes for investors. By providing dependable
                    liquidity, market makers build confidence in market
                    integrity.
                  </p>
                </div>

                <button className="mt-10 bg-[#1e40af] cursor-pointer hover:bg-[#1a368a] transition-colors text-white text-sm font-semibold py-4 px-10 rounded-full">
                  Market Making Explained
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
