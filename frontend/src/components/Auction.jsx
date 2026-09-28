import { useEffect, useState } from "react";
import { ArrowUpRight, ShieldCheck, Lock } from "lucide-react";
import { LOTS } from "@/data/content";
import { Eyebrow, FadeUp, LightSweep, TextReveal } from "./reveal";
import { scrollToId } from "@/lib/scroll";

const TARGET = new Date("2026-10-15T19:00:00+02:00").getTime();
const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

const Countdown = () => {
  const [t, setT] = useState(() => Math.max(0, TARGET - Date.now()));
  useEffect(() => {
    const id = setInterval(() => setT(Math.max(0, TARGET - Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  const d = Math.floor(t / 86400000);
  const h = Math.floor((t % 86400000) / 3600000);
  const m = Math.floor((t % 3600000) / 60000);
  const s = Math.floor((t % 60000) / 1000);
  const cells = [
    { v: pad(d), l: "Days" },
    { v: pad(h), l: "Hours" },
    { v: pad(m), l: "Minutes" },
    { v: pad(s), l: "Seconds" },
  ];

  return (
    <div data-testid="auction-countdown" className="border-y border-champagne/25 bg-ink/40 p-6 sm:p-8 backdrop-blur-sm">
      <div className="flex items-center justify-between pb-6 border-b border-ivory/10">
        <p className="text-[10px] uppercase tracking-[0.45em] text-champagne font-medium">
          AUREXA II — The Sale Begins In
        </p>
        <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-ivory/40">
          <Lock size={11} className="text-champagne/70" /> Private Session
        </span>
      </div>
      <div className="mt-6 grid grid-cols-4 gap-4 text-center">
        {cells.map((c) => (
          <div key={c.l} className="flex flex-col items-center">
            <div className="font-serif text-3xl sm:text-4xl md:text-6xl font-light tabular-nums text-ivory">
              {c.v}
            </div>
            <div className="mt-2 text-[9px] uppercase tracking-[0.35em] text-ivory/45">{c.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Auction = () => (
  <section
    id="auction"
    data-testid="auction-section"
    className="relative overflow-hidden bg-navy text-ivory border-t border-champagne/15 py-28 md:py-40"
  >
    {/* Support legacy / secondary anchor for #events */}
    <span id="events" className="absolute -top-24 left-0" aria-hidden />

    {/* Ambient luxury lighting */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(185,154,104,0.08)_0%,transparent_65%)]"
    />

    <div className="relative mx-auto max-w-[1500px] px-6 md:px-12">
      <Eyebrow index="05" label="Upcoming Events" tone="champagne" />

      <div className="mt-8 grid gap-16 lg:grid-cols-12 lg:items-start">
        {/* Left Column: Headings, Philosophy & Countdown */}
        <div className="lg:col-span-5">
          <h2>
            <LightSweep>
              <TextReveal
                lines={["UPCOMING EVENTS", "LIVE AUCTION"]}
                lineClassName="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.05] tracking-wide text-ivory"
              />
            </LightSweep>
          </h2>

          <FadeUp delay={0.2}>
            <p className="mt-6 font-serif text-xl sm:text-2xl font-light italic text-champagne/90">
              Exceptional objects. Considered acquisitions.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory/65 font-light">
              No theatre, no clamour. A room, a rostrum, and works whose provenance is read aloud like poetry. Bidding is reserved exclusively for registered patrons and invited collectors, in the room and via encrypted private commission.
            </p>
          </FadeUp>

          <FadeUp delay={0.3} className="mt-10">
            <Countdown />
          </FadeUp>

          <FadeUp delay={0.4} className="mt-10 flex flex-wrap items-center gap-4">
            <button
              data-testid="view-auction-btn"
              onClick={() => scrollToId("access")}
              className="inline-flex items-center gap-3 border border-champagne/50 bg-champagne/10 px-9 py-4 text-[10px] uppercase tracking-[0.35em] text-ivory transition-all duration-500 hover:bg-champagne hover:text-ink shadow-lg"
            >
              View Auction <ArrowUpRight size={13} strokeWidth={1.5} />
            </button>

            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ivory/50">
              <ShieldCheck size={14} className="text-champagne" />
              Strict Confidentiality
            </span>
          </FadeUp>
        </div>

        {/* Right Column: Selected Auction Lots Table */}
        <FadeUp delay={0.25} className="lg:col-span-7">
          <div className="border-b border-champagne/20 pb-4 flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.4em] text-champagne">
              Selected Upcoming Lots
            </p>
            <span className="text-[9px] uppercase tracking-[0.3em] text-ivory/40">
              Sale MMXXVI
            </span>
          </div>

          <div className="hidden grid-cols-12 gap-4 border-b border-ivory/15 py-3 text-[9px] uppercase tracking-[0.3em] text-ivory/45 md:grid">
            <span className="col-span-1">Lot</span>
            <span className="col-span-4">Artwork Name</span>
            <span className="col-span-3">Artist / Origin</span>
            <span className="col-span-2">Period</span>
            <span className="col-span-2 text-right">Estimate</span>
          </div>

          <div className="divide-y divide-ivory/10">
            {LOTS.slice(0, 5).map((lot) => (
              <div
                key={lot.no}
                data-testid={`auction-row-${lot.no}`}
                className="group grid grid-cols-2 gap-4 py-6 transition-all duration-500 hover:bg-ivory/[0.04] hover:pl-2 md:grid-cols-12 md:items-baseline"
              >
                <span className="col-span-1 font-serif text-lg italic text-champagne/90">
                  {lot.no}
                </span>
                <span className="col-span-1 font-serif text-xl font-light text-ivory group-hover:text-champagne transition-colors md:col-span-4 md:text-2xl">
                  {lot.title}
                </span>
                <span className="col-span-1 text-[10px] uppercase tracking-[0.25em] text-ivory/60 md:col-span-3">
                  {lot.origin}
                </span>
                <span className="hidden text-[10px] uppercase tracking-[0.25em] text-ivory/50 md:col-span-2 md:block">
                  {lot.period}
                </span>
                <span className="col-span-2 text-right font-serif text-sm md:text-base tracking-wide text-champagne/90">
                  {lot.estimate}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ivory/10 pt-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-ivory/40">
              The complete catalogue is issued exclusively to accredited patrons.
            </p>
            <button
              onClick={() => scrollToId("access")}
              className="text-[10px] uppercase tracking-[0.35em] text-champagne underline decoration-champagne/40 underline-offset-6 transition-colors hover:text-ivory"
            >
              Request Catalogue Access →
            </button>
          </div>
        </FadeUp>
      </div>
    </div>
  </section>
);

export default Auction;
