"use client"
import React from "react";
import AvailabilityBadge from "./_components/AvailabilityBadge";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";
import MenuPage from "./_components/_Navbar/MenuPage";
import Lenis from "lenis";
import Loader from "./_components/Loader";
import { useStore } from "./_store/useStore";
import { AnimatePresence } from "framer-motion";
import About from "./_components/About";
import RecentWorks from "./_components/RecentWorks";

export default function Home() {
  const { isLoading, isMenuOpen } = useStore();

  React.useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    if (isLoading || isMenuOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }

    return () => {
      lenis.destroy();
    };
  }, [isLoading, isMenuOpen]);

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      <Loader />
      <div id="main-content-wrapper" className="relative w-full min-h-screen bg-black top-0">
        <AnimatePresence mode="wait">
          {isMenuOpen && <MenuPage />}
        </AnimatePresence>
        <div id="main-content" className="relative w-full min-h-screen origin-center top-0 flex flex-col bg-[#DCDCDC]">
          <main className="bg-[#F4F4F4] overflow-hidden min-h-screen flex flex-col rounded-b-4xl">
            <AvailabilityBadge />
            <Navbar />
            <Hero />
          </main>

          <main className="min-h-screen flex flex-col">
            <About />
            <RecentWorks />
          </main>
        </div>
      </div>
    </>
  );
}
