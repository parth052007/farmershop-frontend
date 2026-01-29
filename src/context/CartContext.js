import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
  setCart(prevCart => {
    const exists = prevCart.find(p => p._id === product._id);

    if (exists) {
      return prevCart.map(p =>
        p._id === product._id
          ? { ...p, qty: p.qty + 1 }
          : p
      );
    }

    return [...prevCart, { ...product, qty: 1 }];
  });
};

const removeFromCart = (_id) => {
  setCart(prevCart =>
    prevCart.filter(p => p._id !== _id)
  );
};


  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
