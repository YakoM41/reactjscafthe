import React from "react";
import SEO from "../components/SEO.jsx";
import "../styles/LegalPages.css";

const dataCollected = [
  "Données d'identification et de contact : Nom, prénom, adresse e-mail, adresse postale (facturation et livraison), numéro de téléphone.",
  "Données de connexion et de compte : Nom d'utilisateur, mot de passe crypté, historique de connexion.",
  "Données de transaction : Détails des produits achetés, date et heure des transactions, montant des achats.",
  "Données techniques et de navigation : Adresse IP, type de navigateur, pages visitées.",
];

const dataUsage = [
  "Exécution des commandes et gestion de la relation client.",
  "Gestion de votre compte client.",
  "Marketing et communication (si vous y avez consenti).",
  "Amélioration de notre Site et de nos services.",
  "Respect des obligations légales et réglementaires.",
];

const dataSharing = [
  "Prestataires de services (paiement, livraison, hébergement).",
  "Autorités légales et réglementaires.",
];

const userRights = [
  "Droit d'accès",
  "Droit de rectification",
  "Droit à l'effacement (\"droit à l'oubli\")",
  "Droit à la limitation du traitement",
  "Droit d'opposition",
  "Droit à la portabilité des données",
  "Droit de retirer votre consentement",
  "Droit d'introduire une réclamation auprès de la CNIL",
];

function PrivacyPolicy() {
  return (
    <div className="legal-page-container">
      <SEO 
        title="Politique de Confidentialité - CafThé"
        description="Découvrez comment CafThé protège vos données personnelles. Consultez notre politique de confidentialité pour en savoir plus sur la collecte, l'utilisation et la protection de vos informations."
      />
      <h1>Politique de Confidentialité</h1>
      <p>Date d'entrée en vigueur : 15 février 2026</p>
      <p>Bienvenue sur Caf'Thé (le "Site"). Nous nous engageons à protéger votre vie privée et vos données personnelles. Cette Politique de Confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre Site et utilisez nos services.</p>

      <h2>1. Qui sommes-nous ?</h2>
      <p>
        Caf'Thé<br />
        Société par actions simplifiée (SAS)<br />
        123 Rue du Café, 75000 Paris, France<br />
        contact@cafthe.com
      </p>

      <h2>2. Quelles données personnelles collectons-nous ?</h2>
      <p>Nous pouvons collecter différentes catégories de données personnelles vous concernant, en fonction de la manière dont vous interagissez avec notre Site :</p>
      <ul>
        {dataCollected.map((item, index) => <li key={index}><strong>{item.split(':')[0]}:</strong>{item.split(':')[1]}</li>)}
      </ul>

      <h2>3. Pourquoi utilisons-nous vos données ?</h2>
      <p>Nous utilisons vos données personnelles pour les finalités suivantes :</p>
      <ul>
        {dataUsage.map((item, index) => <li key={index}>{item}</li>)}
      </ul>

      <h2>4. Avec qui partageons-nous vos données ?</h2>
      <p>Nous pouvons partager vos données personnelles avec les catégories de destinataires suivantes :</p>
      <ul>
        {dataSharing.map((item, index) => <li key={index}>{item}</li>)}
      </ul>

      <h2>5. Vos droits en matière de protection des données (RGPD)</h2>
      <p>Vous disposez des droits suivants concernant vos données personnelles :</p>
      <ul>
        {userRights.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
      <p>Pour exercer ces droits, veuillez nous contacter à contact@cafthe.com.</p>

      <h2>6. Sécurité des données</h2>
      <p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles.</p>

      <h2>7. Modifications de cette Politique de Confidentialité</h2>
      <p>Nous pouvons mettre à jour cette Politique de Confidentialité de temps à autre. Nous vous informerons de toute modification significative en publiant la nouvelle politique sur cette page.</p>
    </div>
  );
}

export default PrivacyPolicy;
