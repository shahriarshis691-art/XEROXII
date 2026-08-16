import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SISTER_BRANDS } from "../data/brandsData";

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
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0a]">
                <img
                  src={brand.cardImage}
                  alt={brand.name}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center border border-white/30 bg-black/40 text-xs font-bold tracking-[0.2em] text-white backdrop-blur-sm">
                  {brand.logo}
                </div>
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
                <Link
                  to={`/brands/${brand.slug}`}
                  className="mt-6 inline-flex min-h-11 items-center justify-center border border-black bg-black px-5 py-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-transparent hover:text-black sm:text-xs"
                >
                  Explore Brand
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
