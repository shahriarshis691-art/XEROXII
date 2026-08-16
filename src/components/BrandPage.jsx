import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Seo from "./Seo";
import { BRAND_PRODUCTS, BRAND_META } from "../data/brandProducts";

export default function BrandPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);
  const brandName = Object.keys(BRAND_META).find(
    (key) => BRAND_META[key].slug === slug
  );
  const meta = brandName ? BRAND_META[brandName] : null;
  const products = BRAND_PRODUCTS.filter((p) => {
    if (!brandName) return false;
    return p.brand === brandName;
  });

  if (!meta || products.length === 0) {
    return (
      <div className="page-shell py-20 text-center">
        <p className="text-sm text-black/60">Brand not found.</p>
        <Link to="/" className="button-primary mt-6">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <section className="relative bg-[#f3f2ef] min-h-screen">
      <Seo
        title={`${brandName} Watches`}
        description={meta.tagline}
        path={`/brand/${slug}`}
      />
      <div className="page-shell pt-10 pb-6 sm:pt-14 sm:pb-8">
        <nav className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-black/50">
          <Link to="/" className="transition hover:text-black">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-black/80">Brands</span>
          <span aria-hidden="true">/</span>
          <span className="text-black">{brandName}</span>
        </nav>
      </div>

      <div className="page-shell pb-16 sm:pb-24">
        <div className="text-center">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-black/50">
            {brandName} Collection
          </p>
          <h1 className="section-heading mt-3 text-3xl font-semibold uppercase tracking-wide text-black sm:text-5xl lg:text-6xl">
            {brandName.toUpperCase()}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-black/70 sm:text-lg">
            {meta.tagline}
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-12 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-14">
          {products.map((watch, index) => (
            <motion.div
              key={watch.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: (index % 4) * 0.08 }}
              className="group text-center cursor-pointer"
              onClick={() => navigate(`/product/${watch.id}`)}
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e7e1]">
                <img
                  src={watch.image}
                  alt={watch.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/10">
                  <span className="pointer-events-auto translate-y-4 rounded-full border border-black/20 bg-white/90 px-5 py-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-black backdrop-blur-sm">
                    View Details
                  </span>
                </div>
                {watch.tag && (
                  <span className="absolute left-2 top-2 bg-black px-2 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-white">
                    {watch.tag}
                  </span>
                )}
              </div>
              <h3 className="mt-3 text-[0.65rem] font-semibold uppercase leading-tight tracking-[0.08em] text-black sm:mt-5 sm:text-sm sm:tracking-[0.14em]">
                {watch.title}
              </h3>
              <p className="mt-1.5 text-[0.7rem] font-medium tracking-[0.02em] text-black/80 sm:mt-2 sm:text-sm sm:tracking-[0.04em]">
                {watch.priceBDT}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
