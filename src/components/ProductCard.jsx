import { motion } from "framer-motion";
import { FiHeart, FiBarChart2, FiShoppingBag, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  return (
    <motion.article whileHover={{ y: -8, scale: 1.01 }} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/80 shadow-[0_20px_70px_rgba(0,0,0,0.26)]">
      <div className="relative overflow-hidden">
        <img src={product.image} alt={product.title} className="h-72 w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
        <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs uppercase tracking-[0.24em] text-zinc-200 backdrop-blur">{product.badge}</div>
        <div className="absolute right-4 top-4 flex flex-col gap-2">
          <button className="rounded-full border border-white/10 bg-black/50 p-2 text-white backdrop-blur transition hover:bg-white/15"><FiHeart className="h-4 w-4" /></button>
          <button className="rounded-full border border-white/10 bg-black/50 p-2 text-white backdrop-blur transition hover:bg-white/15"><FiBarChart2 className="h-4 w-4" /></button>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/90 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100">
          <button className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur"><FiEye className="h-4 w-4" /> Quick view</button>
          <button type="button" onClick={() => addItem(product)} className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-black"><FiShoppingBag className="h-4 w-4" /> Add</button>
        </div>
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-zinc-400">{product.subtitle}</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{product.title}</h3>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-zinc-300">{product.availability}</div>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span className="text-amber-300">★</span> <span>{product.rating}</span><span>•</span><span>{product.reviews} reviews</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-white">${product.price.toLocaleString()}</p>
            <p className="text-sm text-zinc-500 line-through">${product.oldPrice.toLocaleString()}</p>
          </div>
          <div className="rounded-full bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black">{product.discount}</div>
        </div>
        <Link to={`/product/${product.id}`} className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-zinc-300 transition hover:text-white">View details →</Link>
      </div>
    </motion.article>
  );
}
