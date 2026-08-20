const PHRASES = [
  "The Art of the Exceptional",
  "AUREXA II — MMXXVI",
  "Private Exhibition & Auction",
  "By Invitation Only",
];

export const Marquee = () => (
  <div
    aria-hidden
    className="overflow-hidden border-y border-ivory/10 bg-ink py-7"
    data-testid="editorial-marquee"
  >
    <div className="marquee-track">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center">
          {PHRASES.map((p, i) => (
            <span key={i} className="flex items-center">
              <span className="whitespace-nowrap px-10 font-serif text-2xl font-light italic text-ivory/60 md:text-3xl">
                {p}
              </span>
              <span className="h-1.5 w-1.5 rotate-45 bg-champagne/60" />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);
