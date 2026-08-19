import { PARTNERS } from "@/data/content";
import { Eyebrow, FadeUp, TextReveal } from "./reveal";

export const Partners = () => (
  <section data-testid="partners-section" className="relative bg-ivory text-ink">
    <div className="mx-auto max-w-[1500px] px-6 py-28 md:px-12 md:py-40">
      <Eyebrow index="07" label="In Association" tone="bronze" />
      <h2 className="mt-8">
        <TextReveal
          lines={["PARTNERS OF AUREXA"]}
          lineClassName="font-serif text-4xl font-light leading-[1.05] tracking-wide sm:text-5xl lg:text-6xl"
        />
      </h2>

      <div className="mt-20 md:mt-28">
        {PARTNERS.map((tier, i) => (
          <FadeUp key={tier.tier} delay={0.06 * i} y={22}>
            <div
              data-testid={`partner-tier-${tier.tier.toLowerCase().replace(/\s+/g, "-")}`}
              className="grid gap-6 border-t border-ink/15 py-10 md:grid-cols-12 md:items-baseline md:py-14"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] text-ink/45 md:col-span-4">
                {tier.tier}
              </span>
              <div className="flex flex-wrap gap-x-14 gap-y-6 md:col-span-8">
                {tier.names.map((name) => (
                  <span
                    key={name}
                    className={`font-serif font-light text-ink/85 transition-colors duration-500 hover:text-bronze ${
                      tier.tier === "Presenting Partner"
                        ? "text-4xl italic md:text-6xl"
                        : "text-2xl md:text-3xl"
                    }`}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
      <FadeUp delay={0.2}>
        <p className="mt-8 max-w-md text-[11px] uppercase leading-relaxed tracking-[0.25em] text-ink/40">
          A small circle of houses and institutions who share our regard for the exceptional.
        </p>
      </FadeUp>
    </div>
  </section>
);
