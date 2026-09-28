import { motion } from "framer-motion";
import { Eyebrow, FadeUp, LightSweep, TextReveal } from "./reveal";
import { scrollToId } from "@/lib/scroll";

const PILLARS = [
  {
    title: "Art",
    latin: "Ars",
    desc: "Paintings, sculptures, and rare antiquities selected for timeless gravitas and mastery.",
  },
  {
    title: "Culture",
    latin: "Cultura",
    desc: "A living dialogue across centuries, patrons, and profound artistic movements.",
  },
  {
    title: "History",
    latin: "Historia",
    desc: "Centuries of provenance meticulously verified, documented, and reverently honored.",
  },
  {
    title: "Collecting",
    latin: "Colligenda",
    desc: "The quiet, disciplined pursuit of exceptional objects that outlast generations.",
  },
  {
    title: "Luxury",
    latin: "Luxus",
    desc: "Intimate, understated distinction reserved for patrons of discerning taste.",
  },
  {
    title: "Immersive Experience",
    latin: "Experientia",
    desc: "A transcendent journey where digital presence bridges the world's finest grand halls.",
  },
];

export const WhatIsAurexa = () => {
  return (
    <section
      id="what-is-aurexa"
      data-testid="what-is-aurexa-section"
      className="relative overflow-hidden border-y border-champagne/20 bg-gradient-to-b from-[#060D17] via-[#091526] to-[#060D17] text-ivory py-28 sm:py-36 md:py-44"
    >
      {/* Target anchor for legacy #about */}
      <span id="about" className="absolute -top-24 left-0" aria-hidden />

      {/* Subtle Ambient Radial Glow for Depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(185,154,104,0.09)_0%,rgba(6,13,23,0.6)_65%,transparent_90%)]"
      />

      <div className="relative mx-auto max-w-5xl px-6 sm:px-8 md:px-12 flex flex-col items-center text-center">
        <Eyebrow index="01" label="What Is Aurexa" tone="champagne" className="justify-center" />

        <h2 className="mt-8 mb-6">
          <LightSweep>
            <TextReveal
              lines={["WHAT IS", "AUREXA"]}
              lineClassName="font-serif text-4xl font-light tracking-[0.2em] text-ivory sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05]"
            />
          </LightSweep>
        </h2>

        {/* Elegant Golden Divider */}
        <div className="mb-12 flex items-center justify-center gap-3">
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-champagne/70" />
          <span className="h-1.5 w-1.5 rotate-45 bg-champagne" />
          <span className="h-px w-20 bg-gradient-to-l from-transparent to-champagne/70" />
        </div>

        {/* Editorial Narrative Paragraphs */}
        <FadeUp delay={0.2} y={24} className="max-w-3xl sm:max-w-4xl mx-auto space-y-6">
          <p className="font-serif text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed text-ivory/95 tracking-wide">
            AUREXA is a private, immersive art and cultural exhibition experience created for collectors, patrons, connoisseurs and admirers of exceptional art.
          </p>

          <p className="font-serif text-sm sm:text-base md:text-lg lg:text-[19px] font-light leading-relaxed sm:leading-[2] md:leading-[2.2] text-ivory/75 tracking-wide text-center sm:text-justify sm:[text-align-last:center] [text-wrap:pretty]">
            It brings together paintings, sculptures and remarkable works within a carefully curated environment where art is not simply displayed, but experienced. At AUREXA, art is honored, discussed, and truly celebrated by those who appreciate its finest form. It is a gathering of discerning individuals who don&apos;t just observe art, but live it.
          </p>
        </FadeUp>

        {/* The 6 Core Elements Pillars */}
        <div className="mt-16 w-full max-w-4xl border-t border-champagne/15 pt-12">
          <FadeUp delay={0.25} y={16}>
            <p className="mb-8 text-[10px] uppercase tracking-[0.45em] text-champagne">
              AUREXA Combines
            </p>
          </FadeUp>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 text-left">
            {PILLARS.map((p, i) => (
              <FadeUp key={p.title} delay={0.06 * i} y={20}>
                <div className="group relative border border-ivory/10 bg-navy/30 p-5 sm:p-6 transition-all duration-500 hover:border-champagne/40 hover:bg-navy/60">
                  <span className="font-serif text-[11px] italic tracking-widest text-champagne/70">
                    {p.latin}
                  </span>
                  <h3 className="mt-2 font-serif text-xl sm:text-2xl font-light tracking-wide text-ivory group-hover:text-champagne transition-colors duration-300">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-ivory/60 font-light">
                    {p.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Standout Climax Line in All Caps */}
        <FadeUp delay={0.35} y={20} className="mt-14 sm:mt-18 flex flex-col items-center">
          <div className="relative inline-flex flex-col items-center py-4 px-6 sm:px-14 border-y border-champagne/30 bg-gradient-to-r from-transparent via-champagne/[0.07] to-transparent">
            <LightSweep delay={0.4}>
              <p className="font-serif text-sm sm:text-lg md:text-xl lg:text-2xl font-light tracking-[0.22em] sm:tracking-[0.28em] text-champagne uppercase text-center">
                AUREXA ISN&apos;T JUST AN EVENT — IT IS AN IMMERSIVE JOURNEY.
              </p>
            </LightSweep>
          </div>

          <button
            onClick={() => scrollToId("experience")}
            className="mt-8 text-[10px] uppercase tracking-[0.35em] text-ivory/60 transition-colors duration-300 hover:text-champagne"
          >
            Discover the Experience ↓
          </button>
        </FadeUp>
      </div>
    </section>
  );
};
