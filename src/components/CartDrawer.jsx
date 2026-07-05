import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiPlus, FiMinus, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../context/CartContext";

export default function CartDrawer({ open, onClose }) {
  const { items, updateQuantity, removeItem } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/70 backdrop-blur" onClick={onClose} />
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", stiffness: 140, damping: 24 }} className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#060606] p-6 shadow-[0_0_120px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-zinc-400">Your cart</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Selected timepieces</h2>
              </div>
              <button onClick={onClose} className="rounded-full border border-white/10 bg-white/5 p-3 text-white"><FiX className="h-5 w-5" /></button>
            </div>

            <div className="mt-6 flex-1 space-y-4 overflow-auto">
              {items.length === 0 ? (
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 text-sm text-zinc-400">Your cart is empty.</div>
              ) : items.map((item) => (
                <div key={item.id} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-base font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-sm text-zinc-400">${item.price.toLocaleString()}</p>
                    </div>
                    <button onClick={() => removeItem(item.id, item.category)} className="text-sm uppercase tracking-[0.2em] text-zinc-400">Remove</button>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 p-1">
                      <button onClick={() => updateQuantity(item.id, -1, item.category)} className="rounded-full p-2 text-white"><FiMinus className="h-4 w-4" /></button>
                      <span className="min-w-6 text-center text-sm font-semibold text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1, item.category)} className="rounded-full p-2 text-white"><FiPlus className="h-4 w-4" /></button>
                    </div>
                    <p className="text-sm font-semibold text-white">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4 rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between text-sm text-zinc-400"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
              <div className="flex items-center justify-between text-sm text-zinc-400"><span>Shipping</span><span>Complimentary</span></div>
              <div className="flex items-center justify-between text-base font-semibold text-white"><span>Total</span><span>${subtotal.toLocaleString()}</span></div>
              <button className="flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-black">Checkout <FiShoppingBag className="h-4 w-4" /></button>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
