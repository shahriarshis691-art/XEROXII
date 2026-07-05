import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`max-w-2xl ${alignment}`}
    >
      <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">{eyebrow}</p>
      <h2 className="section-heading mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-4 text-base leading-8 text-zinc-400">{description}</p> : null}
    </motion.div>
  );
}
