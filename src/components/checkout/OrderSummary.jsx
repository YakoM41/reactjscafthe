import React, { useContext, useState } from "react";
import { useCart } from "../../contexts/CartContext.jsx"; // Using useCart hook

const OrderSummary = () => {
  const {
    subtotal,
    shippingCost,
    discount, // Added discount
    total,
    deliveryMethod,
    applyPromoCode, // Added applyPromoCode function
    activePromo, // Added activePromo state
    promoError, // Added promoError state
  } = useCart(); // Using useCart hook

  const [promoCodeInput, setPromoCodeInput] = useState("");

  const formatPrice = (price) => {
    return price.toFixed(2).replace(".", ",") + "€";
  };

  const handleApplyPromo = () => {
    applyPromoCode(promoCodeInput);
  };

  return (
    <div className="order-summary">
      <h3>Récapitulatif</h3>
      <div className="summary-row">
        <span>Sous-total</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="summary-row">
        <span>Livraison</span>
        <span>
          {shippingCost === 0 ? "Gratuit" : formatPrice(shippingCost)}
        </span>
      </div>

      {/* Promo Code Input Section */}
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
        {promoError && <p className="promo-error-message">{promoError}</p>}
        {activePromo && (
          <p className="promo-success-message">
            Code "{activePromo.code}" appliqué !
          </p>
        )}
      </div>

      {discount > 0 && (
        <div className="summary-row discount-row">
          <span>Remise ({activePromo?.code})</span>
          <span>- {formatPrice(discount)}</span>
        </div>
      )}

      <div className="summary-total">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
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
