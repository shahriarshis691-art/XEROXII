import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHeart, FiBarChart2, FiShoppingBag, FiEye, FiSearch } from "react-icons/fi";
import { jewelleryProducts } from "../data/jewellery";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

const categories = ["All", "Diamond Rings", "Necklaces", "Bracelets", "Earrings", "Luxury Sets", "Wedding Collection", "Premium Gifts"];
const sortOptions = ["Newest", "Best Selling", "Highest Rated", "Low to High", "High to Low"];

export default function JewelleryPage() {
  const { addItem } = useCart();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [priceCap, setPriceCap] = useState(10000);

  const filteredProducts = useMemo(() => {
    let items = [...jewelleryProducts];
    if (search) {
      items = items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase()));
    }
    if (category !== "All") {
      items = items.filter((item) => item.category === category);
    }
    items = items.filter((item) => item.price <= priceCap);
    items.sort((a, b) => {
      switch (sortBy) {
        case "Highest Rated":
          return b.rating - a.rating;
        case "Low to High":
          return a.price - b.price;
        case "High to Low":
          return b.price - a.price;
        case "Best Selling":
          return (b.rating * 10) - (a.rating * 10);
        case "Newest":
        default:
          return b.id - a.id;
      }
    });
    return items;
  }, [category, priceCap, search, sortBy]);

  return (
    <div className="min-h-screen bg-[#030303] text-stone-100">
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-10 lg:py-16">
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.24)] sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.4em] text-zinc-400">Women's Jewellery Collection</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Luxury pieces shaped for timeless celebration.</h1>
            <p className="mt-5 text-lg leading-8 text-zinc-300">Diamonds, sculptural gold, and polished heirlooms designed for modern ritual and quiet opulence.</p>
          </div>
        </motion.section>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="space-y-6 rounded-[2rem] border border-white/10 bg-zinc-950/80 p-6">
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-4 py-3">
                <FiSearch className="h-4 w-4 text-zinc-400" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search jewellery" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500" />
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="text-sm uppercase tracking-[0.28em] text-zinc-400">Categories</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button key={item} onClick={() => setCategory(item)} className={`rounded-full border px-3 py-2 text-sm transition ${category === item ? "border-white bg-white text-black" : "border-white/10 bg-transparent text-zinc-300 hover:border-white/30"}`}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="text-sm uppercase tracking-[0.28em] text-zinc-400">Price</p>
              <input type="range" min="1000" max="10000" step="100" value={priceCap} onChange={(event) => setPriceCap(Number(event.target.value))} className="mt-4 w-full accent-white" />
              <p className="mt-2 text-sm text-zinc-400">Up to ${priceCap.toLocaleString()}</p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="text-sm uppercase tracking-[0.28em] text-zinc-400">Sort</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {sortOptions.map((option) => (
                  <button key={option} onClick={() => setSortBy(option)} className={`rounded-full border px-3 py-2 text-sm transition ${sortBy === option ? "border-white bg-white text-black" : "border-white/10 bg-transparent text-zinc-300 hover:border-white/30"}`}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Curated collection</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Signature jewellery</h2>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300">Showing {filteredProducts.length} pieces</div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <motion.article key={product.id} whileHover={{ y: -8, scale: 1.01 }} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/80 shadow-[0_20px_70px_rgba(0,0,0,0.26)]">
                  <div className="relative overflow-hidden">
                    <img src={product.images[0]} alt={product.name} loading="lazy" className="h-72 w-full object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs uppercase tracking-[0.24em] text-zinc-200 backdrop-blur">{product.badge}</div>
                    <div className="absolute right-4 top-4 flex flex-col gap-2">
                      <button type="button" className="rounded-full border border-white/10 bg-black/50 p-2 text-white backdrop-blur transition hover:bg-white/15"><FiHeart className="h-4 w-4" /></button>
                      <button type="button" className="rounded-full border border-white/10 bg-black/50 p-2 text-white backdrop-blur transition hover:bg-white/15"><FiBarChart2 className="h-4 w-4" /></button>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/90 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100">
                      <button type="button" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur"><FiEye className="h-4 w-4" /> Quick view</button>
                      <button type="button" onClick={() => addItem({ id: product.id, title: product.name, price: product.price, image: product.images[0], category: product.category })} className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-black"><FiShoppingBag className="h-4 w-4" /> Add</button>
                    </div>
                  </div>
                  <div className="space-y-4 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm uppercase tracking-[0.28em] text-zinc-400">{product.category}</p>
                        <h3 className="mt-2 text-xl font-semibold text-white">{product.name}</h3>
                      </div>
                      <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-zinc-300">{product.stock}</div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <span className="text-amber-300">★</span> <span>{product.rating}</span><span>•</span><span>{product.stock}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-semibold text-white">${product.price.toLocaleString()}</p>
                        <p className="text-sm text-zinc-500 line-through">${product.oldPrice.toLocaleString()}</p>
                      </div>
                      <div className="rounded-full bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-black">{product.discount}</div>
                    </div>
                    <Link to={`/jewellery/${product.id}`} className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.24em] text-zinc-300 transition hover:text-white">View details →</Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
