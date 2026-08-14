import { motion } from "framer-motion";
import watch from "../assets/watch.jpg";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-white/10 bg-black text-white">
      <div className="page-shell grid min-h-[calc(100svh-72px)] items-center gap-12 py-14 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="max-w-xl">
          <p className="eyebrow">Swiss craftsmanship · 2026 collection</p>
          <h1 className="section-heading mt-6 text-5xl font-semibold leading-[0.94] text-white sm:text-6xl lg:text-7xl">
            The art of time, reimagined.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-zinc-400 sm:text-lg">
            Discover sculpted chronographs, refined steel, and platinum details designed for collectors who value precision and presence.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#collections" className="button-primary">Explore watches</a>
            <a href="#story" className="button-secondary">Our story</a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-xs uppercase tracking-[0.16em] text-zinc-500">
            <span>Swiss movement</span>
            <span>Platinum case</span>
            <span>Limited edition</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative">
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-zinc-950 shadow-[0_30px_90px_rgba(0,0,0,0.42)]">
            <img src={watch} alt="Luxury XEROXII watch" className="aspect-[4/5] w-full object-cover object-center sm:aspect-[5/6]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="eyebrow text-zinc-300">Limited release</p>
              <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">Chronograph No. 01</h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-zinc-300">A matte black dial, polished steel bracelet, and sapphire crystal crafted for quiet confidence.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
