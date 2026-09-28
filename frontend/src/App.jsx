import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { setLenis } from "@/lib/scroll";
import { Navbar } from "@/components/Navbar";

// The 7 Primary Sections (in exact required order)
import { Hero } from "@/components/Hero"; // 1. INTRODUCTION OF AUREXA
import { WhatIsAurexa } from "@/components/WhatIsAurexa"; // 2. WHAT IS AUREXA
import { Experience } from "@/components/Experience"; // 3. AUREXA EXPERIENCE
import { Glimpse } from "@/components/Glimpse"; // 4. GLIMPSE OF AUREXA
import { Auction } from "@/components/Auction"; // 5. UPCOMING EVENTS — LIVE AUCTION
import { Gallery } from "@/components/Gallery"; // 6. ART & SCULPTURES — GALLERY
import { ClosingDetails } from "@/components/ClosingDetails"; // 7. DETAILS — CLOSING SECTION

// Preserved Existing Sections (Moved AFTER Section 7)
import { Marquee } from "@/components/Marquee";
import { Editions } from "@/components/Editions";
import { Journal } from "@/components/Journal";
import { Partners } from "@/components/Partners";
import { Access } from "@/components/Access";
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
    <div className="bg-ink text-ivory selection:bg-champagne selection:text-ink min-h-screen" data-testid="aurexa-app">
      <div className="grain" aria-hidden />
      <Navbar />

      <main>
        {/* ==================================================
            7 PRIMARY SECTIONS (IN EXACT REQUIRED ORDER)
            ================================================== */}
        
        {/* 1. INTRODUCTION OF AUREXA */}
        <Hero />

        {/* 2. WHAT IS AUREXA */}
        <WhatIsAurexa />

        {/* 3. AUREXA EXPERIENCE */}
        <Experience />

        {/* 4. GLIMPSE OF AUREXA */}
        <Glimpse />

        {/* 5. UPCOMING EVENTS — LIVE AUCTION */}
        <Auction />

        {/* 6. ART & SCULPTURES — GALLERY */}
        <Gallery />

        {/* 7. DETAILS — CLOSING SECTION */}
        <ClosingDetails />

        {/* ==================================================
            PRESERVED SECONDARY SECTIONS (AFTER SECTION 7)
            ================================================== */}
        <div className="relative border-t border-champagne/15">
          <Marquee />
          <Editions />
          <Journal />
          <Partners />
          <Access />
        </div>
      </main>

      {/* Global Minimal Footer */}
      <Finale />
    </div>
  );
}
