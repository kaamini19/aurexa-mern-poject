import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { LOTS } from "@/data/content";
import { Eyebrow, FadeUp, TextReveal } from "./reveal";
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
    <div data-testid="auction-countdown" className="border-y border-ivory/15 py-8">
      <p className="mb-6 text-[10px] uppercase tracking-[0.45em] text-champagne">
        Aurexa II — The Sale Begins In
      </p>
      <div className="grid grid-cols-4 gap-4">
        {cells.map((c) => (
          <div key={c.l}>
            <div className="font-serif text-4xl font-light tabular-nums md:text-6xl">{c.v}</div>
            <div className="mt-2 text-[9px] uppercase tracking-[0.35em] text-ivory/45">{c.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Auction = () => (
  <section id="auction" data-testid="auction-section" className="relative bg-navy text-ivory">
    <div className="mx-auto max-w-[1500px] px-6 py-28 md:px-12 md:py-40">
      <Eyebrow index="03" label="The Rostrum" />
      <div className="mt-8 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2>
            <TextReveal
              lines={["THE AUCTION"]}
              lineClassName="font-serif text-5xl font-light leading-[1.02] tracking-wide sm:text-6xl lg:text-7xl"
            />
          </h2>
          <FadeUp delay={0.2}>
            <p className="mt-6 font-serif text-2xl font-light italic text-ivory/75 md:text-3xl">
              Exceptional objects. Considered acquisitions.
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory/55">
              No theatre, no clamour. A room, a rostrum, and works whose provenance is read aloud
              like poetry. Bidding is reserved for invited patrons, in the room and by private line.
            </p>
          </FadeUp>
          <FadeUp delay={0.3} className="mt-12">
            <Countdown />
          </FadeUp>
          <FadeUp delay={0.4}>
            <button
              data-testid="view-auction-btn"
              onClick={() => scrollToId("access")}
              className="mt-12 inline-flex items-center gap-3 border border-ivory/25 px-8 py-4 text-[10px] uppercase tracking-[0.35em] transition-colors duration-500 hover:bg-ivory hover:text-ink"
            >
              View Auction <ArrowUpRight size={13} strokeWidth={1.5} />
            </button>
          </FadeUp>
        </div>

        <FadeUp delay={0.25} className="lg:col-span-7">
          <div className="hidden grid-cols-12 gap-4 border-b border-ivory/20 pb-4 text-[9px] uppercase tracking-[0.3em] text-ivory/40 md:grid">
            <span className="col-span-1">Lot</span>
            <span className="col-span-4">Object</span>
            <span className="col-span-3">Artist / Origin</span>
            <span className="col-span-2">Period</span>
            <span className="col-span-2 text-right">Estimate</span>
          </div>
          {LOTS.slice(0, 5).map((lot) => (
            <div
              key={lot.no}
              data-testid={`auction-row-${lot.no}`}
              className="grid grid-cols-2 gap-4 border-b border-ivory/10 py-6 transition-colors duration-500 hover:bg-ivory/[0.03] md:grid-cols-12 md:items-baseline"
            >
              <span className="col-span-1 font-serif text-lg italic text-champagne/90">{lot.no}</span>
              <span className="col-span-1 font-serif text-xl font-light md:col-span-4 md:text-2xl">
                {lot.title}
              </span>
              <span className="col-span-1 text-[10px] uppercase tracking-[0.25em] text-ivory/50 md:col-span-3">
                {lot.origin}
              </span>
              <span className="hidden text-[10px] uppercase tracking-[0.25em] text-ivory/50 md:col-span-2 md:block">
                {lot.period}
              </span>
              <span className="col-span-2 text-right text-[11px] uppercase tracking-[0.2em] text-ivory/75">
                {lot.estimate}
              </span>
            </div>
          ))}
          <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-ivory/35">
            The full catalogue is available to invited patrons.
          </p>
        </FadeUp>
      </div>
    </div>
  </section>
);
