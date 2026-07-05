import { motion } from "framer-motion";
import watch from "../assets/watch.jpg";

const reviews = [
  { name: "Lina V.", quote: "Every detail feels deliberate, timeless, and quietly exceptional." },
  { name: "Marcus R.", quote: "The finish, weight, and comfort are unlike anything I have worn before." },
];

export default function BagsBanner() {
  return (
    <motion.section id="reviews" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.85, ease: "easeOut" }} className="grid gap-8 rounded-[2.5rem] border border-white/10 bg-black/70 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.38)] sm:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.42em] text-zinc-400">Customer reviews</p>
        <h2 className="section-heading text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
          Trusted by collectors who expect more.
        </h2>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.name} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
              <p className="text-base leading-8 text-zinc-300">“{review.quote}”</p>
              <p className="mt-3 text-sm uppercase tracking-[0.3em] text-zinc-500">{review.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/90 shadow-[0_20px_60px_rgba(0,0,0,0.24)]">
        <img src={watch} alt="XEROXII review showcase" className="h-full w-full object-cover" />
      </div>
    </motion.section>
  );
}
