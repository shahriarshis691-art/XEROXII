import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiHeart, FiShoppingBag, FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { AppContext } from '../context/AppContext';
import { getProductName, getProductPriceDisplay } from '../lib/productUtils';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useContext(AppContext);

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    toast.success('Added to cart');
  };

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
    toast.success('Removed from wishlist');
  };

  return (
    <main className="min-h-screen bg-[#fafaf8] py-8 sm:py-16">
      <Helmet>
        <title>Wishlist | XEROXII</title>
      </Helmet>
      <div className="page-shell">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-light uppercase tracking-wide text-black mb-2">
            Wishlist
          </h1>
          <p className="text-sm uppercase tracking-[0.16em] text-black/60">
            {wishlist.length === 0 ? 'No saved items' : `${wishlist.length} saved item${wishlist.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {wishlist.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FiHeart size={48} className="text-black/20 mb-6" />
            <p className="text-lg text-black/60 mb-8">Your wishlist is empty</p>
            <Link
              to="/"
              className="px-8 py-3 bg-black text-white text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/90 transition"
            >
              Explore Collections
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 sm:gap-x-6 sm:gap-y-12">
            {wishlist.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative text-center"
              >
                <Link to={`/product/${item.id}`} className="block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e7e1] mb-4">
                    <img
                      src={item.src || item.image}
                      alt={getProductName(item)}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-semibold text-black text-sm uppercase tracking-wide mb-1">
                    {getProductName(item)}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.16em] text-black/60 mb-2">
                    {item.brand}
                  </p>
                  <p className="font-medium text-black">{getProductPriceDisplay(item)}</p>
                </Link>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    onClick={() => handleMoveToCart(item)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white text-xs font-medium uppercase tracking-[0.16em] hover:bg-black/90 transition"
                  >
                    <FiShoppingBag size={14} />
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 border border-black/20 text-black text-xs font-medium uppercase tracking-[0.16em] hover:bg-black/5 transition"
                    aria-label="Remove from wishlist"
                  >
                    <FiX size={14} />
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
