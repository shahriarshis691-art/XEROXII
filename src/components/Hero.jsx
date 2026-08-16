import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HORIZON_BG = "/images/hero/cinematic-horizon.png";
const HERO_WATCH =
  "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1400&fit=crop";

function GearOverlay() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 400"
      className="pointer-events-none absolute left-[8%] top-[18%] h-[38%] w-[38%] opacity-[0.18] mix-blend-screen sm:left-[12%] sm:top-[16%] sm:h-[42%] sm:w-[42%]"
    >
      <defs>
        <linearGradient id="gearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8a6d2f" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="200" r="120" fill="none" stroke="url(#gearGrad)" strokeWidth="3" />
      <circle cx="200" cy="200" r="88" fill="none" stroke="url(#gearGrad)" strokeWidth="2" opacity="0.7" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <rect
          key={deg}
          x="192"
          y="70"
          width="16"
          height="36"
          rx="4"
          fill="url(#gearGrad)"
          transform={`rotate(${deg} 200 200)`}
          opacity="0.85"
        />
      ))}
      <circle cx="200" cy="200" r="28" fill="none" stroke="url(#gearGrad)" strokeWidth="4" />
      <text x="200" y="196" textAnchor="middle" fill="url(#gearGrad)" fontSize="11" fontWeight="700" letterSpacing="2">
        XEROXII
      </text>
      <text x="200" y="212" textAnchor="middle" fill="url(#gearGrad)" fontSize="8" letterSpacing="1.5">
        AUTOMATIC
      </text>
    </svg>
  );
}

function XeroxiiEmblem({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="emblemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5f5f5" />
          <stop offset="50%" stopColor="#c9c9c9" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      <polygon points="24,4 44,24 24,44 4,24" fill="none" stroke="url(#emblemGrad)" strokeWidth="1.5" />
      <polygon points="24,12 36,24 24,36 12,24" fill="url(#emblemGrad)" opacity="0.9" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden border-b border-white/10 bg-[#0a0a0a] text-white"
    >
      {/* Cinematic horizon backdrop */}
      <div className="absolute inset-0">
        <img
          src={HORIZON_BG}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80";
          }}
        />
      </div>

      {/* Ambient vignette & depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.35)_55%,rgba(0,0,0,0.82)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-black/55"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"
      />

      <GearOverlay />

      {/* Hero watch — right half, floating elevation */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
        className="pointer-events-none absolute right-[-12%] top-[2%] z-20 h-[36%] w-[56%] sm:right-[2%] sm:top-[6%] sm:h-[72%] sm:w-[48%] lg:right-[4%] lg:top-[4%] lg:h-[88%] lg:w-[42%]"
      >
        <motion.img
          src={HERO_WATCH}
          alt="XEROXII XX-200 Apex Automatic Timepiece"
          className="h-full w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.65)]"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          onError={(e) => {
            e.currentTarget.src =
              "https://images.pexels.com/photos/2783873/pexels-photo-2783873.jpeg?auto=compress&cs=tinysrgb&w=1200";
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-[15%] -z-10 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.22),transparent_70%)] blur-2xl"
        />
      </motion.div>

      {/* Content shell */}
      <div className="relative z-30 mx-auto flex min-h-[560px] w-full max-w-[1400px] flex-col justify-between px-5 py-8 sm:min-h-[620px] sm:px-8 sm:py-10 lg:min-h-0 lg:aspect-[21/9] lg:px-12 lg:py-12">
        {/* Top-left collection badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-[min(100%,520px)]"
        >
          <p className="text-[clamp(1.75rem,8vw,4.5rem)] font-black uppercase leading-[0.9] tracking-[0.04em] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] sm:tracking-[0.06em]">
            Chrono
            <br />
            Force
          </p>
          <p className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/70 sm:text-xs">
            X-Series Performance Line
          </p>
        </motion.div>

        {/* Bottom row */}
        <div className="mt-auto grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-end lg:gap-10">
          {/* Bottom-left heritage badges & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="space-y-4"
          >
            <div className="inline-flex flex-wrap items-stretch gap-0 border border-white/25 bg-black/45 backdrop-blur-sm">
              <div className="flex min-w-0 flex-1 flex-col justify-center border-r border-white/20 px-4 py-3 sm:min-w-[140px] sm:flex-none sm:px-5">
                <span className="text-[0.55rem] font-bold uppercase tracking-[0.22em] text-white/90 sm:text-[0.6rem]">
                  Official
                </span>
                <span className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white sm:text-sm">
                  Heritage
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center px-4 py-3 sm:min-w-[140px] sm:flex-none sm:px-5">
                <span className="text-[0.55rem] font-bold uppercase tracking-[0.22em] text-[#d4af37] sm:text-[0.6rem]">
                  XEROXII
                </span>
                <span className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-white sm:text-sm">
                  Precision
                </span>
              </div>
            </div>

            <p className="max-w-md text-[0.6rem] leading-relaxed tracking-[0.08em] text-white/55 sm:text-[0.65rem]">
              XEROXII TIMEPIECE CO., LTD. | Engineered for Precision
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/search?q=automatic"
                className="inline-flex min-h-11 w-full items-center justify-center border border-white bg-white px-6 py-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-black transition hover:bg-transparent hover:text-white sm:w-auto sm:px-8 sm:text-xs"
              >
                Discover Collection
              </Link>
              <Link
                to="/brand/seiko"
                className="inline-flex min-h-11 w-full items-center justify-center border border-white/35 bg-black/40 px-6 py-3 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:border-white hover:bg-white hover:text-black sm:w-auto sm:px-8 sm:text-xs"
              >
                Pre-Order
              </Link>
            </div>
          </motion.div>

          {/* Bottom-right brand focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-col items-start lg:items-end lg:text-right"
          >
            <div className="mb-3 flex items-center gap-3 lg:flex-row-reverse">
              <XeroxiiEmblem className="h-9 w-9 sm:h-10 sm:w-10" />
              <span className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-white/60">
                Flagship Series
              </span>
            </div>
            <h1 className="break-words text-[clamp(1.75rem,8vw,3.25rem)] font-bold uppercase tracking-[0.12em] text-white sm:tracking-[0.18em]">
              XEROXII
            </h1>
            <p className="mt-1 text-sm font-light uppercase tracking-[0.28em] text-white/80 sm:text-base sm:tracking-[0.35em]">
              Automatic
            </p>
            <p className="mt-3 break-words text-[clamp(1.35rem,6vw,2.25rem)] font-black uppercase leading-tight tracking-[0.08em] text-white sm:tracking-[0.12em]">
              XX-200 Apex
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
