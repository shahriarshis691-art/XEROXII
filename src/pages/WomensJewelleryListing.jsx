import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import toast from "react-hot-toast";
import ProductQuickViewModal from "../components/ProductQuickViewModal";
import { AppContext } from "../context/AppContext";
import { JEWELLERY_LISTING_PRODUCTS } from "../data/jewelleryProducts";

export default function WomensJewelleryListing() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const { toggleWishlist, isInWishlist } = useContext(AppContext);
  const navigate = useNavigate();

  const handleWishlist = (product, e) => {
    e.stopPropagation();
    toggleWishlist(product);
    toast.success(
      isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist"
    );
  };

  const categories = ["All", "Necklace", "Earrings", "Bracelet", "Ring", "Pendant", "Anklet", "Brooch"];
  
  const filteredProducts = selectedCategory === "All" 
    ? JEWELLERY_LISTING_PRODUCTS 
    : JEWELLERY_LISTING_PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <>
      {/* Header */}
      <div className="bg-[#f3f2ef] text-black">
        <div className="page-shell pt-10 pb-6 sm:pt-14 sm:pb-8">
          <nav className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-black/50">
            <Link to="/" className="transition hover:text-black">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-black/80">Collections</span>
            <span aria-hidden="true">/</span>
            <span className="text-black">Women&apos;s Jewellery</span>
          </nav>
        </div>

        <div className="page-shell pb-16 sm:pb-24">
          <div className="text-center">
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-black/50">
              Luxury Collection
            </p>
            <h1 className="section-heading mt-3 text-4xl font-semibold uppercase tracking-wide text-black sm:text-5xl lg:text-6xl">
              Women&apos;s Jewellery
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-black/70 sm:text-lg">
              Discover our exquisite collection of luxury women's jewellery, crafted with precision and elegance
            </p>
          </div>

          {/* Category Filter */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 text-sm font-semibold uppercase tracking-[0.1em] transition-all ${
                  selectedCategory === category
                    ? "bg-black text-white"
                    : "border border-black/20 text-black hover:border-black hover:bg-black hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="bg-white py-20 sm:py-28">
        <div className="page-shell">
          <motion.div
            className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: (index % 4) * 0.1 }}
                className="group text-center"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#f3f2ef] mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/10">
                    <button
                      type="button"
                      onClick={() => setSelected(product)}
                      className="pointer-events-auto translate-y-4 rounded-full border border-black/20 bg-white/90 px-5 py-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-black backdrop-blur-sm"
                    >
                      View Details
                    </button>
                  </div>
                  {product.badge && (
                    <span className="absolute left-2 top-2 bg-black px-2 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-white">
                      {product.badge}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={(e) => handleWishlist(product, e)}
                    className="absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-black transition-all duration-300 group-hover:bg-black group-hover:text-white"
                    aria-label="Add to wishlist"
                  >
                    <FiHeart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                  </button>
                </div>
                <h3 className="text-[0.65rem] font-semibold uppercase leading-tight tracking-[0.08em] text-black sm:text-sm sm:tracking-[0.14em]">
                  <button type="button" onClick={() => navigate(`/product/${product.id}`)} className="hover:opacity-70 transition">
                    {product.name}
                  </button>
                </h3>
                <p className="mt-1.5 text-[0.7rem] font-medium tracking-[0.02em] text-black/60 sm:text-xs sm:tracking-[0.04em]">
                  {product.category}
                </p>
                <p className="mt-3 text-[0.75rem] font-semibold text-black sm:text-sm">
                  {product.price}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <ProductQuickViewModal
        product={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
