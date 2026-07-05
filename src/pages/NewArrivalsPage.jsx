import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiEye } from "react-icons/fi";
import { products } from "../data/products";
import { jewelleryProducts } from "../data/jewellery";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

const featuredItems = [
  ...products.slice(0, 2),
  ...jewelleryProducts.slice(0, 2),
];

export default function NewArrivalsPage() {
  const { addItem } = useCart();

  return (
    <div className="min-h-screen bg-[#030303] text-stone-100">
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-10 lg:py-16">
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.4em] text-zinc-400">New Arrivals</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">The most anticipated launches of the season.</h1>
            <p className="mt-5 text-lg leading-8 text-zinc-300">Freshly released watches, sculptural jewellery, and collector-ready pieces now available for private viewing.</p>
          </div>
        </motion.section>

        <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Latest Watch Collection</p>
            <div className="mt-6 space-y-4">
              {products.slice(0, 2).map((product) => (
                <div key={product.id} className="flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <img src={product.image} alt={product.title} className="h-24 w-24 rounded-[1.2rem] object-cover" loading="lazy" />
                    <div>
                      <p className="text-base font-semibold text-white">{product.title}</p>
                      <p className="mt-1 text-sm text-zinc-400">{product.subtitle}</p>
                      <p className="mt-2 text-sm text-zinc-500">{product.availability}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="button" className="rounded-full border border-white/10 bg-white/5 p-2 text-white"><FiHeart className="h-4 w-4" /></button>
                    <button type="button" onClick={() => addItem({ id: product.id, title: product.title, price: product.price, image: product.image, category: "Watches" })} className="rounded-full bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-black">Add</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
            <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Latest Jewellery Collection</p>
            <div className="mt-6 space-y-4">
              {jewelleryProducts.slice(0, 2).map((product) => (
                <div key={product.id} className="flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <img src={product.images[0]} alt={product.name} className="h-24 w-24 rounded-[1.2rem] object-cover" loading="lazy" />
                    <div>
                      <p className="text-base font-semibold text-white">{product.name}</p>
                      <p className="mt-1 text-sm text-zinc-400">{product.category}</p>
                      <p className="mt-2 text-sm text-zinc-500">{product.stock}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="button" className="rounded-full border border-white/10 bg-white/5 p-2 text-white"><FiHeart className="h-4 w-4" /></button>
                    <button type="button" onClick={() => addItem({ id: product.id, title: product.name, price: product.price, image: product.images[0], category: product.category })} className="rounded-full bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-black">Add</button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Trending now</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Recently launched pieces</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredItems.map((product, index) => (
              <motion.article key={product.id || product.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="group overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/5">
                <div className="relative overflow-hidden">
                  <img src={product.image || product.images?.[0]} alt={product.title || product.name} className="h-56 w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-zinc-200 backdrop-blur">New</div>
                </div>
                <div className="space-y-4 p-5">
                  <div>
                    <p className="text-sm uppercase tracking-[0.28em] text-zinc-400">{product.subtitle || product.category}</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{product.title || product.name}</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-base font-semibold text-white">${(product.price || 0).toLocaleString()}</p>
                      <p className="text-sm text-zinc-500 line-through">${(product.oldPrice || 0).toLocaleString()}</p>
                    </div>
                    <button type="button" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-sm text-zinc-200"><FiEye className="h-4 w-4" /> Quick view</button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
