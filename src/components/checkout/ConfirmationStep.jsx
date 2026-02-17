import React from 'react';

const ConfirmationStep = () => {
  return (
    <div className="confirmation-step">
      <h2>Merci pour votre commande !</h2>
      <p>Votre commande a été confirmée.</p>
      <p>Un email de confirmation vous a été envoyé.</p>
      {/* This could be expanded to show order details */}
    </div>
  );
};

export default ConfirmationStep;
