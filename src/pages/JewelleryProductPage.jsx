import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import { FiHeart, FiShare2, FiCheck, FiMinus, FiPlus, FiTruck, FiCreditCard } from "react-icons/fi";
import { jewelleryProducts } from "../data/jewellery";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

export default function JewelleryProductPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const product = useMemo(() => jewelleryProducts.find((entry) => entry.id === Number(id)) || jewelleryProducts[0], [id]);

  if (!product) {
    return <Navigate to="/jewellery" replace />;
  }

  return (
    <div className="min-h-screen bg-[#030303] text-stone-100">
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10 lg:py-16">
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="space-y-5">
            <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-3 shadow-[0_35px_120px_rgba(0,0,0,0.45)]">
              <img src={product.images[activeImage]} alt={product.name} className="h-[460px] w-full rounded-[1.75rem] object-cover object-center sm:h-[560px]" loading="lazy" />
              <div className="absolute inset-x-0 bottom-0 rounded-b-[1.75rem] bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 sm:p-8">
                <p className="text-sm uppercase tracking-[0.32em] text-zinc-300">{product.category}</p>
                <p className="mt-2 text-xl font-semibold text-white">{product.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((image, index) => (
                <button key={`${image}-${index}`} type="button" onClick={() => setActiveImage(index)} className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border transition ${activeImage === index ? "border-white" : "border-white/10"}`}>
                  <img src={image} alt={`${product.name} view ${index + 1}`} className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-7 rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_35px_120px_rgba(0,0,0,0.35)] sm:p-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm uppercase tracking-[0.4em] text-zinc-400">XEROXII</p>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-emerald-300">{product.stock}</span>
              </div>
              <div>
                <h1 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">{product.name}</h1>
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                  <span className="text-amber-300">★ {product.rating}</span>
                  <span>• {product.category}</span>
                  <span>• {product.materials}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-zinc-400">{product.badge}</span>
                <span className="text-3xl font-semibold text-white">${product.price.toLocaleString()}</span>
                <span className="text-lg text-zinc-500 line-through">${product.oldPrice.toLocaleString()}</span>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-black">{product.discount}</span>
              </div>
              <p className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-zinc-300">{product.description}</p>
              <div className="flex items-center gap-2 rounded-[1.25rem] border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-zinc-300">
                <FiCreditCard className="h-4 w-4" />
                <span>Flexible financing available from $180/month.</span>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Gold Purity</p>
                <p className="mt-2 font-semibold text-white">{product.goldPurity}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Stone Type</p>
                <p className="mt-2 font-semibold text-white">{product.stoneType}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Size</p>
                <p className="mt-2 font-semibold text-white">{product.size}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
                <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">Weight</p>
                <p className="mt-2 font-semibold text-white">{product.weight}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1">
                <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="rounded-full p-2 text-white transition hover:bg-white/10"><FiMinus className="h-4 w-4" /></button>
                <span className="min-w-10 text-center text-base font-semibold text-white">{quantity}</span>
                <button type="button" onClick={() => setQuantity((value) => value + 1)} className="rounded-full p-2 text-white transition hover:bg-white/10"><FiPlus className="h-4 w-4" /></button>
              </div>
              <motion.button whileHover={{ y: -2, scale: 1.01 }} onClick={() => addItem({ id: product.id, title: product.name, price: product.price, image: product.images[0], category: product.category, quantity })} className="flex-1 rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition">Add to cart</motion.button>
              <motion.button whileHover={{ y: -2, scale: 1.01 }} className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10">Buy now</motion.button>
            </div>

            <div className="flex flex-wrap gap-3">
              <button type="button" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 transition hover:bg-white/10"><FiHeart className="h-4 w-4" /> Wishlist</button>
              <button type="button" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 transition hover:bg-white/10"><FiShare2 className="h-4 w-4" /> Share</button>
            </div>

            <div className="grid gap-3 rounded-[1.4rem] border border-white/10 bg-zinc-900/70 p-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 text-sm text-zinc-300"><FiCheck className="h-4 w-4 text-emerald-300" /> Warranty: {product.warranty}</div>
              <div className="flex items-center gap-3 text-sm text-zinc-300"><FiTruck className="h-4 w-4 text-emerald-300" /> {product.delivery}</div>
            </div>
          </div>
        </motion.section>

        <section className="space-y-8 rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Specifications</p>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {[
                  ["Materials", product.materials],
                  ["Gold Purity", product.goldPurity],
                  ["Stone Type", product.stoneType],
                  ["Size", product.size],
                  ["Weight", product.weight],
                  ["Warranty", product.warranty],
                  ["Delivery", product.delivery],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-[1.3rem] border border-white/10 bg-white/5 p-4">
                    <p className="text-sm uppercase tracking-[0.26em] text-zinc-400">{label}</p>
                    <p className="mt-2 text-sm text-zinc-200">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
              <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Reviews</p>
              <p className="mt-4 text-4xl font-semibold text-white">{product.rating}/5</p>
              <p className="mt-3 text-sm leading-7 text-zinc-300">Collector-endorsed for craftsmanship, comfort, and shine. Designed to feel refined from the first fitting.</p>
            </div>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Related products</p>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {jewelleryProducts.filter((item) => item.id !== product.id).slice(0, 3).map((item) => (
                <Link key={item.id} to={`/jewellery/${item.id}`} className="rounded-[1.6rem] border border-white/10 bg-zinc-900/70 p-4 transition hover:border-white/30">
                  <img src={item.images[0]} alt={item.name} className="h-48 w-full rounded-[1.2rem] object-cover" loading="lazy" />
                  <p className="mt-4 text-base font-semibold text-white">{item.name}</p>
                  <p className="mt-2 text-sm text-zinc-400">{item.category}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
