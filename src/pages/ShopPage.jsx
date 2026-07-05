import { motion } from "framer-motion";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import { products } from "../data/products";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#030303] text-stone-100">
      <main id="shop" className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10 sm:px-8 lg:px-10 lg:py-16">
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(140deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03))] p-8 shadow-[0_25px_90px_rgba(0,0,0,0.25)] sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.4em] text-zinc-400">Luxury shop</p>
            <h1 className="section-heading mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">Discover exceptional timepieces with sculptural presence.</h1>
            <p className="mt-5 text-lg leading-8 text-zinc-300">Curated steel, platinum, and ceramic watches designed for modern collectors.</p>
          </div>
        </motion.section>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Filters />
          <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.38em] text-zinc-400">Collection</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Signature pieces</h2>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300">Showing 4 of 24 watches</div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <Pagination />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
