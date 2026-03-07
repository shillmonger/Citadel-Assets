"use client";
import Link from "next/link";
import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import React, { useState } from "react";

const GlobalCities = () => {
  const [activeRegion, setActiveRegion] = useState("Americas");
  const [activeCity, setActiveCity] = useState("Miami");

  const regions = [
    {
      name: "Americas",
      image:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2022/09/Miami-1024x683-1.jpg",
      cities: [
        {
          name: "Miami",
          type: "Global Headquarters",
          address: "830 Brickell Plaza\nMiami, Florida 33131",
        },
        {
          name: "New York",
          type: "Office",
          address: "425 Park Avenue\nNew York, NY 10022",
        },
        {
          name: "Chicago",
          type: "Office",
          address: "131 S Dearborn St\nChicago, IL 60603",
        },
        {
          name: "Toronto",
          type: "Office",
          address: "181 Bay St\nToronto, ON M5J 2T3",
        },
      ],
    },
    {
      name: "Europe",
      image:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2016/09/London_iStock-897043360-1024x683.jpg",
      cities: [
        {
          name: "London",
          type: "Regional Headquarters",
          address: "Canary Wharf\nLondon, E14 5LB",
        },
        {
          name: "Paris",
          type: "Office",
          address: "Place de la Concorde\n75008 Paris",
        },
        {
          name: "Dublin",
          type: "Office",
          address: "Custom House Plaza\nDublin 1",
        },
      ],
    },
    {
      name: "Asia-Pacific",
      image:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2022/10/Hong_Kong_iStock-900611166-1024x683.jpg",
      cities: [
        {
          name: "Hong Kong",
          type: "Regional Headquarters",
          address: "Two IFC\nCentral, Hong Kong",
        },
        {
          name: "Singapore",
          type: "Office",
          address: "Marina Bay Financial Centre\nSingapore 018981",
        },
        {
          name: "Tokyo",
          type: "Office",
          address: "Otemachi Financial City\nChiyoda, Tokyo",
        },
      ],
    },
  ];

  const currentRegionData = regions.find((r) => r.name === activeRegion);
  const currentCityData =
    currentRegionData?.cities.find((c) => c.name === activeCity) ||
    currentRegionData?.cities[0];

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

<Link href="/auth-page/login">
              <button className="bg-[#1D429A] text-white cursor-pointer text-sm font-semibold py-4 px-10 rounded-full hover:bg-[#16357a] transition-all shadow-sm">
                Discover Our Culture
              </button>
              </Link>
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
                {[
                  "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/03/425-Park-_12-fl_241216_340.jpg",
                  "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/03/BeachCleanup_231112_172.jpg",
                  "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2026/02/NYFireworkViewingCelebration_250704_1357.jpg",
                  "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/03/RTF22016_234.jpg",
                  "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/03/CitSecTownHall_240424_1484-1350x900.jpg",
                ].map((src, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-[4/3] overflow-hidden rounded-sm">
                      <img
                        src={src}
                        alt="Culture"
                        className="w-full h-full object-cover"
                      />
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
                <img
                  src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/03/425-Park-_12-fl_241216_340.jpg"
                  className="w-full h-full object-cover"
                  alt="Team"
                />
              </div>
              <div className="flex-1 overflow-hidden rounded-sm">
                <img
                  src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/03/RTF22016_234.jpg"
                  className="w-full h-full object-cover"
                  alt="Volunteering"
                />
              </div>
            </div>

            {/* Center Column: Large focus image */}
            <div className="col-span-6 overflow-hidden rounded-sm">
              <img
                src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/03/BeachCleanup_231112_172.jpg"
                className="w-full h-full object-cover"
                alt="Community"
              />
            </div>

            {/* Right Column: Two stacked images */}
            <div className="col-span-3 flex flex-col gap-4">
              <div className="flex-1 overflow-hidden rounded-sm">
                <img
                  src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2026/02/NYFireworkViewingCelebration_250704_1357.jpg"
                  className="w-full h-full object-cover"
                  alt="Celebration"
                />
              </div>
              <div className="flex-1 overflow-hidden rounded-sm">
                <img
                  src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/03/CitSecTownHall_240424_1484-1350x900.jpg"
                  className="w-full h-full object-cover"
                  alt="Perspective"
                />
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
      <section className="w-full">
        {/* Top Grey Transition Bar (Optional, matches screenshot 5) */}
        <div className="py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between items-start gap-8">
            <div className="md:max-w-xl">
              <h2 className="text-5xl md:text-5xl font-normal tracking-tight text-zinc-900 leading-[1.1]">
                Two Firms: Citadel and <br /> Citadel Securities
              </h2>
            </div>
            <div className="md:max-w-md pt-2">
              <p className="mb-6 text-lg text-zinc-700 leading-relaxed">
                Citadel and Citadel Securities are two separate and distinct
                financial firms, each focused on a different aspect of today's
                markets.
              </p>
              <p className="mb-6 text-lg text-zinc-700 leading-relaxed">
                Citadel is a multi-strategy alternative investment manager,
                striving to generate superior long-term returns for the world's
                preeminent public and private institutions.
              </p>

              <Link href="/auth-page/register">
              <button className="bg-[#1D429A] text-white cursor-pointer text-sm font-semibold py-4 px-10 rounded-full hover:bg-[#16357a] transition-all shadow-sm">
                Explore Citadel
              </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Blue Content Section */}
        <div className="bg-[#1D429A] py-15 px-6 md:px-12 lg:px-24 text-white">
          <div className="max-w-7xl mx-auto flex flex-col">
            {/* Inspired by Leadership Block */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
              <div className="w-full md:w-1/2">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/03/leadership.jpg"
                    alt="Leadership"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-start">
                <h2 className="text-5xl md:text-5xl font-normal mb-8 leading-[1.1]">
                  Inspired by <br /> Our Leadership
                </h2>
                <p className="text-lg opacity-90 mb-10 max-w-md leading-relaxed">
                  Many of our leaders have built their careers here. They are
                  committed to developing other ambitious talent in pursuit of
                  our shared goals.
                </p>
                <button className="bg-[#76EAD7] text-[#1D429A] cursor-pointer text-sm font-semibold py-4 px-10 rounded-full hover:bg-[#5fdec9] transition-all">
                  View Leadership Team
                </button>
              </div>
            </div>

            {/* Committed to Communities Block (Reversed) */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24">
              <div className="w-full md:w-1/2">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img
                    src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2024/02/Pocket-City_RTF22016_252-1024x683.jpg"
                    alt="Community"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-start">
                <h2 className="text-5xl md:text-5xl font-normal mb-8 leading-[1.1]">
                  Committed to <br /> Our Communities
                </h2>
                <p className="text-lg opacity-90 mb-10 max-w-md leading-relaxed">
                  Our extraordinary colleagues apply their talents to drive
                  impact outside of the workplace. Our civic leadership focuses
                  on expanding access to education and invigorating our
                  communities.
                </p>
                <button className="bg-[#76EAD7] text-[#1D429A] cursor-pointer text-sm font-semibold py-4 px-10 rounded-full hover:bg-[#5fdec9] transition-all">
                  Learn About Our Civic Leadership
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sextion 4 */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-white border-t border-zinc-100">
        <div className="max-w-7xl mx-auto">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:justify-between items-start gap-8 mb-10">
            <h2 className="text-5xl md:text-5xl font-normal tracking-tight text-zinc-900">
              Working in Global Cities
            </h2>
            <div className="md:max-w-xs pt-2">
              <p className="text-zinc-700 mb-8 leading-relaxed">
                We pursue opportunity wherever it leads. But the cities we call
                home are among the world's most dynamic places to live and work.
              </p>
              <Link href="/landing-page/careers">
              <button className="bg-[#1D429A] text-white text-sm font-semibold py-4 px-10 rounded-full hover:bg-[#16357a] transition-all">
                Explore Our Offices
              </button>
              </Link>
            </div>
          </div>

          {/* Regions Accordion List */}
          <div className="flex flex-col border-t border-zinc-200">
            {regions.map((region) => (
              <div key={region.name} className="border-b border-zinc-200">
                {/* Region Trigger */}
                <button
                  onClick={() => {
                    setActiveRegion(region.name);
                    setActiveCity(region.cities[0].name);
                  }}
                  className="w-full py-8 flex justify-between items-center group cursor-pointer"
                >
                  <span
                    className={`text-3xl md:text-4xl transition-colors ${activeRegion === region.name ? "text-zinc-900" : "text-zinc-400 group-hover:text-zinc-600"}`}
                  >
                    {region.name}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${activeRegion === region.name ? "bg-[#1D429A] border-[#1D429A] text-white" : "border-zinc-300 text-zinc-400"}`}
                  >
                    {activeRegion === region.name ? "−" : "+"}
                  </div>
                </button>

                {/* Region Content (Expanded) */}
                {activeRegion === region.name && (
                  <div className="pb-16 flex flex-col lg:flex-row gap-12 lg:gap-24 animate-in fade-in slide-in-from-top-4 duration-500">
                    {/* City Selector List */}
                    <div className="flex gap-12">
                      <div className="flex flex-col gap-4 min-w-[120px]">
                        {region.cities.map((city) => (
                          <button
                            key={city.name}
                            onClick={() => setActiveCity(city.name)}
                            className={`text-left text-sm font-medium transition-all flex items-center gap-2 ${activeCity === city.name ? "text-[#1D429A]" : "text-zinc-400 hover:text-zinc-600"}`}
                          >
                            {activeCity === city.name && (
                              <span className="w-1 h-4 bg-[#76EAD7]" />
                            )}
                            {city.name}
                          </button>
                        ))}
                      </div>

                      {/* City Details */}
                      <div className="max-w-[200px]">
                        <h3 className="text-3xl font-normal mb-8">
                          {activeCity}
                        </h3>
                        <div className="text-xs uppercase tracking-widest text-zinc-400 mb-2">
                          Location
                        </div>
                        <p className="text-sm font-bold text-zinc-900">
                          {currentCityData?.type}
                        </p>
                        <p className="text-sm text-zinc-600 whitespace-pre-line mb-6">
                          {currentCityData?.address}
                        </p>
                        <button className="text-[#1D429A] text-sm font-semibold flex items-center gap-2 hover:underline">
                          Explore {activeCity} Office <span>→</span>
                        </button>
                      </div>
                    </div>

                    {/* Regional Image */}
                    <div className="flex-1">
                      <div className="aspect-[3/2] overflow-hidden rounded-sm shadow-xl w-full lg:w-[80%] mx-auto">
                        <img
                          src={region.image}
                          alt={region.name}
                          className="w-full h-full object-cover cursor-pointer transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sextion 5 */}
      <section className="relative bg-[#1D429A] pt-10 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Heading Area */}
          <div className="mb-20">
            <h2 className="text-5xl md:text-4xl font-normal tracking-tight text-white leading-[1.05] max-w-3xl">
              Explore Careers at <br /> Citadel Securities
            </h2>
          </div>

          {/* Overlapping Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative -mb-32">
            {/* Card 1: Career Perspectives */}
            <div className="bg-[#F4F4F4] rounded-lg p-8 flex flex-col justify-between min-h-[240px] shadow-lg group hover:-translate-y-2 transition-transform duration-300">
              <div>
                <h3 className="text-2xl font-normal text-zinc-900 mb-4">
                  Career Perspectives
                </h3>
                <p className="text-zinc-700 leading-relaxed text-sm">
                  Career advice, including insights into interviews and hiring.
                </p>
              </div>
              <a
                href="#"
                className="flex items-center gap-2 text-[#1D429A] font-semibold text-sm group-hover:gap-4 transition-all"
              >
                Explore Career Insights <span className="text-xl">→</span>
              </a>
            </div>

            {/* Card 2: Internships */}
            <div className="bg-[#F4F4F4] rounded-lg p-8 flex flex-col justify-between min-h-[240px] shadow-lg group hover:-translate-y-2 transition-transform duration-300">
              <div>
                <h3 className="text-2xl font-normal text-zinc-900 mb-4">
                  Internships
                </h3>
                <p className="text-zinc-700 leading-relaxed text-sm">
                  An internship here is an experience like no other.
                </p>
              </div>
              <a
                href="#"
                className="flex items-center gap-2 text-[#1D429A] font-semibold text-sm group-hover:gap-4 transition-all"
              >
                Learn More About Internships <span className="text-xl">→</span>
              </a>
            </div>

            {/* Card 3: Open Opportunities */}
            <div className="bg-[#F4F4F4] rounded-lg p-8 flex flex-col justify-between min-h-[240px] shadow-lg group hover:-translate-y-2 transition-transform duration-300">
              <div>
                <h3 className="text-2xl font-normal text-zinc-900 mb-4">
                  Open Opportunities
                </h3>
                <p className="text-zinc-700 leading-relaxed text-sm">
                  All current job opportunities around the world.
                </p>
              </div>
              <a
                href="#"
                className="flex items-center gap-2 text-[#1D429A] font-semibold text-sm group-hover:gap-4 transition-all"
              >
                View Job Listings <span className="text-xl">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for the overlap effect */}
      <div className="h-48 bg-white" />

      <Footer />
    </div>
  );
};

export default GlobalCities;
