import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import ProductQuickViewModal from "../components/ProductQuickViewModal";

const PRODUCTS = [
  {
    id: "nj001",
    name: "Diamond Aurora Necklace",
    category: "necklaces",
    price: "$12,500",
    sku: "SKU-NJ-001",
    collection: "Celestial Collection",
    src: "https://images.pexels.com/photos/2103651/pexels-photo-2103651.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "er002",
    name: "Emerald Eclipse Earrings",
    category: "earrings",
    price: "$8,750",
    sku: "SKU-ER-002",
    collection: "Celestial Collection",
    src: "https://images.pexels.com/photos/1899552/pexels-photo-1899552.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "rb003",
    name: "Rose Gold Bracelet",
    category: "bracelets",
    price: "$6,900",
    sku: "SKU-RB-003",
    collection: "Romance Collection",
    src: "https://images.pexels.com/photos/1927906/pexels-photo-1927906.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "r004",
    name: "Pearl Rose Cocktail Ring",
    category: "rings",
    price: "$4,850",
    sku: "SKU-R-004",
    collection: "Romance Collection",
    src: "https://images.pexels.com/photos/3734161/pexels-photo-3734161.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "nj005",
    name: "Sapphire Ocean Necklace",
    category: "necklaces",
    price: "€9,200",
    sku: "SKU-NJ-005",
    collection: "Ocean Collection",
    src: "https://images.pexels.com/photos/1764488/pexels-photo-1764488.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "er006",
    name: "Pearl Serenity Earrings",
    category: "earrings",
    price: "£5,900",
    sku: "SKU-ER-006",
    collection: "Ocean Collection",
    src: "https://images.pexels.com/photos/1779637/pexels-photo-1779637.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "rb007",
    name: "Platinum Grace Bracelet",
    category: "bracelets",
    price: "€7,350",
    sku: "SKU-RB-007",
    collection: "Grace Collection",
    src: "https://images.pexels.com/photos/1734382/pexels-photo-1734382.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "r008",
    name: "Gold Emerald Statement Ring",
    category: "rings",
    price: "$11,200",
    sku: "SKU-R-008",
    collection: "Grace Collection",
    src: "https://images.pexels.com/photos/177037/pexels-photo-177037.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "nj009",
    name: "Ruby Passion Necklace",
    category: "necklaces",
    price: "€10,800",
    sku: "SKU-NJ-009",
    collection: "Passion Collection",
    src: "https://images.pexels.com/photos/1447126/pexels-photo-1447126.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "er010",
    name: "Crystal Infinity Earrings",
    category: "earrings",
    price: "$7,450",
    sku: "SKU-ER-010",
    collection: "Passion Collection",
    src: "https://images.pexels.com/photos/1893555/pexels-photo-1893555.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "rb011",
    name: "Cobalt Midnight Bracelet",
    category: "bracelets",
    price: "£8,600",
    sku: "SKU-RB-011",
    collection: "Midnight Collection",
    src: "https://images.pexels.com/photos/1668532/pexels-photo-1668532.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "r012",
    name: "Black Diamond Solitaire Ring",
    category: "rings",
    price: "$15,200",
    sku: "SKU-R-012",
    collection: "Midnight Collection",
    src: "https://images.pexels.com/photos/2947023/pexels-photo-2947023.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

export default function WomensJewelleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = useMemo(() => {
    let filtered = selectedCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

    if (sortBy === "price-asc") {
      return filtered.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ""));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ""));
        return priceA - priceB;
      });
    }
    if (sortBy === "price-desc") {
      return filtered.sort((a, b) => {
        const priceA = parseFloat(a.price.replace(/[^0-9.]/g, ""));
        const priceB = parseFloat(b.price.replace(/[^0-9.]/g, ""));
        return priceB - priceA;
      });
    }
    return filtered.sort((a, b) => b.id.localeCompare(a.id));
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
      {/* Header / Hero */}
      <div className="relative bg-[#f8f6f3] py-16 sm:py-24">
        <div className="page-shell flex flex-col items-center text-center">
          <h1 className="font-display text-4xl font-semibold uppercase tracking-[0.12em] text-[#a3123a] sm:text-5xl lg:text-6xl">
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
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors sm:text-sm ${selectedCategory === cat.value
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
              className="rounded-sm border border-black/20 bg-white px-3 py-2 text-xs font-medium uppercase tracking-wide text-black focus:border-black focus:outline-none sm:text-sm"
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
          className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4"
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
                  src={product.src}
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
                  {product.price}
                </p>
              </div>

              <div className="mt-4 flex justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsQuickViewOpen(true);
                  }}
                  className="rounded-sm border border-black/20 bg-white px-4 py-2 text-xs font-medium uppercase tracking-wider text-black transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
                >
                  Quick View
                </button>
                <button
                  type="button"
                  className="rounded-sm bg-black px-4 py-2 text-xs font-medium uppercase tracking-wider text-white transition-all duration-300 hover:bg-black/90"
                >
                  Enquire
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
