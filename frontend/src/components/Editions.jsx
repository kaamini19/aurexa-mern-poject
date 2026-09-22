import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EDITION_ONE, EDITION_TWO_IMG } from "@/data/content";
import { Eyebrow, FadeUp, ImageReveal, SectionVeil, TextReveal } from "./reveal";
import { scrollToId } from "@/lib/scroll";

const AurexaOne = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const yB = useTransform(scrollYProgress, [0, 1], [130, -110]);

  const layout = [
    "md:col-span-7",
    "md:col-span-4 md:col-start-9 md:-mt-32",
    "md:col-span-5 md:col-start-2 md:-mt-10",
    "md:col-span-6 md:col-start-7 md:-mt-24",
  ];
  const aspects = ["aspect-[4/3]", "aspect-[3/4]", "aspect-[4/5]", "aspect-[4/3]"];

  return (
    <div className="relative overflow-hidden bg-ink py-28 text-ivory md:py-40">
      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <Eyebrow index="05" label="The First Chapter" />
        <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
          <h2>
            <TextReveal
              lines={["AUREXA I"]}
              lineClassName="font-serif text-5xl font-light leading-[1.02] tracking-wide sm:text-6xl lg:text-7xl"
            />
          </h2>
          <FadeUp delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-ivory/55">
              MMXXIV — the first gathering. Behind closed doors, four rooms of the Palazzo held
              their breath for an evening. A record, in fragments.
            </p>
          </FadeUp>
        </div>

        <div ref={ref} className="mt-20 grid gap-16 md:mt-28 md:grid-cols-12 md:gap-x-10 md:gap-y-0">
          {EDITION_ONE.map((shot, i) => (
            <motion.figure
              key={shot.no}
              className={`${layout[i]}`}
              style={i === 1 ? { y: yA } : i === 3 ? { y: yB } : undefined}
            >
              <FadeUp delay={0.08 * i} y={34}>
                <ImageReveal
                  src={shot.img}
                  alt={shot.caption}
                  veil="#07101D"
                  variant={i % 2 === 0 ? "curtain" : "clip"}
                  className={aspects[i]}
                />
                <figcaption className="mt-4 flex items-baseline gap-4">
                  <span className="font-serif text-lg italic text-champagne/90">{shot.no}</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-ivory/50">
                    {shot.caption}
                  </span>
                </figcaption>
              </FadeUp>
            </motion.figure>
          ))}
        </div>

        <FadeUp delay={0.15} className="mt-20 md:mt-28">
          <a
            data-testid="view-first-edition-link"
            href="#exhibition"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("aurexa-ii");
            }}
            className="inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-ivory/70 underline decoration-champagne/40 underline-offset-8 transition-colors duration-300 hover:text-champagne"
          >
            View the First Edition <ArrowUpRight size={13} strokeWidth={1.5} />
          </a>
        </FadeUp>
      </div>
    </div>
  );
};

const AurexaTwo = () => (
  <div id="aurexa-ii" className="relative overflow-hidden bg-ivory py-28 text-ink md:py-40">
    <SectionVeil color="#07101D" />
    <div className="mx-auto grid max-w-[1500px] items-center gap-16 px-6 md:px-12 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <Eyebrow index="06" label="The Collection Returns" tone="bronze" />
        <h2 className="mt-8">
          <TextReveal
            lines={["AUREXA II"]}
            lineClassName="font-serif text-6xl font-light leading-[0.98] tracking-wide sm:text-7xl lg:text-8xl"
          />
        </h2>
        <FadeUp delay={0.2}>
          <p className="mt-6 font-serif text-2xl font-light italic text-ink/70 md:text-3xl">
            The collection returns.
          </p>
        </FadeUp>
        <div className="mt-12 max-w-md border-t border-ink/15">
          {["MMXXVI", "Private Exhibition", "Invitation Only"].map((row, i) => (
            <FadeUp key={row} delay={0.1 * i} y={16}>
              <div className="flex items-baseline justify-between border-b border-ink/15 py-4">
                <span className="text-[11px] uppercase tracking-[0.4em] text-ink/75">{row}</span>
                <span className="text-[10px] tracking-[0.3em] text-bronze">{String(i + 1).padStart(2, "0")}</span>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp delay={0.35}>
          <button
            data-testid="aurexa-ii-request-btn"
            onClick={() => scrollToId("access")}
            className="mt-12 border border-ink/30 px-9 py-4 text-[10px] uppercase tracking-[0.35em] text-ink transition-colors duration-500 hover:bg-ink hover:text-ivory"
          >
            Request Invitation
          </button>
        </FadeUp>
      </div>
      <div className="lg:col-span-5">
        <ImageReveal
          src={EDITION_TWO_IMG}
          alt="Marble figure presented at AUREXA II"
          variant="curtain"
          veil="#F3EDE2"
          className="aspect-[3/4]"
        />
        <FadeUp delay={0.3}>
          <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-ink/45">
            Mother and Child — marble, Italian School
          </p>
        </FadeUp>
      </div>
    </div>
  </div>
);

export const Editions = () => (
  <section id="exhibition" data-testid="exhibition-section">
    <AurexaOne />
    <AurexaTwo />
  </section>
);
