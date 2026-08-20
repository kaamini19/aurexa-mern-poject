import { CATEGORIES } from "@/data/content";
import { Eyebrow, FadeUp, LightSweep, TextReveal } from "./reveal";
import { HorizontalGallery } from "./HorizontalGallery";

export const Collection = () => (
  <section id="collection" data-testid="collection-section" className="relative bg-ivory text-ink">
    <div className="mx-auto max-w-[1500px] px-6 pb-20 pt-28 md:px-12 md:pb-28 md:pt-40">
      <Eyebrow index="01" label="The Exhibition Rooms" tone="bronze" />
      <div className="mt-8 grid gap-10 md:grid-cols-12 md:items-end">
        <h2 className="md:col-span-7">
          <LightSweep>
            <TextReveal
              lines={["THE COLLECTION"]}
              lineClassName="font-serif text-5xl font-light leading-[1.02] tracking-wide text-ink sm:text-6xl lg:text-7xl"
            />
          </LightSweep>
        </h2>
        <FadeUp delay={0.25} className="md:col-span-5">
          <p className="max-w-md text-sm leading-relaxed text-ink/65 md:text-base">
            Exceptional objects, artworks and antiquities gathered for those who know their worth.
            Each room of the collection is hung sparingly — nothing competes, everything speaks.
          </p>
        </FadeUp>
      </div>

      <div className="mt-16 border-t border-ink/15 md:mt-24">
        {CATEGORIES.map((c, i) => (
          <FadeUp key={c.name} delay={0.05 * i} y={18}>
            <div
              data-testid={`category-${c.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              className="group flex items-baseline justify-between border-b border-ink/15 py-5 transition-all duration-500 hover:pl-4 md:py-6"
            >
              <span className="flex items-baseline gap-5">
                <span className="text-[10px] tracking-[0.3em] text-bronze/70 transition-colors duration-500 group-hover:text-bronze">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-2xl font-light tracking-wide transition-colors duration-500 group-hover:text-bronze md:text-4xl">
                  {c.name.toUpperCase()}
                </span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-ink/40 transition-colors duration-500 group-hover:text-ink/70">
                {c.count}
              </span>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>

    <HorizontalGallery />
  </section>
);
