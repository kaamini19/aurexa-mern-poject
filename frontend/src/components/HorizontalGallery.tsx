import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLLECTION } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

const TOTAL = COLLECTION.length;

export const HorizontalGallery = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(1);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current!;
      const getAmount = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -getAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current!,
          start: "top top",
          end: () => `+=${getAmount()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) =>
            setIndex(Math.min(TOTAL, Math.max(1, Math.round(self.progress * (TOTAL - 1)) + 1))),
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div data-testid="horizontal-gallery" className="border-t border-ink/15">
      {/* Desktop — pinned horizontal scroll */}
      <div ref={wrapRef} className="relative hidden h-screen overflow-hidden md:block">
        <div className="absolute left-12 top-10 z-10 text-[10px] uppercase tracking-[0.45em] text-ink/50">
          Selected Works
        </div>
        <div
          data-testid="gallery-counter"
          className="absolute right-12 top-10 z-10 font-serif text-lg italic text-ink/60"
        >
          {String(index).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </div>
        <div ref={trackRef} className="flex h-full items-center gap-[7vw] px-[14vw] will-change-transform">
          {COLLECTION.map((it, i) => (
            <figure key={it.title} className="relative w-[44vw] shrink-0">
              <span aria-hidden className="pointer-events-none absolute -top-16 left-0 select-none font-serif text-[6.5rem] font-light leading-none text-ink/10">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="h-[58vh] overflow-hidden bg-navy/5">
                <img
                  src={it.img}
                  alt={it.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <figcaption className="mt-5 flex items-baseline justify-between gap-6 border-t border-ink/15 pt-4">
                <div>
                  <h3 className="font-serif text-2xl font-light italic">{it.title}</h3>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-ink/50">
                    {it.origin} — {it.period}
                  </p>
                </div>
                <span className="shrink-0 text-[10px] uppercase tracking-[0.3em] text-bronze">
                  {it.category}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Mobile — native swipe gallery */}
      <div className="flex snap-x snap-mandatory gap-8 overflow-x-auto px-6 pb-16 pt-14 md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {COLLECTION.map((it, i) => (
          <figure key={it.title} className="relative w-[80vw] shrink-0 snap-center">
            <span aria-hidden className="pointer-events-none absolute -top-9 left-0 font-serif text-5xl font-light text-ink/10">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="aspect-[4/5] overflow-hidden bg-navy/5">
              <img src={it.img} alt={it.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            </div>
            <figcaption className="mt-4 border-t border-ink/15 pt-3">
              <h3 className="font-serif text-xl font-light italic">{it.title}</h3>
              <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-ink/50">
                {it.origin} — {it.period}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};
