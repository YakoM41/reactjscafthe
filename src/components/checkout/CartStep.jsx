import React from "react";
import { useCart } from "../../contexts/CartContext.jsx";

const CartStep = ({ onNext }) => {
  const { cartItems, updateQuantity, removeFromCart, subtotal, shippingCost, total } = useCart();

  const formatPrice = (price) => {
    return price.toFixed(2).replace(".", ",") + "€";
  };

  return (
    <div className="cart-step">
      <h2>Votre Panier</h2>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => {
              const imageUrl = item.Images
                ? `${import.meta.env.VITE_API_URL}/images/${item.Images}`
                : "https://placehold.co/600x400";

              return (
                <div key={item.Référence} className="cart-item">
                  <img src={imageUrl} alt={item.Nom_produit} className="item-image" />
                  <div className="item-details">
                    <h3>{item.Nom_produit}</h3>
                    {item.size && <p>{item.size}</p>}
                    <div className="quantity-selector">
                      <button onClick={() => updateQuantity(item.Référence, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.Référence, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div className="item-price">
                    <span>{formatPrice(item.Prix_TTC * item.quantity)}</span>
                    <button className="remove-button" onClick={() => removeFromCart(item.Référence)}>Supprimer</button>
                  </div>
                </div>
              );
            })}
          </div>
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
      <div className="step-actions">
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
