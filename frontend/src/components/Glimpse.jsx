import React, { useState } from "react";
import InfiniteSpiral from "./InfiniteSpiral";
import { Eyebrow, FadeUp, LightSweep, TextReveal } from "./reveal";
import { MoveVertical, Eye } from "lucide-react";

const images = [
  { src: "/images/landscape-1.jpg", alt: "Mountain lake", title: "Alpine Solitude" },
  { src: "/images/landscape-2.jpg", alt: "Forest path", title: "Emerald Canopy" },
  { src: "/images/landscape-3.jpg", alt: "Rocky summit", title: "Highlands Peak" },
  { src: "/images/landscape-4.jpg", alt: "Ocean shore", title: "Lapis Horizon" },
  { src: "/images/landscape-5.jpg", alt: "Green meadow", title: "Verdant Mist" },
  { src: "/images/landscape-6.jpg", alt: "Desert light", title: "Golden Dune" },
];

export const Glimpse = () => {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <section
      id="glimpse"
      data-testid="glimpse-section"
      className="relative overflow-hidden border-t border-champagne/15 bg-gradient-to-b from-ink via-[#081220] to-ink py-24 md:py-36 text-ivory"
    >
      {/* Ambient Lighting Gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(185,154,104,0.08)_0%,transparent_70%)]"
      />

      {/* Header Container */}
      <div className="relative mx-auto max-w-5xl px-6 md:px-12 text-center">
        <Eyebrow index="02" label="Visual Journey" tone="champagne" className="justify-center" />

        <h2 className="mt-8 mb-4">
          <LightSweep>
            <TextReveal
              lines={["THE INFINITE GLIMPSE"]}
              lineClassName="font-serif text-4xl font-light tracking-[0.18em] text-ivory sm:text-6xl md:text-7xl"
            />
          </LightSweep>
        </h2>

        {/* Golden Divider */}
        <div className="mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-gradient-to-r from-transparent to-champagne/60" />
          <span className="h-1.5 w-1.5 rotate-45 bg-champagne/80" />
          <span className="h-px w-16 bg-gradient-to-l from-transparent to-champagne/60" />
        </div>

        <FadeUp delay={0.2} y={16} className="max-w-2xl mx-auto">
          <p className="text-sm md:text-base font-light text-ivory/70 leading-relaxed">
            Step through a suspended 3D continuum of moments and perspectives.
          </p>
        </FadeUp>
      </div>

      {/* Broad 3D Exhibition Stage (88–92vw width) */}
      <div className="relative mx-auto w-[90vw] max-w-[1750px] px-2 sm:px-4">
        <FadeUp delay={0.3} y={24} className="mt-8 md:mt-12">
          <div
            className="relative w-full h-[620px] md:h-[690px] lg:h-[730px] rounded-3xl border border-champagne/10 bg-gradient-to-b from-navy/30 via-ink/60 to-navy/30 backdrop-blur-[2px] overflow-hidden"
          >
            <InfiniteSpiral
              items={images}
              speed={0.48}
              cardWidth={210}
              cardHeight={280}
              perspective={1250}
              cardRadius={14}
              centerScale={1.22}
              edgeBlur={7}
              cardsPerTurn={8}
              pauseOnHover
              onCardClick={(item) => setActiveItem(item)}
            />

            {/* Interactive Floating Guide Badges */}
            <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 rounded-full border border-champagne/20 bg-ink/75 px-5 py-2 text-[10px] sm:text-xs tracking-[0.25em] text-champagne/90 backdrop-blur-md uppercase shadow-lg">
              <MoveVertical size={13} className="animate-pulse text-champagne" />
              <span>Drag to Rotate • Hover to Pause</span>
            </div>
          </div>
        </FadeUp>

        {/* Selected Artwork Preview Detail (if clicked) */}
        {activeItem && (
          <FadeUp delay={0.1} y={12} className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-4 rounded-full border border-champagne/40 bg-navy/90 px-6 py-2.5 backdrop-blur-md shadow-xl">
              <Eye size={15} className="text-champagne" />
              <span className="text-xs uppercase tracking-[0.2em] text-ivory/90">
                Viewing: <strong className="text-champagne font-normal">{activeItem.title || activeItem.alt}</strong>
              </span>
              <button
                onClick={() => setActiveItem(null)}
                className="ml-2 text-xs text-ivory/40 hover:text-ivory transition-colors"
              >
                ✕
              </button>
            </div>
          </FadeUp>
        )}
      </div>
    </section>
  );
};

export default Glimpse;
