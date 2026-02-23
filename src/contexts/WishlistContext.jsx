import React, { createContext, useState, useContext, useEffect } from 'react';

export const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlistItems');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Persist wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      const exists = prevItems.find(item => item.Référence === product.Référence);
      if (exists) {
        return prevItems;
      }
      return [...prevItems, product];
    });
  };

  const removeFromWishlist = (productRef) => {
    setWishlistItems(prevItems => 
      prevItems.filter(item => item.Référence !== productRef)
    );
  };

  const isInWishlist = (productRef) => {
    return wishlistItems.some(item => item.Référence === productRef);
  };

  const toggleWishlist = (product) => {
    if (isInWishlist(product.Référence)) {
      removeFromWishlist(product.Référence);
    } else {
      addToWishlist(product);
    }
  };

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
