import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Chronograph No. 01",
      price: 8400,
      quantity: 1,
      image: "/src/assets/watch.jpg",
    },
  ]);

  const addItem = (product) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id && (item.category || "") === (product.category || ""));
      if (existing) {
        return current.map((item) => (item.id === product.id && (item.category || "") === (product.category || "") ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta, category) => {
    setItems((current) => current.flatMap((item) => (item.id === id && (item.category || "") === (category || "") ? (item.quantity + delta > 0 ? [{ ...item, quantity: item.quantity + delta }] : []) : [item])));
  };

  const removeItem = (id, category) => {
    setItems((current) => current.filter((item) => !(item.id === id && (item.category || "") === (category || ""))));
  };

  const value = useMemo(() => ({ items, addItem, updateQuantity, removeItem }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
