import { useState } from "react";
import { motion } from "framer-motion";
import { FiStar, FiHeart, FiShare2, FiCheck, FiMinus, FiPlus, FiCreditCard, FiTruck } from "react-icons/fi";
import { useCart } from "../context/CartContext";

const dialColors = ["Platinum", "Silver", "Midnight"];
const strapColors = ["Black", "Taupe", "Steel"];
const strapMaterials = ["Ceramic", "Leather", "Brushed Steel"];
const sizes = ["38 mm", "40 mm", "42 mm"];

export default function ProductInfo({ product }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const title = product?.title ?? "Chronograph No. 01";
  const subtitle = product?.subtitle ?? "Platinum Edition";
  const price = product?.price ?? 8400;
  const oldPrice = product?.oldPrice ?? 10200;
  const discount = product?.discount ?? "18% off";
  const rating = product?.rating ?? 4.9;
  const reviews = product?.reviews ?? 218;
  const [dial, setDial] = useState("Platinum");
  const [strap, setStrap] = useState("Black");
  const [material, setMaterial] = useState("Ceramic");
  const [size, setSize] = useState("40 mm");

  return (
    <div className="space-y-7 rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_35px_120px_rgba(0,0,0,0.35)] sm:p-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm uppercase tracking-[0.4em] text-zinc-400">XEROXII</p>
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-emerald-300">In stock</span>
        </div>

        <div>
          <h1 className="text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">{title}</h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-400">
            <div className="flex items-center gap-1 text-amber-300">
              {Array.from({ length: 5 }).map((_, index) => (
                <FiStar key={index} className="h-4 w-4" />
              ))}
            </div>
            <span>{rating} / 5</span>
            <span>• {reviews} reviews</span>
            <span>• SKU: XCH-001</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-zinc-400">{subtitle}</span>
          <span className="text-3xl font-semibold text-white">${price.toLocaleString()}</span>
          <span className="text-lg text-zinc-500 line-through">${oldPrice.toLocaleString()}</span>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-black">{discount}</span>
        </div>

        <div className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-zinc-300">
          Crafted in polished steel with a platinum bezel, sapphire crystal, and a Swiss-inspired mechanical movement that balances minimalism with precision.
        </div>

        <div className="flex items-center gap-2 rounded-[1.25rem] border border-white/10 bg-zinc-900/70 px-4 py-3 text-sm text-zinc-300">
          <FiCreditCard className="h-4 w-4" />
          <span>EMI available from $350/month with approved financing.</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-400">Dial color</p>
          <div className="flex flex-wrap gap-2">
            {dialColors.map((option) => (
              <button key={option} type="button" onClick={() => setDial(option)} className={`rounded-full border px-4 py-2 text-sm transition ${dial === option ? "border-white bg-white text-black" : "border-white/10 bg-transparent text-zinc-300 hover:border-white/35"}`}>
                {option}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-400">Strap color</p>
          <div className="flex flex-wrap gap-2">
            {strapColors.map((option) => (
              <button key={option} type="button" onClick={() => setStrap(option)} className={`rounded-full border px-4 py-2 text-sm transition ${strap === option ? "border-white bg-white text-black" : "border-white/10 bg-transparent text-zinc-300 hover:border-white/35"}`}>
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-400">Strap material</p>
            <div className="flex flex-wrap gap-2">
              {strapMaterials.map((option) => (
                <button key={option} type="button" onClick={() => setMaterial(option)} className={`rounded-full border px-3 py-2 text-sm transition ${material === option ? "border-white bg-white text-black" : "border-white/10 bg-transparent text-zinc-300 hover:border-white/35"}`}>
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-zinc-400">Watch size</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((option) => (
                <button key={option} type="button" onClick={() => setSize(option)} className={`rounded-full border px-3 py-2 text-sm transition ${size === option ? "border-white bg-white text-black" : "border-white/10 bg-transparent text-zinc-300 hover:border-white/35"}`}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-full border border-white/10 bg-white/5 p-1">
          <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="rounded-full p-2 text-white transition hover:bg-white/10"><FiMinus className="h-4 w-4" /></button>
          <span className="min-w-10 text-center text-base font-semibold text-white">{quantity}</span>
          <button type="button" onClick={() => setQuantity((q) => q + 1)} className="rounded-full p-2 text-white transition hover:bg-white/10"><FiPlus className="h-4 w-4" /></button>
        </div>

        <motion.button whileHover={{ y: -2, scale: 1.01 }} onClick={() => addItem({ id: product?.id ?? 1, title, price, image: product?.image ?? "/src/assets/watch.jpg" })} className="flex-1 rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition">Add to cart</motion.button>
        <motion.button whileHover={{ y: -2, scale: 1.01 }} className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10">Buy now</motion.button>
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="button" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 transition hover:bg-white/10">
          <FiHeart className="h-4 w-4" /> Wishlist
        </button>
        <button type="button" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200 transition hover:bg-white/10">
          <FiShare2 className="h-4 w-4" /> Share product
        </button>
      </div>

      <div className="grid gap-3 rounded-[1.4rem] border border-white/10 bg-zinc-900/70 p-4 sm:grid-cols-2">
        <div className="flex items-center gap-3 text-sm text-zinc-300"><FiCheck className="h-4 w-4 text-emerald-300" /> Secure checkout</div>
        <div className="flex items-center gap-3 text-sm text-zinc-300"><FiTruck className="h-4 w-4 text-emerald-300" /> Free express shipping</div>
      </div>
    </div>
  );
}
