import { createContext, useState, useEffect } from 'react';
import { normalizeProduct, parsePrice } from '../lib/productUtils';
import { readStorage, writeStorage } from '../lib/storage';
import { persistOrder } from '../lib/orderService';
import { getProductById } from '../data/catalog';
import { onAuthStateChange } from '../lib/authService';

export const AppContext = createContext();

function getCartLineId(productId, variants) {
  if (!variants || !Object.keys(variants).length) return productId;
  return `${productId}::${Object.entries(variants).map(([k, v]) => `${k}-${v}`).join('_')}`;
}

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage('xeroxii_cart', []));
  const [wishlist, setWishlist] = useState(() => readStorage('xeroxii_wishlist', []));
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(() => readStorage('xeroxii_profile', {}));
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState(() => readStorage('xeroxii_orders', []));

  useEffect(() => {
    writeStorage('xeroxii_cart', cart);
  }, [cart]);

  useEffect(() => {
    writeStorage('xeroxii_wishlist', wishlist);
  }, [wishlist]);

  useEffect(() => {
    writeStorage('xeroxii_orders', orders);
  }, [orders]);

  useEffect(() => {
    writeStorage('xeroxii_profile', profile);
  }, [profile]);

  useEffect(() => {
    const { data: { subscription } } = onAuthStateChange((authUser) => {
      setUser(authUser);
    });
    return () => subscription.unsubscribe();
  }, []);

  const updateProfile = (updates) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const getStockLimit = (productId) => {
    const catalogProduct = getProductById(productId);
    return catalogProduct?.stock ?? 99;
  };

  const addToCart = (product, quantity = 1, options = {}) => {
    const normalized = normalizeProduct(product);
    const variants = options.variants || product.selectedVariants || null;
    const cartLineId = getCartLineId(normalized.id, variants);
    const stockLimit = getStockLimit(normalized.id);

    setCart(prevCart => {
      const existingItem = prevCart.find(item => (item.cartLineId || item.id) === cartLineId);
      const currentQty = existingItem?.quantity ?? 0;
      const newQty = Math.min(currentQty + quantity, stockLimit);

      if (existingItem) {
        return prevCart.map(item =>
          (item.cartLineId || item.id) === cartLineId
            ? { ...item, quantity: newQty }
            : item
        );
      }
      return [...prevCart, {
        ...normalized,
        quantity: Math.min(quantity, stockLimit),
        cartLineId,
        selectedVariants: variants,
      }];
    });
  };

  const removeFromCart = (cartLineId) => {
    setCart(prevCart => prevCart.filter(item => (item.cartLineId || item.id) !== cartLineId));
  };

  const updateCartQuantity = (cartLineId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartLineId);
      return;
    }
    const item = cart.find(i => (i.cartLineId || i.id) === cartLineId);
    const stockLimit = getStockLimit(item?.id);
    const cappedQty = Math.min(quantity, stockLimit);

    setCart(prevCart =>
      prevCart.map(item =>
        (item.cartLineId || item.id) === cartLineId ? { ...item, quantity: cappedQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (total, item) => total + parsePrice(item) * item.quantity,
    0
  );

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  const addToWishlist = (product) => {
    const normalized = normalizeProduct(product);
    setWishlist(prevWishlist => {
      const exists = prevWishlist.find(item => item.id === normalized.id);
      if (exists) return prevWishlist;
      return [...prevWishlist, normalized];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const generateOrderId = () => {
    return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  const placeOrder = async (shippingInfo, paymentInfo, currencyMeta = null) => {
    if (cart.length === 0) return null;

    const subtotalBDT = cartTotal;
    const taxBDT = Math.floor(cartTotal * 0.1);
    const totalBDT = subtotalBDT + taxBDT;

    const order = {
      id: generateOrderId(),
      items: cart,
      subtotalBDT,
      taxBDT,
      totalBDT,
      subtotal: currencyMeta?.subtotal ?? subtotalBDT,
      shippingFee: 0,
      tax: currencyMeta?.tax ?? taxBDT,
      total: currencyMeta?.total ?? totalBDT,
      currency: currencyMeta?.currency ?? 'BDT',
      currencySymbol: currencyMeta?.currencySymbol ?? '৳',
      exchangeRate: currencyMeta?.exchangeRate ?? 1,
      shippingInfo,
      paymentInfo: {
        method: paymentInfo.method,
        last4: paymentInfo.method === 'card' ? paymentInfo.cardLast4 : null,
      },
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    await persistOrder(order);

    setOrders(prevOrders => [...prevOrders, order]);
    clearCart();
    return order;
  };

  const getOrderHistory = () => {
    return [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    orders,
    placeOrder,
    getOrderHistory,
    getOrderById,
    user,
    setUser,
    profile,
    updateProfile,
    isLoading,
    setIsLoading,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
