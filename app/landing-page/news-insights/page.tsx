"use client";
import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";
import { ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import React, { useState, useRef, useEffect } from "react";
import type { UseEmblaCarouselType } from "embla-carousel-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<UseEmblaCarouselType[1] | null>(null);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect();

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const mediaInsights = [
    {
      date: "February 24, 2026",
      source: "Bloomberg",
      title: "Citadel Securities Rebuts Citrini 'Intelligence Crisis' Scenario",
      description:
        "The rapid expansion of artificial intelligence is unlikely to trigger mass job losses, according to a research note by Citadel Securities, pushing back against a widely circulated report that roiled markets this week.",
      image:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2026/02/AI.jpg",
      linkText: "View Article >",
    },
    {
      date: "February 18, 2026",
      source: "Bloomberg",
      title: "Rubner Says Retail Traders Bought Software Dip at Record Pace",
      description:
        "With Wall Street frantically repricing shares in software makers threatened by AI tools, one group of investors is lining up to buy the dip.",
      image:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2026/02/Scott-Rubner_250616_24-e1772227205822-794x494.jpg",
      linkText: "View Article >",
    },
    {
      date: "February 3, 2026",
      source: "Bloomberg",
      title:
        "Stocks Rally at Risk as Retail Fervor Fades, Says Citadel Securities' Rubner",
      description:
        "January retail net inflows ran more than 50% above the same period last year, according to Citadel Securities data. That pace of buying from the retail crowd is difficult to maintain, particularly in February, a seasonally slower month for equities.",
      image:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2026/02/Bloomberg4-1.jpg",
      linkText: "View Article >",
    },
    {
      date: "January 28, 2026",
      source: "Bloomberg",
      title: "Bond Traders Find New Way to Get Early View of US Credit Markets",
      description:
        "Sam Berberian, global head of credit trading at Citadel Securities, expects transaction costs over time to likely decline as a result of better liquidity and better transparency, which would be a clear benefit for investors.",
      image:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2026/02/NYSE-Branding_250115_1118-794x494.jpg",
      linkText: "View Article >",
    },
    {
      date: "January 23, 2026",
      source: "Bloomberg",
      title:
        "Citadel Founder and CEO Ken Griffin Speaks at 2026 World Economic Forum",
      description:
        "Ken Griffin recently joined world leaders, senior government officials and top business leaders at the 2026 World Economic Forum in Davos, Switzerland.",
      image:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2026/01/Ken-BBG-794x494.png",
      linkText: "View Article >",
    },
    {
      date: "January 9, 2026",
      source: "Bloomberg",
      title: "Retail Crowd's Buying Power Signals More Gains for US Stocks",
      description:
        "The defining feature of retail activity in 2025 was persistent bullishness and after earning more than $20 billion in options on our platform over the course of the year, retail investors now enter January armed with capital to deploy, Citadel Securities' Rubner wrote in a note to clients Tuesday.",
      image:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2026/02/NYSE-Branding_250115_973-794x494.jpg",
      linkText: "View Article >",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white dark:bg-black">
      <Header />

      {/* Hero Section*/}
      <main className="relative h-screen w-full">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2026/02/NYSE-Branding_250115_973-794x494.jpg"
            alt="Citadel Securities Office"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlapping Blue Box */}
        <div className="absolute -bottom-16 right-0 w-full md:w-[48%] lg:w-[43%] bg-[#1D429A] p-10 md:p-16 text-white border-l-4 border-[#70E0D8] z-10">
          <div className="max-w-md">
            <h1 className="text-4xl md:text-[40px] font-bold leading-[1.1] mb-8">
              News & Insights
            </h1>
            <p className="text-lg text-blue-50 font-medium">
              Explore the latest perspectives, research and updates shaping
              global markets, technology and innovation at Citadel Securities.
            </p>
          </div>
        </div>
      </main>

      {/* Section 1*/}
      <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <h2 className="text-5xl font-normal text-[#1a1a1a] tracking-tight max-w-md">
            Our Firm in the Media
          </h2>
          <p className="text-lg text-[#4a4a4a] max-w-xs md:mt-4">
            Explore articles and other coverage about our firm from publications
            around the globe.
          </p>
        </div>

        {/* Desktop Grid / Mobile Carousel */}
        <div className="relative">
          {/* Desktop Grid - 3x3 layout */}
          <div className="hidden md:grid grid-cols-3 gap-8">
            {mediaInsights.map((insight, index) => (
              <div
                key={index}
                className="border-l border-gray-200 pl-6 flex flex-col h-full min-h-[500px]"
              >
                <div className="aspect-[16/10] overflow-hidden mb-6">
                  <img
                    src={insight.image}
                    alt={insight.title}
                    className="w-full h-full object-cover cursor-pointer"
                  />
                </div>

                <div className="mb-4">
                  <p className="text-sm text-[#4a4a4a] mb-1">{insight.date}</p>
                  <p className="text-sm font-medium text-[#1e40af]">
                    {insight.source}
                  </p>
                </div>

                <h3 className="text-xl font-normal text-[#1a1a1a] mb-4 leading-tight">
                  {insight.title}
                </h3>

                <p className="text-[15px] leading-relaxed text-[#4a4a4a] mb-6 flex-grow">
                  {insight.description}
                </p>

                <a
                  href="#"
                  className="group flex items-center gap-2 text-[#2563eb] text-[15px] font-medium hover:underline"
                >
                  {insight.linkText}
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            ))}
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
            <Carousel
              className="w-full"
              opts={{ align: "start", loop: true }}
              setApi={setApi}
            >
              <CarouselContent className="-ml-4">
                {mediaInsights.map((insight, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="border-l border-gray-200 pl-6 flex flex-col h-full min-h-[500px]">
                      <div className="aspect-[16/10] overflow-hidden mb-6">
                        <img
                          src={insight.image}
                          alt={insight.title}
                          className="w-full h-full object-cover cursor-pointer"
                        />
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-[#4a4a4a] mb-1">
                          {insight.date}
                        </p>
                        <p className="text-sm font-medium text-[#1e40af]">
                          {insight.source}
                        </p>
                      </div>

                      <h3 className="text-xl font-normal text-[#1a1a1a] mb-4 leading-tight">
                        {insight.title}
                      </h3>

                      <p className="text-[15px] leading-relaxed text-[#4a4a4a] mb-6 flex-grow">
                        {insight.description}
                      </p>

                      <a
                        href="#"
                        className="group flex items-center gap-2 text-[#2563eb] text-[15px] font-medium hover:underline"
                      >
                        {insight.linkText}
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation Controls (Visible on mobile) */}
              <div className="flex items-center justify-between mt-12">
                <div className="flex gap-2">
                  {mediaInsights.map((_, index) => (
                    <span
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === currentSlide
                          ? "w-8 bg-[#1e40af]"
                          : "w-1.5 bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-4">
                  <CarouselPrevious className="static translate-y-0 h-12 w-12 border-blue-800 text-blue-800" />
                  <CarouselNext className="static translate-y-0 h-12 w-12 border-blue-800 text-blue-800" />
                </div>
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Section 2*/}
      <section className="bg-[#1e40af] text-white py-16 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-baseline gap-6">
          {/* Left Side: Title */}
          <h2 className="text-5xl md:text-5xl font-normal tracking-tight">
            Media Resources
          </h2>

          {/* Right Side: Inquiry Text */}
          <p className="text-sm md:text-base font-light text-blue-100">
            For media relations inquiries, please email us at:{" "}
            <a
              href="mailto:Media@citadelsecurities.com"
              className="hover:underline font-normal"
            >
              Media@citadelsecurities.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* Section 3 */}
      <section className="bg-[#f8f8f8] py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
            <h2 className="text-5xl md:text-5xl font-normal text-[#1a1a1a] tracking-tight">
              Policy Positions
            </h2>
            <p className="max-w-md text-[#4a4a4a] text-lg leading-relaxed md:pt-4">
              We promote policy efforts to foster efficiency, transparency and
              resilience in a range of global markets.
            </p>
          </div>

          {/* Tabs Component */}
          <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100">
            <Tabs defaultValue="equities" className="w-full">
              <TabsList className="flex flex-wrap justify-start gap-x-8 gap-y-4 bg-transparent border-b border-gray-200 rounded-none h-auto p-0 mb-12">
                {[
                  { id: "equities", label: "Equities & Options" },
                  { id: "otc-us", label: "OTC Derivatives Reform—US" },
                  { id: "otc-eu", label: "OTC Derivatives Reform—Europe" },
                  { id: "otc-apac", label: "OTC Derivatives Reform—APAC" },
                  { id: "treasuries", label: "U.S. Treasuries" },
                  { id: "futures", label: "Commodity Futures" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="data-[state=active]:border-b-2 data-[state=active]:border-cyan-400 data-[state=active]:text-blue-600 rounded-none bg-transparent px-0 py-3 text-sm font-medium text-gray-600 transition-all hover:text-blue-500 shadow-none border-b-2 border-transparent"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="equities" className="mt-0">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                  {/* Left Column: Text */}
                  <div>
                    <h3 className="text-3xl font-normal text-[#1a1a1a] mb-8">
                      Equities & Options
                    </h3>
                    <p className="text-[15px] leading-relaxed text-[#4a4a4a]">
                      The U.S. equity markets are the fairest, most transparent,
                      resilient, and competitive markets in the world. Citadel
                      Securities believes that competition and innovation have
                      markedly improved conditions for all investors, who
                      benefit from dramatically lower trading costs, improved
                      market transparency and liquidity, and increased
                      competition. We support regulatory efforts to ensure that
                      U.S. equity markets continue to best serve the interests
                      of all investors.
                    </p>
                  </div>

                  {/* Right Column: Links */}
                  <div className="border-l border-gray-200 pl-12 space-y-4">
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      CAT Limitation of Liability
                    </div>
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      CAT Data Security
                    </div>
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      IEX D-Limit
                    </div>
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      AIM Auctions for SPX
                    </div>
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      AIM Auctions for SPX
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="otc-us" className="mt-0">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                  <div>
                    <h3 className="text-3xl font-normal text-[#1a1a1a] mb-8">
                      OTC Derivatives Reform—US
                    </h3>
                    <p className="text-[15px] leading-relaxed text-[#4a4a4a]">
                      Citadel Securities is a firm supporter of the G-20 reforms
                      to the OTC derivatives markets, including the central
                      clearing and trading requirements. These reforms have
                      already begun and will continue to reduce
                      interconnectedness and systemic risk, improve pre- and
                      post-trade transparency and foster an open, level,
                      competitive playing field.
                    </p>
                  </div>
                  {/* Right Column: Links */}
                  <div className="border-l border-gray-200 pl-12 space-y-4">
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      Comment Letter to CFTC on Clearing Agency Governance
                    </div>
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      Comment Letter to SEC on Clearing Agency Governance
                    </div>
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      Comment Letter to CFTC on Amending the Swap Clearing
                      Requirement To Account for the Transition From LIBOR to
                      RFRs
                    </div>
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      Comment Letter to SEC on Rules Relating to Security-Based
                      Swap Execution and Registration and Regulation of SBSEFs
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="otc-eu" className="mt-0">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                  <div>
                    <h3 className="text-3xl font-normal text-[#1a1a1a] mb-8">
                      OTC Derivatives Reform—Europe
                    </h3>
                    <p className="text-[15px] leading-relaxed text-[#4a4a4a]">
                      Citadel Securities is a firm supporter of the G-20 reforms
                      to the OTC derivatives markets, including the central
                      clearing and trading requirements. These reforms have
                      already begun and are expected to reduce
                      interconnectedness and systemic risk, improve pre- and
                      post-trade transparency and foster an open, level,
                      competitive playing field.
                    </p>
                  </div>
                  {/* Right Column: Links */}
                  <div className="border-l border-gray-200 pl-12 space-y-4">
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      Response to ESMA Consultation on Updating the Clearing
                      Obligation & Trading Obligation to Reflect RFRs
                    </div>
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      Response to BoE Consultation on Modifying the Clearing
                      Obligation to Reflect RFR
                    </div>
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      Feedback on ESMA Market Data Guidelines{" "}
                    </div>
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      ESMA Transaction Reporting and Reference Data{" "}
                    </div>
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      ESMA Post-trade Risk Reduction Services{" "}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="otc-apac" className="mt-0">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                  <div>
                    <h3 className="text-3xl font-normal text-[#1a1a1a] mb-8">
                      OTC Derivatives Reform—APAC
                    </h3>
                    <p className="text-[15px] leading-relaxed text-[#4a4a4a]">
                      Citadel Securities is a firm supporter of the G-20 reforms
                      to the OTC derivatives markets, including the central
                      clearing and trading requirements. These reforms have
                      already begun and will continue to reduce
                      interconnectedness and systemic risk, improve pre- and
                      post-trade transparency and foster an open, level,
                      competitive playing field.
                    </p>
                  </div>
                  {/* Right Column: Links */}
                  <div className="border-l border-gray-200 pl-12 space-y-4">
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      Comment Letter to the HKMA and HK SFC on the Clearing
                      Obligation and Platform Trading Obligation
                    </div>
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      Response to the Singapore MAS Consultation on Mandatory
                      Trading of Derivatives Contracts
                    </div>
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      Comment Letter to HK SFC on Client Clearing Services &
                      Straight-Through-Processing{" "}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="treasuries" className="mt-0">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                  <div>
                    <h3 className="text-3xl font-normal text-[#1a1a1a] mb-8">
                      U.S. Treasuries
                    </h3>
                    <p className="text-[15px] leading-relaxed text-[#4a4a4a]">
                      Citadel Securities supports efforts to modernize the
                      regulatory framework for the U.S. Treasury markets,
                      including the introduction of real-time public reporting,
                      the registration of multilateral trading venues,
                      non-discriminatory access to trading venues, and the
                      expansion of repo clearing. Consistent with our
                      longstanding commitment to more fair and efficient
                      markets, we believe these changes will enhance
                      transparency and resiliency in the U.S. Treasury market
                      and provide Treasury market participants with greater
                      choice among trading venues and counterparties.
                    </p>
                  </div>
                  {/* Right Column: Links */}
                  <div className="border-l border-gray-200 pl-12 space-y-4">
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      Comment Letter to SEC on FICC Clearing Access Proposals
                    </div>
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      Request for Information on Additional Transparency for
                      Secondary Market Transactions of Treasury Securities
                    </div>
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      Comment Letter to SEC on FINRA’s Proposal to Publish
                      Aggregated Transaction Information More Frequently
                    </div>
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      Comment Letter to SEC on Applying Regulation ATS & SCI for
                      ATSs that Trade U.S. Government Securities{" "}
                    </div>
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      SEC Reg ATS Proposal{" "}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="futures" className="mt-0">
                <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                  <div>
                    <h3 className="text-3xl font-normal text-[#1a1a1a] mb-8">
                      Commodity Futures
                    </h3>
                    <p className="text-[15px] leading-relaxed text-[#4a4a4a]">
                      Citadel Securities believes that investors play an
                      essential and beneficial role in the commodities markets.
                      Investors’ research and analysis leads to greater
                      transparency, facilitating more efficient economic
                      decisions by commodity producers and consumers and
                      optimizing resource allocation across the real economy. At
                      the same time, investors’ market activity enhances
                      liquidity and facilitates the price discovery process for
                      all market participants.
                    </p>
                  </div>
                  {/* Right Column: Links */}
                  <div className="border-l border-gray-200 pl-12 space-y-4">
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      CFTC Position Limits{" "}
                    </div>
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      Comment Letter on the ICE Asymmetric Speed Bump
                    </div>
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      Comment Letter to the CFTC on Project KISS
                    </div>
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      Comment Letter to the CFTC on Regulation Automated Trading
                      (Reg AT)
                    </div>
                    <div className="text-lg text-[#1a1a1a] hover:text-blue-600 cursor-pointer transition-colors">
                      Comment Letter to the CFTC on Position Limits (No. 2){" "}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Sextion 4 */}

      <Footer />
    </div>
  );
}
