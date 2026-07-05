import { motion } from "framer-motion";
import { FiStar, FiCamera } from "react-icons/fi";
import watch from "../assets/watch.jpg";

const breakdown = [
  { label: "Design", value: 97 },
  { label: "Comfort", value: 95 },
  { label: "Craftsmanship", value: 99 },
  { label: "Value", value: 92 },
];

const reviews = [
  {
    name: "Maia T.",
    title: "Verified Purchase",
    quote: "The finish is exquisite and beautifully balanced. It feels more architectural than ornamental.",
  },
  {
    name: "Dorian K.",
    title: "Collector",
    quote: "Elegant without trying too hard. The dial and case proportions feel perfect.",
  },
];

export default function ReviewSection() {
  return (
    <section className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_28px_90px_rgba(0,0,0,0.24)] sm:p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
        <div className="max-w-xl">
          <p className="text-sm uppercase tracking-[0.4em] text-zinc-400">Customer reviews</p>
          <h2 className="section-heading mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
            Loved by collectors who value restraint.
          </h2>
          <p className="mt-4 text-base leading-8 text-zinc-400">
            Every piece is reviewed for fit, finish, and lasting presence by owners who appreciate architecture in motion.
          </p>
        </div>

        <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
          <div className="flex items-end gap-3">
            <span className="text-5xl font-semibold text-white">4.9</span>
            <div className="flex items-center gap-1 text-amber-300">
              {Array.from({ length: 5 }).map((_, index) => (
                <FiStar key={index} className="h-4 w-4" />
              ))}
            </div>
          </div>
          <p className="mt-3 text-sm text-zinc-400">Based on 218 verified reviews</p>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          {breakdown.map((item) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between text-sm text-zinc-400">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div className="h-2 rounded-full bg-white" style={{ width: `${item.value}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          {reviews.map((review, index) => (
            <motion.article key={review.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: index * 0.08 }} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">{review.name}</p>
                  <p className="text-sm text-zinc-400">{review.title}</p>
                </div>
                <div className="flex items-center gap-1 text-amber-300">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <FiStar key={starIndex} className="h-4 w-4" />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-zinc-300">“{review.quote}”</p>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300">
          <FiCamera className="h-4 w-4" /> User photos available on request
        </div>
        <img src={watch} alt="Review gallery" className="h-16 w-16 rounded-2xl object-cover" loading="lazy" />
        <img src={watch} alt="Review gallery" className="h-16 w-16 rounded-2xl object-cover" loading="lazy" />
      </div>
    </section>
  );
}
