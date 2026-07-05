import { motion } from "framer-motion";
import { FiArrowRight, FiWatch } from "react-icons/fi";
import watch from "../assets/watch.jpg";

const collections = [
  {
    title: "Chronograph",
    subtitle: "Precision in motion",
    description: "A polished steel case with a moonphase dial for the modern collector.",
    image: watch,
  },
  {
    title: "GMT",
    subtitle: "Transatlantic elegance",
    description: "Dual-time functionality wrapped in a platinum finish and timeless silhouette.",
    image: watch,
  },
  {
    title: "Moonphase",
    subtitle: "Luminous heritage",
    description: "An architectural dial with hand-finished indices and sapphire crystal.",
    image: watch,
  },
];

export default function Categories() {
  return (
    <section id="collections" className="space-y-10 py-4 sm:py-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.42em] text-zinc-400">Luxury collections</p>
          <h2 className="section-heading mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
            Designed for collectors, built to endure.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-8 text-zinc-400 sm:text-base">
          Every piece is conceived as a modern heirloom, merging quiet luxury with extraordinary precision.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        {collections.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.01 }}
            className="group overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/80 shadow-[0_24px_80px_rgba(0,0,0,0.28)]"
          >
            <div className="relative h-80 overflow-hidden">
              <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm">
                <FiWatch className="h-5 w-5" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-sm uppercase tracking-[0.32em] text-zinc-300">{item.subtitle}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{item.title}</h3>
              </div>
            </div>
            <div className="space-y-4 p-6">
              <p className="text-sm leading-7 text-zinc-400">{item.description}</p>
              <a href="#story" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-zinc-200 transition group-hover:text-white">
                Discover <FiArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}