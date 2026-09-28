import React, { useState } from "react";
import InfiniteSpiral from "./InfiniteSpiral";
import { Eyebrow, FadeUp, LightSweep, TextReveal } from "./reveal";
import { MoveVertical, Eye, Sparkles } from "lucide-react";

const GLIMPSE_ITEMS = [
  {
    src: "https://images.unsplash.com/photo-1578301978162-7aae4d755744?q=80&w=1600&auto=format&fit=crop",
    alt: "Classical Oil Painting",
    title: "The Departure of the Argonauts",
    category: "Paintings",
  },
  {
    src: "https://images.unsplash.com/photo-1685062478366-907bf61feee0?q=80&w=1600&auto=format&fit=crop",
    alt: "Carrara Marble Sculpture",
    title: "Venus at her Toilet",
    category: "Sculptures",
  },
  {
    src: "https://images.unsplash.com/photo-1583119912267-cc97c911e416?q=80&w=1600&auto=format&fit=crop",
    alt: "Palazzo Ceiling & Architecture",
    title: "Grand Salon Frescoes",
    category: "Exhibition Rooms",
  },
  {
    src: "https://images.unsplash.com/photo-1779497698182-2316ce352f94?q=80&w=1600&auto=format&fit=crop",
    alt: "Roman Imperial Bronze Mask",
    title: "Gilt Bronze Antiquity",
    category: "Artifacts",
  },
  {
    src: "https://images.unsplash.com/photo-1621886292650-520f76c747d6?q=80&w=1600&auto=format&fit=crop",
    alt: "Marble Gallery Corridor",
    title: "The Marble Corridor",
    category: "Architectural Details",
  },
  {
    src: "https://images.unsplash.com/photo-1771845220856-8c5fc1c3e93d?q=80&w=1600&auto=format&fit=crop",
    alt: "Contemporary Bronze Installation",
    title: "The Silent Rostrum",
    category: "Art Installations",
  },
  {
    src: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?q=80&w=1600&auto=format&fit=crop",
    alt: "Old Masters Exhibition Room",
    title: "The Old Masters Room",
    category: "Exhibition Rooms",
  },
  {
    src: "https://images.unsplash.com/photo-1663324370858-2aaf45dbf11f?q=80&w=1600&auto=format&fit=crop",
    alt: "Antiquities Cabinet",
    title: "Hellenistic Relief Fragment",
    category: "Artifacts",
  },
];

export const Glimpse = () => {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <section
      id="glimpse"
      data-testid="glimpse-section"
      className="relative overflow-hidden border-t border-champagne/15 bg-gradient-to-b from-[#060D17] via-[#091526] to-[#060D17] py-28 md:py-40 text-ivory"
    >
      {/* Ambient Lighting Gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(185,154,104,0.08)_0%,transparent_70%)]"
      />

      {/* Header Container */}
      <div className="relative mx-auto max-w-5xl px-6 md:px-12 text-center">
        <Eyebrow index="04" label="Glimpse of Aurexa" tone="champagne" className="justify-center" />

        <h2 className="mt-8 mb-4">
          <LightSweep>
            <TextReveal
              lines={["THE INFINITE", "GLIMPSE"]}
              lineClassName="font-serif text-4xl font-light tracking-[0.18em] text-ivory sm:text-6xl md:text-7xl leading-[1.05]"
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
          <p className="font-serif text-base md:text-lg font-light italic text-ivory/80 leading-relaxed">
            &ldquo;Step through a suspended continuum of moments and perspectives.&rdquo;
          </p>
          <p className="mt-3 text-xs md:text-sm font-light text-ivory/55 tracking-wide">
            Fragments of masterworks, historic halls, and curatorial spaces before entering the collection.
          </p>
        </FadeUp>
      </div>

      {/* Broad 3D Exhibition Stage */}
      <div className="relative mx-auto w-[92vw] max-w-[1750px] px-2 sm:px-4">
        <FadeUp delay={0.3} y={24} className="mt-10 md:mt-14">
          <div
            className="relative w-full h-[620px] md:h-[700px] lg:h-[740px] rounded-3xl border border-champagne/15 bg-gradient-to-b from-navy/40 via-ink/70 to-navy/40 backdrop-blur-[3px] overflow-hidden"
          >
            <InfiniteSpiral
              items={GLIMPSE_ITEMS}
              speed={0.45}
              cardWidth={220}
              cardHeight={290}
              perspective={1250}
              cardRadius={14}
              centerScale={1.22}
              edgeBlur={6}
              cardsPerTurn={8}
              pauseOnHover
              onCardClick={(item) => setActiveItem(item)}
            />

            {/* Interactive Floating Guide Badges */}
            <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 rounded-full border border-champagne/25 bg-ink/80 px-5 py-2 text-[10px] sm:text-xs tracking-[0.25em] text-champagne/90 backdrop-blur-md uppercase shadow-lg">
              <MoveVertical size={13} className="animate-pulse text-champagne" />
              <span>Drag to Rotate • Hover to Pause • Click to Inspect</span>
            </div>
          </div>
        </FadeUp>

        {/* Selected Artwork Preview Detail (if clicked) */}
        {activeItem && (
          <FadeUp delay={0.1} y={12} className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-4 rounded-full border border-champagne/40 bg-navy/95 px-7 py-3 backdrop-blur-md shadow-2xl">
              <Sparkles size={15} className="text-champagne" />
              <span className="text-xs uppercase tracking-[0.2em] text-ivory/90">
                Glimpse: <strong className="text-champagne font-normal">{activeItem.title}</strong>
                {activeItem.category && (
                  <span className="ml-2 text-ivory/50">({activeItem.category})</span>
                )}
              </span>
              <button
                onClick={() => setActiveItem(null)}
                className="ml-3 text-xs text-ivory/50 hover:text-ivory transition-colors"
                aria-label="Close preview"
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
