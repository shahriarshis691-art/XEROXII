import { Link } from "react-router-dom";

const BRANDS = [
  {
    name: "SEIKO",
    slug: "seiko",
    src: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80",
    alt: "Seiko luxury watch dial close-up",
  },
  {
    name: "TISSOT",
    slug: "tissot",
    src: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=600&q=80",
    alt: "Tissot watch dial macro detail",
  },
  {
    name: "CITIZEN",
    slug: "citizen",
    src: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=600&q=80",
    alt: "Citizen watch face close-up",
  },
  {
    name: "CASIO",
    slug: "casio",
    src: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=600&q=80",
    alt: "Casio timepiece dial detail",
  },
  {
    name: "ORIENT",
    slug: "orient",
    src: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&w=600&q=80",
    alt: "Orient watch dial showcase",
  },
  {
    name: "HAMILTON",
    slug: "hamilton",
    src: "https://images.unsplash.com/photo-1533132399788-19650c12c6ed?auto=format&fit=crop&w=600&q=80",
    alt: "Hamilton luxury watch face",
  },
];

export default function PopularBrands() {
  return (
    <section id="popular-brands" className="relative bg-[#f3f2ef] py-20 sm:py-28">
      <div className="page-shell text-center mb-12 sm:mb-16">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-black/50">
          Trusted Names
        </p>
          <h2 className="section-heading mt-3 text-3xl font-semibold uppercase tracking-wide text-black sm:text-5xl">
          Popular Brands
        </h2>
      </div>

      <div className="page-shell grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-5 lg:gap-5">
        {BRANDS.map((brand, index) => (
          <div
            key={brand.name}
            className={
              index === BRANDS.length - 1 ? "lg:col-span-5 flex justify-center" : ""
            }
          >
            <Link
              to={`/brand/${brand.slug}`}
              className={`block relative overflow-hidden bg-[#0a0a0a] group ${
                index === BRANDS.length - 1
                  ? "lg:w-full lg:max-w-[240px]"
                  : "w-full"
              }`}
            >
              <div className="aspect-[4/3] w-full">
                <img
                  src={brand.src}
                  alt={brand.alt}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-80 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-100"
                />
              </div>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-500 group-hover:from-black/40 group-hover:via-black/10"
              />
              <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold uppercase tracking-widest text-white transition-all duration-500 group-hover:tracking-[0.35em] sm:text-base">
                {brand.name}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
