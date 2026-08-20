import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LOTS } from "@/data/content";
import { Eyebrow, FadeUp, ImageReveal, SectionVeil, TextReveal } from "./reveal";

export const FeaturedLots = () => {
  const areaRef = useRef(null);
  const [viewing, setViewing] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const cx = useSpring(mx, { stiffness: 550, damping: 45, mass: 0.4 });
  const cy = useSpring(my, { stiffness: 550, damping: 45, mass: 0.4 });

  return (
    <section data-testid="featured-lots-section" className="relative overflow-hidden bg-ink text-ivory">
      <SectionVeil color="#F3EDE2" />
      <div className="mx-auto max-w-[1500px] px-6 py-28 md:px-12 md:py-40">
        <Eyebrow index="02" label="Selected Lots" />
        <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
          <h2>
            <TextReveal
              lines={["SELECTED LOTS"]}
              lineClassName="font-serif text-5xl font-light leading-[1.02] tracking-wide sm:text-6xl lg:text-7xl"
            />
          </h2>
          <FadeUp delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-ivory/55">
              Six objects from the forthcoming sale — chosen not for noise, but for the silence
              they command in a room.
            </p>
          </FadeUp>
        </div>

        <div
          ref={areaRef}
          className="relative mt-16 grid gap-x-10 gap-y-20 md:mt-24 md:grid-cols-2 lg:grid-cols-3"
          onMouseMove={(e) => {
            const r = areaRef.current?.getBoundingClientRect();
            if (!r) return;
            mx.set(e.clientX - r.left);
            my.set(e.clientY - r.top);
          }}
          onMouseLeave={() => setViewing(false)}
        >
          <AnimatePresence>
            {viewing && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 z-30 hidden md:block"
                style={{ x: cx, y: cy }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-champagne/70 bg-ink/70">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-champagne">View</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {LOTS.map((lot, i) => (
            <FadeUp key={lot.no} delay={0.06 * (i % 3)} y={26}>
              <article
                data-testid={`lot-${lot.no}`}
                className="group lot-view"
                onMouseEnter={() => setViewing(true)}
                onMouseLeave={() => setViewing(false)}
              >
                <div className="relative">
                  <ImageReveal
                    src={lot.img}
                    alt={lot.title}
                    veil="#07101D"
                    className="aspect-[4/5]"
                    imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <span className="pointer-events-none absolute inset-0 border border-champagne/0 transition-colors duration-500 group-hover:border-champagne/50" />
                  <span className="absolute left-4 top-4 text-[10px] uppercase tracking-[0.35em] text-ivory/80">
                    Lot {lot.no}
                  </span>
                </div>
                <div className="mt-5 text-ivory/55 transition-colors duration-500 group-hover:text-ivory/90">
                  <h3 className="font-serif text-2xl font-light italic text-ivory">{lot.title}</h3>
                  <p className="mt-2 text-[10px] uppercase tracking-[0.3em]">
                    {lot.origin} — {lot.period}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.3em]">{lot.medium}</p>
                  <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-champagne/90">
                    Estimate {lot.estimate}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-ivory/70 transition-colors duration-300 group-hover:text-champagne">
                    View Lot <ArrowUpRight size={12} strokeWidth={1.5} />
                  </span>
                </div>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};
