"use client";
import Header from "@/components/landing-page/header";
import Footer from "@/components/landing-page/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white dark:bg-black">
      {/* 1. Header at the top */}
      <Header />

      {/* 2. Main Content Area */}
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#00205B] dark:text-white">
            Hi to my landing page
          </h1>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            The header and footer have been successfully integrated.
          </p>
        </div>
      </main>

      {/* 3. Footer at the bottom */}
      <Footer />
    </div>
  );
}