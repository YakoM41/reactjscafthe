import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext.jsx";

const OrderSummary = () => {
  const { subtotal, shippingCost, total, deliveryMethod } = useContext(CartContext);

  const formatPrice = (price) => {
    return price.toFixed(2).replace(".", ",") + "€";
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
        <span>{shippingCost === 0 ? 'Gratuit' : formatPrice(shippingCost)}</span>
      </div>
      <div className="summary-total">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
      <div className="summary-info">
        {deliveryMethod === 'pickup' && <p>✓ Retrait en magasin gratuit</p>}
        {deliveryMethod === 'home' && <p>✓ Livraison gratuite à partir de 50€</p>}
        <p>✓ Paiement 100% sécurisé</p>
      </div>
    </div>
  );
};

export default OrderSummary;
