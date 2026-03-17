import React, { createContext, useState, useContext, useEffect } from "react";

// Crée un contexte pour la liste de favoris.
export const WishlistContext = createContext();

// Hook personnalisé pour utiliser plus facilement le contexte.
export const useWishlist = () => useContext(WishlistContext);

// Fournisseur du contexte de la liste de favoris.
export const WishlistProvider = ({ children }) => {
  // 'wishlistItems' stocke la liste des produits favoris.
  // On initialise cet état en lisant le localStorage.
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlistItems");
      return savedWishlist ? JSON.parse(savedWishlist) : [];
    } catch (error) {
      console.error(
        "Erreur de parsing de la wishlist depuis le localStorage",
        error,
      );
      return [];
    }
  });

  // Ce 'useEffect' sauvegarde la liste de favoris dans le localStorage à chaque fois qu'elle change.
  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Ajoute un produit à la liste de favoris.
  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      // On vérifie si le produit n'est pas déjà dans la liste pour éviter les doublons.
      const exists = prevItems.find(
        (item) => item.Référence === product.Référence,
      );
      if (exists) {
        return prevItems; // Si oui, on ne change rien.
      }
      return [...prevItems, product]; // Sinon, on l'ajoute.
    });
  };

  // Retire un produit de la liste
  const removeFromWishlist = (productRef) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.Référence !== productRef),
    );
  };

  // Vérifie si un produit est déjà dans la liste
  const isInWishlist = (productRef) => {
    return wishlistItems.some((item) => item.Référence === productRef);
  };

  // Fonction "interrupteur" : ajoute ou retire un produit de la liste
  const toggleWishlist = (product) => {
    if (isInWishlist(product.Référence)) {
      removeFromWishlist(product.Référence);
    } else {
      addToWishlist(product);
    }
  };

  // On prépare l'objet 'value' qui sera partagé.
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
