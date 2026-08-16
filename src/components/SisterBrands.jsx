import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SISTER_BRANDS } from "../data/brandsData";

function BrandLogo({ brand }) {
  if (brand.logoImage) {
    return (
      <div
        className="flex items-center justify-center px-6 py-8"
        style={{ backgroundColor: brand.logoBg || "#0a0a0a" }}
      >
        <img
          src={brand.logoImage}
          alt={`${brand.name} logo`}
          className="max-h-24 w-auto max-w-[85%] object-contain sm:max-h-28"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className="flex h-28 items-center justify-center"
      style={{ backgroundColor: brand.logoBg || "#0a0a0a" }}
    >
      <span className="text-2xl font-bold tracking-[0.25em] text-white">{brand.logo}</span>
    </div>
  );
}

export default function SisterBrands() {
  return (
    <section
      aria-labelledby="sister-brands-heading"
      className="relative border-y border-black/10 bg-[#fafaf8] py-12 sm:py-16"
    >
      <div className="page-shell">
        <div className="mb-10 text-center">
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {SISTER_BRANDS.map((brand, index) => (
            <motion.article
              key={brand.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group flex flex-col overflow-hidden border border-black/10 bg-white shadow-sm transition hover:border-black/25 hover:shadow-md"
            >
              <BrandLogo brand={brand} />

              <div className="relative aspect-[16/9] overflow-hidden bg-[#0a0a0a]">
                <img
                  src={brand.cardImage}
                  alt={brand.name}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="text-lg font-semibold uppercase tracking-[0.12em] text-black">
                  {brand.name}
                </h3>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-black/50">
                  {brand.category}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-black/65">
                  {brand.tagline}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    to={`/brands/${brand.slug}`}
                    className="inline-flex min-h-11 flex-1 items-center justify-center border border-black bg-black px-5 py-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-transparent hover:text-black sm:text-xs"
                  >
                    Explore Brand
                  </Link>
                  <a
                    href={brand.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 flex-1 items-center justify-center border border-black/20 px-5 py-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-black transition hover:border-black hover:bg-black hover:text-white sm:text-xs"
                  >
                    View Portfolio
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
