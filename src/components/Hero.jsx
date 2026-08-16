import { motion } from "framer-motion";

export default function Hero() {
  const countdown = {
    days: 12,
    hours: 8,
    minutes: 45,
    seconds: 30,
  };

  const formatNum = (n) => String(n).padStart(2, "0");

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden border-b border-white/10 bg-[#0a0a0a] text-white"
    >
      {/* Premium luxury women's jewellery background image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hero-parallax-bg"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1279365/pexels-photo-1279365.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&fit=crop')`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
        }}
      />

      {/* Dark overlay for readability */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/75"
      />

      {/* Premium metallic accent lights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(215,175,110,0.15),rgba(0,0,0,0)_50%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_60%,rgba(180,140,100,0.1),rgba(0,0,0,0)_40%)]"
      />

      {/* Hero content container — 21:9 aspect ratio */}
      <div className="relative w-full" style={{ aspectRatio: "21 / 9" }}>
        {/* ===== LEFT SIDE: Model ===== */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute left-0 top-0 h-full w-[38%] overflow-hidden"
        >
          {/* Placeholder for model image — replace with actual generated image */}
          <div className="relative h-full w-full bg-gradient-to-br from-[#1a1a1a] via-[#0d0d0d] to-[#000000]">
            {/* Dark moody studio lighting overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Luxury jewellery product image display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src="https://images.pexels.com/photos/1709857/pexels-photo-1709857.jpeg?auto=compress&cs=tinysrgb&w=800&h=900&fit=crop"
                alt="Luxury Women's Jewellery"
                className="h-full w-full object-cover drop-shadow-2xl"
                style={{ filter: "drop-shadow(0 0 30px rgba(180,140,100,0.4))" }}
              />
            </div>

            {/* Text overlay on model side */}
            <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-12">
              {/* Top left sub-headline */}
              <motion.p
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/90"
              >
                Markdown on Sophisticated Ladies&apos; Timepieces
              </motion.p>

              {/* Main headline */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-[clamp(1.75rem,3.5vw,3.5rem)] font-bold uppercase leading-[0.95] tracking-tight text-white"
                >
                  Explore
                  <br />
                  Deals!
                </motion.h1>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  <button className="inline-flex min-h-12 items-center justify-center bg-white px-10 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-black hover:text-white">
                    Shop Now
                  </button>
                </motion.div>
              </div>

              {/* Bottom left brand logo */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="flex items-center gap-3"
              >
                {/* Chrome emblem SVG */}
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  className="drop-shadow-lg"
                  style={{ filter: "drop-shadow(0 0 8px rgba(180,160,140,0.5))" }}
                >
                  <defs>
                    <linearGradient id="chrome" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#e8e8e8" />
                      <stop offset="25%" stopColor="#ffffff" />
                      <stop offset="50%" stopColor="#c0c0c0" />
                      <stop offset="75%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#d0d0d0" />
                    </linearGradient>
                  </defs>
                  <circle cx="20" cy="20" r="18" fill="none" stroke="url(#chrome)" strokeWidth="2" />
                  <circle cx="20" cy="20" r="14" fill="none" stroke="url(#chrome)" strokeWidth="1" opacity="0.7" />
                  <path
                    d="M20 6 L22 16 L32 18 L22 20 L20 30 L18 20 L8 18 L18 16 Z"
                    fill="url(#chrome)"
                  />
                </svg>
                <span className="text-sm font-bold uppercase tracking-[0.25em] text-white">
                  XEROXII
                </span>
              </motion.div>
            </div>

            {/* Left edge warm metallic rim */}
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-[#b8a080]/40 to-transparent"
            />
          </div>
        </motion.div>

        {/* ===== CENTER TO RIGHT: Watch Showcase ===== */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="absolute right-0 top-0 h-full w-[62%]"
        >
          {/* Showcase background with premium gradient */}
          <div className="relative h-full w-full bg-gradient-to-l from-[#0d0d0d] via-[#1a1a1a] to-transparent">
            {/* Premium watch spotlight lighting */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(215,175,110,0.15),rgba(0,0,0,0)_70%)]"
            />

            {/* Luxury chrome reflection */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03)_0%,transparent_50%)]"
            />

            {/* Watch showcase line-up */}
            <div className="absolute inset-0 flex items-center justify-center gap-4 px-8 lg:px-16">
              {[1, 2, 3, 4, 5].map((watch, index) => (
                <motion.div
                  key={watch}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 + index * 0.1 }}
                  className="relative flex h-[60%] w-[16%] flex-col items-center justify-end"
                >
                  {/* Watch image placeholder */}
                  <div className="relative h-full w-full">
                    {/* Abstract watch representation */}
                    <svg
                      viewBox="0 0 120 160"
                      className="h-full w-full drop-shadow-2xl"
                      style={{ filter: "drop-shadow(0 0 25px rgba(180,160,140,0.25))" }}
                    >
                      <defs>
                        <linearGradient id={`watchBody${watch}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#c0c0c0" />
                          <stop offset="50%" stopColor="#e8e8e8" />
                          <stop offset="100%" stopColor="#a0a0a0" />
                        </linearGradient>
                        <linearGradient id={`strap${watch}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#3a3a3a" />
                          <stop offset="50%" stopColor="#4a4a4a" />
                          <stop offset="100%" stopColor="#2a2a2a" />
                        </linearGradient>
                      </defs>

                      {/* Watch strap top */}
                      <rect x="40" y="0" width="40" height="50" rx="4" fill="url(#strap${watch})" />
                      {/* Watch case */}
                      <rect x="25" y="45" width="70" height="70" rx="10" fill="url(#watchBody${watch})" />
                      {/* Watch face */}
                      <rect x="32" y="52" width="56" height="56" rx="6" fill="#0a0a0a" />
                      {/* Watch markers */}
                      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
                        const rad = (angle * Math.PI) / 180;
                        const x = 60 + 22 * Math.sin(rad);
                        const y = 80 - 22 * Math.cos(rad);
                        return (
                          <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r={angle % 90 === 0 ? 1.2 : 0.6}
                            fill="white"
                          />
                        );
                      })}
                      {/* Watch hands */}
                      <line x1="60" y1="80" x2="60" y2="62" stroke="white" strokeWidth="1.5" />
                      <line x1="60" y1="80" x2="72" y2="76" stroke="white" strokeWidth="1" />
                      <circle cx="60" cy="80" r="2" fill="white" />

                      {/* Unique features per watch */}
                      {watch === 1 && (
                        <circle cx="60" cy="80" r="18" fill="none" stroke="#ffd700" strokeWidth="0.5" opacity="0.5" />
                      )}
                      {watch === 2 && (
                        <rect x="42" y="50" width="36" height="60" rx="4" fill="none" stroke="#c0c0c0" strokeWidth="0.5" />
                      )}
                      {watch === 3 && (
                        <circle cx="60" cy="80" r="16" fill="none" stroke="#50c878" strokeWidth="1.5" opacity="0.7" />
                      )}
                      {watch === 4 && (
                        <>
                          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                            const rad = (angle * Math.PI) / 180;
                            const x = 60 + 18 * Math.sin(rad);
                            const y = 80 - 18 * Math.cos(rad);
                            return (
                              <circle
                                key={i}
                                cx={x}
                                cy={y}
                                r="1.5"
                                fill="white"
                                opacity="0.9"
                              />
                            );
                          })}
                        </>
                      )}
                      {watch === 5 && (
                        <>
                          <pattern id={`texture${watch}`} patternUnits="userSpaceOnUse" width="4" height="4">
                            <circle cx="2" cy="2" r="0.8" fill="white" opacity="0.3" />
                          </pattern>
                          <rect x="32" y="52" width="56" height="56" rx="6" fill={`url(#texture${watch})`} opacity="0.5" />
                        </>
                      )}

                      {/* Watch strap bottom */}
                      <rect x="40" y="110" width="40" height="50" rx="4" fill="url(#strap${watch})" />
                    </svg>
                  </div>

                  {/* Watch label */}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    className="mt-2 text-[0.6rem] uppercase tracking-[0.15em] text-white/60"
                  >
                    {watch === 1 && "Gold"}
                    {watch === 2 && "Steel"}
                    {watch === 3 && "Emerald"}
                    {watch === 4 && "Diamond"}
                    {watch === 5 && "Designer"}
                  </motion.span>
                </motion.div>
              ))}
            </div>

            {/* Countdown Timer Overlay across the watch lineup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3 lg:gap-4"
            >
              {[
                { value: formatNum(countdown.days), label: "Days" },
                { value: formatNum(countdown.hours), label: "Hours" },
                { value: formatNum(countdown.minutes), label: "Min" },
                { value: formatNum(countdown.seconds), label: "Sec" },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.08 }}
                  className="flex flex-col items-center rounded-xl bg-black/60 px-3 py-2.5 backdrop-blur-sm lg:px-5 lg:py-3.5"
                >
                  <span className="text-lg font-bold text-white lg:text-2xl">
                    {item.value}
                  </span>
                  <span className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-white/70">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Right edge warm metallic rim */}
            <div
              aria-hidden="true"
              className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-[#b8a080]/40 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
