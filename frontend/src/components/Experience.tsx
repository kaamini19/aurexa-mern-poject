import { Eyebrow, FadeUp, LightSweep, TextReveal } from "./reveal";

const CHAPTERS = [
  {
    numeral: "I",
    title: "THE ART",
    body: "Chosen slowly, shown sparingly. Every work admitted to AUREXA has passed a committee of eyes that cannot be bought — scholars, restorers and collectors who read objects the way others read letters.",
  },
  {
    numeral: "II",
    title: "THE COLLECTION",
    body: "Rarity is not a price; it is a biography. We gather paintings, marble and objects whose provenance can be traced through centuries of careful hands — and we refuse far more than we accept.",
  },
  {
    numeral: "III",
    title: "THE AUCTION",
    body: "No theatre, no noise. A room, a rostrum, and the quiet tension of considered acquisition. Estimates are published; egos are not accommodated.",
  },
  {
    numeral: "IV",
    title: "THE PEOPLE",
    body: "Collectors, patrons, scholars and the quietly obsessed. Attendance is by invitation, and the guest list is curated with the same care as the walls.",
  },
];

export const Experience = () => (
  <section id="experience" data-testid="experience-section" className="relative bg-beige text-ink">
    <div className="mx-auto max-w-[1500px] px-6 py-28 md:px-12 md:py-40">
      <Eyebrow index="06" label="The Experience" tone="bronze" />
      <h2 className="mt-8 max-w-3xl">
        <TextReveal
          lines={["Not an event.", "A private room."]}
          lineClassName="font-serif text-4xl font-light leading-[1.05] tracking-wide sm:text-5xl lg:text-6xl"
        />
      </h2>

      <div className="mt-20 md:mt-28">
        {CHAPTERS.map((c, i) => (
          <FadeUp key={c.numeral} delay={0.05 * i} y={24}>
            <div
              data-testid={`experience-chapter-${i + 1}`}
              className="grid items-start gap-6 border-t border-ink/15 py-10 md:grid-cols-12 md:py-14"
            >
              <span className="font-serif text-6xl font-light leading-none text-bronze/60 md:col-span-2 md:text-8xl">
                {c.numeral}
              </span>
              <h3 className="md:col-span-4">
                <LightSweep delay={0.4}>
                  <span className="font-serif text-2xl font-light tracking-[0.2em] md:text-3xl">
                    {c.title}
                  </span>
                </LightSweep>
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-ink/70 md:col-span-6 md:text-base">
                {c.body}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  </section>
);
