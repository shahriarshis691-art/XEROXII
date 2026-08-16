import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiHeart, FiPlus, FiMinus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { AppContext } from '../context/AppContext';
import { getProductById, getRelatedProducts } from '../data/catalog';
import { parsePrice, getProductName, getProductPriceDisplay } from '../lib/productUtils';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const foundProduct = getProductById(productId);
    setProduct(foundProduct);
    setQuantity(1);

    if (foundProduct) {
      setLiked(isInWishlist(foundProduct.id));
    }
  }, [productId, isInWishlist]);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#fafaf8] flex items-center justify-center">
        <div className="page-shell text-center">
          <h1 className="text-3xl font-light text-black mb-4">Product Not Found</h1>
          <p className="text-black/60 mb-8">Sorry, we couldn&apos;t find the product you&apos;re looking for.</p>
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-black text-white text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/90 transition"
          >
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const productName = getProductName(product);
  const productPrice = parsePrice(product);
  const relatedProducts = getRelatedProducts(product);
  const stockLimit = product.stock ?? 99;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} item${quantity > 1 ? 's' : ''} to cart`);
    setQuantity(1);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    setLiked(!liked);
    toast.success(liked ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setQuantity(1);
    navigate('/checkout');
  };

  return (
    <main className="min-h-screen bg-[#fafaf8]">
      <Helmet>
        <title>{productName} | XEROXII</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="border-b border-black/10 bg-white">
        <div className="page-shell py-4">
          <nav className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-black/50">
            <Link to="/" className="transition hover:text-black">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to={product.type === 'jewellery' ? '/womens-jewellery-listing' : '/#watches'} className="transition hover:text-black">
              {product.type === 'jewellery' ? 'Jewellery' : 'Watches'}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-black">{product.brand}</span>
            <span aria-hidden="true">/</span>
            <span className="text-black font-semibold truncate">{productName}</span>
          </nav>
        </div>
      </div>

      <div className="page-shell py-12 sm:py-20">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-2">
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full aspect-[3/4] bg-[#e9e7e1] overflow-hidden rounded-sm">
              <img
                src={product.image || product.src}
                alt={productName}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {(product.tag || product.badge) && (
              <span className="mb-6 inline-block w-fit bg-black px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-white">
                {product.tag || product.badge}
              </span>
            )}

            <h1 className="text-4xl sm:text-5xl font-light uppercase tracking-wide text-black mb-4">
              {productName}
            </h1>

            <p className="text-sm uppercase tracking-[0.16em] text-black/60 mb-2">
              {product.brand}
            </p>

            {product.title !== productName && (
              <p className="text-base text-black/70 mb-6 leading-relaxed">{product.title}</p>
            )}

            <div className="mb-8 pb-8 border-b border-black/20">
              <p className="text-sm uppercase tracking-[0.16em] text-black/60 mb-2">Price</p>
              <p className="text-3xl sm:text-4xl font-light text-black">
                ৳ {productPrice.toLocaleString()}
              </p>
              {product.sku && (
                <p className="mt-2 text-xs uppercase tracking-[0.16em] text-black/50">SKU: {product.sku}</p>
              )}
            </div>

            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.16em] text-black/60 mb-3">Description</p>
              <p className="text-base leading-relaxed text-black/70">{product.description}</p>
            </div>

            <div className="mb-8 pb-8 border-b border-black/20">
              <p className="text-sm uppercase tracking-[0.16em] text-black/60 mb-4">Specifications</p>
              <ul className="space-y-2 text-sm text-black/70">
                {product.specs.map((spec, i) => (
                  <li key={i}>• {spec}</li>
                ))}
              </ul>
            </div>

            <div className="mb-8">
              <p className="text-sm uppercase tracking-[0.16em] text-black/60 mb-4">Quantity</p>
              <div className="flex items-center gap-3 border border-black/20 rounded px-2 w-fit">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="py-3 px-3 text-black hover:text-black/60 transition"
                  aria-label="Decrease quantity"
                >
                  <FiMinus size={16} />
                </button>
                <span className="w-8 text-center font-medium text-black">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(stockLimit, quantity + 1))}
                  className="py-3 px-3 text-black hover:text-black/60 transition"
                  aria-label="Increase quantity"
                >
                  <FiPlus size={16} />
                </button>
              </div>
              <p className="mt-2 text-xs text-black/50">{stockLimit} in stock</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row mb-6">
              <button type="button" onClick={handleAddToCart} className="flex-1 py-4 px-6 bg-black text-white text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/90 transition">
                Add to Cart
              </button>
              <button type="button" onClick={handleBuyNow} className="flex-1 py-4 px-6 border border-black/20 text-black text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/5 transition">
                Buy Now
              </button>
            </div>

            <button type="button" onClick={handleWishlist} className="flex items-center justify-center gap-2 py-3 px-4 border border-black/20 text-black text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/5 transition">
              <FiHeart size={16} fill={liked ? 'currentColor' : 'none'} />
              <span>{liked ? 'Saved' : 'Save to Wishlist'}</span>
            </button>
          </motion.div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="py-12 sm:py-20">
          <div className="page-shell">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.16em] text-black/60 mb-2">Related Items</p>
              <h2 className="text-3xl sm:text-4xl font-light uppercase tracking-wide text-black">
                You Might Also Like
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-14">
              {relatedProducts.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group text-center cursor-pointer"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e7e1] mb-4">
                    <img src={item.image} alt={getProductName(item)} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  </div>
                  <h3 className="font-semibold text-black text-sm uppercase tracking-wide mb-1">{getProductName(item)}</h3>
                  <p className="text-xs uppercase tracking-[0.16em] text-black/60 mb-2">{item.brand}</p>
                  <p className="font-medium text-black">{getProductPriceDisplay(item)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
