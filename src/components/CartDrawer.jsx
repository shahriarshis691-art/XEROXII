import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMinus, FiPlus } from 'react-icons/fi';
import { parsePrice, getProductName } from '../lib/productUtils';
import { AppContext } from '../context/AppContext';

export default function CartDrawer({ isOpen, onClose, cart, removeFromCart, updateCartQuantity, cartTotal, cartItemCount }) {
  const { formatMoney } = useContext(AppContext);
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const tax = Math.floor(cartTotal * 0.1);
  const total = cartTotal + tax;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed right-0 top-0 z-[80] flex h-dvh max-h-dvh w-full max-w-md flex-col bg-white shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          >
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
              <div>
                <h2 className="text-lg font-semibold uppercase tracking-wide text-black">Your Cart</h2>
                <p className="text-xs uppercase tracking-[0.16em] text-black/50">
                  {cartItemCount} item{cartItemCount !== 1 ? 's' : ''}
                </p>
              </div>
              <button type="button" onClick={onClose} aria-label="Close cart" className="inline-flex h-11 w-11 items-center justify-center p-2 text-black/60 hover:text-black">
                <FiX size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="text-black/60 mb-6">Your cart is empty</p>
                  <Link
                    to="/"
                    onClick={onClose}
                    className="min-h-11 px-6 py-3 bg-black text-white text-xs font-medium uppercase tracking-[0.16em] hover:bg-black/90 transition inline-flex items-center justify-center"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.cartLineId || item.id} className="flex gap-4 border border-black/10 p-3">
                      <div className="h-20 w-16 flex-shrink-0 bg-[#e9e7e1]">
                        <img src={item.src || item.image} alt={getProductName(item)} className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-semibold uppercase tracking-wide text-black truncate">
                          {getProductName(item)}
                        </h3>
                        {item.selectedVariants && (
                          <p className="text-[0.65rem] text-black/50 mt-0.5">
                            {Object.entries(item.selectedVariants).map(([k, v]) => `${k}: ${v}`).join(' · ')}
                          </p>
                        )}
                        <p className="text-sm font-medium text-black mt-1">
                          {formatMoney(parsePrice(item))}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center border border-black/20">
                            <button type="button" className="inline-flex h-11 w-11 items-center justify-center" onClick={() => updateCartQuantity(item.cartLineId || item.id, item.quantity - 1)} aria-label="Decrease">
                              <FiMinus size={12} />
                            </button>
                            <span className="w-6 text-center text-xs">{item.quantity}</span>
                            <button type="button" className="inline-flex h-11 w-11 items-center justify-center" onClick={() => updateCartQuantity(item.cartLineId || item.id, item.quantity + 1)} aria-label="Increase">
                              <FiPlus size={12} />
                            </button>
                          </div>
                          <button type="button" onClick={() => removeFromCart(item.cartLineId || item.id)} className="min-h-11 px-1 text-xs uppercase tracking-wide text-black/50 hover:text-black">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="space-y-3 border-t border-black/10 px-6 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                <div className="flex justify-between text-sm text-black/70">
                  <span>Subtotal</span>
                  <span>{formatMoney(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-black/70">
                  <span>Tax (10%)</span>
                  <span>{formatMoney(tax)}</span>
                </div>
                <div className="flex justify-between border-t border-black/10 pt-2 font-semibold text-black">
                  <span>Total</span>
                  <span>{formatMoney(total)}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="block min-h-11 w-full bg-black py-3 text-center text-sm font-medium uppercase tracking-[0.16em] text-white transition hover:bg-black/90"
                >
                  Checkout
                </Link>
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="block min-h-11 w-full border border-black/20 py-3 text-center text-sm font-medium uppercase tracking-[0.16em] text-black transition hover:bg-black/5"
                >
                  View Full Cart
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
