import React, { useState, useContext } from "react"; //C'est la mémoire interne du composant qui définit l'étape en cours.
import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx"; // Import SEO component
import { AuthContext } from "../contexts/AuthContext"; // Ecoute l'etat global de l'application et récupère la variable isAuthenticated (via le useContext) pour savoir si l'utilisateur est connecté ou pas
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
    //fonction qui fait avancer l'utilisateur dans le tunnel d'achat
    if (currentStep === "cart") {
      if (!isAuthenticated) {
        setCurrentStep("login-required"); // SI on est sur "cart" et que l'utilisateur n'est pas connecté (!isAuthenticated), on force le passage à l'étape "login-required"
      } else {
        setCurrentStep("shipping"); // SI on est sur "cart" et qu'on est connecté on passe à "shipping"
      }
    } else if (currentStep === "shipping") setCurrentStep("payment");
    else if (currentStep === "payment") setCurrentStep("confirmation");
  };

  const goToPreviousStep = () => {
    if (currentStep === "shipping") setCurrentStep("cart");
    else if (currentStep === "payment") setCurrentStep("shipping");
  };

  const renderStep = () => {
    // Utilise une instruction "switch" pour indiquer quel composant enfant afficher en fonction de la valeur de currentStep
    switch (
      currentStep // switch évite d'enchaîner des plusieurs if/else
    ) {
      case "cart":
        return <CartStep onNext={goToNextStep} />;
      case "login-required": // le code renvoie directement du HTML/JSX avec des liens vers les pages de connexion/inscription via le composant <Link>
        return (
          <div className="login-required-step">
            <div className="login-required-content">
              <h2>Connexion requise</h2>
              <p>Vous devez être connecté pour continuer votre commande.</p>
              <div className="login-required-actions">
                <Link to="/connexion" className="btn-primary">
                  Se connecter
                </Link>
                <Link to="/inscription" className="btn-secondary">
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
      <SEO title="Paiement - CafThé" noindex={true} />
      <div className="checkout-header">
        <h3>CafThé</h3>
        <Stepper currentStep={currentStep} /> {/*Le Stepper, l'étape active */}
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

// L'utilisateur clique sur le bouton "Valider mon panier" à l'intérieur du composant enfant CartStep.
//
// Ce bouton déclenche la prop onNext.
//
// Cela exécute la fonction goToNextStep du parent Checkout.
//
// Le parent met à jour son état (setCurrentStep).
//
// Le parent se re-rend, la fonction switch change de composant, et l'interface affiche l'étape suivante.
