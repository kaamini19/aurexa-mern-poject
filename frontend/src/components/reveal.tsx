import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

const VIEWPORT = { once: true, margin: "-10% 0px" } as const;

export const TextReveal = ({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.1,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) => (
  <motion.span className={`block ${className}`} initial="hidden" whileInView="show" viewport={VIEWPORT}>
    {lines.map((line, i) => (
      <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
        <motion.span
          className={`block ${lineClassName}`}
          variants={{
            hidden: { y: "115%", opacity: 0 },
            show: {
              y: 0,
              opacity: 1,
              transition: { duration: 1, ease: EASE, delay: delay + i * stagger },
            },
          }}
        >
          {line}
        </motion.span>
      </span>
    ))}
  </motion.span>
);

export const FadeUp = ({
  children,
  className = "",
  delay = 0,
  y = 30,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={VIEWPORT}
    transition={{ duration: 0.9, ease: EASE, delay }}
  >
    {children}
  </motion.div>
);

export const ImageReveal = ({
  src,
  alt,
  className = "",
  imgClassName = "",
  variant = "clip",
  veil = "#0B1728",
  delay = 0,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  variant?: "clip" | "curtain";
  veil?: string;
  delay?: number;
  eager?: boolean;
}) => (
  <div className={`relative overflow-hidden ${className}`}>
    <motion.img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={`h-full w-full object-cover ${imgClassName}`}
      initial={{ scale: 1.18 }}
      whileInView={{ scale: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.6, ease: EASE, delay: delay + 0.1 }}
    />
    {variant === "curtain" ? (
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundColor: veil }}
        initial={{ x: "0%" }}
        whileInView={{ x: "101%" }}
        viewport={VIEWPORT}
        transition={{ duration: 1.1, ease: EASE, delay }}
      />
    ) : (
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundColor: veil }}
        initial={{ clipPath: "inset(0 0 0 0)" }}
        whileInView={{ clipPath: "inset(0 0 100% 0)" }}
        viewport={VIEWPORT}
        transition={{ duration: 1.1, ease: EASE, delay }}
      />
    )}
  </div>
);

export const LightSweep = ({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) => (
  <motion.span
    className={`relative inline-block overflow-hidden ${className}`}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
  >
    {children}
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-champagne/20 to-transparent"
      variants={{
        hidden: { x: "-220%" },
        show: { x: "320%", transition: { duration: 1.8, delay, ease: "easeInOut" } },
      }}
    />
  </motion.span>
);

export const SectionVeil = ({ color }: { color: string }) => (
  <motion.div
    aria-hidden
    className="pointer-events-none absolute inset-0 z-40"
    style={{ backgroundColor: color }}
    initial={{ y: "0%" }}
    whileInView={{ y: "-101%" }}
    viewport={{ once: true, margin: "-18% 0px" }}
    transition={{ duration: 1.15, ease: EASE }}
  />
);

export const Eyebrow = ({
  index,
  label,
  tone = "champagne",
  className = "",
}: {
  index: string;
  label: string;
  tone?: "champagne" | "bronze";
  className?: string;
}) => (
  <FadeUp className={`flex items-center gap-4 ${className}`} y={16}>
    <span
      className={`text-[10px] uppercase tracking-[0.45em] ${
        tone === "champagne" ? "text-champagne" : "text-bronze"
      }`}
    >
      {index}
    </span>
    <span className={`h-px w-10 ${tone === "champagne" ? "bg-champagne/50" : "bg-bronze/50"}`} />
    <span className="text-[10px] uppercase tracking-[0.45em] opacity-70">{label}</span>
  </FadeUp>
);
