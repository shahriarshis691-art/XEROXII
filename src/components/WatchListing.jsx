import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductQuickViewModal from "./ProductQuickViewModal";
import { WATCH_LISTING_PRODUCTS } from "../data/watchListingProducts";

export default function WatchListing() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  return (
    <section id="watches" className="relative bg-[#f3f2ef] py-20 sm:py-28">
      <div className="page-shell flex flex-col items-center text-center">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-black/50">
          Our Timepieces
        </p>
        <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-light uppercase tracking-[0.06em] text-black">
          The Watch Collection
        </h2>
      </div>

      <div className="page-shell mt-14 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-14">
        {WATCH_LISTING_PRODUCTS.map((watch, index) => (
          <motion.div
            key={watch.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: (index % 3) * 0.15 }}
            className="group relative text-center"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e7e1]">
              <img
                src={watch.src}
                alt={watch.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/10">
                <button
                  type="button"
                  onClick={() => setSelected(watch)}
                  className="pointer-events-auto translate-y-4 rounded-full border border-black/20 bg-white/90 px-5 py-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-black backdrop-blur-sm"
                >
                  View Details
                </button>
              </div>
            </div>
            <button type="button" onClick={() => navigate(`/product/${watch.id}`)} className="mt-3 w-full text-left">
              <h3 className="text-[0.65rem] font-semibold uppercase leading-tight tracking-[0.08em] text-black sm:mt-5 sm:text-sm sm:tracking-[0.14em]">
                {watch.name}
              </h3>
              <p className="mt-1 text-[0.55rem] uppercase leading-tight tracking-[0.06em] text-black/50 sm:text-[0.6875rem] sm:tracking-[0.16em]">
                {watch.title}
              </p>
              <p className="mt-1.5 text-[0.7rem] font-medium tracking-[0.02em] text-black/80 sm:mt-2 sm:text-sm sm:tracking-[0.04em]">
                {watch.price}
              </p>
            </button>
          </motion.div>
        ))}
      </div>

      <ProductQuickViewModal product={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
