import React from "react";

const Stepper = ({ currentStep }) => {
  const steps = ["cart", "shipping", "payment", "confirmation"];
  const stepLabels = {
    cart: "Panier",
    shipping: "Livraison",
    payment: "Paiement",
    confirmation: "Confirmation",
  };

  const getStepClass = (step) => {
    const stepIndex = steps.indexOf(step);
    const currentIndex = steps.indexOf(currentStep);

    if (stepIndex < currentIndex) {
      return "completed";
    }
    if (stepIndex === currentIndex) {
      return "active";
    }
    return "pending";
  };

  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className={`step ${getStepClass(step)}`}>
            <div className="step-icon">{/* Icon will be handled by CSS */}</div>
            <div className="step-label">{stepLabels[step]}</div>
          </div>
          {index < steps.length - 1 && <div className="step-connector"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Stepper;
