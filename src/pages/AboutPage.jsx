import { motion } from "framer-motion";
import { FiAward, FiGlobe, FiShield, FiUsers } from "react-icons/fi";
import Footer from "../components/Footer";

const pillars = [
  { title: "Craftsmanship", description: "Each piece is developed with hand-finished precision and architectural balance.", icon: FiAward },
  { title: "Luxury Materials", description: "Platinum, 18k gold, and rare stones selected with exacting standards.", icon: FiShield },
  { title: "Quality Promise", description: "We uphold uncompromising standards from design to private delivery.", icon: FiShield },
  { title: "Sustainability", description: "Conscientious sourcing, refined packaging, and long-lasting pieces.", icon: FiGlobe },
];

const timeline = [
  { year: "2018", title: "Founding", text: "XEROXII began as a private atelier focused on sculptural luxury." },
  { year: "2021", title: "Global Launch", text: "We expanded across private collectors and curated retail partnerships." },
  { year: "2024", title: "Signature Collection", text: "Our latest watch and jewellery lines elevated the maison to a global standard." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-stone-100">
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-10 lg:py-16">
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.4em] text-zinc-400">About XEROXII</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Luxury design shaped by timeless restraint and modern precision.</h1>
            <p className="mt-5 text-lg leading-8 text-zinc-300">We design watches, jewellery, and gift objects that feel understated, architectural, and enduring.</p>
          </div>
        </motion.section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Brand story</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">A maison built for collectors, connoisseurs, and modern romantics.</h2>
            <p className="mt-4 text-base leading-8 text-zinc-300">XEROXII exists at the meeting point between sculpture, timekeeping, and private luxury. Every object is built to feel deliberate, balanced, and quietly iconic.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Our mission</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">To create lasting pieces that embody clarity, service, and cultural relevance.</h2>
            <p className="mt-4 text-base leading-8 text-zinc-300">We believe true luxury should feel calm, personal, and exceptionally made — from the first sketch to the final presentation.</p>
          </motion.div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.article key={pillar.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} className="rounded-[1.8rem] border border-white/10 bg-zinc-950/80 p-5">
                <div className="rounded-full border border-white/10 bg-white/5 p-3 text-white w-fit"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-4 text-xl font-semibold text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-300">{pillar.description}</p>
              </motion.article>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Why XEROXII</p>
            <div className="mt-6 space-y-4">
              {[
                "Private concierge support for every client",
                "Premium materials sourced with meticulous care",
                "Limited production with refined finishing",
                "Design language that feels architectural and calm",
              ].map((item) => (
                <div key={item} className="rounded-[1.3rem] border border-white/10 bg-white/5 p-4 text-sm text-zinc-200">{item}</div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Timeline</p>
            <div className="mt-6 space-y-4">
              {timeline.map((item) => (
                <div key={item.year} className="rounded-[1.3rem] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-400">{item.year}</p>
                    <p className="text-base font-semibold text-white">{item.title}</p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Meet the team</p>
              <h2 className="mt-3 text-3xl font-semibold text-white">A close-knit team of designers, artisans, and client advisors.</h2>
              <p className="mt-4 text-base leading-8 text-zinc-300">Our studio combines contemporary luxury strategy with handcrafted precision and discreet service.</p>
            </div>
            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
              <div className="flex items-center gap-3 text-zinc-300"><FiUsers className="h-5 w-5" /><span>Private client care, atelier development, and global delivery support.</span></div>
            </div>
          </div>
        </section>

        <section className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
          <div className="grid gap-6 md:grid-cols-4">
            {[
              ["25+", "Years of collective watchmaking experience"],
              ["98%", "Client satisfaction rate"],
              ["24/7", "Private concierge support"],
              ["100%", "Premium material certification"],
            ].map(([value, label]) => (
              <div key={value} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4 text-center">
                <p className="text-3xl font-semibold text-white">{value}</p>
                <p className="mt-2 text-sm leading-7 text-zinc-400">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
          <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Luxury video section</p>
          <div className="mt-6 flex min-h-[260px] items-center justify-center rounded-[1.8rem] border border-dashed border-white/15 bg-white/5 text-zinc-400">Private atelier film preview coming soon.</div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
