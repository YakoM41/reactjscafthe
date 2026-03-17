import React, { createContext, useState, useEffect, useContext } from "react";
import { useCart } from "./CartContext";

// Crée un contexte pour l'authentification initialisé à null
export const AuthContext = createContext(null);

// C'est le "fournisseur" de contexte qui enveloppe les parties de l'application
// qui ont besoin de connaître l'état de l'authentification.
export function AuthProvider({ children }) {
  // 'user' stocke les informations de l'utilisateur connecté (ou null s'il n'y en a pas)
  const [user, setUser] = useState(null);
  // 'loading' est utilisé pour savoir si on est en train de vérifier la session
  // Utile pour afficher un écran de chargement pendant la verif
  const [loading, setLoading] = useState(true);
  
  // On récupère les fonctions du contexte du panier pour les utiliser ici
  const { saveCartToServer, loadCartFromServer, clearCart, cartItems } =
    useCart();

  // Ce 'useEffect' se lance une seule fois au chargement de l'application
  // Son but est de vérifier si l'utilisateur a déjà une session active (via cookie).
  useEffect(() => {
    const checkSession = async () => {
      try {
        // On interroge l'API pour savoir "qui je suis" (grâce au cookie envoyé automatiquement)
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/clients/me`,
          { credentials: "include" },
        );
        
        // Si la réponse est positive...
        if (res.ok) {
          const { client } = await res.json();
          // ...on met à jour l'état 'user' avec les info reçues
          setUser(client);
          // Et on charge son panier sauvegardé sur le serveur
          if (client?.id) {
            loadCartFromServer(client.id);
          }
        }
      } catch (err) {
        // Si ça échoue  ça veut juste dire que personne n'est connecté
        console.error("Pas de session active.", err.message);
      } finally {
        // Dans tous les cas on arrête le chargement
        setLoading(false);
      }
    };
    checkSession();
  }, [loadCartFromServer]); // La dépendance est là pour respecter les règles de React

  // Login
  const login = (userData) => {
    // On met à jour l'état 'user'.
    setUser(userData);
    // Si l'utilisateur a un ID on charge son panier
    if (userData?.id) {
      loadCartFromServer(userData.id);
    }
  };

  // MàJ des informations du profil
  const updateUser = async (newProfileData) => {
    try {
      // On envoie les nouvelles données à l'API
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/clients/me`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProfileData),
          credentials: "include",
        },
      );

      // Si l'API renvoie une erreur, on la propage.
      if (!res.ok) {
        const errorBody = await res.json();
        throw new Error(errorBody.message || "La mise à jour a échoué.");
      }

      const { client } = await res.json();
      // On met à jour le state avec les données fraîches renvoyées par le serveur.
      setUser(client); 
      return { success: true };
    } catch (err) {
      console.error("Erreur mise à jour profil:", err);
      return { success: false, error: err.message };
    }
  };

  // Deconnexion
  const logout = async () => {
    // C'est important de sauvegarder le panier avant de détruire la session.
    if (user?.id) {
      await saveCartToServer(user.id, cartItems);
    }
    
    try {
      // On appelle l'API pour supp la session côté serveur
      await fetch(`${import.meta.env.VITE_API_URL}/api/clients/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Erreur lors de la déconnexion:", err);
    }
    
    // On vide l'utilisateur et le panier du state local
    setUser(null);
    clearCart();
  };

  // On prépare l'objet 'value' qui sera partagé à tous les composants enfants.
  const value = {
    user,
    login,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user, // '!!user' est une astuce pour convertir l'objet 'user' en booléen (true si user existe, false si null).
  };

  // Le Provider rend disponible la 'value' à toute l'application
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Un "custom hook" pour utiliser plus facilement le contexte dans les autres composants
export const useAuth = () => useContext(AuthContext);
