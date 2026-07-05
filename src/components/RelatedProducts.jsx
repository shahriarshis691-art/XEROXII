import { motion } from "framer-motion";
import { FiHeart, FiShoppingBag } from "react-icons/fi";
import watch from "../assets/watch.jpg";

const items = [
  { title: "Platinum GMT", subtitle: "Dual-time elegance", price: "$6,900" },
  { title: "Moonphase 38", subtitle: "Architectural dial", price: "$7,400" },
  { title: "Silver Chrono", subtitle: "Refined casework", price: "$5,800" },
];

export default function RelatedProducts() {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-zinc-400">Related products</p>
          <h2 className="section-heading mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
            Continue the collection.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-8 text-zinc-400">Discover more refined timepieces designed to complement your signature style.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {items.map((item, index) => (
          <motion.article key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.08 }} whileHover={{ y: -6, scale: 1.01 }} className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/80 shadow-[0_20px_70px_rgba(0,0,0,0.24)]">
            <img src={watch} alt={item.title} className="h-72 w-full object-cover" loading="lazy" />
            <div className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-zinc-400">{item.subtitle}</p>
                </div>
                <button type="button" className="rounded-full border border-white/10 p-3 text-zinc-200 transition hover:bg-white/10">
                  <FiHeart className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold text-white">{item.price}</p>
                <button type="button" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-black">
                  <FiShoppingBag className="h-4 w-4" /> Add
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
