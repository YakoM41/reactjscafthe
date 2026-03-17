import React from "react";

// Ce composant affiche la barre de progression (le "stepper") en haut du tunnel d'achat.
const Stepper = ({ currentStep }) => {
  // 'currentStep' est une chaîne de caractères (ex: "shipping") passée par le parent (Checkout.jsx).

  // On définit l'ordre des étapes.
  const steps = ["cart", "shipping", "payment", "confirmation"];

  // On associe un nom lisible à chaque étape.
  const stepLabels = {
    cart: "Panier",
    shipping: "Livraison",
    payment: "Paiement",
    confirmation: "Confirmation",
  };

  // Cette fonction détermine la classe CSS à appliquer à une étape (terminée, active, ou en attente).
  const getStepClass = (step) => {
    const stepIndex = steps.indexOf(step);
    const currentIndex = steps.indexOf(currentStep);

    // Si l'index de l'étape est inférieur à l'index de l'étape actuelle elle est terminée
    if (stepIndex < currentIndex) {
      return "completed";
    }
    // Si les index sont égaux, c'est l'étape actuellement active
    if (stepIndex === currentIndex) {
      return "active";
    }
    // Sinon c'est l'étape à venir
    return "pending";
  };

  return (
    <div className="stepper">
      {/* On boucle sur chaque étape pour l'afficher */}
      {steps.map((step, index) => (
        // React.Fragment est utilisé pour grouper des éléments sans ajouter de noeud supplémentaire au DOM
        <React.Fragment key={step}>
          <div className={`step ${getStepClass(step)}`}>
            <div className="step-icon">
              {/* L'icône (coche, etc.) est gérée en CSS */}
            </div>
            <div className="step-label">{stepLabels[step]}</div>
          </div>
          {/* On affiche un connecteur entre les étapes, sauf pour la dernière */}
          {index < steps.length - 1 && <div className="step-connector"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
