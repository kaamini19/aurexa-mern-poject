import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X, Sparkles, Shield, Bookmark } from "lucide-react";
import { COLLECTION, CATEGORIES } from "@/data/content";
import { Eyebrow, FadeUp, ImageReveal, LightSweep, TextReveal } from "./reveal";
import { scrollToId } from "@/lib/scroll";

export const Gallery = () => {
  const [selectedCat, setSelectedCat] = useState("All");
  const [activeArt, setActiveArt] = useState(null);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setActiveArt(null);
    };
    if (activeArt) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeArt]);

  const filtered =
    selectedCat === "All"
      ? COLLECTION
      : COLLECTION.filter(
          (item) => item.category.toLowerCase() === selectedCat.toLowerCase()
        );

  return (
    <section
      id="gallery"
      data-testid="gallery-section"
      className="relative overflow-hidden bg-ink text-ivory border-t border-champagne/15 py-28 md:py-40"
    >
      {/* Target anchor for legacy #collection */}
      <span id="collection" className="absolute -top-24 left-0" aria-hidden />

      {/* Ambient background lighting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(185,154,104,0.06)_0%,transparent_65%)]"
      />

      <div className="relative mx-auto max-w-[1500px] px-6 md:px-12">
        <Eyebrow index="06" label="The Gallery" tone="champagne" />

        {/* Section Header */}
        <div className="mt-8 flex flex-wrap items-end justify-between gap-8 border-b border-champagne/20 pb-12">
          <div>
            <h2>
              <LightSweep>
                <TextReveal
                  lines={["ART & SCULPTURES", "THE COLLECTION"]}
                  lineClassName="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.05] tracking-wide text-ivory"
                />
              </LightSweep>
            </h2>
            <FadeUp delay={0.2}>
              <p className="mt-4 max-w-lg font-serif text-lg font-light italic text-ivory/70">
                A curated treasury of paintings, marble sculptures, antiquities, and rare masterworks.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={0.3}>
            <p className="max-w-md text-xs sm:text-sm leading-relaxed text-ivory/50 font-light">
              Each piece is preserved under museum-grade custody and presented here for private study and acquisition. Click any artwork for curatorial dossiers.
            </p>
          </FadeUp>
        </div>

        {/* Category Filters */}
        <div className="mt-10 flex flex-wrap items-center gap-3 md:gap-4">
          <span className="mr-2 text-[9px] uppercase tracking-[0.4em] text-champagne/80 font-medium">
            Category:
          </span>
          {CATEGORIES.map((cat) => {
            const active = selectedCat === cat;
            return (
              <button
                key={cat}
                data-testid={`gallery-filter-${cat.toLowerCase()}`}
                onClick={() => setSelectedCat(cat)}
                className={`relative px-4 py-2 text-[10px] uppercase tracking-[0.3em] transition-all duration-300 ${
                  active
                    ? "text-ink font-medium"
                    : "text-ivory/60 hover:text-ivory border border-ivory/15 hover:border-champagne/40 bg-navy/20"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="active-gallery-tab"
                    className="absolute inset-0 bg-champagne"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Artworks Editorial Grid */}
        <motion.div
          layout
          className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.article
                layout
                key={item.id || item.title}
                data-testid={`artwork-card-${item.id || i}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6, delay: 0.05 * (i % 3) }}
                onClick={() => setActiveArt(item)}
                className="group relative cursor-pointer"
              >
                {/* Image Container with Elegant Zoom & Gold Line Reveal */}
                <div className="relative aspect-[4/5] overflow-hidden bg-navy/40">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark subtle gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Gold Border Highlight */}
                  <span className="pointer-events-none absolute inset-0 border border-champagne/0 transition-colors duration-500 group-hover:border-champagne/60" />

                  {/* Top Badge: Category */}
                  <span className="absolute left-4 top-4 rounded-full border border-champagne/30 bg-ink/75 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-champagne backdrop-blur-sm">
                    {item.category}
                  </span>

                  {/* Hover Floating Action */}
                  <div className="absolute bottom-4 right-4 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-full border border-champagne bg-ink/90 px-3.5 py-1.5 text-[9px] uppercase tracking-[0.3em] text-champagne backdrop-blur-md shadow-lg">
                      Inspect Dossier <ArrowUpRight size={11} strokeWidth={1.5} />
                    </span>
                  </div>
                </div>

                {/* Metadata details */}
                <div className="mt-5 border-t border-ivory/10 pt-4 transition-colors duration-500 group-hover:border-champagne/40">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-serif text-2xl font-light italic text-ivory group-hover:text-champagne transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>

                  <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-ivory/60 font-light">
                    {item.origin} — <span className="text-champagne/80">{item.period}</span>
                  </p>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-ivory/40">
                    {item.medium}
                  </p>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Large Immersive Artwork Detail Modal */}
      <AnimatePresence>
        {activeArt && (
          <motion.div
            data-testid="artwork-modal"
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6 md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-ink/90 backdrop-blur-md"
              onClick={() => setActiveArt(null)}
            />

            {/* Modal Dialog Box */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 20 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 max-h-[90vh] w-full max-w-5xl overflow-y-auto border border-champagne/40 bg-gradient-to-b from-[#0B1728] to-[#07101D] p-6 sm:p-10 shadow-2xl"
            >
              {/* Close Button */}
              <button
                data-testid="close-artwork-modal"
                onClick={() => setActiveArt(null)}
                className="absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 bg-ink/80 text-ivory transition-colors hover:border-champagne hover:text-champagne"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className="grid gap-8 md:grid-cols-12 md:gap-12 items-center">
                {/* Image side */}
                <div className="md:col-span-6 relative aspect-[3/4] overflow-hidden border border-champagne/20 bg-ink">
                  <img
                    src={activeArt.img}
                    alt={activeArt.title}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-4 left-4 rounded-full border border-champagne/40 bg-ink/85 px-3 py-1 text-[9px] uppercase tracking-[0.25em] text-champagne">
                    {activeArt.category}
                  </span>
                </div>

                {/* Content Dossier side */}
                <div className="md:col-span-6 flex flex-col justify-between text-left">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-champagne">
                      <Sparkles size={13} />
                      Curatorial Dossier
                    </div>

                    <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-light italic leading-tight text-ivory">
                      {activeArt.title}
                    </h2>

                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-y border-ivory/15 py-3 text-xs uppercase tracking-[0.25em] text-ivory/70 font-light">
                      <span>{activeArt.origin}</span>
                      <span className="text-champagne">•</span>
                      <span>{activeArt.period}</span>
                    </div>

                    <div className="mt-6 space-y-4 text-xs sm:text-sm text-ivory/70 font-light leading-relaxed">
                      <div>
                        <span className="block text-[9px] uppercase tracking-[0.3em] text-champagne/90 mb-1">
                          Medium & Support
                        </span>
                        <p className="text-ivory/90">{activeArt.medium}</p>
                      </div>

                      {activeArt.dimensions && (
                        <div>
                          <span className="block text-[9px] uppercase tracking-[0.3em] text-champagne/90 mb-1">
                            Dimensions
                          </span>
                          <p className="text-ivory/90">{activeArt.dimensions}</p>
                        </div>
                      )}

                      {activeArt.provenance && (
                        <div>
                          <span className="block text-[9px] uppercase tracking-[0.3em] text-champagne/90 mb-1">
                            Provenance
                          </span>
                          <p className="text-ivory/80 italic">{activeArt.provenance}</p>
                        </div>
                      )}

                      {activeArt.description && (
                        <div className="pt-2">
                          <span className="block text-[9px] uppercase tracking-[0.3em] text-champagne/90 mb-1">
                            Curatorial Note
                          </span>
                          <p className="leading-relaxed text-ivory/75">
                            {activeArt.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-ivory/15 pt-6">
                    <button
                      onClick={() => {
                        setActiveArt(null);
                        scrollToId("access");
                      }}
                      className="inline-flex items-center gap-3 border border-champagne bg-champagne/15 px-8 py-3.5 text-[10px] uppercase tracking-[0.35em] text-ivory transition-all duration-300 hover:bg-champagne hover:text-ink shadow-lg"
                    >
                      Inquire on this Acquisition <ArrowUpRight size={13} strokeWidth={1.5} />
                    </button>

                    <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-ivory/40">
                      <Shield size={12} className="text-champagne/70" /> Authenticity Guaranteed
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
