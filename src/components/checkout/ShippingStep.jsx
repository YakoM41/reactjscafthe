import React from 'react';

const ShippingStep = ({ onNext, onBack }) => {
  return (
    <div className="shipping-step">
      <h2>Informations de Livraison</h2>
      <form className="shipping-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="votre@email.com" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">Prénom</label>
            <input type="text" id="firstName" />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Nom</label>
            <input type="text" id="lastName" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="address">Adresse</label>
          <input type="text" id="address" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="postalCode">Code Postal</label>
            <input type="text" id="postalCode" />
          </div>
          <div className="form-group">
            <label htmlFor="city">Ville</label>
            <input type="text" id="city" />
          </div>
        </div>
      </form>
      <div className="step-actions">
        <button className="btn-secondary" onClick={onBack}>Retour</button>
        <button className="btn-primary" onClick={onNext}>Continuer</button>
      </div>
    </div>
  );
};

export default ShippingStep;
