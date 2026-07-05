import { motion } from "framer-motion";
import { FiBox, FiShield, FiRefreshCw, FiCreditCard, FiCheckCircle } from "react-icons/fi";

const cards = [
  { icon: <FiBox className="h-5 w-5" />, title: "Free shipping", text: "Complimentary express delivery for all orders over $2,000." },
  { icon: <FiCreditCard className="h-5 w-5" />, title: "Secure payment", text: "Encrypted checkout with flexible financing and trusted gateways." },
  { icon: <FiRefreshCw className="h-5 w-5" />, title: "Easy returns", text: "30-day returns with concierge support and premium packaging included." },
  { icon: <FiShield className="h-5 w-5" />, title: "Official warranty", text: "Every XEROXII watch comes with an official 2-year manufacturer warranty." },
];

export default function DeliveryInfo() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => (
        <motion.article key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45, delay: index * 0.08 }} className="rounded-[1.7rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_16px_60px_rgba(0,0,0,0.22)]">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white">
            {card.icon}
          </div>
          <h3 className="text-lg font-semibold text-white">{card.title}</h3>
          <p className="mt-3 text-sm leading-7 text-zinc-400">{card.text}</p>
        </motion.article>
      ))}
    </section>
  );
}
