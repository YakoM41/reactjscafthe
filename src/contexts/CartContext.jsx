import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  useEffect,
} from "react";
import { toast } from "react-toastify";

// Crée le contexte du panier
export const CartContext = createContext();

// Hook personnalisé pour utiliser le contexte du panier plus simplement
export const useCart = () => useContext(CartContext);

// Permet l'utilisation du contexte panier
export const CartProvider = ({ children }) => {
  // 'cartItems' stocke la liste des produits dans le panier
  // On initialise cet état en lisant le localStorage
  // La fonction dans useState ne s'exécute qu'une seule fois, càd au montage pour une meilleure perf
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localCart = localStorage.getItem("cartItems");
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      console.error(
        "Erreur de parsing du panier depuis le localStorage",
        error,
      );
      return [];
    }
  });

  // États pour les options de livraison et les promo
  const [deliveryMethod, setDeliveryMethod] = useState(
    () => localStorage.getItem("deliveryMethod") || "home",
  );
  const [selectedCarrier, setSelectedCarrier] = useState(
    () => localStorage.getItem("selectedCarrier") || "colissimo",
  );
  const [activePromo, setActivePromo] = useState(null);
  const [promoError, setPromoError] = useState("");

  // Ce 'useEffect' sauvegarde le panier dans le localStorage à chaque fois qu'il change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Sauvegarde des options de livraison dans le localStorage
  useEffect(() => {
    localStorage.setItem("deliveryMethod", deliveryMethod);
  }, [deliveryMethod]);

  useEffect(() => {
    localStorage.setItem("selectedCarrier", selectedCarrier);
  }, [selectedCarrier]);

  // --- Fonctions de modification du panier ---

  const addToCart = (product, quantity = 1) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.Référence === product.Référence,
      );

      // Si l'article existe déjà, on augmente juste sa quantité.
      // Sinon, on l'ajoute au tableau.
      return existingItem
        ? currentItems.map((item) =>
            item.Référence === product.Référence
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        : [...currentItems, { ...product, quantity }];
    });
    toast.success(`${product.Nom_produit} a été ajouté au panier !`);
  };

  const removeFromCart = (productRef) => {
    // On trouve le produit pour pouvoir afficher son nom dans la notification
    const itemToRemove = cartItems.find(
      (item) => item.Référence === productRef,
    );
    if (itemToRemove) {
      // On filtre le tableau pour garder uniquement les articles qui n'ont pas la référence du produit qu'on veut supprimer
      setCartItems((currentItems) =>
        currentItems.filter((item) => item.Référence !== productRef),
      );
      toast.error(`${itemToRemove.Nom_produit} a été retiré du panier.`);
    }
  };

  const updateQuantity = (productRef, newQuantity) => {
    // Si la nouvelle quantité est 0 on supprime l'article
    if (newQuantity < 1) {
      removeFromCart(productRef);
    } else {
      // Sinon, on met à jour la quantité de l'article concerné
      setCartItems((currentItems) =>
        currentItems.map((item) =>
          item.Référence === productRef
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      );
    }
  };

  // --- Communication avec l'API ---

  const saveCartToServer = async (userId, cartData) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: cartData }),
      });
    } catch (err) {
      console.error("Erreur lors de la sauvegarde du panier:", err);
    }
  };

  const loadCartFromServer = async (userId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/cart/${userId}`,
      );
      if (res.ok) {
        const data = await res.json();
        setCartItems(data.cartItems || []);
      }
    } catch (err) {
      console.error("Erreur lors du chargement du panier:", err);
    }
  };

  // Fonction pour vider le panier
  const clearCart = () => {
    setCartItems([]);
  };

  // --- Calculs mémorisés (pour la performance) ---
  // useMemo évite de recalculer ces valeurs à chaque rendu sauf si 'cartItems' change

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + (item.Prix_TTC || 0) * item.quantity,
      0,
    );
  }, [cartItems]);

  const carrierPrices = {
    colissimo: 6.5,
    chronopost: 12.0,
    relais: 4.5,
  };

  const shippingCost = useMemo(() => {
    return deliveryMethod === "pickup"
      ? 0
      : carrierPrices[selectedCarrier] || 0;
  }, [deliveryMethod, selectedCarrier]);

  const applyPromoCode = (code) => {
    const upperCode = code.toUpperCase();
    if (upperCode === "PROMO10") {
      setActivePromo({ code: "PROMO10", type: "percent", value: 0.1 });
      setPromoError("");
      return true;
    }
    if (upperCode === "CAFTHE5") {
      setActivePromo({ code: "CAFTHE5", type: "fixed", value: 5 });
      setPromoError("");
      return true;
    }
    setActivePromo(null);
    setPromoError("Code promo invalide");
    return false;
  };

  const discount = useMemo(() => {
    if (!activePromo) return 0;
    return activePromo.type === "percent"
      ? subtotal * activePromo.value
      : activePromo.value;
  }, [subtotal, activePromo]);

  const total = useMemo(() => {
    return Math.max(0, subtotal + shippingCost - discount);
  }, [subtotal, shippingCost, discount]);

  // On prépare l'objet 'value' qui sera partagé
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingCost,
    discount,
    activePromo,
    promoError,
    applyPromoCode,
    total,
    deliveryMethod,
    setDeliveryMethod,
    selectedCarrier,
    setSelectedCarrier,
    carrierPrices,
    saveCartToServer,
    loadCartFromServer,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
