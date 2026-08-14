import { motion } from "framer-motion";
import watch from "../assets/watch.jpg";

export default function Hero() {
  return (
    <section id="home" className="relative -mt-[1px] min-h-[calc(100svh-4.5rem)] overflow-hidden border-b border-black/10 bg-[#e7e6e3] text-black">
      <div className="page-shell relative grid min-h-[calc(100svh-4.5rem)] items-center gap-4 py-10 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:py-20">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.75, ease: "easeOut" }} className="relative z-10 max-w-xl self-end pb-8 lg:self-center lg:pb-0">
          <p className="eyebrow text-black/55">Iconic since 2026</p>
          <h1 className="mt-5 max-w-[13ch] text-5xl font-light uppercase leading-[0.94] tracking-[0.08em] text-black sm:text-6xl lg:text-7xl">
            XEROXII<br />
            CHRONOGRAPH
          </h1>
          <p className="mt-5 max-w-sm text-sm uppercase leading-7 tracking-[0.12em] text-black/65 sm:text-base">
            Precision in motion. Designed for collectors who value presence.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#collections" className="inline-flex min-h-12 items-center justify-center border border-black/35 px-6 text-xs font-semibold uppercase tracking-[0.18em] text-black transition hover:bg-black hover:text-white">Discover the watch</a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: "easeOut" }} className="relative flex h-full min-h-[26rem] items-center justify-center lg:min-h-0">
          <div className="absolute right-[12%] top-[15%] h-64 w-64 rounded-full bg-white/40 blur-3xl sm:h-96 sm:w-96" />
          <img src={watch} alt="Luxury XEROXII watch" className="relative z-10 max-h-[72svh] w-full max-w-2xl object-contain contrast-110 grayscale-[0.12] drop-shadow-[0_28px_30px_rgba(0,0,0,0.2)]" />
        </motion.div>
      </div>
    </section>
  );
}
