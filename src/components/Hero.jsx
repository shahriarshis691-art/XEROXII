import { motion } from "framer-motion";
import watch from "../assets/watch.jpg";
import heroDetail from "../assets/hero.png";
import Navbar from "./Navbar";

const PAGES = [1, 2, 3, 4];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden border-b border-black/10 bg-[#f3f2ef] text-black">
      <Navbar />

      {/* Studio spotlight backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_35%,rgba(255,255,255,0.95),rgba(226,224,218,0.4)_45%,rgba(243,242,239,0)_75%)]"
      />

      <div className="page-shell relative grid min-h-[calc(100svh-7.5rem)] grid-cols-1 items-center gap-10 py-10 sm:py-14 lg:grid-cols-[0.85fr_1fr_0.95fr] lg:gap-6 lg:py-16">
        {/* Left: typography + CTA */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="relative z-10 order-2 max-w-xl lg:order-1"
        >
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-black/50">
            Iconic Timepieces
          </p>
          <h1 className="mt-4 text-[clamp(2.25rem,7vw,3.75rem)] font-light uppercase leading-[0.98] tracking-[0.03em] text-black">
            Chrono Luxe
            <br />
            Professional
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-7 tracking-[0.02em] text-black/60">
            Precision engineering meets timeless design. Crafted for those who
            measure moments that matter.
          </p>
          <div className="mt-8">
            <a
              href="#collections"
              className="inline-flex min-h-12 items-center justify-center border border-black/80 bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-black transition-all duration-300 hover:bg-black hover:text-white"
            >
              Discover the Watch
            </a>
          </div>
        </motion.div>

        {/* Center: archival collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative order-1 mx-auto hidden h-[26rem] w-full max-w-md lg:order-2 lg:block"
        >
          {/* Embossed stamp badge */}
          <div className="absolute left-1/2 top-6 flex h-28 w-28 -translate-x-1/2 -rotate-6 items-center justify-center rounded-full border border-black/20 bg-[#e9e7e1] text-center shadow-inner">
            <span className="px-2 text-[0.5rem] font-semibold uppercase leading-tight tracking-[0.2em] text-black/45">
              Est. Precision Since 1970
            </span>
          </div>

          {/* Mechanical schematic card */}
          <div className="absolute left-2 top-24 w-40 -rotate-3 border border-black/10 bg-white p-2 shadow-lg">
            <div className="flex h-24 items-center justify-center border border-black/10 bg-[#f7f6f3]">
              <svg viewBox="0 0 64 64" className="h-16 w-16 text-black/30" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="32" cy="32" r="28" />
                <circle cx="32" cy="32" r="4" />
                <path d="M32 8v8M32 48v8M8 32h8M48 32h8M14 14l6 6M44 44l6 6M50 14l-6 6M20 44l-6 6" />
              </svg>
            </div>
            <p className="mt-1.5 text-center text-[0.55rem] uppercase tracking-[0.16em] text-black/45">
              Movement Detail
            </p>
          </div>

          {/* Polaroid product shot */}
          <div className="absolute right-4 top-2 w-36 rotate-6 border border-black/10 bg-white p-2 shadow-lg">
            <div className="h-28 overflow-hidden bg-[#e9e7e1]">
              <img src={heroDetail} alt="Watch dial detail" className="h-full w-full object-cover grayscale-[0.1]" />
            </div>
            <p className="mt-1.5 text-center text-[0.55rem] uppercase tracking-[0.16em] text-black/45">
              Dial Close-up
            </p>
          </div>

          {/* Texture / moon detail card */}
          <div className="absolute bottom-4 left-10 w-32 rotate-2 border border-black/10 bg-white p-2 shadow-lg">
            <div className="flex h-20 items-center justify-center bg-[radial-gradient(circle_at_40%_35%,#d9d7d1,#8b8a85_75%)]">
              <span className="h-8 w-8 rounded-full bg-[#c9c7c1] shadow-inner" />
            </div>
            <p className="mt-1.5 text-center text-[0.55rem] uppercase tracking-[0.16em] text-black/45">
              Lunar Texture
            </p>
          </div>

          {/* Small archival stamp */}
          <div className="absolute bottom-0 right-6 flex h-20 w-20 -rotate-12 items-center justify-center rounded-sm border border-black/25 bg-transparent">
            <span className="text-[0.5rem] font-semibold uppercase tracking-[0.14em] text-black/40">
              No. 0042
            </span>
          </div>
        </motion.div>

        {/* Right: featured watch */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative order-3 flex h-full min-h-[24rem] items-center justify-center pr-0 lg:min-h-0 lg:pr-6"
        >
          <div className="absolute h-64 w-64 rounded-full bg-white/70 blur-3xl sm:h-80 sm:w-80" aria-hidden="true" />
          <img
            src={watch}
            alt="XEROXII luxury steel chronograph watch"
            className="relative z-10 max-h-[62svh] w-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.18)] sm:max-h-[68svh]"
          />
        </motion.div>
      </div>

      {/* Vertical pagination */}
      <div className="pointer-events-none absolute right-3 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 sm:flex lg:right-6">
        {PAGES.map((page, index) => (
          <span
            key={page}
            className={`pointer-events-auto h-6 w-px cursor-pointer transition-all duration-300 ${
              index === 0 ? "h-8 bg-black/70" : "bg-black/25 hover:bg-black/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
