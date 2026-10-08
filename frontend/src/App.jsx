import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { setLenis } from "@/lib/scroll";
import { Navbar } from "@/components/Navbar";

// The Exactly 7 Approved Primary Sections (in exact required order)
import { Hero } from "@/components/Hero"; // 01. INTRODUCTION OF AUREXA
import { WhatIsAurexa } from "@/components/WhatIsAurexa"; // 02. WHAT IS AUREXA
import { Experience } from "@/components/Experience"; // 03. AUREXA EXPERIENCE
import { Glimpse } from "@/components/Glimpse"; // 04. GLIMPSE OF AUREXA
import { Auction } from "@/components/Auction"; // 05. UPCOMING EVENTS — LIVE AUCTION
import { Gallery } from "@/components/Gallery"; // 06. ART & SCULPTURES — GALLERY
import { ClosingDetails } from "@/components/ClosingDetails"; // 07. DETAILS — CLOSING SECTION

// Global Minimal Footer
import { Finale } from "@/components/Finale";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    const refresh = setTimeout(() => ScrollTrigger.refresh(), 600);
    return () => {
      clearTimeout(refresh);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <div
      className="bg-ink text-ivory selection:bg-champagne selection:text-ink min-h-screen"
      data-testid="aurexa-app"
    >
      <div className="grain" aria-hidden />
      <Navbar />

      <main>
        {/* 01. INTRODUCTION OF AUREXA */}
        <Hero />

        {/* 02. WHAT IS AUREXA */}
        <WhatIsAurexa />

        {/* 03. AUREXA EXPERIENCE */}
        <Experience />

        {/* 04. GLIMPSE OF AUREXA */}
        <Glimpse />

        {/* 05. UPCOMING EVENTS — LIVE AUCTION */}
        <Auction />

        {/* 06. ART & SCULPTURES — GALLERY */}
        <Gallery />

        {/* 07. DETAILS — CLOSING SECTION */}
        <ClosingDetails />
      </main>

      {/* Global Minimal Luxury Footer */}
      <Finale />
    </div>
  );
}
