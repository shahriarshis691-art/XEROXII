import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SISTER_BRANDS } from "../data/brandsData";

function BrandMark({ brand }) {
  if (brand.logoImage) {
    return (
      <img
        src={brand.logoImage}
        alt={`${brand.name} logo`}
        className="max-h-[7.5rem] w-auto max-w-[78%] object-contain sm:max-h-32"
        loading="lazy"
      />
    );
  }

  const [primary, ...rest] = brand.name.split(" ");
  const secondary = rest.join(" ");

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <span className="font-display text-[1.65rem] font-semibold uppercase tracking-[0.32em] text-white sm:text-3xl">
        {primary}
      </span>
      {secondary ? (
        <>
          <span className="mt-3 h-px w-8 bg-white/35" aria-hidden="true" />
          <span className="mt-3 text-[0.625rem] font-medium uppercase tracking-[0.42em] text-white/70">
            {secondary}
          </span>
        </>
      ) : null}
    </div>
  );
}

export default function SisterBrands() {
  return (
    <section
      aria-labelledby="sister-brands-heading"
      className="relative border-y border-black/10 bg-[#fafaf8] py-16 sm:py-24"
    >
      <div className="page-shell">
        <div className="mb-12 text-center sm:mb-16">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-black/45">
            Affiliated Brands
          </p>
          <h2
            id="sister-brands-heading"
            className="mt-3 font-display text-2xl font-semibold uppercase tracking-[0.14em] text-[#0a0a0a] sm:text-3xl"
          >
            Our Sister Ventures
          </h2>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3">
          {SISTER_BRANDS.map((brand, index) => (
            <motion.article
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group flex flex-col border border-black/10 bg-white transition duration-300 hover:-translate-y-1 hover:border-black/30 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
            >
              <div
                className="flex aspect-[4/3] items-center justify-center border-b border-black/10 px-8"
                style={{ backgroundColor: brand.logoImage ? brand.logoBg || "#0a0a0a" : "#0a0a0a" }}
              >
                <BrandMark brand={brand} />
              </div>

              <div className="flex flex-1 flex-col items-center px-6 py-8 text-center">
                <h3 className="text-[0.8rem] font-semibold uppercase tracking-[0.22em] text-[#0a0a0a]">
                  {brand.name}
                </h3>
                <Link
                  to={`/brands/${brand.slug}`}
                  className="mt-7 inline-flex min-h-11 w-full max-w-[14rem] items-center justify-center border border-[#0a0a0a] bg-transparent px-6 text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-[#0a0a0a] transition duration-300 hover:bg-[#0a0a0a] hover:text-white"
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
