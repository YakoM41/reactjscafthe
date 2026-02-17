import React from "react";

const PaymentStep = ({ onNext, onBack }) => {
  return (
    <div className="payment-step">
      <h2>Paiement Sécurisé</h2>
      <div className="ssl-info">
        <span>✓ Paiement sécurisé par cryptage SSL</span>
      </div>
      <form className="payment-form">
        <div className="form-group">
          <label htmlFor="cardNumber">Numéro de carte</label>
          <input type="text" id="cardNumber" placeholder="1234 **** **** 3456" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiryDate">Date d'expiration</label>
            <input type="text" id="expiryDate" placeholder="MM/AA" />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input type="text" id="cvv" placeholder="123" />
          </div>
        </div>
      </form>
      <div className="step-actions">
        <button className="btn-secondary" onClick={onBack}>
          Retour
        </button>
        <button className="btn-primary" onClick={onNext}>
          Finaliser la commande
        </button>
      </div>
    </div>
  );
};

export default PaymentStep;
