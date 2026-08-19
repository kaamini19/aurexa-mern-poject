import { ArrowUpRight } from "lucide-react";
import { ARTICLES } from "@/data/content";
import { Eyebrow, FadeUp, ImageReveal, TextReveal } from "./reveal";

export const Journal = () => {
  const [feature, ...rest] = ARTICLES;
  return (
    <section id="journal" data-testid="journal-section" className="relative bg-ivory text-ink">
      <div className="mx-auto max-w-[1500px] border-t border-ink/10 px-6 py-28 md:px-12 md:py-40">
        <Eyebrow index="08" label="Essays & Notes" tone="bronze" />
        <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
          <h2>
            <TextReveal
              lines={["THE AUREXA JOURNAL"]}
              lineClassName="font-serif text-4xl font-light leading-[1.05] tracking-wide sm:text-5xl lg:text-6xl"
            />
          </h2>
          <FadeUp delay={0.2}>
            <p className="max-w-sm text-sm leading-relaxed text-ink/60">
              Writing on objects, provenance and the quiet discipline of collecting.
            </p>
          </FadeUp>
        </div>

        <article data-testid="journal-feature" className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ImageReveal src={feature.img} alt={feature.title} veil="#F3EDE2" className="aspect-[16/10]" />
          </div>
          <div className="flex flex-col justify-center lg:col-span-5">
            <FadeUp delay={0.15}>
              <p className="text-[10px] uppercase tracking-[0.35em] text-bronze">
                {feature.category} — {feature.date}
              </p>
              <h3 className="mt-5 font-serif text-3xl font-light leading-tight md:text-5xl">
                {feature.title.toUpperCase()}
              </h3>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/65 md:text-base">
                {feature.excerpt}
              </p>
              <span className="mt-8 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-ink/70 transition-colors duration-300 hover:text-bronze">
                Read the Essay <ArrowUpRight size={13} strokeWidth={1.5} />
              </span>
            </FadeUp>
          </div>
        </article>

        <div className="mt-20 border-t border-ink/15 md:mt-28">
          {rest.map((a, i) => (
            <FadeUp key={a.title} delay={0.05 * i} y={20}>
              <article
                data-testid={`journal-article-${i + 2}`}
                className="group grid items-baseline gap-4 border-b border-ink/15 py-8 transition-all duration-500 hover:pl-3 md:grid-cols-12 md:py-10"
              >
                <span className="font-serif text-lg italic text-bronze/70 md:col-span-1">
                  {String(i + 2).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-2xl font-light leading-snug transition-colors duration-500 group-hover:text-bronze md:col-span-5 md:text-4xl">
                  {a.title.toUpperCase()}
                </h3>
                <p className="text-sm leading-relaxed text-ink/55 md:col-span-4">{a.excerpt}</p>
                <span className="text-[10px] uppercase tracking-[0.3em] text-ink/45 md:col-span-2 md:text-right">
                  {a.date}
                </span>
              </article>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};
