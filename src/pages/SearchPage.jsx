import { useSearchParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Seo from '../components/Seo';
import { motion } from 'framer-motion';
import { searchProducts } from '../data/catalog';
import { getProductPriceDisplay, getProductName } from '../lib/productUtils';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setQuery(initialQuery);
    setResults(searchProducts(initialQuery));
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams(query.trim() ? { q: query.trim() } : {});
  };

  return (
    <main className="min-h-screen bg-[#fafaf8] py-12 sm:py-20">
      <Seo
        title={initialQuery ? `Search: ${initialQuery}` : 'Search'}
        description="Search luxury watches and jewellery at XEROXII."
        path={initialQuery ? `/search?q=${encodeURIComponent(initialQuery)}` : '/search'}
        noindex={Boolean(initialQuery)}
      />
      <div className="page-shell">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-light uppercase tracking-wide text-black mb-6">
            Search
          </h1>
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search watches, brands, collections..."
              className="flex-1 px-4 py-3 border border-black/20 bg-white text-black placeholder:text-black/40 focus:outline-none focus:ring-1 focus:ring-black/50"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/90 transition"
            >
              Search
            </button>
          </form>
        </div>

        {initialQuery && (
          <p className="text-sm uppercase tracking-[0.16em] text-black/60 mb-8 text-center">
            {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{initialQuery}&rdquo;
          </p>
        )}

        {initialQuery && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-black/60 mb-6">No products found. Try a different search term.</p>
            <Link to="/" className="text-sm border-b border-black/40 pb-0.5 text-black/70 hover:text-black">
              Browse all collections
            </Link>
          </div>
        )}

        <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
          {results.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`/product/${product.id}`} className="group block text-center">
                <div className="aspect-[4/5] overflow-hidden bg-[#e9e7e1] mb-4">
                  <img
                    src={product.image}
                    alt={getProductName(product)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-semibold text-black text-sm uppercase tracking-wide mb-1">
                  {getProductName(product)}
                </h3>
                <p className="text-xs uppercase tracking-[0.16em] text-black/60 mb-2">
                  {product.brand}
                </p>
                <p className="font-medium text-black">{getProductPriceDisplay(product)}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
