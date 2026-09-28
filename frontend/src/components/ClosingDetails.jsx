import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Key, Globe, Compass } from "lucide-react";
import { scrollToId } from "@/lib/scroll";
import { EASE, Eyebrow, FadeUp, LightSweep, TextReveal } from "./reveal";

const PILLARS_DETAILS = [
  {
    icon: Compass,
    title: "PRIVATE EXHIBITIONS",
    subtitle: "Palazzo & Salon Editions",
    desc: "Biannual salons held in historic palazzi across Europe, open exclusively to verified patrons, institutional trustees, and accredited collectors.",
  },
  {
    icon: Key,
    title: "LIVE AUCTIONS",
    subtitle: "Curated Evening Sales",
    desc: "Curated evening sales featuring exceptional paintings, marble, and rare antiquities under strict confidentiality and private telephone commission.",
  },
  {
    icon: Globe,
    title: "COLLECTIONS",
    subtitle: "Acquisitions & Provenance",
    desc: "Institutional-grade curatorial advisory, chemical pigment testing, provenance authentication, and private treaty acquisitions.",
  },
  {
    icon: Mail,
    title: "CONTACT",
    subtitle: "Curatorial Secretariat",
    desc: "Direct liaison with the Curatorial Secretariat in Geneva, London, Paris, and Rome for bespoke viewings and catalogue requisitions.",
  },
];

export const ClosingDetails = () => (
  <section
    id="details"
    data-testid="closing-details-section"
    className="relative overflow-hidden bg-gradient-to-b from-[#060D17] via-[#0A1627] to-ink text-ivory border-t border-champagne/20 py-28 sm:py-36 md:py-44"
  >
    {/* Target anchor for legacy / closing */}
    <span id="closing" className="absolute -top-24 left-0" aria-hidden />

    {/* Ambient radial glow */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(185,154,104,0.08)_0%,transparent_75%)]"
    />

    <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 text-center">
      <Eyebrow index="07" label="Details & Closing" tone="champagne" className="justify-center" />

      {/* Main Closing Heading */}
      <h2 className="mt-8 mb-6">
        <LightSweep>
          <TextReveal
            lines={["ENTER AUREXA", "THE WORLD BEYOND THE ORDINARY"]}
            lineClassName="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[0.14em] text-ivory leading-[1.05]"
          />
        </LightSweep>
      </h2>

      {/* Golden Divider */}
      <div className="mb-10 flex items-center justify-center gap-3">
        <span className="h-px w-24 bg-gradient-to-r from-transparent to-champagne/70" />
        <span className="h-1.5 w-1.5 rotate-45 bg-champagne" />
        <span className="h-px w-24 bg-gradient-to-l from-transparent to-champagne/70" />
      </div>

      {/* Closing Statement */}
      <FadeUp delay={0.2} y={24} className="mx-auto max-w-3xl">
        <p className="font-serif text-lg sm:text-2xl md:text-3xl font-light italic leading-relaxed text-ivory/90">
          &ldquo;AUREXA exists for those who believe that art is not merely something to be seen, but something to be experienced, remembered and carried beyond the room.&rdquo;
        </p>
      </FadeUp>

      {/* 4 Details Pillars Grid */}
      <div className="mt-20 md:mt-28 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-left">
        {PILLARS_DETAILS.map((p, i) => {
          const Icon = p.icon;
          return (
            <FadeUp key={p.title} delay={0.06 * i} y={24}>
              <div className="group relative h-full border border-ivory/15 bg-navy/30 p-8 transition-all duration-500 hover:border-champagne/50 hover:bg-navy/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.3em] text-champagne font-medium">
                      0{i + 1}
                    </span>
                    <Icon size={16} className="text-champagne/60 group-hover:text-champagne transition-colors" />
                  </div>

                  <h3 className="mt-6 font-serif text-2xl font-light tracking-wide text-ivory group-hover:text-champagne transition-colors">
                    {p.title}
                  </h3>

                  <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-champagne/80">
                    {p.subtitle}
                  </p>

                  <p className="mt-4 text-xs sm:text-sm leading-relaxed text-ivory/60 font-light">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-8 border-t border-ivory/10 pt-4">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-ivory/40 group-hover:text-ivory/80 transition-colors">
                    Inquire Below ↓
                  </span>
                </div>
              </div>
            </FadeUp>
          );
        })}
      </div>

      {/* Final Calls to Action */}
      <FadeUp delay={0.35} y={20} className="mt-16 sm:mt-24 flex flex-wrap items-center justify-center gap-6">
        <button
          data-testid="closing-request-invitation-btn"
          onClick={() => scrollToId("access")}
          className="inline-flex items-center gap-3 border border-champagne bg-champagne px-10 py-4 text-[10px] uppercase tracking-[0.35em] text-ink transition-all duration-500 hover:bg-transparent hover:text-champagne shadow-xl font-medium"
        >
          Request an Invitation <ArrowUpRight size={13} strokeWidth={1.5} />
        </button>

        <button
          data-testid="closing-enter-aurexa-btn"
          onClick={() => scrollToId("access")}
          className="inline-flex items-center gap-3 border border-ivory/30 bg-ink/50 px-10 py-4 text-[10px] uppercase tracking-[0.35em] text-ivory transition-all duration-500 hover:bg-ivory hover:text-ink shadow-lg"
        >
          Enter AUREXA →
        </button>
      </FadeUp>
    </div>
  </section>
);

export default ClosingDetails;
