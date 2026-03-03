import React, { createContext, useState, useEffect, useContext } from "react";
import { useCart } from "./CartContext"; // 1. Importer useCart

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { saveCartToServer, loadCartFromServer, clearCart, cartItems } = useCart(); // 2. Récupérer les fonctions

  // Verifie si un cookie de session valide existe
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/clients/me`,
          { credentials: "include" },
        );

        if (response.ok) {
          const data = await response.json();
          setUser(data.client);
          // Charger le panier si la session est valide
          if (data.client && data.client.id) {
            loadCartFromServer(data.client.id);
          }
        }
      } catch (error) {
        console.error("Erreur vérification session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = (userData) => {
    setUser(userData);
    // 3. Charger le panier du serveur après la connexion
    if (userData && userData.id) {
      loadCartFromServer(userData.id);
    }
  };

  const updateUser = async (updatedData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/clients/me`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
          credentials: "include",
        },
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour");
      }

      const data = await response.json();
      // Assuming the API returns the updated user in the same format as /me
      setUser(data.client || { ...user, ...updatedData }); 
      return { success: true };
    } catch (error) {
      console.error("Erreur mise à jour profil:", error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    // 4. Sauvegarder le panier AVANT de se déconnecter
    if (user && user.id) {
      await saveCartToServer(user.id, cartItems);
    }
    
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/clients/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
    
    setUser(null);
    // 5. Vider le panier localement APRES la déconnexion
    clearCart();
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
