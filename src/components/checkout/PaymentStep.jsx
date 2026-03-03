import React, { useState } from "react";

const PaymentStep = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = "Numéro de carte requis";
    } else if (!/^\d{13,19}$/.test(formData.cardNumber.replace(/\s/g, ""))) {
      // .test() permet de vérifier que les saisies correspondent exactement au format attendu.
      newErrors.cardNumber = "Numéro de carte invalide";
    }

    if (!formData.cardHolder.trim()) {
      newErrors.cardHolder = "Nom du titulaire requis";
    }

    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = "Date d'expiration requise";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Format invalide (MM/AA)";
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = "CVV requis";
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV invalide (3-4 chiffres)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    //Au lieu de faire un long if/else, on compte simplement combien de propriétés d'erreur on a créée. S'il y en a 0, le formulaire est valide (true).
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ") //On retire tous les espaces et on force un espace tous les 4 chiffres.
        .trim();
    }

    // Format expiration date
    if (name === "expiryDate") {
      formattedValue = value.replace(/\D/g, "");
      if (formattedValue.length >= 2) {
        formattedValue =
          formattedValue.slice(0, 2) + "/" + formattedValue.slice(2, 4); //insère automatiquement le / de la date d'expiration.
      }
    }

    // Accepte uniquement des chiffres pour le CVV et Date
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    // Nettoie les erreurs pour ce champ
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //indispensable pour empêcher la page de se recharger et de perdre toutes ses données
    if (validateForm()) {
      // Dans une application réelle, cela enverrait des données à une passerelle de paiement sécurisée.
      // NE JAMAIS stocker ni envoyer de données de carte directement à votre système.
      console.log("Payment data would be sent to payment gateway");
      onNext();
    }
  };

  return (
    <div className="payment-step">
      <h2>Paiement Sécurisé</h2>
      <div className="ssl-info">
        <span>✓ Paiement sécurisé par cryptage SSL</span>
        <span>✓ Vos données bancaires ne sont jamais stockées</span>
      </div>
      <form className="payment-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cardNumber">Numéro de carte</label>{" "}
          {/* permet à un utilisateur de cliquer sur le texte "Numéro de carte" pour focaliser le champ,
           indispensable pour les lecteurs d'écran utilisés par les personnes malvoyantes*/}
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={handleChange}
            maxLength="19"
            required
          />
          {errors.cardNumber && (
            <span className="error-text">{errors.cardNumber}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="cardHolder">Nom du titulaire</label>
          <input
            type="text"
            id="cardHolder"
            name="cardHolder"
            placeholder="Jean Dupont"
            value={formData.cardHolder}
            onChange={handleChange}
            required
          />
          {errors.cardHolder && (
            <span className="error-text">{errors.cardHolder}</span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="expiryDate">Date d'expiration</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/AA"
              value={formData.expiryDate}
              onChange={handleChange}
              maxLength="5"
              required
            />
            {errors.expiryDate && (
              <span className="error-text">{errors.expiryDate}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              placeholder="123"
              value={formData.cvv}
              onChange={handleChange}
              maxLength="4"
              required
            />
            {errors.cvv && <span className="error-text">{errors.cvv}</span>}
          </div>
        </div>

        <div className="payment-notice">
          <p>
            ⚠️ Vos données bancaires sont traitées de manière sécurisée et ne
            sont jamais stockées sur nos serveurs.
          </p>
        </div>

        <div className="step-actions">
          <button type="button" className="btn-secondary" onClick={onBack}>
            Retour
          </button>
          <button type="submit" className="btn-primary">
            Finaliser la commande
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentStep;
