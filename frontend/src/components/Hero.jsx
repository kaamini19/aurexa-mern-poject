import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE, LightSweep } from "./reveal";
import { IMAGES } from "@/data/content";

const LETTERS = "AUREXA".split("");

export const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} data-testid="hero-section" className="relative h-[100svh] overflow-hidden bg-ink">
      <motion.div style={{ y: imgY }} className="absolute inset-0">
        <motion.img
          src={IMAGES.hero}
          alt="Classical oil painting from the AUREXA collection"
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover"
          initial={{ scale: 1.18 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE, delay: 0.5 }}
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/55" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(7,16,29,0.42),transparent_62%)]" />

      <motion.div
        aria-hidden
        className="absolute inset-y-0 left-0 z-20 w-1/2 bg-ink"
        initial={{ x: 0 }}
        animate={{ x: "-101%" }}
        transition={{ duration: 1.15, ease: EASE, delay: 0.45 }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-y-0 right-0 z-20 w-1/2 bg-ink"
        initial={{ x: 0 }}
        animate={{ x: "101%" }}
        transition={{ duration: 1.15, ease: EASE, delay: 0.45 }}
      />
      <motion.div
        aria-hidden
        className="absolute inset-y-0 left-1/2 z-20 w-px bg-champagne/70"
        initial={{ scaleY: 1, opacity: 1 }}
        animate={{ scaleY: 0, opacity: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
        style={{ transformOrigin: "center" }}
      />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-30 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <LightSweep delay={2.2}>
          <h1 className="font-serif text-[17vw] font-light leading-[0.95] tracking-[0.1em] text-ivory md:text-[12vw]">
            {LETTERS.map((l, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: EASE, delay: 1 + i * 0.07 }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>
        </LightSweep>

        <motion.div
          aria-hidden
          className="mt-8 h-px bg-champagne"
          initial={{ width: 0 }}
          animate={{ width: 160 }}
          transition={{ duration: 1.1, ease: EASE, delay: 1.85 }}
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 2 }}
          className="mt-6 text-[11px] uppercase tracking-[0.55em] text-ivory/85 md:text-xs"
        >
          The World Beyond the Ordinary
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[9px] uppercase tracking-[0.45em] text-ivory/40">Scroll</span>
        <motion.span
          className="block h-12 w-px origin-top bg-champagne/60"
          animate={{ scaleY: [1, 0.35, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};
