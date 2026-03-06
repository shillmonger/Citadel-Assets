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

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [api, setApi] = useState<UseEmblaCarouselType[1] | null>(null);

  const careerRoles = [
    {
      title: "Markets & Trading",
      image: "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/04/425-Park_9-Floor_241217_106-794x494.jpg",
      description: "Make complex, data-driven risk decisions at scale in real time.",
      linkText: "Explore Working as a Trader",
    },
    {
      title: "Quantitative Research",
      image: "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/04/425-Park_9-Floor_241217_106-794x494.jpg",
      description: "Apply your quantitative skills to mission-critical predictive modeling.",
      linkText: "Explore Working as a Researcher",
    },
    {
      title: "Engineering",
      image: "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2022/06/Citadel_Securities_Careers_Engineering-794x494.jpg",
      description: "Join a team of problem-solvers who rapidly build technology for deployment.",
      linkText: "Explore Working as an Engineer",
    },
    {
      title: "Business Operations",
      image: "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2022/06/Citadel_Securities_Careers_Operations-794x494.jpg",
      description: "Provide the expertise that enables everything we do.",
      linkText: "Explore Business Operations Roles",
    },
  ];

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
      <section className="bg-white py-40 px-6 md:px-12 lg:px-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <h2 className="text-5xl font-normal text-[#1a1a1a] tracking-tight max-w-md">
            Discover Careers by Role
          </h2>
          <p className="text-lg text-[#4a4a4a] max-w-xs md:mt-4">
            Whatever your role, you'll have unmatched resources to enable your best work.
          </p>
        </div>

        {/* Desktop Grid / Mobile Carousel */}
        <div className="relative">
          <Carousel className="w-full" opts={{ align: "start", loop: true }} setApi={setApi}>
            <CarouselContent className="-ml-4">
              {careerRoles.map((role, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/4">
                  <div className="border-l border-gray-200 pl-6 flex flex-col h-full min-h-[450px]">
                    <h3 className="text-2xl font-normal text-[#1a1a1a] mb-8">{role.title}</h3>
                    
                    <div className="aspect-[16/10] overflow-hidden mb-8">
                      <img 
                        src={role.image} 
                        alt={role.title} 
                        className="w-full h-full object-cover cursor-pointer"
                      />
                    </div>

                    <p className="text-[15px] leading-relaxed text-[#4a4a4a] mb-8 flex-grow">
                      {role.description}
                    </p>

                    <a 
                      href="#" 
                      className="group flex items-center gap-2 text-[#2563eb] text-[15px] font-medium hover:underline"
                    >
                      {role.linkText}
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Controls (Visible on mobile like image 2) */}
            <div className="flex items-center justify-between mt-12 md:hidden">
              <div className="flex gap-2">
                {careerRoles.map((_, index) => (
                  <span
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "w-8 bg-[#1e40af]" : "w-1.5 bg-gray-300"
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
      </section>


      

      {/* Section 2*/}

      {/* Section 3 */}

      {/* Sextion 4 */}

      <Footer />
    </div>
  );
}
