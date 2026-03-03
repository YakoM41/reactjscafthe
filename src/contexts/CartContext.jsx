import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  useEffect,
} from "react";

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  //La fonction fléchée sur le getItem permet de dire a REACT de n'executer la lecture du LocalStorage que lors du 1er rendu. Rend le site plus fluide.
  const [deliveryMethod, setDeliveryMethod] = useState(() => {
    const saved = localStorage.getItem("deliveryMethod");
    return saved || "home";
  });
  const [selectedCarrier, setSelectedCarrier] = useState(() => {
    const saved = localStorage.getItem("selectedCarrier");
    return saved || "colissimo";
  });
  const [activePromo, setActivePromo] = useState(null);
  const [promoError, setPromoError] = useState("");

  // Persist cart items to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Persist delivery method to localStorage
  useEffect(() => {
    localStorage.setItem("deliveryMethod", deliveryMethod);
  }, [deliveryMethod]);

  // Persist selected carrier to localStorage
  useEffect(() => {
    localStorage.setItem("selectedCarrier", selectedCarrier);
  }, [selectedCarrier]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.Référence === product.Référence,
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.Référence === product.Référence
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        return [...prevItems, { ...product, quantity: quantity }];
      }
    });
  };

  const removeFromCart = (productRef) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.Référence !== productRef),
    );
  };

  const updateQuantity = (productRef, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productRef);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.Référence === productRef
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      );
    }
  };
  
  const saveCartToServer = async (userId, cartData) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: cartData }),
      });
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du panier:", error);
    }
  };

  const loadCartFromServer = async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cart/${userId}`);
      if (response.ok) {
        const data = await response.json();
        // On pourrait ajouter une logique de fusion ici
        setCartItems(data.cartItems || []);
      }
    } catch (error) {
      console.error("Erreur lors du chargement du panier:", error);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.Prix_TTC * item.quantity,
      0,
    );
  }, [cartItems]);

  const carrierPrices = {
    colissimo: 6.5,
    chronopost: 12.0,
    relais: 4.5,
  };

  const shippingCost = useMemo(() => {
    if (deliveryMethod === "pickup") return 0;
    return carrierPrices[selectedCarrier] || 0;
  }, [deliveryMethod, selectedCarrier]);

  const applyPromoCode = (code) => {
    const upperCode = code.toUpperCase();
    if (upperCode === "PROMO10") {
      setActivePromo({ code: "PROMO10", type: "percent", value: 0.1 });
      setPromoError("");
      return true;
    } else if (upperCode === "CAFTHE5") {
      setActivePromo({ code: "CAFTHE5", type: "fixed", value: 5 });
      setPromoError("");
      return true;
    } else {
      setActivePromo(null);
      setPromoError("Code promo invalide");
      return false;
    }
  };

  const discount = useMemo(() => {
    if (!activePromo) return 0;
    if (activePromo.type === "percent") {
      return subtotal * activePromo.value;
    } else if (activePromo.type === "fixed") {
      return activePromo.value;
    }
    return 0;
  }, [subtotal, activePromo]);

  const total = useMemo(() => {
    return Math.max(0, subtotal + shippingCost - discount);
  }, [subtotal, shippingCost, discount]);

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
