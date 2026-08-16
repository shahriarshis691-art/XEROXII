import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import toast from "react-hot-toast";
import { AppContext } from "../context/AppContext";
import { getProductName, parsePrice } from "../lib/productUtils";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 26, stiffness: 300 },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 20,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

export default function ProductQuickViewModal({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleWishlist, isInWishlist, formatMoney } = useContext(AppContext);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (product) {
      setLiked(isInWishlist(product.id));
    }
  }, [product, isInWishlist]);

  useEffect(() => {
    if (!product) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
      document.body.classList.remove("modal-open");
    };
  }, [product, onClose]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    toast.success(`Added ${quantity} item${quantity > 1 ? "s" : ""} to cart`);
    setQuantity(1);
  };

  const handleWishlist = () => {
    if (!product) return;
    toggleWishlist(product);
    setLiked(!liked);
    toast.success(liked ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleContinueBrowsing = () => {
    setQuantity(1);
    onClose();
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center px-0 sm:items-center sm:px-6"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative flex max-h-[92dvh] w-full max-w-4xl flex-col overflow-hidden rounded-t-sm bg-white shadow-2xl sm:max-h-[90vh] sm:flex-row sm:rounded-sm"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute right-2 top-2 z-10 inline-flex h-11 w-11 items-center justify-center text-black/70 transition hover:text-black sm:right-4 sm:top-4"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="flex-shrink-0 sm:w-1/2">
              <div className="aspect-[4/3] max-h-[36vh] w-full bg-[#e9e7e1] sm:aspect-auto sm:h-full sm:max-h-none">
                <img
                  src={product.src || product.image}
                  alt={getProductName(product)}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-center overflow-y-auto px-5 py-6 sm:px-10 sm:py-10">
              {product.badge && (
                <span className="mb-4 inline-block w-fit bg-black px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-white">
                  {product.badge}
                </span>
              )}
              <h3 className="break-words text-xl font-semibold uppercase tracking-wide text-black sm:text-3xl">
                {getProductName(product)}
              </h3>
              <p className="mt-2 text-sm uppercase tracking-[0.16em] text-black/50 sm:text-base">
                {product.title}
              </p>
              <p className="mt-4 text-lg font-medium text-black/80 sm:text-xl">
                {formatMoney(parsePrice(product))}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-black/60 sm:text-base">
                {product.description || "Expertly crafted with precision Swiss movement, sapphire crystal, and premium materials. Each piece undergoes rigorous quality assurance before delivery."}
              </p>

              {/* Quantity Selector */}
              <div className="mt-6 flex items-center gap-4">
                <span className="text-sm font-medium uppercase tracking-[0.16em] text-black/60">
                  Quantity
                </span>
                <div className="flex items-center border border-black/20">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="inline-flex h-11 w-11 items-center justify-center text-black transition hover:text-black/60"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="inline-flex h-11 w-11 items-center justify-center text-black transition hover:text-black/60"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button 
                  type="button" 
                  className="button-primary min-h-11 flex-1"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                {product.id && (
                  <Link
                    to={`/product/${product.id}`}
                    onClick={onClose}
                    className="button-secondary flex min-h-11 flex-1 items-center justify-center text-center"
                  >
                    Full Details
                  </Link>
                )}
                <button
                  type="button"
                  onClick={handleWishlist}
                  className="button-secondary flex min-h-11 items-center justify-center gap-2 sm:flex-none sm:px-4"
                  aria-label="Add to wishlist"
                >
                  <FiHeart 
                    size={18} 
                    fill={liked ? "currentColor" : "none"}
                    color={liked ? "currentColor" : "currentColor"}
                  />
                  <span>{liked ? "Saved" : "Save"}</span>
                </button>
              </div>

              <button
                type="button"
                className="mt-3 py-3 px-4 text-sm font-medium uppercase tracking-[0.16em] text-black/60 hover:text-black transition"
                onClick={handleContinueBrowsing}
              >
                Continue Browsing
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
