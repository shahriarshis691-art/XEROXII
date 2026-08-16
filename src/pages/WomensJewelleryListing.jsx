import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import toast from "react-hot-toast";
import ProductQuickViewModal from "../components/ProductQuickViewModal";
import { AppContext } from "../context/AppContext";

const WOMENS_JEWELLERY_PRODUCTS = [
  {
    id: "necklace-1",
    name: "Diamond Sapphire Necklace",
    category: "Necklace",
    price: "৳ 2,85,000",
    image: "https://images.pexels.com/photos/265856/pexels-photo-265856.jpeg?auto=compress&cs=tinysrgb&w=900",
    badge: "Bestseller",
    description: "Exquisite diamond and royal blue sapphire necklace set in 18K white gold"
  },
  {
    id: "earring-1",
    name: "Diamond Chandelier Earrings",
    category: "Earrings",
    price: "৳ 1,95,000",
    image: "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=900",
    badge: "Luxury",
    description: "Pair of luxurious diamond and gemstone chandelier drop earrings"
  },
  {
    id: "bracelet-1",
    name: "Pearl & Diamond Bracelet",
    category: "Bracelet",
    price: "৳ 1,65,000",
    image: "https://images.pexels.com/photos/1927257/pexels-photo-1927257.jpeg?auto=compress&cs=tinysrgb&w=900",
    badge: "Premium",
    description: "Elegant pearl and diamond bracelet in 18K gold"
  },
  {
    id: "ring-1",
    name: "Solitaire Diamond Ring",
    category: "Ring",
    price: "৳ 3,50,000",
    image: "https://images.pexels.com/photos/942884/pexels-photo-942884.jpeg?auto=compress&cs=tinysrgb&w=900",
    badge: "Engagement",
    description: "Classic solitaire diamond ring with elegant band"
  },
  {
    id: "necklace-2",
    name: "Rose Gold Pendant Necklace",
    category: "Necklace",
    price: "৳ 1,75,000",
    image: "https://images.pexels.com/photos/2661256/pexels-photo-2661256.jpeg?auto=compress&cs=tinysrgb&w=900",
    badge: "New",
    description: "Rose gold pendant necklace with embedded gemstones"
  },
  {
    id: "anklet-1",
    name: "Luxury Diamond Anklet",
    category: "Anklet",
    price: "৳ 1,45,000",
    image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=900",
    badge: "Exclusive",
    description: "Premium diamond-studded anklet with adjustable fit"
  },
  {
    id: "brooch-1",
    name: "Vintage Diamond Brooch",
    category: "Brooch",
    price: "৳ 2,25,000",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=900",
    badge: "Vintage",
    description: "Stunning vintage-inspired diamond brooch"
  },
  {
    id: "pendant-1",
    name: "Emerald Heart Pendant",
    category: "Pendant",
    price: "৳ 2,10,000",
    image: "https://images.pexels.com/photos/1435407/pexels-photo-1435407.jpeg?auto=compress&cs=tinysrgb&w=900",
    badge: "Luxury",
    description: "Heart-shaped emerald pendant with diamond halo"
  },
];

export default function WomensJewelleryListing() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const { toggleWishlist, isInWishlist } = useContext(AppContext);

  const handleWishlist = (product, e) => {
    e.stopPropagation();
    toggleWishlist(product);
    toast.success(
      isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist"
    );
  };

  const categories = ["All", "Necklace", "Earrings", "Bracelet", "Ring", "Pendant", "Anklet", "Brooch"];
  
  const filteredProducts = selectedCategory === "All" 
    ? WOMENS_JEWELLERY_PRODUCTS 
    : WOMENS_JEWELLERY_PRODUCTS.filter(p => p.category === selectedCategory);

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
                  {product.name}
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
