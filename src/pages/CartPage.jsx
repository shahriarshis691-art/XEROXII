import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMinus, FiPlus, FiX } from 'react-icons/fi';
import { AppContext } from '../context/AppContext';
import { parsePrice, getProductName } from '../lib/productUtils';

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, cartTotal } = useContext(AppContext);

  const itemTotal = (item) => parsePrice(item) * item.quantity;

  return (
    <main className="min-h-screen bg-[#fafaf8] py-8 sm:py-16">
      <div className="page-shell">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-light uppercase tracking-wide text-black mb-2">
            Shopping Cart
          </h1>
          <p className="text-sm uppercase tracking-[0.16em] text-black/60">
            {cart.length === 0 ? 'Your cart is empty' : `${cart.length} item${cart.length !== 1 ? 's' : ''} in cart`}
          </p>
        </div>

        {cart.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-black/60 mb-8">Your cart is empty</p>
            <Link
              to="/"
              className="px-8 py-3 bg-black text-white text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/90 transition"
            >
              Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex gap-4 sm:gap-6 border border-black/10 p-4 sm:p-6 bg-white"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-20 h-24 sm:w-24 sm:h-32 bg-[#e9e7e1]">
                      <img
                        src={item.src || item.image}
                        alt={getProductName(item)}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-black text-sm sm:text-base uppercase tracking-wide mb-1">
                        {getProductName(item)}
                      </h3>
                      <p className="text-xs sm:text-sm uppercase tracking-[0.16em] text-black/60 mb-3">
                        {item.brand}
                      </p>
                      <p className="text-sm sm:text-base font-medium text-black mb-4">
                        ৳ {parsePrice(item).toLocaleString()}
                      </p>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-3 border border-black/20 rounded w-fit px-2">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="py-2 px-2 text-black hover:text-black/60 transition"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="py-2 px-2 text-black hover:text-black/60 transition"
                          aria-label="Increase quantity"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-black/60 hover:text-black transition p-1"
                        aria-label="Remove item"
                      >
                        <FiX size={18} />
                      </button>
                      <p className="font-semibold text-black">
                        ৳ {itemTotal(item).toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <motion.div
              className="lg:col-span-1 h-fit"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="border border-black/10 bg-white p-6 sm:p-8">
                <h2 className="text-lg font-semibold uppercase tracking-wide text-black mb-6">
                  Order Summary
                </h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-black/10">
                  <div className="flex justify-between text-sm text-black/70">
                    <span>Subtotal</span>
                    <span>৳ {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-black/70">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-sm text-black/70">
                    <span>Tax (10%)</span>
                    <span>৳ {Math.floor(cartTotal * 0.1).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-8">
                  <span className="font-semibold uppercase tracking-wide text-black">Total</span>
                  <span className="font-semibold text-lg text-black">
                    ৳ {(cartTotal + Math.floor(cartTotal * 0.1)).toLocaleString()}
                  </span>
                </div>

                <Link
                  to="/checkout"
                  className="block w-full py-3 px-4 bg-black text-white text-sm font-medium uppercase tracking-[0.16em] text-center hover:bg-black/90 transition mb-3"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/"
                  className="block w-full py-3 px-4 border border-black/20 text-black text-sm font-medium uppercase tracking-[0.16em] text-center hover:bg-black/5 transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </main>
  );
}
