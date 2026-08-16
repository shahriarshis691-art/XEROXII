import { Link } from "react-router-dom";
import { SISTER_BRANDS } from "../data/brandsData";

function BrandMark({ brand }) {
  if (brand.logoImage) {
    return (
      <img
        src={brand.logoImage}
        alt=""
        className="h-12 w-auto max-w-[9.5rem] object-contain md:h-14"
        loading="lazy"
      />
    );
  }

  return (
    <span className="px-2 text-center font-display text-[0.85rem] font-semibold uppercase leading-tight tracking-[0.28em] text-white md:text-[0.95rem]">
      {brand.name}
    </span>
  );
}

export default function SisterBrands() {
  return (
    <section
      aria-labelledby="sister-brands-heading"
      className="relative border-y border-black/10 bg-[#fafaf8] py-10 sm:py-14 md:py-16"
    >
      <div className="page-shell mb-8 text-center md:mb-10">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-black/45">
          Affiliated Brands
        </p>
        <h2
          id="sister-brands-heading"
          className="mt-2 font-display text-2xl font-semibold uppercase tracking-[0.14em] text-[#0a0a0a] sm:text-3xl"
        >
          Our Sister Ventures
        </h2>
      </div>

      <div
        role="list"
        className="flex flex-row flex-nowrap items-center gap-8 overflow-x-auto overscroll-x-contain scroll-smooth snap-x snap-mandatory no-scrollbar px-[var(--page-gutter)] touch-pan-x md:justify-center md:gap-12 md:overflow-x-visible"
      >
        {SISTER_BRANDS.map((brand) => {
          const lightMark = Boolean(brand.logoImage && brand.logoBg === "#ffffff");

          return (
            <Link
              key={brand.id}
              role="listitem"
              to={`/brands/${brand.slug}`}
              aria-label={`Explore ${brand.name}`}
              className="group flex shrink-0 snap-center flex-col items-center justify-center gap-3 py-1 transition duration-300 hover:opacity-70 active:scale-[0.98] md:hover:scale-[1.04] md:hover:opacity-100"
            >
              <div
                className={`flex h-16 w-[11rem] items-center justify-center md:h-20 ${
                  lightMark ? "border border-black/10 bg-white" : "bg-[#0a0a0a]"
                }`}
              >
                <BrandMark brand={brand} />
              </div>
              <span className="whitespace-nowrap text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-[#0a0a0a]">
                {brand.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
