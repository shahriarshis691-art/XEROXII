import { motion } from "framer-motion";
import watch from "../assets/watch.jpg";

export default function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),transparent_25%),radial-gradient(circle_at_bottom_right,_rgba(192,192,192,0.12),transparent_30%)]" />
      <div className="relative mx-auto grid min-h-[calc(100vh-72px)] max-w-7xl items-center gap-12 px-6 py-20 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10 lg:py-24">
        <motion.div initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="relative z-10 max-w-2xl space-y-8">
          <p className="text-sm uppercase tracking-[0.45em] text-zinc-400">Swiss craftsmanship · 2026 collection</p>
          <h1 className="text-5xl font-semibold leading-[0.9] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
            The art of time, reimagined.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-400">
            Discover sculpted chronographs, refined steel, and platinum details designed for collectors who value precision and presence.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#collections" className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-black transition duration-300 hover:-translate-y-1 hover:bg-zinc-200">Explore watches</a>
            <a href="#story" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:border-white/35 hover:bg-white/10">Our story</a>
          </div>
          <div className="flex flex-wrap gap-8 pt-2 text-sm text-zinc-500">
            <span>Swiss movement</span>
            <span>Platinum case</span>
            <span>Limited edition</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.95, ease: "easeOut" }} className="relative">
          <div className="absolute inset-0 -translate-x-2 translate-y-2 rounded-[2.75rem] border border-white/10 bg-white/5 blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-zinc-950/80 p-3 shadow-[0_40px_140px_rgba(0,0,0,0.55)]">
            <img src={watch} alt="Luxury XEROXII watch" className="h-[540px] w-full rounded-[2.2rem] object-cover object-center sm:h-[640px]" />
            <div className="absolute inset-0 rounded-[2.2rem] bg-gradient-to-t from-black/90 via-black/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 sm:p-10">
              <p className="text-sm uppercase tracking-[0.4em] text-zinc-300">Limited release</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Chronograph No. 01</h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-zinc-300">A matte black dial, polished steel bracelet, and sapphire crystal crafted for quiet confidence.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
