import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { scrollToId } from "@/lib/scroll";
import { EASE, FadeUp, TextReveal } from "./reveal";

const NAV = [
  { label: "About", id: "collection" },
  { label: "Exhibition", id: "exhibition" },
  { label: "Auction", id: "auction" },
  { label: "Journal", id: "journal" },
  { label: "Access", id: "access" },
];

const SOCIAL = ["Instagram", "Vimeo", "LinkedIn"];

export const Finale = () => (
  <footer data-testid="footer" className="relative overflow-hidden bg-ink text-ivory">
    <div className="flex flex-col items-center px-6 pb-20 pt-32 text-center md:pt-44">
      <h2>
        <TextReveal
          lines={["AUREXA"]}
          lineClassName="font-serif text-[15vw] font-light leading-none tracking-[0.14em] text-ivory md:text-[8.5vw]"
        />
      </h2>
      <motion.div
        aria-hidden
        className="mt-10 h-px w-44 origin-center bg-champagne"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1.3, ease: EASE, delay: 0.3 }}
      />
      <FadeUp delay={0.5}>
        <p className="mt-8 text-[10px] uppercase tracking-[0.55em] text-champagne">
          The World Beyond the Ordinary
        </p>
        <p className="mt-14 font-serif text-3xl font-light italic text-ivory/85 md:text-4xl">
          You are invited.
        </p>
        <button
          data-testid="finale-access-btn"
          onClick={() => scrollToId("access")}
          className="mt-10 inline-flex items-center gap-3 border border-ivory/25 px-9 py-4 text-[10px] uppercase tracking-[0.35em] transition-colors duration-500 hover:bg-ivory hover:text-ink"
        >
          Access Aurexa <ArrowUpRight size={13} strokeWidth={1.5} />
        </button>
      </FadeUp>
    </div>

    <div className="border-t border-ivory/10">
      <div className="mx-auto grid max-w-[1500px] gap-12 px-6 py-14 md:grid-cols-3 md:px-12">
        <div>
          <p className="font-serif text-lg tracking-[0.4em]">AUREXA</p>
          <p className="mt-4 text-[10px] uppercase leading-relaxed tracking-[0.3em] text-ivory/40">
            Private Exhibition &amp; Auction
            <br />
            MMXXIV — MMXXVI
          </p>
        </div>
        <nav className="flex flex-col gap-3">
          {NAV.map((l) => (
            <button
              key={l.id}
              data-testid={`footer-link-${l.id}`}
              onClick={() => scrollToId(l.id)}
              className="w-fit text-[10px] uppercase tracking-[0.35em] text-ivory/60 transition-colors duration-300 hover:text-champagne"
            >
              {l.label}
            </button>
          ))}
        </nav>
        <div className="flex flex-col gap-3 md:items-end">
          {SOCIAL.map((s) => (
            <a
              key={s}
              data-testid={`footer-social-${s.toLowerCase()}`}
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex w-fit items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-ivory/60 transition-colors duration-300 hover:text-champagne"
            >
              {s} <ArrowUpRight size={11} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-4 px-6 py-6 md:px-12">
          <div className="flex gap-8">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              data-testid="footer-privacy"
              className="text-[9px] uppercase tracking-[0.3em] text-ivory/35 transition-colors hover:text-ivory/70"
            >
              Privacy
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              data-testid="footer-terms"
              className="text-[9px] uppercase tracking-[0.3em] text-ivory/35 transition-colors hover:text-ivory/70"
            >
              Terms
            </a>
          </div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-ivory/35">
            © MMXXVI Aurexa — The World Beyond the Ordinary
          </p>
        </div>
      </div>
    </div>
  </footer>
);
