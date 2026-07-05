import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function CheckoutForm() {
  const { items } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="rounded-[2.25rem] border border-white/10 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-8">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex-1 space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Checkout</p>
            <h2 className="section-heading mt-3 text-3xl font-semibold text-white sm:text-4xl">Secure, private, bespoke.</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-zinc-300"><span>First name</span><input className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 outline-none" /></label>
            <label className="space-y-2 text-sm text-zinc-300"><span>Last name</span><input className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 outline-none" /></label>
            <label className="space-y-2 text-sm text-zinc-300"><span>Email</span><input className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 outline-none" /></label>
            <label className="space-y-2 text-sm text-zinc-300"><span>Phone</span><input className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 outline-none" /></label>
          </div>

          <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-lg font-semibold text-white">Shipping address</p>
            <textarea className="min-h-24 w-full rounded-[1rem] border border-white/10 bg-transparent px-4 py-3 outline-none" placeholder="Luxury apartment, avenue, city" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="space-y-2 text-sm text-zinc-300"><span>Country</span><input className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 outline-none" /></label>
            <label className="space-y-2 text-sm text-zinc-300"><span>Division</span><input className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 outline-none" /></label>
            <label className="space-y-2 text-sm text-zinc-300"><span>Zip</span><input className="w-full rounded-[1rem] border border-white/10 bg-white/5 px-4 py-3 outline-none" /></label>
          </div>
        </div>

        <motion.aside initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="w-full max-w-md space-y-5 rounded-[1.8rem] border border-white/10 bg-white/5 p-6">
          <div className="flex items-center justify-between"><p className="text-lg font-semibold text-white">Order summary</p><p className="text-sm uppercase tracking-[0.24em] text-zinc-400">{itemCount} item{itemCount === 1 ? "" : "s"}</p></div>
          <div className="space-y-3 rounded-[1.3rem] border border-white/10 bg-black/30 p-4 text-sm text-zinc-300">
            {items.length === 0 ? <p>No items selected.</p> : items.map((item) => (
              <div key={`${item.id}-${item.category || "default"}`} className="flex items-start justify-between gap-3 rounded-[1rem] border border-white/10 bg-white/5 p-3">
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.24em] text-zinc-400">{item.category || "Collection"}</p>
                  <p className="mt-1 text-xs text-zinc-500">Qty {item.quantity}</p>
                </div>
                <span className="text-sm text-zinc-200">${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>
          <div className="space-y-3 text-sm text-zinc-400">
            <div className="flex items-center justify-between"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
            <div className="flex items-center justify-between"><span>Shipping</span><span>Complimentary</span></div>
            <div className="flex items-center justify-between"><span>Tax</span><span>$0</span></div>
            <div className="flex items-center justify-between text-base font-semibold text-white"><span>Total</span><span>${subtotal.toLocaleString()}</span></div>
          </div>
          <div className="space-y-3">
            <label className="flex items-center gap-3 text-sm text-zinc-300"><input type="radio" name="payment" className="accent-white" /> Cash on delivery</label>
            <label className="flex items-center gap-3 text-sm text-zinc-300"><input type="radio" name="payment" className="accent-white" /> Stripe</label>
            <label className="flex items-center gap-3 text-sm text-zinc-300"><input type="radio" name="payment" className="accent-white" /> SSLCommerz</label>
          </div>
          <button className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-black">Place order</button>
        </motion.aside>
      </div>
    </section>
  );
}
