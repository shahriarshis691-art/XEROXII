import { motion } from "framer-motion";
import watch from "../assets/hero.png";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden border-b border-black/10 bg-[#f3f2ef] text-black"
    >
      {/* Studio spotlight backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,255,255,0.95),rgba(226,224,218,0.35)_50%,rgba(243,242,239,0)_78%)]"
      />

      <div className="page-shell relative flex flex-col items-center gap-8 pt-16 text-center sm:gap-10 sm:pt-20 lg:pt-24">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-[0.6875rem] font-semibold uppercase tracking-[0.4em] text-black/50"
        >
          Xeroxii Watches
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="max-w-3xl text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-black"
        >
          The Xeroxii Collection
        </motion.h1>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <a
            href="#collections"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-black/15 bg-white px-8 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black shadow-sm transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
          >
            Explore Collection
          </a>
        </motion.div>
      </div>

      {/* Central watch showcase — full-bleed, edge to edge, no side padding */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.25 }}
        className="relative mt-10 w-full sm:mt-12 lg:mt-14"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#e9e7e1] sm:aspect-[21/9]">
          <img
            src={watch}
            alt="XEROXII luxury stainless steel watch lying horizontally on a clean studio surface"
            className="h-full w-full object-cover"
          />
          {/* soft ground shadow / vignette for a high-key studio feel */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_55%,rgba(0,0,0,0.08)_100%)]" />
        </div>
      </motion.div>
    </section>
  );
}
