import { motion } from "framer-motion";
import { FiHeart, FiShoppingBag, FiGift, FiPackage, FiCreditCard } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

const giftCategories = [
  { title: "Gifts For Him", description: "Refined timepieces and sculptural accessories." },
  { title: "Gifts For Her", description: "Signature jewellery and heirloom essentials." },
  { title: "Couple Gifts", description: "Matching pieces for meaningful celebration." },
  { title: "Anniversary Collection", description: "Elegant commemorative releases for lasting milestones." },
];

const giftSets = [
  { title: "Private Atelier Set", price: 3200, badge: "Best Seller" },
  { title: "Silver & Platinum Duo", price: 4800, badge: "Limited" },
  { title: "Wedding Keepsake Box", price: 2600, badge: "New" },
];

export default function GiftsPage() {
  const { addItem } = useCart();

  return (
    <div className="min-h-screen bg-[#030303] text-stone-100">
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-10 lg:py-16">
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.4em] text-zinc-400">Luxury Gift Guide</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Curated gift experiences for every milestone.</h1>
            <p className="mt-5 text-lg leading-8 text-zinc-300">Signature packaging, private delivery, and exquisite objects designed to be treasured.</p>
          </div>
        </motion.section>

        <section className="grid gap-6 lg:grid-cols-2">
          {giftCategories.map((item, index) => (
            <motion.article key={item.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} className="rounded-[2rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">Collection</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-zinc-300">{item.description}</p>
                </div>
                <div className="rounded-full border border-white/10 bg-white/5 p-3 text-white"><FiGift className="h-5 w-5" /></div>
              </div>
            </motion.article>
          ))}
        </section>

        <section className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Premium gift sets</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Luxury packaging and exceptional presentation</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {giftSets.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-zinc-200">{item.badge}</span>
                  <button type="button" className="rounded-full border border-white/10 bg-white/5 p-2 text-white"><FiHeart className="h-4 w-4" /></button>
                </div>
                <div className="mt-6 space-y-4">
                  <p className="text-xl font-semibold text-white">{item.title}</p>
                  <p className="text-base font-semibold text-white">${item.price.toLocaleString()}</p>
                  <button type="button" onClick={() => addItem({ id: 900 + index, title: item.title, price: item.price, image: "/src/assets/hero.png", category: "Gifts" })} className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black"><FiShoppingBag className="h-4 w-4" /> Add to cart</button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Gift packaging preview</p>
            <div className="mt-6 space-y-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center gap-3"><FiPackage className="h-5 w-5 text-zinc-300" /><span className="text-sm text-zinc-300">Signature white box with soft gold ribbon and embossed monogram.</span></div>
              <div className="flex items-center gap-3"><FiCreditCard className="h-5 w-5 text-zinc-300" /><span className="text-sm text-zinc-300">Gift cards available in premium metallic finishes.</span></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Budget filters</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {["Under $2,000", "$2,000 - $5,000", "$5,000+", "Luxury Sets"].map((filter) => (
                <button key={filter} type="button" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:border-white/30">{filter}</button>
              ))}
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
