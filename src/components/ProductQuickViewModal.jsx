import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
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
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-sm bg-white shadow-2xl sm:flex-row"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center text-black/70 transition hover:text-black"
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
              <div className="aspect-[3/4] w-full bg-[#e9e7e1] sm:aspect-auto sm:h-full">
                <img
                  src={product.src}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-center px-6 py-8 sm:px-10 sm:py-10">
              {product.badge && (
                <span className="mb-4 inline-block w-fit bg-black px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-white">
                  {product.badge}
                </span>
              )}
              <h3 className="text-2xl font-semibold uppercase tracking-wide text-black sm:text-3xl">
                {product.name}
              </h3>
              <p className="mt-2 text-sm uppercase tracking-[0.16em] text-black/50 sm:text-base">
                {product.title}
              </p>
              <p className="mt-4 text-lg font-medium text-black/80 sm:text-xl">
                {product.price}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-black/60 sm:text-base">
                Expertly crafted with precision Swiss movement, sapphire crystal,
                and premium materials. Each piece undergoes rigorous quality
                assurance before delivery.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button type="button" className="button-primary">
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="button-secondary"
                  onClick={onClose}
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
