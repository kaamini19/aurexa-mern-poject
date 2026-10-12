import React, { useState, useMemo, useEffect, useCallback } from "react";
import InfiniteSpiral from "./InfiniteSpiral";
import { Eyebrow, FadeUp, LightSweep, TextReveal } from "./reveal";
import {
  MoveVertical,
  Eye,
  Sparkles,
  Grid,
  Orbit,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Filter,
} from "lucide-react";

export const GLIMPSE_ITEMS = [
  {
    id: "glimpse-01",
    src: "/glimpse/pmf06283.jpg",
    fallback: "https://drive.google.com/thumbnail?id=1JzwLSIfychaT7DFHClq6zAHFRQ5qQhhr&sz=w1600",
    driveId: "1JzwLSIfychaT7DFHClq6zAHFRQ5qQhhr",
    alt: "Grand Exhibition Hall with draped art easels and gala cocktail tables",
    title: "The Grand Exhibition Hall",
    category: "Curatorial Previews",
    aspect: "landscape",
    objectPosition: "center",
    description: "Veiled masterworks stand poised beneath luminous chandeliers before the arrival of collectors.",
  },
  {
    id: "glimpse-02",
    src: "/glimpse/pmf06295.jpg",
    fallback: "https://drive.google.com/thumbnail?id=18ZagtfoLAHVtxjt7bkfa3Ul8jZbjvHcW&sz=w1600",
    driveId: "18ZagtfoLAHVtxjt7bkfa3Ul8jZbjvHcW",
    alt: "Masterpiece canvases draped in gold and crimson silk awaiting unveiling",
    title: "Veiled Masterpieces",
    category: "Art & Unveiling",
    aspect: "portrait",
    objectPosition: "top",
    description: "Gold and crimson satin drapery enshrining monumental canvases prior to the ceremonial reveal.",
  },
  {
    id: "glimpse-03",
    src: "/glimpse/pmf06320.jpg",
    fallback: "https://drive.google.com/thumbnail?id=10sFrP9vzQPdFmp1Tt5_zn2ZNvsY70jxq&sz=w1600",
    driveId: "10sFrP9vzQPdFmp1Tt5_zn2ZNvsY70jxq",
    alt: "Luxury partner automotive emblem in metallic finish",
    title: "The Crest of Prestige",
    category: "The Showcase",
    aspect: "landscape",
    objectPosition: "center",
    description: "Bespoke automotive artistry and luxury engineering reflecting ambient gallery light.",
  },
  {
    id: "glimpse-04",
    src: "/glimpse/pmf06324.jpg",
    fallback: "https://drive.google.com/thumbnail?id=1Gfrn66w6T0x9a_0SnhH2yTXRft1eyBkD&sz=w1600",
    driveId: "1Gfrn66w6T0x9a_0SnhH2yTXRft1eyBkD",
    alt: "BMW luxury showcase pavilion at the private exhibition grounds",
    title: "Mobility Showcase Pavilion",
    category: "The Showcase",
    aspect: "landscape",
    objectPosition: "center",
    description: "Official luxury mobility partner showcase stationed in the manicured private grounds.",
  },
  {
    id: "glimpse-05",
    src: "/glimpse/pmf06328.jpg",
    fallback: "https://drive.google.com/thumbnail?id=1Xp8h_miv7NpMRPvoDlyf0m5liEdlFNpf&sz=w1600",
    driveId: "1Xp8h_miv7NpMRPvoDlyf0m5liEdlFNpf",
    alt: "Curved digital display and leather cockpit appointments",
    title: "Curved Horizon Interior",
    category: "The Showcase",
    aspect: "landscape",
    objectPosition: "center",
    description: "Precision craftsmanship, digital cockpit architecture, and saddle leather detailing.",
  },
  {
    id: "glimpse-06",
    src: "/glimpse/pmf06329.jpg",
    fallback: "https://drive.google.com/thumbnail?id=1G2H1ZBRrQPNAOBbWc1mXLfB6525MUEEf&sz=w1600",
    driveId: "1G2H1ZBRrQPNAOBbWc1mXLfB6525MUEEf",
    alt: "Sculpted exterior profile under sunlit exhibition canopies",
    title: "Sculpted Silhouette",
    category: "The Showcase",
    aspect: "landscape",
    objectPosition: "center",
    description: "Aerodynamic forms juxtaposed against natural foliage in the outdoor pavilion.",
  },
  {
    id: "glimpse-07",
    src: "/glimpse/pmf06352.jpg",
    fallback: "https://drive.google.com/thumbnail?id=1hDCj-r7S3aDkWGFishBu46eTZAHlBOoA&sz=w1600",
    driveId: "1hDCj-r7S3aDkWGFishBu46eTZAHlBOoA",
    alt: "Sleek rear profile and badging of the exhibition vehicle",
    title: "The Tailored Finish",
    category: "The Showcase",
    aspect: "landscape",
    objectPosition: "center",
    description: "Subtle metallic contours capturing reflections of the afternoon preview.",
  },
  {
    id: "glimpse-08",
    src: "/glimpse/pmf06364.jpg",
    fallback: "https://drive.google.com/thumbnail?id=1tYEhQz5S5Of7Tu64JOEpGcLHQfOxUtiT&sz=w1600",
    driveId: "1tYEhQz5S5Of7Tu64JOEpGcLHQfOxUtiT",
    alt: "Hand-stitched leather steering wheel and cockpit appointments",
    title: "Saddle Tan Craftsmanship",
    category: "The Showcase",
    aspect: "portrait",
    objectPosition: "center",
    description: "Hand-stitched leather steering wheel and cockpit appointments of the showcase vehicle.",
  },
  {
    id: "glimpse-09",
    src: "/glimpse/pmf06417.jpg",
    fallback: "https://drive.google.com/thumbnail?id=1v6ixBsYDHltbc4dQc58Xj1LwUVVDYb5z&sz=w1600",
    driveId: "1v6ixBsYDHltbc4dQc58Xj1LwUVVDYb5z",
    alt: "Art patrons and collectors gathered at the reception salon",
    title: "The Patron Gathering",
    category: "Collectors & Salon",
    aspect: "landscape",
    objectPosition: "center",
    description: "Connoisseurs and patrons assembling at the central reception before the auction proceedings.",
  },
  {
    id: "glimpse-10",
    src: "/glimpse/pmf06433.jpg",
    fallback: "https://drive.google.com/thumbnail?id=1TXQSd4hACUBrigP-AdwjWCT0Pa1mKE-7&sz=w1600",
    driveId: "1TXQSd4hACUBrigP-AdwjWCT0Pa1mKE-7",
    alt: "Guests engaged in lively discussion before the art reveal",
    title: "Curatorial Discourse",
    category: "Curatorial Previews",
    aspect: "landscape",
    objectPosition: "center",
    description: "Dialogue on rarity, historical provenance, and curatorial vision over afternoon refreshments.",
  },
  {
    id: "glimpse-11",
    src: "/glimpse/pmf06437.jpg",
    fallback: "https://drive.google.com/thumbnail?id=1dzon0eOZyVf7hLD6rClGeOciPfX5PuCJ&sz=w1600",
    driveId: "1dzon0eOZyVf7hLD6rClGeOciPfX5PuCJ",
    alt: "Collectors raising glasses of vintage champagne and wine",
    title: "The Evening Toast",
    category: "Private Gala",
    aspect: "portrait",
    objectPosition: "top",
    description: "Collectors raising glasses of vintage champagne in celebration of the collection unveiling.",
  },
  {
    id: "glimpse-12",
    src: "/glimpse/pmf06461.jpg",
    fallback: "https://drive.google.com/thumbnail?id=169a-IR2cWb0lFgkzSgstG091DLASS0-H&sz=w1600",
    driveId: "169a-IR2cWb0lFgkzSgstG091DLASS0-H",
    alt: "Celebratory champagne and camaraderie among distinguished attendees",
    title: "The Connoisseur's Circle",
    category: "Private Gala",
    aspect: "portrait",
    objectPosition: "top",
    description: "Celebratory champagne and shared camaraderie among distinguished attendees of Aurexa.",
  },
  {
    id: "glimpse-13",
    src: "/glimpse/pmf06500.jpg",
    fallback: "https://drive.google.com/thumbnail?id=1aIM7lscWb4WmNhf1IgNDkdbrOSfQulNc&sz=w1600",
    driveId: "1aIM7lscWb4WmNhf1IgNDkdbrOSfQulNc",
    alt: "Attendees analyzing lot estimations and bidding strategies beside the veiled easels",
    title: "Pre-Auction Perspectives",
    category: "Curatorial Previews",
    aspect: "landscape",
    objectPosition: "center",
    description: "Attendees analyzing lot estimations and bidding strategies beside the satin drapery.",
  },
  {
    id: "glimpse-14",
    src: "/glimpse/pmf06504.jpg",
    fallback: "https://drive.google.com/thumbnail?id=1qFLE0pVIW5SYE-G0dzNhYf5j0iAOibg3&sz=w1600",
    driveId: "1qFLE0pVIW5SYE-G0dzNhYf5j0iAOibg3",
    alt: "Evening salon gathering of art collectors and enthusiasts",
    title: "The Art Advisory",
    category: "Collectors & Salon",
    aspect: "portrait",
    objectPosition: "top",
    description: "Private advisory consultations exploring acquisition opportunities for rare works.",
  },
  {
    id: "glimpse-15",
    src: "/glimpse/pmf06515.jpg",
    fallback: "https://drive.google.com/thumbnail?id=15PwdQ4vr4CitrgbhYyT7UZ0noYSVMHNl&sz=w1600",
    driveId: "15PwdQ4vr4CitrgbhYyT7UZ0noYSVMHNl",
    alt: "Collectors in tailored suits sharing perspectives on contemporary artistic expression",
    title: "Dialogue on Modern Form",
    category: "Curatorial Previews",
    aspect: "portrait",
    objectPosition: "top",
    description: "Collectors in tailored suits sharing perspectives on contemporary artistic expression.",
  },
  {
    id: "glimpse-16",
    src: "/glimpse/pmf06549.jpg",
    fallback: "https://drive.google.com/thumbnail?id=1dYARizkw65WSb05aFH9z_qCX2e6DsKPR&sz=w1600",
    driveId: "1dYARizkw65WSb05aFH9z_qCX2e6DsKPR",
    alt: "Curator presenting collection background to intrigued attendees",
    title: "Exhibition Exchange",
    category: "Collectors & Salon",
    aspect: "landscape",
    objectPosition: "center",
    description: "Lively discussions highlighting artistic lineage and the journey of the exhibited works.",
  },
  {
    id: "glimpse-17",
    src: "/glimpse/pmf06567.jpg",
    fallback: "https://drive.google.com/thumbnail?id=1468B35R3eTM3AM8po8X-2yTf0WUg9lvZ&sz=w1600",
    driveId: "1468B35R3eTM3AM8po8X-2yTf0WUg9lvZ",
    alt: "Guest savoring red wine during the evening private view",
    title: "Vintage & Verve",
    category: "Private Gala",
    aspect: "portrait",
    objectPosition: "top",
    description: "Fine vintage red wine and elegant socializing during the twilight reception.",
  },
  {
    id: "glimpse-18",
    src: "/glimpse/pmf06573.jpg",
    fallback: "https://drive.google.com/thumbnail?id=12HCzIZuIFt7sEgbJpqfh2xzdXTktEtK0&sz=w1600",
    driveId: "12HCzIZuIFt7sEgbJpqfh2xzdXTktEtK0",
    alt: "Bidders and collectors discussing acquisition strategies",
    title: "The Art of Negotiation",
    category: "Curatorial Previews",
    aspect: "landscape",
    objectPosition: "center",
    description: "Discreet conversations between prospective bidders and gallery curators.",
  },
  {
    id: "glimpse-19",
    src: "/glimpse/pmf06578.jpg",
    fallback: "https://drive.google.com/thumbnail?id=1zwLZyxoE4CcrZIQfkB9edYSDdQoFySxW&sz=w1600",
    driveId: "1zwLZyxoE4CcrZIQfkB9edYSDdQoFySxW",
    alt: "Collectors gathered in contemplation around the newly revealed canvas",
    title: "First Sight of the Masterwork",
    category: "Art & Unveiling",
    aspect: "landscape",
    objectPosition: "center",
    description: "Collectors gathered in contemplation around the newly revealed abstract canvas.",
  },
  {
    id: "glimpse-20",
    src: "/glimpse/pmf06587.jpg",
    fallback: "https://drive.google.com/thumbnail?id=1TU3hXZsvawGn7lGwpUWhreFLRDWZzpPz&sz=w1600",
    driveId: "1TU3hXZsvawGn7lGwpUWhreFLRDWZzpPz",
    alt: "Patrons enjoying cocktail hour and discussing the collection's curated selections",
    title: "The Collector Salon",
    category: "Collectors & Salon",
    aspect: "landscape",
    objectPosition: "center",
    description: "Patrons enjoying cocktail hour and discussing the collection's curated selections.",
  },
  {
    id: "glimpse-21",
    src: "/glimpse/pmf06633.jpg",
    fallback: "https://drive.google.com/thumbnail?id=1hOYhMOo_-fBcXOxnRSpEAXUr4XRie1WJ&sz=w1600",
    driveId: "1hOYhMOo_-fBcXOxnRSpEAXUr4XRie1WJ",
    alt: "Distinguished guests sharing champagne and conversation amidst gallery lighting",
    title: "Evening Elegance",
    category: "Private Gala",
    aspect: "landscape",
    objectPosition: "center",
    description: "Distinguished guests sharing champagne and conversation amidst gallery lighting.",
  },
  {
    id: "glimpse-22",
    src: "/glimpse/pmf06673.jpg",
    fallback: "https://drive.google.com/thumbnail?id=1JxvxPQTcVAPOWy9zADluN3vXBQZHBnGU&sz=w1600",
    driveId: "1JxvxPQTcVAPOWy9zADluN3vXBQZHBnGU",
    alt: "Formal gathering of collectors and private art advisors in dialogue",
    title: "The Gentlemen of Aurexa",
    category: "Collectors & Salon",
    aspect: "portrait",
    objectPosition: "top",
    description: "Refined sartorial elegance and thoughtful dialogue during the exhibition soirée.",
  },
  {
    id: "glimpse-23",
    src: "/glimpse/pmf06694.jpg",
    fallback: "https://drive.google.com/thumbnail?id=1r2qmTBx-KOq-oN9UOaRKbLCQWfM1cAPJ&sz=w1600",
    driveId: "1r2qmTBx-KOq-oN9UOaRKbLCQWfM1cAPJ",
    alt: "Silver tray service of sparkling champagne and fine wine flutes",
    title: "Sommelier Service",
    category: "Private Gala",
    aspect: "landscape",
    objectPosition: "center",
    description: "Curated vintage champagne and fine wine flutes served with silver tray precision.",
  },
  {
    id: "glimpse-24",
    src: "/glimpse/pmf06758.jpg",
    fallback: "https://drive.google.com/thumbnail?id=1uzAsFeB0ztNwb983wXGmdVJuixDaPbT9&sz=w1600",
    driveId: "1uzAsFeB0ztNwb983wXGmdVJuixDaPbT9",
    alt: "Dramatic moment of drawing back the gold satin drape from the canvas masterpiece",
    title: "The Moment of Unveiling",
    category: "Art & Unveiling",
    aspect: "portrait",
    objectPosition: "top",
    description: "Drawing back the golden satin veil to reveal the vibrant canvas masterpiece to applause.",
  },
];

const CATEGORIES = [
  "ALL CURATIONS",
  "ART & UNVEILING",
  "CURATORIAL PREVIEWS",
  "PRIVATE GALA",
  "COLLECTORS & SALON",
  "THE SHOWCASE",
];

export const Glimpse = () => {
  const [activeCategory, setActiveCategory] = useState("ALL CURATIONS");
  const [viewMode, setViewMode] = useState("spatial"); // 'spatial' | 'mosaic'
  const [lightboxItem, setLightboxItem] = useState(null);
  const [activeChipItem, setActiveChipItem] = useState(null);

  // Filter items by category
  const filteredItems = useMemo(() => {
    if (activeCategory === "ALL CURATIONS") return GLIMPSE_ITEMS;
    return GLIMPSE_ITEMS.filter((item) => item.category.toUpperCase() === activeCategory);
  }, [activeCategory]);

  // Current index in filtered list for lightbox next/prev
  const lightboxIndex = useMemo(() => {
    if (!lightboxItem) return -1;
    return filteredItems.findIndex((item) => item.id === lightboxItem.id);
  }, [lightboxItem, filteredItems]);

  const handleNextLightbox = useCallback(
    (e) => {
      e?.stopPropagation();
      if (filteredItems.length === 0) return;
      const nextIdx = (lightboxIndex + 1) % filteredItems.length;
      setLightboxItem(filteredItems[nextIdx]);
    },
    [lightboxIndex, filteredItems]
  );

  const handlePrevLightbox = useCallback(
    (e) => {
      e?.stopPropagation();
      if (filteredItems.length === 0) return;
      const prevIdx = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
      setLightboxItem(filteredItems[prevIdx]);
    },
    [lightboxIndex, filteredItems]
  );

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!lightboxItem) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setLightboxItem(null);
      if (e.key === "ArrowRight") handleNextLightbox();
      if (e.key === "ArrowLeft") handlePrevLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxItem, handleNextLightbox, handlePrevLightbox]);

  return (
    <section
      id="glimpse"
      data-testid="glimpse-section"
      className="relative overflow-hidden border-t border-champagne/15 bg-gradient-to-b from-[#060D17] via-[#091526] to-[#060D17] py-24 sm:py-32 md:py-40 text-ivory"
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
            &ldquo;Step through a suspended continuum of moments, masterworks, and curatorial dialogues.&rdquo;
          </p>
          <p className="mt-3 text-xs md:text-sm font-light text-ivory/55 tracking-wide">
            Archival captures from the AUREXA exhibition salon — from the ceremonial unveilings and collector toasts to the official mobility showcase.
          </p>
        </FadeUp>

        {/* Luxury Curatorial Controls: Category Filters & View Mode Switcher */}
        <FadeUp delay={0.25} y={16} className="mt-10 flex flex-col md:flex-row items-center justify-between gap-5 border-y border-champagne/15 py-4">
          {/* Category Filter Pills */}
          <div
            className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
            role="tablist"
            aria-label="Filter glimpses by category"
          >
            {CATEGORIES.map((cat) => {
              const count =
                cat === "ALL CURATIONS"
                  ? GLIMPSE_ITEMS.length
                  : GLIMPSE_ITEMS.filter((item) => item.category.toUpperCase() === cat).length;
              const isActive = activeCategory === cat;

              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  data-testid={`glimpse-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveChipItem(null);
                  }}
                  className={`group relative rounded-full px-3.5 sm:px-4 py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive
                      ? "border border-champagne bg-champagne/15 text-champagne font-medium shadow-[0_0_15px_rgba(185,154,104,0.15)]"
                      : "border border-champagne/10 bg-transparent text-ivory/60 hover:border-champagne/40 hover:text-ivory"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`ml-1.5 text-[9px] ${
                      isActive ? "text-champagne/80 font-normal" : "text-ivory/40"
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle: 3D Spiral vs Curated Mosaic */}
          <div className="flex items-center gap-1.5 rounded-full border border-champagne/20 bg-ink/70 p-1 backdrop-blur-md">
            <button
              onClick={() => setViewMode("spatial")}
              data-testid="glimpse-view-spatial"
              aria-label="3D Spatial Vortex View"
              className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                viewMode === "spatial"
                  ? "bg-champagne/20 text-champagne font-medium border border-champagne/40 shadow-sm"
                  : "text-ivory/50 hover:text-ivory"
              }`}
            >
              <Orbit size={13} className="text-champagne" />
              <span>3D Spatial</span>
            </button>
            <button
              onClick={() => setViewMode("mosaic")}
              data-testid="glimpse-view-mosaic"
              aria-label="Curated Mosaic Gallery View"
              className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                viewMode === "mosaic"
                  ? "bg-champagne/20 text-champagne font-medium border border-champagne/40 shadow-sm"
                  : "text-ivory/50 hover:text-ivory"
              }`}
            >
              <Grid size={13} className="text-champagne" />
              <span>Mosaic Wall</span>
            </button>
          </div>
        </FadeUp>
      </div>

      {/* Main Exhibition Stage Container */}
      <div className="relative mx-auto w-[92vw] max-w-[1750px] px-2 sm:px-4">
        {/* VIEW MODE 1: 3D Spatial Vortex */}
        {viewMode === "spatial" && (
          <FadeUp delay={0.3} y={24} className="mt-8 md:mt-12">
            <div
              className="relative w-full h-[620px] md:h-[700px] lg:h-[740px] rounded-3xl border border-champagne/15 bg-gradient-to-b from-navy/40 via-ink/70 to-navy/40 backdrop-blur-[3px] overflow-hidden"
              data-testid="glimpse-spatial-container"
            >
              <InfiniteSpiral
                items={filteredItems}
                speed={0.42}
                cardWidth={220}
                cardHeight={295}
                perspective={1250}
                cardRadius={14}
                centerScale={1.22}
                edgeBlur={6}
                cardsPerTurn={Math.min(filteredItems.length, 8)}
                pauseOnHover
                onCardClick={(item) => {
                  setActiveChipItem(item);
                  setLightboxItem(item);
                }}
              />

              {/* Interactive Floating Guide Badge */}
              <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 rounded-full border border-champagne/25 bg-ink/85 px-5 py-2 text-[10px] sm:text-xs tracking-[0.25em] text-champagne/90 backdrop-blur-md uppercase shadow-xl">
                <MoveVertical size={13} className="animate-pulse text-champagne" />
                <span>Drag to Rotate • Hover to Pause • Click to Inspect</span>
              </div>
            </div>
          </FadeUp>
        )}

        {/* VIEW MODE 2: Curated Mosaic Editorial Wall */}
        {viewMode === "mosaic" && (
          <FadeUp delay={0.2} y={20} className="mt-8 md:mt-12">
            <div
              data-testid="glimpse-mosaic-container"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            >
              {filteredItems.map((item, index) => {
                const isPortrait = item.aspect === "portrait";

                return (
                  <div
                    key={item.id}
                    onClick={() => setLightboxItem(item)}
                    data-testid={`mosaic-card-${item.id}`}
                    className={`group relative overflow-hidden rounded-2xl border border-champagne/15 bg-[#081220] transition-all duration-500 hover:border-champagne/60 hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8),0_0_20px_rgba(185,154,104,0.15)] cursor-pointer ${
                      isPortrait ? "sm:row-span-2 aspect-[2/3]" : "aspect-[3/2]"
                    }`}
                  >
                    {/* Photograph */}
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      onError={(e) => {
                        if (item.fallback && e.currentTarget.src !== item.fallback) {
                          e.currentTarget.src = item.fallback;
                        }
                      }}
                      style={{
                        objectPosition: item.objectPosition || "center",
                      }}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Gradient Vignette */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity duration-300" />

                    {/* Corner Accent Badge */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 rounded-full border border-champagne/20 bg-ink/70 px-2.5 py-1 backdrop-blur-sm">
                      <span className="text-[9px] font-mono tracking-widest text-champagne/90">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Hover Inspect Icon */}
                    <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex h-7 w-7 items-center justify-center rounded-full border border-champagne/40 bg-ink/80 text-champagne backdrop-blur-sm">
                      <Maximize2 size={12} />
                    </div>

                    {/* Caption Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-4 transition-transform duration-300">
                      <span className="text-[9px] uppercase tracking-[0.22em] text-champagne">
                        {item.category}
                      </span>
                      <h3 className="font-serif text-base tracking-wide text-ivory drop-shadow-md">
                        {item.title}
                      </h3>
                      <p className="mt-1 line-clamp-1 text-[11px] font-light text-ivory/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </FadeUp>
        )}

        {/* Selected Artwork Quick Detail Chip (if clicked in 3D spiral) */}
        {activeChipItem && viewMode === "spatial" && (
          <FadeUp delay={0.1} y={12} className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-4 rounded-full border border-champagne/40 bg-navy/95 px-7 py-3 backdrop-blur-md shadow-2xl">
              <Sparkles size={15} className="text-champagne" />
              <span className="text-xs uppercase tracking-[0.2em] text-ivory/90">
                Glimpse: <strong className="text-champagne font-normal">{activeChipItem.title}</strong>
                {activeChipItem.category && (
                  <span className="ml-2 text-ivory/50">({activeChipItem.category})</span>
                )}
              </span>
              <button
                onClick={() => setLightboxItem(activeChipItem)}
                className="text-xs text-champagne hover:underline tracking-wider uppercase ml-2 flex items-center gap-1"
                aria-label="Enlarge artwork preview"
              >
                <Eye size={12} />
                <span>Enlarge</span>
              </button>
              <button
                onClick={() => setActiveChipItem(null)}
                className="ml-3 text-xs text-ivory/50 hover:text-ivory transition-colors"
                aria-label="Close preview"
              >
                ✕
              </button>
            </div>
          </FadeUp>
        )}
      </div>

      {/* LUXURY LIGHTBOX / FULLSCREEN INSPECTION MODAL */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          data-testid="glimpse-lightbox-modal"
          onClick={() => setLightboxItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 md:p-10 backdrop-blur-xl animate-in fade-in duration-300"
        >
          {/* Modal Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col max-h-[92vh] max-w-5xl w-full rounded-2xl border border-champagne/30 bg-[#07101D] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(185,154,104,0.15)] overflow-hidden"
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between border-b border-champagne/15 px-6 py-4 bg-ink/60">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rotate-45 bg-champagne" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-champagne font-medium">
                  {lightboxItem.category}
                </span>
                <span className="text-ivory/30 text-xs">•</span>
                <span className="text-[10px] font-mono text-ivory/50">
                  {lightboxIndex >= 0 ? `${String(lightboxIndex + 1).padStart(2, "0")} / ${String(filteredItems.length).padStart(2, "0")}` : ""}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLightboxItem(null)}
                  data-testid="lightbox-close-btn"
                  aria-label="Close Lightbox"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-champagne/20 text-ivory/70 hover:border-champagne hover:text-ivory transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Modal Image Stage - Preserves 100% Correct Natural Aspect Ratio */}
            <div className="relative flex-1 flex items-center justify-center bg-black/60 p-2 sm:p-4 min-h-[300px] overflow-hidden">
              <img
                src={lightboxItem.src}
                alt={lightboxItem.alt}
                onError={(e) => {
                  if (lightboxItem.fallback && e.currentTarget.src !== lightboxItem.fallback) {
                    e.currentTarget.src = lightboxItem.fallback;
                  }
                }}
                className="max-h-[64vh] w-auto max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300"
              />

              {/* Prev / Next Navigation Arrows */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    onClick={handlePrevLightbox}
                    data-testid="lightbox-prev-btn"
                    aria-label="Previous photograph"
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-champagne/30 bg-ink/80 text-ivory/80 backdrop-blur-md hover:border-champagne hover:bg-navy hover:text-champagne transition-all shadow-xl"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={handleNextLightbox}
                    data-testid="lightbox-next-btn"
                    aria-label="Next photograph"
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-champagne/30 bg-ink/80 text-ivory/80 backdrop-blur-md hover:border-champagne hover:bg-navy hover:text-champagne transition-all shadow-xl"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Modal Caption & Description Footer */}
            <div className="border-t border-champagne/15 px-6 py-4 bg-ink/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-serif text-lg sm:text-xl font-normal tracking-wide text-ivory">
                  {lightboxItem.title}
                </h4>
                <p className="mt-1 text-xs text-ivory/65 font-light leading-relaxed max-w-2xl">
                  {lightboxItem.description}
                </p>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-[10px] tracking-[0.2em] uppercase text-champagne/70 border border-champagne/20 rounded-full px-3 py-1">
                  AUREXA EXCLUSIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Glimpse;
