import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#030303] text-stone-100">
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 sm:px-8 lg:px-10 lg:py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Your bag</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
              {itemCount > 0 ? `${itemCount} selected piece${itemCount > 1 ? "s" : ""}` : "Your cart is ready for a new arrival"}
            </h1>
          </div>
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-zinc-300 transition hover:text-white">
            <FiShoppingBag className="h-4 w-4" /> Continue shopping
          </Link>
        </div>

        {items.length === 0 ? (
          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
            <p className="text-lg text-zinc-300">No pieces are in your cart yet.</p>
            <Link to="/shop" className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-black">
              Browse the collection
            </Link>
          </motion.section>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              {items.map((item) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4 rounded-[1.8rem] border border-white/10 bg-zinc-950/80 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.title} className="h-24 w-24 rounded-[1.2rem] object-cover" />
                    <div>
                      <p className="text-base font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-zinc-400">${item.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
                      <button type="button" onClick={() => updateQuantity(item.id, -1, item.category)} className="rounded-full p-2 text-white transition hover:bg-white/10">
                        <FiMinus className="h-4 w-4" />
                      </button>
                      <span className="min-w-6 text-center text-sm font-semibold text-white">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, 1, item.category)} className="rounded-full p-2 text-white transition hover:bg-white/10">
                        <FiPlus className="h-4 w-4" />
                      </button>
                    </div>
                    <button type="button" onClick={() => removeItem(item.id, item.category)} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white">
                      <FiTrash2 className="h-4 w-4" /> Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="rounded-[2rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
              <p className="text-sm uppercase tracking-[0.32em] text-zinc-400">Summary</p>
              <div className="mt-6 space-y-4 text-sm text-zinc-400">
                <div className="flex items-center justify-between"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
                <div className="flex items-center justify-between"><span>Shipping</span><span>Complimentary</span></div>
                <div className="flex items-center justify-between"><span>Estimated tax</span><span>$0</span></div>
                <div className="flex items-center justify-between border-t border-white/10 pt-4 text-base font-semibold text-white"><span>Total</span><span>${subtotal.toLocaleString()}</span></div>
              </div>
              <Link to="/checkout" className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-black">
                <FiShoppingBag className="h-4 w-4" /> Proceed to checkout
              </Link>
            </motion.aside>
          </div>
        )}
      </main>
    </div>
  );
}
