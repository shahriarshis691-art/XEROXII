import { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('xeroxii_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('xeroxii_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('xeroxii_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('xeroxii_cart', JSON.stringify(cart));
  }, [cart]);

  // Persist wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('xeroxii_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Persist orders to localStorage
  useEffect(() => {
    localStorage.setItem('xeroxii_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
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
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => {
    const price = typeof item.price === 'string'
      ? parseInt(item.price.replace(/[^\d]/g, ''))
      : item.price;
    return total + (price * item.quantity);
  }, 0);

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Wishlist operations
  const addToWishlist = (product) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.find(item => item.id === product.id);
      if (exists) return prevWishlist;
      return [...prevWishlist, product];
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

  // Order operations
  const generateOrderId = () => {
    return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  const placeOrder = (shippingInfo, paymentInfo) => {
    if (cart.length === 0) return null;

    const order = {
      id: generateOrderId(),
      items: cart,
      subtotal: cartTotal,
      shippingFee: 0, // Can be dynamic based on address
      tax: Math.floor(cartTotal * 0.1), // 10% tax
      total: cartTotal + Math.floor(cartTotal * 0.1),
      shippingInfo,
      paymentInfo: {
        method: paymentInfo.method,
        last4: paymentInfo.method === 'card' ? paymentInfo.cardLast4 : null,
      },
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setOrders(prevOrders => [...prevOrders, order]);
    clearCart();
    return order;
  };

  const getOrderHistory = () => {
    return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const value = {
    // Cart
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    cartItemCount,

    // Wishlist
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,

    // Orders
    orders,
    placeOrder,
    getOrderHistory,
    getOrderById,

    // User
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
