"use client";
import Link from "next/link";
import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";
import { ChevronRight, Play } from "lucide-react";
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
  const [currentColleague, setCurrentColleague] = useState(0);
  const [colleagueApi, setColleagueApi] = useState<
    UseEmblaCarouselType[1] | null
  >(null);

  const careerPerspectives = [
    {
      title: "Business Leadership Program Immersion at The Juilliard School",
      image:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/11/CS-Leaders-Julliard_YT-794x494.jpg",
      linkText: "View Article >",
    },
    {
      title: "CEO Peng Zhao Shares Career Advice with Students",
      image:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/10/PengatBerkley_YT_Thumb-794x494.jpg",
      linkText: "View Article >",
    },
    {
      title: "Alex Rodriguez on Discipline, Pressure and Legacy",
      image:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/09/A-Rod_Interns_YT-Amplify_v1-794x494.jpg",
      linkText: "View Article >",
    },
    {
      title: "Peng Zhao On Learning Leverage, and Empowering Junior Talent",
      image:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/08/Peng_at_Harvard_GD_v1-794x494.jpg",
      linkText: "View Article >",
    },
  ];

  const careerRoles = [
    {
      title: "Markets & Trading",
      image:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/04/425-Park_9-Floor_241217_106-794x494.jpg",
      description:
        "Make complex, data-driven risk decisions at scale in real time.",
      linkText: "Explore Working as a Trader",
    },
    {
      title: "Quantitative Research",
      image:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/04/425-Park_9-Floor_241217_106-794x494.jpg",
      description:
        "Apply your quantitative skills to mission-critical predictive modeling.",
      linkText: "Explore Working as a Researcher",
    },
    {
      title: "Engineering",
      image:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2022/06/Citadel_Securities_Careers_Engineering-794x494.jpg",
      description:
        "Join a team of problem-solvers who rapidly build technology for deployment.",
      linkText: "Explore Working as an Engineer",
    },
    {
      title: "Business Operations",
      image:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2022/06/Citadel_Securities_Careers_Operations-794x494.jpg",
      description: "Provide the expertise that enables everything we do.",
      linkText: "Explore Business Operations Roles",
    },
  ];

  const colleagues = [
    {
      name: "Joe",
      role: "Markets & Trading",
      video:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/09/CUT-24-Joe-FINAL-16X9.mp4",
      quote:
        "People invested and bet on me. And I get to pay that forward now.",
      bio: "Joe sought latitude to make a broad impact – and he found it here. In seven years, he's scaled a net-new team to seventy people. Today, he focuses on putting others in the position to thrive.",
    },
    {
      name: "Yiming",
      role: "Quantitative Research",
      video:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/08/CITADEL_yiming_final_071825.mp4",
      quote:
        "The complexity of the problems we solve is what keeps me engaged every day.",
      bio: "Yiming applies advanced mathematical models and data-driven insights to solve complex market challenges while pushing the boundaries of quantitative research.",
    },
    {
      name: "Xiaojun",
      role: "Quantitative Research",
      video:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/06/R0188_Citadel_Extraordinary_Colleagues_XJ_Edit_Master_No_CC-lowres.mp4",
      quote:
        "Collaboration here isn't just a word; it's how we achieve excellence.",
      bio: "Xiaojun thrives in a culture built around intellectual curiosity and teamwork, where sharing ideas openly leads to stronger strategies and better outcomes.",
    },
    {
      name: "Louise",
      role: "Markets & Trading",
      video:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/06/EC_Louise_MASTER_1.2-lowres-1.mp4",
      quote:
        "Innovation happens when talented people are empowered to take ownership.",
      bio: "Louise plays a key role in shaping trading strategies and operational improvements, helping teams move faster and make smarter market decisions.",
    },
    {
      name: "Dmitry",
      role: "Markets & Trading",
      video:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/06/EC_Dmitry_MASTER_1.2-lowres-1.mp4",
      quote:
        "Markets move quickly, and staying ahead requires both precision and creativity.",
      bio: "Dmitry works at the intersection of strategy and execution, ensuring trading teams have the tools and insights needed to perform at the highest level.",
    },
    {
      name: "Soeren",
      role: "Markets & Trading",
      video:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/06/Soeren_MASTER_Cut_1.4-lowres.mp4",
      quote:
        "Success here is built on trust, collaboration, and a relentless pursuit of improvement.",
      bio: "Soeren focuses on strengthening team collaboration and refining processes that help trading operations scale globally.",
    },
    {
      name: "Alex",
      role: "Markets & Trading",
      video:
        "https://www.citadelsecurities.com/wp-content/uploads/sites/2/2025/06/Soeren_MASTER_Cut_1.4-lowres.mp4",
      quote: "The best ideas come from people who challenge the status quo.",
      bio: "Alex works closely with global teams to develop innovative trading approaches while ensuring performance remains consistent across markets.",
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

  useEffect(() => {
    if (!colleagueApi) return;

    const onSelect = () => {
      setCurrentColleague(colleagueApi.selectedScrollSnap());
    };

    colleagueApi.on("select", onSelect);
    onSelect();

    return () => {
      colleagueApi.off("select", onSelect);
    };
  }, [colleagueApi]);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white dark:bg-black">
      <Header />

      {/* Hero Section*/}
      <main className="relative h-screen w-full">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2024/03/CitadelSecurities_Careers.jpg"
            alt="Citadel Securities Office"
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
              Collaborate with the world’s brightest minds to solve the markets’
              most interesting and complicated problems.
            </p>

            <Link href="/auth-page/login">
            <button className="inline-block bg-[#70E0D8] text-[#00205B] font-bold py-3 px-10 rounded-full cursor-pointer hover:bg-white transition-all duration-300">
              View Your Account 
            </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Section 1*/}
      <section className="bg-white py-40 px-6 md:px-12 lg:px-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <h2 className="text-3xl font-normal text-[#1a1a1a] tracking-tight max-w-md">
            Discover Careers by Role
          </h2>
          <p className="text-lg text-[#4a4a4a] max-w-xs md:mt-4">
            Whatever your role, you'll have unmatched resources to enable your
            best work.
          </p>
        </div>

        {/* Desktop Grid / Mobile Carousel */}
        <div className="relative">
          <Carousel
            className="w-full"
            opts={{ align: "start", loop: true }}
            setApi={setApi}
          >
            <CarouselContent className="-ml-4">
              {careerRoles.map((role, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/4"
                >
                  <div className="border-l border-gray-200 pl-6 flex flex-col h-full min-h-[450px]">
                    <h3 className="text-2xl font-normal text-[#1a1a1a] mb-8">
                      {role.title}
                    </h3>

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
      </section>

      {/* Section 2*/}
      <section className="bg-[#1e40af] text-white">
        <Carousel setApi={setColleagueApi} className="w-full">
          {/* Blue Header Section */}
          <div className="max-w-7xl mx-auto px-6 py-10 lg:px-16 flex flex-col md:flex-row justify-between items-start md:items-end">
            <div className="max-w-md">
              <h2 className="text-3xl md:text-5xl font-normal leading-tight tracking-tight mb-8">
                Work with
                <br />
                Extraordinary
                <br />
                Colleagues
              </h2>
            </div>

            <div className="flex flex-col items-end gap-6 w-full md:w-auto">
              <p className="text-sm md:text-base max-w-sm text-blue-100 leading-relaxed md:text-right">
                You'll meet brilliant people at our firm. Working in a culture
                of collaboration and mutual learning, they'll bring out the best
                in you.
              </p>

              {/* Custom Navigation */}
              <div className="flex items-center gap-4 mt-4">
                <CarouselPrevious className="static translate-y-0 bg-transparent cursor-pointer border-white/30 hover:bg-white/10 text-white h-10 w-10" />
                <span className="text-sm font-medium">
                  {currentColleague + 1} / {colleagues.length}
                </span>
                <CarouselNext className="static translate-y-0 bg-transparent cursor-pointer border-white/30 hover:bg-white/10 text-white h-10 w-10" />
              </div>
            </div>
          </div>

          {/* Video Content */}
          <CarouselContent>
            {colleagues.map((item, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden group">
                  {/* Segmented Progress Bar */}
                  <div className="absolute top-0 left-0 w-full z-20 flex px-6 py-4 gap-2">
                    {colleagues.map((_, i) => (
                      <div
                        key={i}
                        className="h-0.5 flex-1 bg-white/30 relative"
                      >
                        <div
                          className={`absolute inset-0 bg-[#4df3ff] transition-all duration-300 ${i === currentColleague ? "w-full" : "w-0"}`}
                        />
                        <div className="absolute -bottom-6 left-0 text-[10px] uppercase tracking-widest font-bold">
                          {colleagues[i].name} <br />
                          <span className="font-normal opacity-70">
                            {colleagues[i].role}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Video Player */}
                  <video
                    className="w-full h-full object-cover brightness-75"
                    muted
                    playsInline
                    autoPlay
                    loop
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>

                  {/* Quote Overlay */}
                  <div className="absolute bottom-12 left-6 md:left-16 max-w-2xl z-10">
                    <h3 className="text-3xl md:text-5xl font-normal leading-tight italic">
                      "{item.quote}"
                    </h3>
                  </div>

                  {/* Bio Box */}
                  <div className="absolute bottom-0 right-0 md:right-16 translate-y-1/2 md:translate-y-0 md:bottom-12 bg-white text-gray-800 p-8 max-w-sm shadow-2xl z-20 hidden md:block">
                    <p className="text-sm leading-relaxed">{item.bio}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Mobile Bio - visible below video on small screens */}
        <div className="md:hidden bg-white text-gray-800 p-8">
          <p className="text-sm leading-relaxed">
            {colleagues[currentColleague].bio}
          </p>
        </div>
      </section>

      {/* Section 3 */}
      <section className="bg-white py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Left Column: Heading & CTA */}
            <div className="lg:col-span-5 space-y-8">
              <h2 className="text-3xl md:text-4xl font-normal text-[#1a1a1a] leading-[1.1] tracking-tight">
                Shape Bold
                <br />
                Solutions to
                <br />
                Complex Problems
              </h2>

              <p className="text-lg text-[#4a4a4a] leading-relaxed max-w-md">
                Our team thrives on the freedom to innovate and execute. When
                you take the initiative, you’ll be empowered with greater
                responsibility. We’ll ensure you have the resources to do great
                work.
              </p>

              <Link href="/auth-page/register" className="block w-full md:w-auto">
  <button className="w-full md:w-auto bg-[#1e40af] cursor-pointer hover:bg-[#1a368a] transition-all text-white px-10 py-4 rounded-full font-medium text-sm shadow-md hover:shadow-lg active:scale-95">
    Register For full Access 
  </button>
</Link>
            </div>

            {/* Right Column: Quote & Image */}
            <div className="lg:col-span-7 space-y-12">
              {/* Quote Section */}
              <div className="relative pl-0 lg:pl-12">
                <span className="text-6xl text-[#4df3ff] font-serif leading-none absolute -top-4 -left-2 lg:left-0 select-none">
                  “
                </span>
                <blockquote className="space-y-6">
                  <p className="text-2xl md:text-[20px] font-normal text-[#1a1a1a] leading-tight tracking-tight">
                    We seek out the curious. We hire the ambitious. Because we
                    operate in a fast-paced environment, we need a team of
                    leaders and brilliant problem solvers. Our people are always
                    willing to rise to the challenge— and teach their colleagues
                    along the way.
                  </p>

                  <footer className="mt-6">
                    <p className="text-[#1e40af] font-semibold text-lg">
                      Peng Zhao
                    </p>
                    <p className="text-[#4a4a4a] text-sm">
                      Chief Executive Officer
                    </p>
                  </footer>
                </blockquote>
              </div>

              {/* Image Container with "Awesome" styling */}
              <div className="relative group lg:ml-12">
                <div className="aspect-[4/3] overflow-hidden rounded-sm shadow-2xl">
                  <img
                    src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2022/10/Citadel-Peng-Zhao-Event-220802-1108-1024x1024.jpg"
                    alt="Peng Zhao event"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="bg-white py-10 px-6 md:px-12 lg:px-24">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <h2 className="text-3xl font-normal text-[#1a1a1a] tracking-tight max-w-md">
            Explore Career Perspectives
          </h2>
          <p className="text-lg text-[#4a4a4a] max-w-xs md:mt-4">
            Learn how our people, resources and meritocratic culture can power
            an impactful career.
          </p>
        </div>

        {/* Desktop Grid / Mobile Carousel */}
        <div className="relative">
          <Carousel
            className="w-full"
            opts={{ align: "start", loop: true }}
            setApi={setApi}
          >
            <CarouselContent className="-ml-4">
              {careerPerspectives.map((perspective, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 md:basis-1/2 lg:basis-1/4"
                >
                  <div className="border-l border-gray-200 pl-6 flex flex-col h-full min-h-[450px]">
                    <div className="aspect-[16/10] overflow-hidden mb-8">
                      <img
                        src={perspective.image}
                        alt={perspective.title}
                        className="w-full h-full object-cover cursor-pointer"
                      />
                    </div>

                    <p className="text-[15px] leading-relaxed text-[#4a4a4a] mb-8 flex-grow">
                      {perspective.title}
                    </p>

                    <a
                      href="#"
                      className="group flex items-center gap-2 text-[#2563eb] text-[15px] font-medium hover:underline"
                    >
                      {perspective.linkText}
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Controls (Visible on mobile like image 2) */}
            <div className="flex items-center justify-between mt-12 md:hidden">
              <div className="flex gap-2">
                {careerPerspectives.map((_, index) => (
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
      </section>

      {/* Section 5 */}
      <section className="bg-white">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 min-h-[600px] items-center">
          {/* Left Side: Content */}
          <div className="flex flex-col justify-center px-8 py-20 md:px-16 lg:px-24 bg-white">
            <div className="max-w-md">
              <h2 className="text-3xl md:text-5xl font-normal text-[#1a1a1a] leading-[1.1] tracking-tight mb-8">
                Make Your Next
                <br />
                Career Move
              </h2>

              <div className="space-y-6 mb-10">
                <p className="text-lg md:text-xl text-[#1a1a1a] leading-relaxed">
                  If you're ready to take the next step, we want to hear from
                  you. Find a role that suits your passions, skills and
                  ambitions.
                </p>
              </div>

            <Link href="/auth-page/login" className="block w-full md:w-auto">
  <button className="w-full md:w-auto bg-[#1e40af] cursor-pointer hover:bg-[#1a368a] transition-all text-white px-10 py-4 rounded-full font-medium text-sm shadow-md hover:shadow-lg active:scale-95">
    Follow Our Top Investors
  </button>
</Link>
            </div>
          </div>

          {/* Right Side: Reduced Image with Padding */}
          <div className="w-full p-8 md:p-16 lg:p-24">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
              <img
                src="https://www.citadelsecurities.com/wp-content/uploads/sites/2/2023/10/Elledge_220810_3555_CITSEC_29_3151_CLEAN-1001x667-1aefa07.jpg"
                alt="Colleague at workstation"
                className="w-full h-full object-cover object-center transition-transform duration-1000 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
