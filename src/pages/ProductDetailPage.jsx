import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useContext, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Seo from '../components/Seo';
import { productSchema, breadcrumbSchema } from '../lib/schema';
import OptimizedImage from '../components/OptimizedImage';
import { FiHeart, FiPlus, FiMinus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { AppContext } from '../context/AppContext';
import { getProductById, getRelatedProducts } from '../data/catalog';
import { parsePrice, getProductName } from '../lib/productUtils';

function VariantSelector({ label, options, value, onChange }) {
  if (!options?.length) return null;
  return (
    <div className="mb-6">
      <p className="text-sm uppercase tracking-[0.16em] text-black/60 mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] border transition ${
              value === option
                ? 'border-black bg-black text-white'
                : 'border-black/20 text-black hover:border-black'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, formatMoney } = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const foundProduct = getProductById(productId);
    setProduct(foundProduct);
    setQuantity(1);
    setActiveImage(0);

    if (foundProduct?.variants) {
      const defaults = {};
      Object.entries(foundProduct.variants).forEach(([key, opts]) => {
        defaults[key] = opts[0];
      });
      setSelectedVariants(defaults);
    } else {
      setSelectedVariants({});
    }

    if (foundProduct) {
      setLiked(isInWishlist(foundProduct.id));
    }
  }, [productId, isInWishlist]);

  const relatedProducts = useMemo(() => (product ? getRelatedProducts(product) : []), [product]);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#fafaf8] flex items-center justify-center">
        <div className="page-shell text-center">
          <h1 className="text-3xl font-light text-black mb-4">Product Not Found</h1>
          <p className="text-black/60 mb-8">Sorry, we couldn&apos;t find the product you&apos;re looking for.</p>
          <Link to="/" className="inline-block px-8 py-3 bg-black text-white text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/90 transition">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const productName = getProductName(product);
  const productPrice = parsePrice(product);
  const stockLimit = product.stock ?? 99;
  const gallery = product.images?.length ? product.images : [product.image];

  const handleVariantChange = (key, value) => {
    setSelectedVariants((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddToCart = () => {
    addToCart(
      { ...product, selectedVariants: selectedVariants },
      quantity,
      { variants: selectedVariants }
    );
    toast.success(`Added ${quantity} item${quantity > 1 ? 's' : ''} to cart`);
    setQuantity(1);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
    setLiked(!liked);
    toast.success(liked ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleBuyNow = () => {
    addToCart({ ...product, selectedVariants }, quantity, { variants: selectedVariants });
    setQuantity(1);
    navigate('/checkout');
  };

  const variantLabels = {
    strap: 'Strap',
    caseSize: 'Case Size',
    dial: 'Dial Color',
    metal: 'Metal',
    size: 'Size',
  };

  return (
    <main className="min-h-screen bg-[#fafaf8] pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0">
      <Seo
        title={productName}
        description={product.description}
        path={`/product/${product.id}`}
        image={product.image}
        type="product"
        jsonLd={[
          productSchema(product),
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: product.type === 'jewellery' ? 'Jewellery' : 'Watches', url: product.type === 'jewellery' ? '/womens-jewellery-listing' : '/#watches' },
            { name: product.brand, url: null },
            { name: productName, url: `/product/${product.id}` },
          ]),
        ]}
      />

      <div className="border-b border-black/10 bg-white">
        <div className="page-shell py-4">
          <nav className="flex min-w-0 flex-wrap items-center gap-2 overflow-hidden text-[0.65rem] uppercase tracking-[0.18em] text-black/50">
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
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="w-full aspect-[3/4] bg-[#e9e7e1] overflow-hidden rounded-sm mb-4">
              <OptimizedImage
                src={gallery[activeImage]}
                alt={productName}
                className="w-full h-full object-cover"
                priority
                width={800}
                height={1067}
              />
            </div>
            {gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`h-20 w-16 shrink-0 overflow-hidden border-2 transition ${activeImage === i ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div className="flex flex-col justify-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            {(product.tag || product.badge) && (
              <span className="mb-6 inline-block w-fit bg-black px-3 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-white">
                {product.tag || product.badge}
              </span>
            )}

            <h1 className="mb-4 break-words text-3xl font-light uppercase tracking-wide text-black sm:text-5xl">{productName}</h1>
            <p className="text-sm uppercase tracking-[0.16em] text-black/60 mb-2">{product.brand}</p>
            {product.title !== productName && (
              <p className="text-base text-black/70 mb-6 leading-relaxed">{product.title}</p>
            )}

            <div className="mb-8 pb-8 border-b border-black/20">
              <p className="text-sm uppercase tracking-[0.16em] text-black/60 mb-2">Price</p>
              <p className="text-3xl font-light text-black sm:text-4xl">{formatMoney(productPrice)}</p>
              {product.sku && <p className="mt-2 text-xs uppercase tracking-[0.16em] text-black/50">SKU: {product.sku}</p>}
            </div>

            {product.variants && Object.entries(product.variants).map(([key, options]) => (
              <VariantSelector
                key={key}
                label={variantLabels[key] || key}
                options={options}
                value={selectedVariants[key]}
                onChange={(val) => handleVariantChange(key, val)}
              />
            ))}

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

            <div className="mb-8 hidden lg:block">
              <p className="text-sm uppercase tracking-[0.16em] text-black/60 mb-4">Quantity</p>
              <div className="flex items-center gap-3 border border-black/20 rounded px-2 w-fit">
                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="py-3 px-3 text-black hover:text-black/60 transition" aria-label="Decrease quantity">
                  <FiMinus size={16} />
                </button>
                <span className="w-8 text-center font-medium text-black">{quantity}</span>
                <button type="button" onClick={() => setQuantity(Math.min(stockLimit, quantity + 1))} className="py-3 px-3 text-black hover:text-black/60 transition" aria-label="Increase quantity">
                  <FiPlus size={16} />
                </button>
              </div>
              <p className="mt-2 text-xs text-black/50">{stockLimit} in stock</p>
            </div>

            <div className="hidden lg:flex flex-col gap-3 sm:flex-row mb-6">
              <button type="button" onClick={handleAddToCart} className="flex-1 py-4 px-6 bg-black text-white text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/90 transition">
                Add to Cart
              </button>
              <button type="button" onClick={handleBuyNow} className="flex-1 py-4 px-6 border border-black/20 text-black text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/5 transition">
                Buy Now
              </button>
            </div>

            <button type="button" onClick={handleWishlist} className="hidden lg:flex items-center justify-center gap-2 py-3 px-4 border border-black/20 text-black text-sm font-medium uppercase tracking-[0.16em] hover:bg-black/5 transition">
              <FiHeart size={16} fill={liked ? 'currentColor' : 'none'} />
              <span>{liked ? 'Saved' : 'Save to Wishlist'}</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white/95 p-3 backdrop-blur-sm lg:hidden" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
        <div className="page-shell flex items-center gap-2 px-0 sm:gap-3">
          <div className="flex shrink-0 items-center border border-black/20">
            <button type="button" className="inline-flex h-11 w-11 items-center justify-center" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease"><FiMinus size={14} /></button>
            <span className="w-6 text-center text-sm">{quantity}</span>
            <button type="button" className="inline-flex h-11 w-11 items-center justify-center" onClick={() => setQuantity(Math.min(stockLimit, quantity + 1))} aria-label="Increase"><FiPlus size={14} /></button>
          </div>
          <button type="button" onClick={handleAddToCart} className="min-h-11 min-w-0 flex-1 truncate bg-black px-3 py-3 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-white sm:text-xs sm:tracking-[0.16em]">
            Add to Cart — {formatMoney(productPrice * quantity)}
          </button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="py-12 sm:py-20">
          <div className="page-shell">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.16em] text-black/60 mb-2">Related Items</p>
              <h2 className="text-3xl sm:text-4xl font-light uppercase tracking-wide text-black">You Might Also Like</h2>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-12 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-14">
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
                    <img src={item.image} alt={getProductName(item)} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <h3 className="mb-1 text-[0.65rem] font-semibold uppercase tracking-wide text-black sm:text-sm">{getProductName(item)}</h3>
                  <p className="text-xs uppercase tracking-[0.16em] text-black/60 mb-2">{item.brand}</p>
                  <p className="font-medium text-black">{formatMoney(parsePrice(item))}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
