import { motion } from "framer-motion";
import { FiAward, FiShield, FiClock, FiStar } from "react-icons/fi";

const featureItems = [
  { icon: <FiAward className="h-6 w-6" />, title: "Swiss chronometry", description: "Certified precision engineering with a 72-hour power reserve." },
  { icon: <FiShield className="h-6 w-6" />, title: "Architectural durability", description: "Brushed steel, hardened sapphire, and sealed craftsmanship." },
  { icon: <FiClock className="h-6 w-6" />, title: "Heritage timing", description: "A refined balance of contemporary form and lasting function." },
  { icon: <FiStar className="h-6 w-6" />, title: "Private finishing", description: "Hand-polished surfaces and bespoke detailing for each edition." },
];

export default function Features() {
  return (
    <section id="craft" className="space-y-10">
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.42em] text-zinc-400">Craft & care</p>
        <h2 className="section-heading mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
          Precision that feels effortless.
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {featureItems.map((item, index) => (
          <motion.article key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }} className="rounded-[1.8rem] border border-white/10 bg-zinc-950/80 p-8 shadow-[0_20px_70px_rgba(0,0,0,0.24)]">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-zinc-400">{item.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
