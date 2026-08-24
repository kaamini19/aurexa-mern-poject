import { Eyebrow, FadeUp, LightSweep, TextReveal } from "./reveal";

export const Collection = () => (
  <section
    id="collection"
    data-testid="collection-section"
    className="relative overflow-hidden bg-ivory text-ink py-28 sm:py-36 md:py-44"
  >
    {/* Subtle Luxury Ambient Background */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-champagne/15 via-transparent to-transparent opacity-70"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-champagne/10 blur-3xl"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-bronze/10 blur-3xl"
    />

    <div className="relative mx-auto max-w-6xl px-6 sm:px-8 md:px-12">
      {/* Decorative Frame */}
      <div className="relative border border-champagne/30 bg-[#FAF7F0]/90 p-8 sm:p-14 md:p-20 shadow-[0_25px_60px_rgba(7,16,29,0.06)] backdrop-blur-sm">
        {/* Corner Accents */}
        <span
          aria-hidden
          className="absolute -top-1.5 -left-1.5 h-3 w-3 border-t-2 border-l-2 border-champagne"
        />
        <span
          aria-hidden
          className="absolute -top-1.5 -right-1.5 h-3 w-3 border-t-2 border-r-2 border-champagne"
        />
        <span
          aria-hidden
          className="absolute -bottom-1.5 -left-1.5 h-3 w-3 border-b-2 border-l-2 border-champagne"
        />
        <span
          aria-hidden
          className="absolute -bottom-1.5 -right-1.5 h-3 w-3 border-b-2 border-r-2 border-champagne"
        />

        <div className="flex flex-col items-center text-center">
          <Eyebrow index="01" label="The Philosophy" tone="bronze" className="justify-center" />

          <h2 className="mt-8 mb-8">
            <LightSweep>
              <TextReveal
                lines={["ABOUT AUREXA"]}
                lineClassName="font-serif text-4xl font-light tracking-[0.2em] text-ink sm:text-6xl md:text-7xl lg:text-8xl"
              />
            </LightSweep>
          </h2>

          {/* Elegant Divider */}
          <div className="mb-10 flex items-center justify-center gap-3">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-champagne" />
            <span className="h-1.5 w-1.5 rotate-45 bg-champagne" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-champagne" />
          </div>

          {/* Centered Main Paragraph */}
          <FadeUp delay={0.25} y={24} className="max-w-4xl">
            <p className="font-sans text-base font-light leading-relaxed text-ink/80 sm:text-lg sm:leading-loose md:text-xl md:leading-[2.2] lg:text-[22px]">
              Aurexa is more than an exhibition or auction . It&apos;s an immersive celebration of
              art designed exclusively for HNI clients and collectors. This is where masterpieces
              transcend passive viewing and become the heart of an unforgettable experience. At
              Aurexa, art is honored, discussed, and truly celebrated by those who appreciate its
              finest form. It&apos;s a gathering of discerning individuals who don&apos;t just
              observe art, but live it. Step into a world where every creation is elevated, where
              passion meets sophistication, and where HNI collectors connect on a deeper level with
              the artworks that inspire them. Aurexa isn&apos;t just an event , It&apos;s an
              experience.
            </p>
          </FadeUp>
        </div>
      </div>
    </div>
  </section>
);



