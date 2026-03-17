import React from "react";
import { useCart } from "../../contexts/CartContext.jsx";

// Ce composant représente la première étape du tunnel d'achat : le récapitulatif du panier.
const CartStep = ({ onNext }) => {
  // 'onNext' est une fonction passée par le composant parent (Checkout.jsx).
  // Ce composant n'a pas besoin de savoir ce que fait 'onNext', il se contente de l'appeler quand on clique sur Continuer

  // On récupère toutes les informations et fonctions nécessaires depuis le contexte du panier.
  // permet à ce composant d'être synchro avec le reste de l'application.
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    subtotal,
    shippingCost,
    total,
  } = useCart();

  // fonction pour formater les prix
  const formatPrice = (price) => {
    return price.toFixed(2).replace(".", ",") + "€";
  };

  return (
    <div className="cart-step">
      <h2>Votre Panier</h2>

      {/* On vérifie si le panier est vide */}
      {cartItems.length === 0 ? (
        // Si oui on affiche un message
        <p>Votre panier est vide.</p>
      ) : (
        // Sinon on affiche la liste des produits et le résumé
        <>
          <div className="cart-items">
            {/* On boucle sur chaque article du panier pour l'afficher */}
            {cartItems.map((item) => {
              // On construit l'URL de l'image et si l'image n'existe pas on utilise une image par défaut
              const imageUrl = item.Images
                ? `${import.meta.env.VITE_API_URL}/images/${item.Images}`
                : "https://placehold.co/600x400";

              return (
                // La 'key' est essentielle pour que React puisse optimiser le rendu de la liste
                // On utilise un identifiant unique du produit (Référence) plutôt que l'index par sécurité
                <div key={item.Référence} className="cart-item">
                  <img
                    src={imageUrl}
                    alt={item.Nom_produit}
                    className="item-image"
                  />
                  <div className="item-details">
                    <h3>{item.Nom_produit}</h3>
                    {item.size && <p>{item.size}</p>}
                    <div className="quantity-selector">
                      {/* Bouton pour diminuer la quantité */}
                      <button
                        onClick={() =>
                          updateQuantity(item.Référence, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      {/* Bouton pour augmenter la quantité */}
                      <button
                        onClick={() =>
                          updateQuantity(item.Référence, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="item-price">
                    {/* On affiche le prix TOTAL pour cet article (prix unitaire * quantité) */}
                    <span>{formatPrice(item.Prix_TTC * item.quantity)}</span>
                    {/* Bouton pour supprimer l'article du panier */}
                    <button
                      className="remove-button"
                      onClick={() => removeFromCart(item.Référence)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section qui résume la commande */}
          <div className="cart-summary">
            <h3>Résumé de la commande</h3>
            <div className="summary-row">
              <span>Sous-total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-row">
              <span>Livraison</span>
              <span>{formatPrice(shippingCost)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </>
      )}

      {/* Actions de l'étape */}
      <div className="step-actions">
        {/* Le bouton Continuer est désactivé SI le panier est vide */}
        <button
          className="btn-primary"
          onClick={onNext}
          disabled={cartItems.length === 0}
        >
          Continuer
        </button>
      </div>
    </div>
  );
};

export default CartStep;
