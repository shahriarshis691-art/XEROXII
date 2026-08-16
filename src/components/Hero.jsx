import { motion } from "framer-motion";

const HONEYCOMB_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23222222' fill-opacity='0.35'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex w-full flex-col items-center overflow-hidden border-b border-white/10 bg-[#0f0f0f] text-white"
    >
      {/* Honeycomb mesh grill background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: HONEYCOMB_SVG,
          backgroundRepeat: "repeat",
          backgroundSize: "28px 49px",
        }}
      />

      {/* Deep charcoal-black to very-dark-grey gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#141414]"
      />

      {/* Soft light aura / cinematic warm edge lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(180,140,100,0.1),rgba(0,0,0,0)_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(200,170,120,0.06),rgba(0,0,0,0)_50%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(200,170,120,0.06),rgba(0,0,0,0)_50%)]"
      />

      {/* Hero content — centered vertical composition */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center px-6 py-12 lg:py-16">
        {/* Top sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/90"
        >
          Markdown on Sophisticated Ladies&apos; Timepieces
        </motion.p>

        {/* Centered model with watch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative mx-auto mt-8 h-[45vh] w-full max-w-md lg:h-[55vh] lg:max-w-lg"
        >
          <div className="relative h-full w-full">
            {/* Model placeholder — replace with real photograph */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 240 360"
                className="h-full w-full drop-shadow-2xl"
                style={{ filter: "drop-shadow(0 0 40px rgba(180,140,100,0.25))" }}
              >
                <defs>
                  <linearGradient id="skin" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#d4a574" />
                    <stop offset="50%" stopColor="#c49a6c" />
                    <stop offset="100%" stopColor="#a67c52" />
                  </linearGradient>
                  <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffd700" />
                    <stop offset="30%" stopColor="#daa520" />
                    <stop offset="60%" stopColor="#b8860b" />
                    <stop offset="100%" stopColor="#ffd700" />
                  </linearGradient>
                  <linearGradient id="silver" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#e8e8e8" />
                    <stop offset="50%" stopColor="#c0c0c0" />
                    <stop offset="100%" stopColor="#a0a0a0" />
                  </linearGradient>
                  <linearGradient id="hair" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2a1810" />
                    <stop offset="40%" stopColor="#1f120b" />
                    <stop offset="100%" stopColor="#0d0805" />
                  </linearGradient>
                  <linearGradient id="lips" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#c41e3a" />
                    <stop offset="100%" stopColor="#8b0000" />
                  </linearGradient>
                  <linearGradient id="gown" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#1a1a1a" />
                    <stop offset="100%" stopColor="#0a0a0a" />
                  </linearGradient>
                </defs>

                {/* Hair */}
                <ellipse cx="120" cy="80" rx="60" ry="65" fill="url(#hair)" />
                <path
                  d="M60 70 Q40 160 60 240 Q80 220 95 200 Q85 130 80 80 Z"
                  fill="url(#hair)"
                />
                <path
                  d="M180 70 Q200 160 180 240 Q160 220 145 200 Q155 130 160 80 Z"
                  fill="url(#hair)"
                />

                {/* Face */}
                <ellipse cx="120" cy="85" rx="40" ry="48" fill="url(#skin)" />

                {/* Red lips */}
                <ellipse cx="120" cy="105" rx="13" ry="6" fill="url(#lips)" />

                {/* Eyes — looking directly at camera */}
                <ellipse cx="105" cy="78" rx="7" ry="4" fill="#1a1a1a" />
                <ellipse cx="135" cy="78" rx="7" ry="4" fill="#1a1a1a" />
                <circle cx="105" cy="78" r="1.5" fill="white" />
                <circle cx="135" cy="78" r="1.5" fill="white" />

                {/* Eyebrows */}
                <path
                  d="M95 70 Q105 66 115 69"
                  stroke="#2a1810"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M125 69 Q135 66 145 70"
                  stroke="#2a1810"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Nose */}
                <path
                  d="M120 83 L118 95 Q120 99 122 95 Z"
                  fill="#b8956a"
                  opacity="0.5"
                />

                {/* Neck */}
                <path
                  d="M100 130 L100 160 Q120 175 140 160 L140 130"
                  fill="url(#skin)"
                />

                {/* Black gown / shoulders */}
                <path
                  d="M60 180 Q60 240 80 360 L160 360 Q180 240 180 180 Q140 200 120 200 Q100 200 60 180 Z"
                  fill="url(#gown)"
                />

                {/* Hand near shoulder with square-faced cocktail watch */}
                <path
                  d="M140 160 Q160 150 175 140 Q180 135 178 128 Q175 122 168 125 Q158 130 145 140"
                  fill="url(#skin)"
                />
                <circle cx="172" cy="120" r="12" fill="url(#skin)" />

                {/* Square-faced cocktail watch */}
                <g transform="translate(172, 115)">
                  {/* Watch band */}
                  <rect x="-5" y="-8" width="10" height="16" rx="2" fill="url(#gold)" />
                  {/* Watch case — square */}
                  <rect x="-12" y="-14" width="24" height="24" rx="2" fill="url(#silver)" />
                  {/* Watch face */}
                  <rect x="-9" y="-11" width="18" height="18" rx="1" fill="#0a0a0a" />
                  {/* Watch markers */}
                  <circle cx="0" cy="-6" r="0.8" fill="white" />
                  <circle cx="5" cy="-2" r="0.8" fill="white" />
                  <circle cx="5" cy="3" r="0.8" fill="white" />
                  <circle cx="0" cy="6" r="0.8" fill="white" />
                  <circle cx="-5" cy="3" r="0.8" fill="white" />
                  <circle cx="-5" cy="-2" r="0.8" fill="white" />
                  {/* Watch hands */}
                  <line x1="0" y1="0" x2="0" y2="-4" stroke="white" strokeWidth="0.8" />
                  <line x1="0" y1="0" x2="3" y2="-1" stroke="white" strokeWidth="0.6" />
                  <circle cx="0" cy="0" r="1" fill="white" />
                </g>

                {/* Soft studio lighting overlay */}
                <ellipse cx="120" cy="150" rx="100" ry="120" fill="url(#gown)" opacity="0.1" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Main headline — centered below model */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-center text-[clamp(1.75rem,4vw,3.5rem)] font-bold uppercase leading-[1] tracking-tight text-white"
        >
          Explore
          <br />
          Deals!
        </motion.h1>

        {/* CTA Button — centered */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-6"
        >
          <button className="inline-flex min-h-12 items-center justify-center bg-white px-12 py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-black hover:text-white">
            Shop Now
          </button>
        </motion.div>

        {/* Spacer to push logo to bottom */}
        <div className="flex-grow" />

        {/* Bottom center logo */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-auto flex items-center gap-3 pb-4"
        >
          {/* Detailed metallic four-pointed star logo on metallic circle */}
          <svg
            width="44"
            height="44"
            viewBox="0 0 44 44"
            className="drop-shadow-lg"
            style={{ filter: "drop-shadow(0 0 10px rgba(180,160,140,0.5))" }}
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
            {/* Metallic circle */}
            <circle cx="22" cy="22" r="20" fill="none" stroke="url(#chrome)" strokeWidth="2" />
            <circle cx="22" cy="22" r="16" fill="none" stroke="url(#chrome)" strokeWidth="0.75" opacity="0.7" />
            {/* Four-pointed star */}
            <path
              d="M22 4 L24.5 18 L38 20 L24.5 22 L22 36 L19.5 22 L6 20 L19.5 18 Z"
              fill="url(#chrome)"
            />
            <circle cx="22" cy="22" r="2" fill="url(#chrome)" opacity="0.8" />
          </svg>
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-white">
            XEROXII
          </span>
        </motion.div>
      </div>
    </section>
  );
}
