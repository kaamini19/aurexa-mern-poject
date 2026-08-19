import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { setLenis } from "@/lib/scroll";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Collection } from "@/components/Collection";
import { FeaturedLots } from "@/components/FeaturedLots";
import { Auction } from "@/components/Auction";
import { Editions } from "@/components/Editions";
import { Experience } from "@/components/Experience";
import { Partners } from "@/components/Partners";
import { Journal } from "@/components/Journal";
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
    const tick = (time: number) => lenis.raf(time * 1000);
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
    <div className="bg-ink text-ivory" data-testid="aurexa-app">
      <div className="grain" aria-hidden />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Collection />
        <FeaturedLots />
        <Auction />
        <Editions />
        <Experience />
        <Partners />
        <Journal />
        <Access />
      </main>
      <Finale />
    </div>
  );
}
