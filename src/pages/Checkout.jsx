import React, { useState } from "react";
import Stepper from "../components/checkout/Stepper";
import OrderSummary from "../components/checkout/OrderSummary";
import CartStep from "../components/checkout/CartStep";
import ShippingStep from "../components/checkout/ShippingStep";
import PaymentStep from "../components/checkout/PaymentStep";
import ConfirmationStep from "../components/checkout/ConfirmationStep";
import "../styles/checkout.css";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState("cart"); // 'cart', 'shipping', 'payment', 'confirmation'

  const goToNextStep = () => {
    if (currentStep === "cart") setCurrentStep("shipping");
    else if (currentStep === "shipping") setCurrentStep("payment");
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
