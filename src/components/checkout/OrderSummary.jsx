import React, { useState } from "react";
import { useCart } from "../../contexts/CartContext.jsx";

// On affiche le résumé de la commande sur le côté
const OrderSummary = () => {
  // On récupère toutes les données et fonctions nécessaires du CartContext
  const {
    subtotal,
    shippingCost,
    discount,
    total,
    deliveryMethod,
    applyPromoCode,
    activePromo,
    promoError,
  } = useCart();

  // État local pour stocker la valeur de l'input du code promo
  const [promoCodeInput, setPromoCodeInput] = useState("");

  // Fonction pour formater les prix.
  const formatPrice = (price) => {
    return price.toFixed(2).replace(".", ",") + "€";
  };

  // Fonction appelée quand on clique sur "Appliquer".
  const handleApplyPromo = () => {
    // On utilise la fonction du contexte pour vérifier le code.
    applyPromoCode(promoCodeInput);
  };

  return (
    <div className="order-summary">
      <h3>Récapitulatif</h3>

      {/* Affiche le sous-total */}
      <div className="summary-row">
        <span>Sous-total</span>
        <span>{formatPrice(subtotal)}</span>
      </div>

      {/* Affiche les frais de livraison */}
      <div className="summary-row">
        <span>Livraison</span>
        <span>
          {shippingCost === 0 ? "Gratuit" : formatPrice(shippingCost)}
        </span>
      </div>

      {/* Section pour entrer un code promo */}
      <div className="promo-code-section">
        <input
          type="text"
          placeholder="Code promo"
          value={promoCodeInput}
          onChange={(e) => setPromoCodeInput(e.target.value)}
          className="promo-code-input"
        />
        <button onClick={handleApplyPromo} className="promo-code-button">
          Appliquer
        </button>
        {/* Affiche un message d'erreur si le code est invalide */}
        {promoError && <p className="promo-error-message">{promoError}</p>}
        {/* Affiche un message de succès si le code est valide */}
        {activePromo && (
          <p className="promo-success-message">
            Code "{activePromo.code}" appliqué !
          </p>
        )}
      </div>

      {/* Si une remise est appliquée, on affiche la ligne correspondante. */}
      {discount > 0 && (
        <div className="summary-row discount-row">
          <span>Remise ({activePromo?.code})</span>
          <span>- {formatPrice(discount)}</span>
        </div>
      )}

      {/* Affiche le total final */}
      <div className="summary-total">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>

      {/* Informations supplémentaires */}
      <div className="summary-info">
        {deliveryMethod === "pickup" && <p>✓ Retrait en magasin gratuit</p>}
        {deliveryMethod === "home" && (
          <p>✓ Livraison gratuite à partir de 50€</p>
        )}
        <p>✓ Paiement 100% sécurisé</p>
      </div>
    </div>
  );
};

export default OrderSummary;
