import { motion } from "framer-motion";
import watch from "../assets/watch.jpg";

export default function JewelleryBanner() {
  return (
    <motion.section id="story" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.85, ease: "easeOut" }} className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-zinc-950/80 px-6 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:px-10 sm:py-14">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.08),transparent_40%)]" />

      <div className="relative grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.42em] text-zinc-400">Brand story</p>
          <h2 className="section-heading text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            A modern maison for those who value understatement.
          </h2>
          <p className="max-w-xl text-sm leading-8 text-zinc-400 sm:text-base">
            XEROXII draws inspiration from the timeless language of Swiss watchmaking—clarity, restraint, and refined engineering. Every piece is a study in proportion, balance, and precision.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#reviews" className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-black transition duration-300 hover:-translate-y-1">Read reviews</a>
            <a href="#faq" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition duration-300 hover:border-white/30 hover:bg-white/10">Visit atelier</a>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900/80 shadow-[0_25px_80px_rgba(0,0,0,0.4)]">
          <img src={watch} alt="XEROXII watch story" className="h-full w-full object-cover" />
        </div>
      </div>
    </motion.section>
  );
}
