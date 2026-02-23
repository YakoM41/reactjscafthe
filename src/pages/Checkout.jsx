import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Stepper from "../components/checkout/Stepper";
import OrderSummary from "../components/checkout/OrderSummary";
import CartStep from "../components/checkout/CartStep";
import ShippingStep from "../components/checkout/ShippingStep";
import PaymentStep from "../components/checkout/PaymentStep";
import ConfirmationStep from "../components/checkout/ConfirmationStep";
import "../styles/checkout.css";

const Checkout = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState("cart"); // 'cart', 'shipping', 'payment', 'confirmation'

  const goToNextStep = () => {
    if (currentStep === "cart") {
      if (!isAuthenticated) {
        setCurrentStep("login-required");
      } else {
        setCurrentStep("shipping");
      }
    } else if (currentStep === "shipping") setCurrentStep("payment");
    else if (currentStep === "payment") setCurrentStep("confirmation");
  };

  const goToPreviousStep = () => {
    if (currentStep === "shipping") setCurrentStep("cart");
    else if (currentStep === "payment") setCurrentStep("shipping");
  };

  const renderStep = () => {
    switch (currentStep) {
      case "cart":
        return <CartStep onNext={goToNextStep} />;
      case "login-required":
        return (
          <div className="login-required-step">
            <div className="login-required-content">
              <h2>Connexion requise</h2>
              <p>Vous devez être connecté pour continuer votre commande.</p>
              <div className="login-required-actions">
                <Link to="/login" className="btn-primary">
                  Se connecter
                </Link>
                <Link to="/register" className="btn-secondary">
                  Créer un compte
                </Link>
              </div>
              <button
                className="btn-back"
                onClick={() => setCurrentStep("cart")}
              >
                Retour au panier
              </button>
            </div>
          </div>
        );
      case "shipping":
        return <ShippingStep onNext={goToNextStep} onBack={goToPreviousStep} />;
      case "payment":
        return <PaymentStep onNext={goToNextStep} onBack={goToPreviousStep} />;
      case "confirmation":
        return <ConfirmationStep />;
      default:
        return <CartStep onNext={goToNextStep} />;
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h3>CafThé</h3>
        <Stepper currentStep={currentStep} />
      </div>
      <div className="checkout-body">
        <div className="checkout-main">{renderStep()}</div>
        <aside className="checkout-summary">
          <OrderSummary />
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
