import React from 'react';
import '../styles/InfoPages.css';

function TermsOfUse() {
  return (
    <div className="info-page-container">
      <div className="info-page-header">
        <h1>Conditions d'Utilisation</h1>
      </div>
      <div className="info-page-content legal-content">
        <h2>1. Acceptation des conditions</h2>
        <p>En accédant et en utilisant ce site, vous acceptez d'être lié par ces conditions d'utilisation.</p>

        <h2>2. Utilisation du site</h2>
        <p>Vous acceptez d'utiliser ce site uniquement à des fins légales et de ne pas l'utiliser de manière qui pourrait endommager, désactiver ou surcharger le site.</p>

        <h2>3. Propriété intellectuelle</h2>
        <p>Tout le contenu du site, y compris les textes, images, logos et marques, est la propriété de CafThé ou de ses fournisseurs de contenu et est protégé par les lois sur la propriété intellectuelle.</p>

        <h2>4. Limitation de responsabilité</h2>
        <p>CafThé ne sera pas responsable des dommages directs, indirects, accessoires ou consécutifs résultant de votre utilisation du site.</p>

        <h2>5. Modifications des conditions</h2>
        <p>CafThé se réserve le droit de modifier ces conditions à tout moment. Les modifications seront effectives dès leur publication sur le site.</p>

        <h2>6. Droit applicable</h2>
        <p>Ces conditions sont régies par les lois françaises et vous acceptez la juridiction exclusive des tribunaux français.</p>
      </div>
    </div>
  );
}

export default TermsOfUse;
