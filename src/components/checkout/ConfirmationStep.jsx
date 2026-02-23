import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const ConfirmationStep = () => {
  const { cartItems, total } = useCart();
  const orderNumber = `CMD-${Date.now()}`;
  const estimatedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR');

  return (
    <div className="confirmation-step">
      <div className="confirmation-success">
        <div className="success-icon">✓</div>
        <h2>Merci pour votre commande !</h2>
        <p className="confirmation-message">Votre commande a été confirmée avec succès.</p>
      </div>

      <div className="confirmation-details">
        <div className="detail-section">
          <h3>Numéro de commande</h3>
          <p className="order-number">{orderNumber}</p>
        </div>

        <div className="detail-section">
          <h3>Résumé de votre commande</h3>
          <div className="order-summary">
            {cartItems.map((item) => (
              <div key={item.Référence} className="order-item">
                <span>{item.Nom_produit} x {item.quantity}</span>
                <span>{(item.Prix_TTC * item.quantity).toFixed(2)}€</span>
              </div>
            ))}
            <div className="order-total">
              <span>Total</span>
              <span>{total.toFixed(2)}€</span>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h3>Livraison estimée</h3>
          <p>Votre commande sera livrée avant le <strong>{estimatedDelivery}</strong></p>
          <p className="delivery-note">Un email de confirmation avec le numéro de suivi vous a été envoyé.</p>
        </div>
      </div>

      <div className="confirmation-actions">
        <Link to="/" className="btn-primary">
          Retour à l'accueil
        </Link>
        <Link to="/compte" className="btn-secondary">
          Voir mes commandes
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationStep;
