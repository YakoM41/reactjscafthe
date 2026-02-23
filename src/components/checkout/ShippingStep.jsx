import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';

const ShippingStep = ({ onNext, onBack }) => {
  const { deliveryMethod, setDeliveryMethod, selectedCarrier, setSelectedCarrier, carrierPrices } = useCart();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    postalCode: '',
    city: '',
  });
  const [errors, setErrors] = useState({});

  const formatPrice = (price) => {
    return price.toFixed(2).replace(".", ",") + "€";
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Prénom requis';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Nom requis';
    }
    
    if (deliveryMethod === 'home') {
      if (!formData.address.trim()) {
        newErrors.address = 'Adresse requise';
      }
      if (!formData.postalCode.trim()) {
        newErrors.postalCode = 'Code postal requis';
      } else if (!/^\d{5}$/.test(formData.postalCode)) {
        newErrors.postalCode = 'Code postal invalide (5 chiffres)';
      }
      if (!formData.city.trim()) {
        newErrors.city = 'Ville requise';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="shipping-step">
      <h2>Informations de Livraison</h2>

      {/* Delivery Method Selection */}
      <div className="delivery-method-section">
        <h3>Mode de livraison</h3>
        <div className="delivery-options">
          <label className={`delivery-option ${deliveryMethod === 'home' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="deliveryMethod"
              value="home"
              checked={deliveryMethod === 'home'}
              onChange={(e) => setDeliveryMethod(e.target.value)}
            />
            <div className="option-content">
              <span className="option-title">Livraison à domicile</span>
              <span className="option-description">Recevez votre commande chez vous</span>
            </div>
          </label>

          <label className={`delivery-option ${deliveryMethod === 'pickup' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="deliveryMethod"
              value="pickup"
              checked={deliveryMethod === 'pickup'}
              onChange={(e) => setDeliveryMethod(e.target.value)}
            />
            <div className="option-content">
              <span className="option-title">Retrait en magasin</span>
              <span className="option-description">Gratuit - Disponible sous 24h</span>
            </div>
          </label>
        </div>
      </div>

      {/* Carrier Selection (only if home delivery) */}
      {deliveryMethod === 'home' && (
        <div className="carrier-section">
          <h3>Choix du transporteur</h3>
          <div className="carrier-options">
            <label className={`carrier-option ${selectedCarrier === 'colissimo' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="carrier"
                value="colissimo"
                checked={selectedCarrier === 'colissimo'}
                onChange={(e) => setSelectedCarrier(e.target.value)}
              />
              <div className="carrier-content">
                <span className="carrier-name">Colissimo</span>
                <span className="carrier-description">Livraison sous 2-3 jours</span>
              </div>
              <span className="carrier-price">{formatPrice(carrierPrices.colissimo)}</span>
            </label>

            <label className={`carrier-option ${selectedCarrier === 'chronopost' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="carrier"
                value="chronopost"
                checked={selectedCarrier === 'chronopost'}
                onChange={(e) => setSelectedCarrier(e.target.value)}
              />
              <div className="carrier-content">
                <span className="carrier-name">Chronopost</span>
                <span className="carrier-description">Livraison express sous 24h</span>
              </div>
              <span className="carrier-price">{formatPrice(carrierPrices.chronopost)}</span>
            </label>

            <label className={`carrier-option ${selectedCarrier === 'relais' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="carrier"
                value="relais"
                checked={selectedCarrier === 'relais'}
                onChange={(e) => setSelectedCarrier(e.target.value)}
              />
              <div className="carrier-content">
                <span className="carrier-name">Point Relais</span>
                <span className="carrier-description">Livraison sous 3-4 jours</span>
              </div>
              <span className="carrier-price">{formatPrice(carrierPrices.relais)}</span>
            </label>
          </div>
        </div>
      )}

      {/* Store Pickup Info */}
      {deliveryMethod === 'pickup' && (
        <div className="pickup-info">
          <h3>Adresse du magasin</h3>
          <div className="store-address">
            <p><strong>CafThé Paris</strong></p>
            <p>123 Rue de Rivoli</p>
            <p>75001 Paris</p>
            <p>Tél: 01 23 45 67 89</p>
            <p className="pickup-note">Votre commande sera disponible sous 24h. Vous recevrez un email de confirmation.</p>
          </div>
        </div>
      )}

      {/* Shipping Address Form */}
      <form className="shipping-form" onSubmit={handleSubmit}>
        <h3>{deliveryMethod === 'pickup' ? 'Vos informations' : 'Adresse de livraison'}</h3>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            placeholder="votre@email.com" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">Prénom</label>
            <input 
              type="text" 
              id="firstName" 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required 
            />
            {errors.firstName && <span className="error-text">{errors.firstName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Nom</label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required 
            />
            {errors.lastName && <span className="error-text">{errors.lastName}</span>}
          </div>
        </div>
        {deliveryMethod === 'home' && (
          <>
            <div className="form-group">
              <label htmlFor="address">Adresse</label>
              <input 
                type="text" 
                id="address" 
                name="address"
                value={formData.address}
                onChange={handleChange}
                required 
              />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="postalCode">Code Postal</label>
                <input 
                  type="text" 
                  id="postalCode" 
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  required 
                />
                {errors.postalCode && <span className="error-text">{errors.postalCode}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="city">Ville</label>
                <input 
                  type="text" 
                  id="city" 
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required 
                />
                {errors.city && <span className="error-text">{errors.city}</span>}
              </div>
            </div>
          </>
        )}
        <div className="step-actions">
          <button type="button" className="btn-secondary" onClick={onBack}>Retour</button>
          <button type="submit" className="btn-primary">Continuer</button>
        </div>
      </form>
    </div>
  );
};

export default ShippingStep;
