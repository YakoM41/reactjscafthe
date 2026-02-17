import React, { createContext, useState, useMemo, useContext } from 'react';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.Référence === product.Référence);
      if (existingItem) {
        return prevItems.map(item =>
          item.Référence === product.Référence
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: quantity }];
      }
    });
  };

  const removeFromCart = (productRef) => {
    setCartItems(prevItems => prevItems.filter(item => item.Référence !== productRef));
  };

  const updateQuantity = (productRef, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productRef);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.Référence === productRef
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.Prix_TTC * item.quantity, 0);
  }, [cartItems]);

  const shippingCost = 6.50; // Mock shipping cost

  const total = useMemo(() => {
    return subtotal + shippingCost;
  }, [subtotal, shippingCost]);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingCost,
    total
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
