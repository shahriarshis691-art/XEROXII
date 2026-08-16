import { createContext, useState, useEffect } from 'react';
import { normalizeProduct, parsePrice } from '../lib/productUtils';
import { readStorage, writeStorage } from '../lib/storage';
import { persistOrder } from '../lib/orderService';
import { getProductById } from '../data/catalog';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage('xeroxii_cart', []));
  const [wishlist, setWishlist] = useState(() => readStorage('xeroxii_wishlist', []));
  const [user, setUser] = useState(null);
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

  const getStockLimit = (productId) => {
    const catalogProduct = getProductById(productId);
    return catalogProduct?.stock ?? 99;
  };

  const addToCart = (product, quantity = 1) => {
    const normalized = normalizeProduct(product);
    const stockLimit = getStockLimit(normalized.id);

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === normalized.id);
      const currentQty = existingItem?.quantity ?? 0;
      const newQty = Math.min(currentQty + quantity, stockLimit);

      if (existingItem) {
        return prevCart.map(item =>
          item.id === normalized.id ? { ...item, quantity: newQty } : item
        );
      }
      return [...prevCart, { ...normalized, quantity: Math.min(quantity, stockLimit) }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const stockLimit = getStockLimit(productId);
    const cappedQty = Math.min(quantity, stockLimit);

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: cappedQty } : item
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

  const placeOrder = async (shippingInfo, paymentInfo) => {
    if (cart.length === 0) return null;

    const order = {
      id: generateOrderId(),
      items: cart,
      subtotal: cartTotal,
      shippingFee: 0,
      tax: Math.floor(cartTotal * 0.1),
      total: cartTotal + Math.floor(cartTotal * 0.1),
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
    isLoading,
    setIsLoading,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
