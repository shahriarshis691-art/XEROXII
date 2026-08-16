import { motion } from "framer-motion";
import { useState } from "react";
import ProductQuickViewModal from "./ProductQuickViewModal";

const FEATURED = [
  {
    id: "featured-aurum-platinum",
    name: "Aurum Platinum",
    title: "Men's Platinum Chronograph",
    price: "৳ 5,20,000",
    src: "https://images.pexels.com/photos/1432234/pexels-photo-1432234.jpeg?auto=compress&cs=tinysrgb&w=900",
    badge: "EXCLUSIVE",
  },
  {
    id: "featured-velvet-moonphase",
    name: "Velvet Moonphase",
    title: "Women's Moonphase Dial",
    price: "৳ 3,85,000",
    src: "https://images.pexels.com/photos/5421375/pexels-photo-5421375.jpeg?auto=compress&cs=tinysrgb&w=900",
    badge: "NEW",
  },
  {
    id: "featured-steel-command",
    name: "Steel Command",
    title: "Men's Tactical Display",
    price: "৳ 2,95,000",
    src: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: "featured-blush-diver",
    name: "Blush Diver",
    title: "Women's Steel Diver",
    price: "৳ 2,60,000",
    src: "https://images.pexels.com/photos/1034065/pexels-photo-1034065.jpeg?auto=compress&cs=tinysrgb&w=900",
    badge: "NEW",
  },
  {
    id: "featured-carbon-fiber-x",
    name: "Carbon Fiber X",
    title: "Men's Racing Chronograph",
    price: "৳ 3,40,000",
    src: "https://images.pexels.com/photos/29638625/pexels-photo-29638625.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: "featured-ivory-classic",
    name: "Ivory Classic",
    title: "Women's Minimalist MOP",
    price: "৳ 2,15,000",
    src: "https://images.pexels.com/photos/27531462/pexels-photo-27531462.jpeg?auto=compress&cs=tinysrgb&w=900",
    badge: "NEW",
  },
  {
    id: "featured-obsidian-pro",
    name: "Obsidian Pro",
    title: "Men's All-Black Edition",
    price: "৳ 3,90,000",
    src: "https://images.pexels.com/photos/19979616/pexels-photo-19979616.jpeg?auto=compress&cs=tinysrgb&w=900",
  },
  {
    id: "featured-golden-trio",
    name: "Golden Trio",
    title: "Women's Trio Set",
    price: "৳ 4,80,000",
    src: "https://images.pexels.com/photos/13190042/pexels-photo-13190042.jpeg?auto=compress&cs=tinysrgb&w=900",
    badge: "LIMITED",
  },
];

export default function FeaturedWatches() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="featured" className="relative bg-white py-20 sm:py-28">
      <div className="page-shell flex flex-col items-center text-center">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-black/50">
          Curated Selection
        </p>
        <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-light uppercase tracking-[0.06em] text-black">
          Featured Timepieces
        </h2>
      </div>

      <div className="page-shell mt-14 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-14">
        {FEATURED.map((watch, index) => (
          <motion.div
            key={watch.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: (index % 2) * 0.15 }}
            className="group relative text-center"
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-[#e9e7e1]">
              {watch.badge && (
                <span className="absolute right-2 top-2 z-10 bg-black px-2 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-white">
                  {watch.badge}
                </span>
              )}
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
            <h3 className="mt-3 text-[0.65rem] font-semibold uppercase leading-tight tracking-[0.08em] text-black sm:mt-5 sm:text-sm sm:tracking-[0.14em]">
              {watch.name}
            </h3>
            <p className="mt-1 text-[0.55rem] uppercase leading-tight tracking-[0.06em] text-black/50 sm:text-[0.6875rem] sm:tracking-[0.16em]">
              {watch.title}
            </p>
            <p className="mt-1.5 text-[0.7rem] font-medium tracking-[0.02em] text-black/80 sm:mt-2 sm:text-sm sm:tracking-[0.04em]">
              {watch.price}
            </p>
          </motion.div>
        ))}
      </div>

      <ProductQuickViewModal
        product={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
