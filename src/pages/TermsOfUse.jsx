import React from 'react';
import SEO from '../components/SEO.jsx';
import '../styles/InfoPages.css';

const terms = [
  {
    title: "1. Acceptation des conditions",
    content: "En accédant et en utilisant ce site, vous acceptez d'être lié par ces conditions d'utilisation."
  },
  {
    title: "2. Utilisation du site",
    content: "Vous acceptez d'utiliser ce site uniquement à des fins légales et de ne pas l'utiliser de manière qui pourrait endommager, désactiver ou surcharger le site."
  },
  {
    title: "3. Propriété intellectuelle",
    content: "Tout le contenu du site, y compris les textes, images, logos et marques, est la propriété de CafThé ou de ses fournisseurs de contenu et est protégé par les lois sur la propriété intellectuelle."
  },
  {
    title: "4. Limitation de responsabilité",
    content: "CafThé ne sera pas responsable des dommages directs, indirects, accessoires ou consécutifs résultant de votre utilisation du site."
  },
  {
    title: "5. Modifications des conditions",
    content: "CafThé se réserve le droit de modifier ces conditions à tout moment. Les modifications seront effectives dès leur publication sur le site."
  },
  {
    title: "6. Droit applicable",
    content: "Ces conditions sont régies par les lois françaises et vous acceptez la juridiction exclusive des tribunaux français."
  }
];

function TermsOfUse() {
  return (
    <div className="info-page-container">
      <SEO 
        title="Conditions d'Utilisation - CafThé"
        description="Consultez les conditions d'utilisation du site CafThé. Apprenez-en plus sur l'utilisation du site, la propriété intellectuelle et la limitation de responsabilité."
      />
      <div className="info-page-header">
        <h1>Conditions d'Utilisation</h1>
      </div>
      <div className="info-page-content legal-content">
        {terms.map((term, index) => (
          <React.Fragment key={index}>
            <h2>{term.title}</h2>
            <p>{term.content}</p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default TermsOfUse;
