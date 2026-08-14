const SPECS = [
  {
    title: "Swiss Movement",
    desc: "Precision automatic calibre with 42-hour power reserve, assembled in Switzerland.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 14" />
      </svg>
    ),
  },
  {
    title: "Sapphire Crystal",
    desc: "Scratch-resistant sapphire glass with anti-reflective coating for perfect clarity.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="15" y1="3" x2="15" y2="21" />
      </svg>
    ),
  },
  {
    title: "100m Water Resistance",
    desc: "Rated to 100 metres, suitable for swimming and snorkelling.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
  },
  {
    title: "316L Stainless Steel",
    desc: "Marine-grade stainless steel with a polished finish for lasting brilliance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: "Hand-Assembled",
    desc: "Each movement is assembled by hand by our master horologists in Geneva.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
        <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </svg>
    ),
  },
  {
    title: "5-Year Warranty",
    desc: "Comprehensive international warranty with complimentary service coverage.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
];

export default function CraftsmanshipSpecs() {
  return (
    <section id="craftsmanship" className="relative bg-[#f3f2ef] py-20 sm:py-28 lg:py-32">
      <div className="page-shell text-center mb-14 sm:mb-20">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-black/50">
          Precision Engineering
        </p>
        <h2 className="section-heading mt-3 text-4xl font-semibold uppercase tracking-wide text-black sm:text-5xl">
          The Art of Details
        </h2>
      </div>

      <div className="page-shell grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
        {SPECS.map((spec) => (
          <div key={spec.title} className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-black/10 text-black/70 transition-colors duration-300 group-hover:border-black/30 group-hover:text-black sm:h-20 sm:w-20">
              <div className="h-7 w-7 sm:h-8 sm:w-8">
                {spec.icon}
              </div>
            </div>
            <h3 className="mt-5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-black sm:text-xs">
              {spec.title}
            </h3>
            <p className="mt-2 max-w-[16rem] text-xs leading-relaxed text-black/60 sm:text-sm">
              {spec.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
