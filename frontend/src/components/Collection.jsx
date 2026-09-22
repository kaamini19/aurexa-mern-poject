import { Eyebrow, FadeUp, LightSweep, TextReveal } from "./reveal";

export const Collection = () => (
  <section
    id="collection"
    data-testid="collection-section"
    className="relative overflow-hidden border-y border-champagne/20 bg-gradient-to-b from-[#091322] via-[#0D1C30] to-[#091322] text-ivory py-28 sm:py-36 md:py-44"
  >
    {/* Subtle Ambient Radial Glow for Depth */}
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(185,154,104,0.1)_0%,rgba(11,23,40,0.5)_60%,transparent_85%)]"
    />

    <div className="relative mx-auto max-w-5xl px-6 sm:px-8 md:px-12 flex flex-col items-center text-center">
      <Eyebrow index="01" label="About" tone="champagne" className="justify-center" />

      <h2 className="mt-8 mb-6">
        <LightSweep>
          <TextReveal
            lines={["ABOUT AUREXA"]}
            lineClassName="font-serif text-4xl font-light tracking-[0.2em] text-ivory sm:text-6xl md:text-7xl lg:text-8xl"
          />
        </LightSweep>
      </h2>

      {/* Elegant Golden Divider */}
      <div className="mb-10 flex items-center justify-center gap-3">
        <span className="h-px w-20 bg-gradient-to-r from-transparent to-champagne/70" />
        <span className="h-1.5 w-1.5 rotate-45 bg-champagne" />
        <span className="h-px w-20 bg-gradient-to-l from-transparent to-champagne/70" />
      </div>

      {/* Centered Main Paragraph */}
      <FadeUp delay={0.25} y={24} className="max-w-3xl sm:max-w-4xl mx-auto px-4">
        <p className="font-serif text-sm sm:text-base md:text-lg lg:text-[19px] font-light leading-relaxed sm:leading-[2] md:leading-[2.2] text-ivory/80 tracking-wide text-center sm:text-justify sm:[text-align-last:center] [text-wrap:pretty]">
          Aurexa is more than an exhibition or auction. It&apos;s an immersive celebration of art
          designed exclusively for HNI clients and collectors. This is where masterpieces
          transcend passive viewing and become the heart of an unforgettable experience. At Aurexa,
          art is honored, discussed, and truly celebrated by those who appreciate its finest form.
          It&apos;s a gathering of discerning individuals who don&apos;t just observe art, but live
          it. Step into a world where every creation is elevated, where passion meets
          sophistication, and where HNI collectors connect on a deeper level with the artworks that
          inspire them.
        </p>

        {/* Standout Climax Line in All Caps */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center">
          <div className="relative inline-flex flex-col items-center py-3.5 px-6 sm:px-12 border-y border-champagne/30 bg-gradient-to-r from-transparent via-champagne/[0.06] to-transparent">
            <LightSweep delay={0.5}>
              <p className="font-serif text-sm sm:text-lg md:text-xl lg:text-2xl font-light tracking-[0.22em] sm:tracking-[0.28em] text-champagne uppercase">
                AUREXA ISN&apos;T JUST AN EVENT, IT&apos;S AN EXPERIENCE.
              </p>
            </LightSweep>
          </div>
        </div>
      </FadeUp>
    </div>
  </section>
);






