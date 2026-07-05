import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <motion.section initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7, ease: "easeOut" }} className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03))] p-8 shadow-[0_28px_90px_rgba(0,0,0,0.24)] sm:p-10 lg:p-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Timeless luxury</p>
          <h2 className="section-heading mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
            Experience a new standard of precision.
          </h2>
          <p className="mt-4 text-base leading-8 text-zinc-300">
            Discover the XEROXII collection and bring a quiet statement of craftsmanship into your everyday life.
          </p>
        </div>
        <motion.div whileHover={{ y: -3, scale: 1.01 }}>
          <Link to="/shop" className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-black transition">
            Shop collection
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
