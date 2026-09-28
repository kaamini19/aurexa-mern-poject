import { Eyebrow, FadeUp, LightSweep, TextReveal } from "./reveal";

const CHAPTERS = [
  {
    numeral: "I",
    title: "THE ART",
    quote: "Chosen slowly, shown sparingly.",
    body: "Every work is presented as an object worthy of attention. Selected through an uncompromising curatorial standard, each piece commands reverence, depth, and contemplation.",
  },
  {
    numeral: "II",
    title: "THE COLLECTION",
    quote: "Rarity is not simply measured by price, but by provenance, craftsmanship and story.",
    body: "We assemble masterworks whose historical continuity can be traced through centuries of discerning custody — rejecting far more than we accept.",
  },
  {
    numeral: "III",
    title: "THE ROOM",
    quote: "Every artwork exists within an atmosphere designed to give it presence.",
    body: "Architecture, lighting, acoustic silence, and spatial harmony converge to elevate each masterpiece beyond exhibition into an unforgettable encounter.",
  },
  {
    numeral: "IV",
    title: "THE DISCOVERY",
    quote: "Move through AUREXA and discover works, stories and perspectives at your own pace.",
    body: "An unhurried journey through light, shadow, and artistic mastery, inviting collectors to forge a personal and enduring connection with exceptional objects.",
  },
];

export const Experience = () => (
  <section
    id="experience"
    data-testid="experience-section"
    className="relative overflow-hidden bg-navy text-ivory border-t border-champagne/15 py-28 sm:py-36 md:py-44"
  >
    {/* Subtle atmospheric gradient */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(185,154,104,0.06)_0%,transparent_60%)]"
    />

    <div className="relative mx-auto max-w-[1500px] px-6 md:px-12">
      <Eyebrow index="03" label="The Experience" tone="champagne" />

      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <h2>
            <TextReveal
              lines={["THE EXPERIENCE"]}
              lineClassName="font-serif text-5xl font-light leading-[1.02] tracking-wide sm:text-6xl lg:text-7xl"
            />
          </h2>
        </div>
        <div className="lg:col-span-5">
          <FadeUp delay={0.2}>
            <p className="font-serif text-xl sm:text-2xl font-light italic text-champagne/90">
              AUREXA is not simply an online gallery. It is an immersive journey through art.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ivory/60 font-light">
              A bespoke environment tailored for contemplation, connoisseurship, and private discovery.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Chapters: Roman Numerals with Thin Dividers and Generous Spacing */}
      <div className="mt-20 md:mt-28">
        {CHAPTERS.map((c, i) => (
          <FadeUp key={c.numeral} delay={0.07 * i} y={24}>
            <div
              data-testid={`experience-chapter-${i + 1}`}
              className="group grid items-start gap-6 border-t border-ivory/15 py-12 transition-colors duration-500 hover:border-champagne/40 md:grid-cols-12 md:py-16"
            >
              {/* Large Roman Numeral */}
              <div className="md:col-span-2">
                <span className="font-serif text-5xl font-light text-champagne/60 transition-colors duration-500 group-hover:text-champagne md:text-7xl lg:text-8xl">
                  {c.numeral}
                </span>
              </div>

              {/* Title & Core Quote */}
              <div className="md:col-span-4">
                <LightSweep delay={0.3}>
                  <h3 className="font-serif text-2xl font-light tracking-[0.2em] text-ivory sm:text-3xl">
                    {c.title}
                  </h3>
                </LightSweep>
                <p className="mt-3 font-serif text-base sm:text-lg italic text-ivory/80">
                  &ldquo;{c.quote}&rdquo;
                </p>
              </div>

              {/* Detailed Editorial Description */}
              <div className="md:col-span-6">
                <p className="max-w-xl text-sm sm:text-base leading-relaxed text-ivory/65 font-light">
                  {c.body}
                </p>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
