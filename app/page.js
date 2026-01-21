"use client"
import React from "react";
import AvailabilityBadge from "./_components/AvailabilityBadge";
import Hero from "./_components/Hero";
import Navbar from "./_components/Navbar";
import Lenis from "lenis";

export default function Home() {
  React.useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  return (
    <div>
      <main>
        <AvailabilityBadge />
        <Navbar />
        <Hero />
      </main>
    </div>
  );
}
