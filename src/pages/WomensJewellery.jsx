import { useState, useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo";
import ProductQuickViewModal from "../components/ProductQuickViewModal";
import { JEWELLERY_LISTING_PRODUCTS } from "../data/jewelleryProducts";
import { parsePrice } from "../lib/productUtils";
import { AppContext } from "../context/AppContext";

const CATEGORY_FILTERS = {
  all: () => true,
  necklaces: (p) => p.category === "Necklace" || p.category === "Pendant",
  rings: (p) => p.category === "Ring",
  bracelets: (p) => p.category === "Bracelet",
  earrings: (p) => p.category === "Earrings",
};

export default function WomensJewelleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const { formatMoney } = useContext(AppContext);

  const filteredProducts = useMemo(() => {
    const filterFn = CATEGORY_FILTERS[selectedCategory] || CATEGORY_FILTERS.all;
    let filtered = JEWELLERY_LISTING_PRODUCTS.filter(filterFn);

    if (sortBy === "price-asc") {
      return [...filtered].sort((a, b) => parsePrice(a) - parsePrice(b));
    }
    if (sortBy === "price-desc") {
      return [...filtered].sort((a, b) => parsePrice(b) - parsePrice(a));
    }
    return [...filtered].sort((a, b) => b.id.localeCompare(a.id));
  }, [selectedCategory, sortBy]);

  const categories = [
    { value: "all", label: "All" },
    { value: "necklaces", label: "Necklaces" },
    { value: "rings", label: "Rings" },
    { value: "bracelets", label: "Bracelets" },
    { value: "earrings", label: "Earrings" },
  ];

  return (
    <section className="relative bg-white">
      <Seo
        title="Women's Jewellery"
        description="Discover fine necklaces, rings, earrings, and bracelets curated for timeless elegance."
        path="/womens-jewellery"
      />
      {/* Header / Hero */}
      <div className="relative bg-[#f8f6f3] py-16 sm:py-24">
        <div className="page-shell flex flex-col items-center text-center">
          <h1 className="font-display text-3xl font-semibold uppercase tracking-[0.1em] text-[#a3123a] sm:text-5xl sm:tracking-[0.12em] lg:text-6xl">
            Women&apos;s Jewellery
          </h1>
          <a
            href="#collections"
            className="mt-6 inline-flex items-center border-b border-black/40 pb-1 text-sm font-medium uppercase tracking-wider text-black/70 transition-colors hover:border-black hover:text-black"
          >
            Explore Our Collections
          </a>
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className="sticky top-0 z-20 border-b border-black/10 bg-white/95 py-4 backdrop-blur-sm">
        <div className="page-shell flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="no-scrollbar flex w-full flex-nowrap items-center justify-start gap-2 overflow-x-auto sm:w-auto sm:flex-wrap sm:justify-center">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`min-h-11 shrink-0 px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors sm:text-sm ${selectedCategory === cat.value
                    ? "bg-black text-white"
                    : "text-black/70 hover:bg-black/5 hover:text-black"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-black/50 sm:text-sm">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="min-h-11 rounded-sm border border-black/20 bg-white px-3 py-2 text-xs font-medium uppercase tracking-wide text-black focus:border-black focus:outline-none sm:text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="page-shell py-12 sm:py-16">
        <motion.div
          layout
          className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className="group relative bg-white"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#f8f6f3]">
                <img
                  src={product.image || product.src}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />
              </div>

              <div className="mt-3 text-center sm:mt-4">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-black sm:text-base">
                  {product.name}
                </h3>
                <p className="mt-1 text-xs font-normal uppercase tracking-wider text-black/50 sm:text-sm">
                  {product.collection}
                </p>
                <p className="mt-2 text-sm font-medium tracking-wider text-black sm:mt-3 sm:text-base">
                  {formatMoney(parsePrice(product))}
                </p>
              </div>

              <div className="mt-4 flex flex-col justify-center gap-2 opacity-100 transition-opacity duration-300 sm:flex-row sm:gap-3 lg:opacity-0 lg:group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsQuickViewOpen(true);
                  }}
                  className="min-h-11 rounded-sm border border-black/20 bg-white px-3 py-2 text-[0.65rem] font-medium uppercase tracking-wider text-black transition-all duration-300 hover:border-black hover:bg-black hover:text-white sm:px-4 sm:text-xs"
                >
                  Quick View
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="min-h-11 rounded-sm bg-black px-3 py-2 text-[0.65rem] font-medium uppercase tracking-wider text-white transition-all duration-300 hover:bg-black/90 sm:px-4 sm:text-xs"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg uppercase tracking-wide text-black/50">
              No products found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && selectedProduct && (
        <ProductQuickViewModal
          product={selectedProduct}
          onClose={() => {
            setIsQuickViewOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </section>
  );
}
