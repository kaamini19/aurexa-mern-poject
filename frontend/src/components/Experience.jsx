import { Eyebrow, FadeUp, LightSweep, TextReveal } from "./reveal";

const CHAPTERS = [
  {
    index: "01",
    label: "01 / THE ART",
    title: "THE ART",
    quote: "Chosen slowly, shown sparingly.",
    body: "Every work is presented as an object worthy of attention. Selected through an uncompromising curatorial standard, each piece commands reverence, depth, and contemplation.",
    img: "/images/experience-1-art.jpg",
    alt: "Grand classical museum entrance and arrival hall with patrons in evening attire",
    category: "Arrival & Grandeur",
    tag: "Chapter 01",
  },
  {
    index: "02",
    label: "02 / THE COLLECTION",
    title: "THE COLLECTION",
    quote: "Rarity is not simply measured by price, but by provenance, craftsmanship and story.",
    body: "We assemble masterworks whose historical continuity can be traced through centuries of discerning custody — rejecting far more than we accept.",
    img: "/images/experience-2-collection.jpg",
    alt: "Sculpture draped in crimson velvet unveiled in a grand marble gallery hall",
    category: "Masterworks & Provenance",
    tag: "Chapter 02",
  },
  {
    index: "03",
    label: "03 / THE CURATION",
    title: "THE CURATION",
    quote: "Every artwork exists within an atmosphere designed to give it presence.",
    body: "Architecture, lighting, acoustic silence, and spatial harmony converge to elevate each masterpiece beyond exhibition into an unforgettable encounter.",
    img: "/images/experience-3-curation.jpg",
    alt: "Distinguished patrons walking along a sunlit marble gallery colonnade with framed paintings",
    category: "Architecture & Light",
    tag: "Chapter 03",
  },
  {
    index: "04",
    label: "04 / THE ENCOUNTER",
    title: "THE ENCOUNTER",
    quote: "Where discernment meets dialogue in private contemplation.",
    body: "Intimate gatherings for connoisseurs and patrons, offering direct engagement with curators, historians, and fellow collectors in privileged, unhurried settings.",
    img: "/images/experience-4-encounter.jpg",
    alt: "Sophisticated art collectors engaged in conversation during an exclusive gallery reception",
    category: "Private Connoisseurship",
    tag: "Chapter 04",
  },
  {
    index: "05",
    label: "05 / THE MOMENT",
    title: "THE MOMENT",
    quote: "An unhurried journey through light, shadow, and artistic mastery.",
    body: "Time suspends within private salons where classical recital, masterworks, and architectural grandeur unite to create profound, indelible sensory memories.",
    img: "/images/experience-5-moment.jpg",
    alt: "Classical chamber music recital in a frescoed palace art gallery for gala attendees",
    category: "Salon & Harmony",
    tag: "Chapter 05",
  },
  {
    index: "06",
    label: "06 / THE COLLECTOR",
    title: "THE COLLECTOR",
    quote: "Custodians of legacy, preserving beauty for generations.",
    body: "Move through AUREXA and discover works, stories and perspectives at your own pace, inviting collectors to forge a personal and enduring connection with exceptional objects.",
    img: "/images/experience-6-collector.jpg",
    alt: "Three elegant women observing and admiring a large masterpiece painting in a museum gallery",
    category: "Enduring Custody",
    tag: "Chapter 06",
  },
];

export const Experience = () => (
  <section
    id="experience"
    data-testid="experience-section"
    className="relative overflow-hidden bg-navy text-ivory border-t border-champagne/15 py-28 sm:py-36 md:py-44"
  >
    {/* Atmospheric radial lighting */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(185,154,104,0.08)_0%,transparent_60%)]"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute bottom-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,32,91,0.25)_0%,transparent_70%)]"
    />

    <div className="relative mx-auto max-w-[1500px] px-6 md:px-12">
      {/* Section Header */}
      <Eyebrow index="03" label="The Experience" tone="champagne" />

      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <h2>
            <TextReveal
              lines={["THE EXPERIENCE"]}
              lineClassName="font-serif text-5xl font-light leading-[1.02] tracking-wide sm:text-6xl lg:text-7xl text-ivory"
            />
          </h2>
        </div>
        <div className="lg:col-span-5">
          <FadeUp delay={0.2}>
            <p className="font-serif text-xl sm:text-2xl font-light italic text-champagne/90 leading-relaxed">
              AUREXA is not simply an online gallery. It is an immersive journey through art.
            </p>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-ivory/60 font-light">
              A bespoke environment tailored for contemplation, connoisseurship, and private discovery.
            </p>
          </FadeUp>
        </div>
      </div>

      {/* Curated Editorial Project Cards (Lunore Structure + Aurexa Visual Language + Aurora Photography) */}
      <div className="mt-16 sm:mt-24 lg:mt-32 space-y-12 sm:space-y-16 lg:space-y-24">
        {CHAPTERS.map((chapter, i) => {
          const isReversed = i % 2 === 1;

          return (
            <FadeUp key={chapter.index} delay={0.1} y={35}>
              <article
                data-testid={`experience-chapter-${i + 1}`}
                className="group relative overflow-hidden rounded-[20px] sm:rounded-[26px] lg:rounded-[30px] border border-white/[0.09] bg-gradient-to-b from-[#0e1c30]/90 via-[#0a1526]/85 to-[#07111f]/90 p-3 sm:p-4 lg:p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-700 hover:border-champagne/40 hover:shadow-[0_25px_70px_-10px_rgba(0,32,91,0.4),inset_0_1px_0_rgba(185,154,104,0.25)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                  {/* Large Cinematic Image Container */}
                  <div
                    className={`lg:col-span-6 xl:col-span-7 ${
                      isReversed ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="relative h-[280px] sm:h-[380px] md:h-[420px] lg:h-full min-h-[280px] sm:min-h-[360px] lg:min-h-[460px] w-full overflow-hidden rounded-[14px] sm:rounded-[20px] lg:rounded-[22px] bg-ink">
                      {/* Photography Scene */}
                      <img
                        src={chapter.img}
                        alt={chapter.alt}
                        loading={i < 2 ? "eager" : "lazy"}
                        decoding="async"
                        className="h-full w-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                      />

                      {/* Subtle gradient vignette to integrate image seamlessly */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-black/20" />

                      {/* Pill Category Tag */}
                      <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10">
                        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3.5 py-1.5 backdrop-blur-md">
                          <span className="h-1.5 w-1.5 rounded-full bg-champagne" />
                          <span className="text-[10px] font-medium tracking-[0.22em] text-ivory/90 uppercase">
                            {chapter.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Editorial Content Container */}
                  <div
                    className={`flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-8 xl:p-10 lg:col-span-6 xl:col-span-5 ${
                      isReversed ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div>
                      {/* Top Label & Chapter Number */}
                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-medium uppercase tracking-[0.35em] text-champagne">
                          {chapter.label}
                        </span>
                        <span className="h-px flex-1 max-w-[36px] bg-champagne/30" />
                        <span className="text-[10px] uppercase tracking-[0.25em] text-ivory/40">
                          {chapter.tag}
                        </span>
                      </div>

                      {/* Serif Heading */}
                      <div className="mt-5 sm:mt-6">
                        <LightSweep delay={0.25}>
                          <h3 className="font-serif text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-light tracking-wide text-ivory leading-[1.12]">
                            {chapter.title}
                          </h3>
                        </LightSweep>
                      </div>

                      {/* Core Italic Quote */}
                      {chapter.quote && (
                        <p className="mt-4 font-serif text-base sm:text-lg italic text-champagne/90 leading-relaxed font-normal">
                          &ldquo;{chapter.quote}&rdquo;
                        </p>
                      )}

                      {/* Editorial Body Description */}
                      <p className="mt-4 sm:mt-5 text-sm sm:text-[15px] leading-relaxed text-ivory/70 font-light">
                        {chapter.body}
                      </p>
                    </div>

                    {/* Bottom Luxury Card Detail (Inspired by Lunore's action button & Aurexa's refinement) */}
                    <div className="mt-8 pt-6 border-t border-ivory/10 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] uppercase tracking-[0.3em] text-ivory/40 font-light">
                          Aurexa Curatorial Archive
                        </span>
                        <span className="font-serif text-xs italic text-champagne/80 mt-0.5">
                          Private Exhibition Sequence
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-ivory/50 font-light hidden sm:inline-block transition-colors duration-300 group-hover:text-champagne">
                          View Chapter
                        </span>
                        <div
                          aria-hidden
                          className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-champagne/30 bg-champagne/5 text-champagne transition-all duration-500 group-hover:border-champagne group-hover:bg-champagne group-hover:text-ink shadow-[0_0_15px_rgba(185,154,104,0.1)]"
                        >
                          <svg
                            className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          >
                            <path
                              d="M7 17L17 7M17 7H7M17 7V17"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </FadeUp>
          );
        })}
      </div>
    </div>
  </section>
);

export default Experience;
