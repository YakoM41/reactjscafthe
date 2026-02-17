import React from "react";
import "../styles/LegalPages.css";

function PrivacyPolicy() {
    return (
        <div className="legal-page-container">
            <h1>Politique de Confidentialité</h1>
            <p>Date d'entrée en vigueur : 15 février 2026</p>
            <p>Bienvenue sur Caf'Thé (le "Site"). Nous nous engageons à protéger votre vie privée et vos données personnelles. Cette Politique de Confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous visitez notre Site et utilisez nos services.</p>

            <h2>1. Qui sommes-nous ?</h2>
            <p>
                Caf'Thé
                <br />
                Société par actions simplifiée (SAS)
                <br />
                123 Rue du Café, 75000 Paris, France
                <br />
                contact@cafthe.com
            </p>

            <h2>2. Quelles données personnelles collectons-nous ?</h2>
            <p>Nous pouvons collecter différentes catégories de données personnelles vous concernant, en fonction de la manière dont vous interagissez avec notre Site :</p>
            <ul>
                <li><strong>Données d'identification et de contact :</strong> Nom, prénom, adresse e-mail, adresse postale (facturation et livraison), numéro de téléphone.</li>
                <li><strong>Données de connexion et de compte :</strong> Nom d'utilisateur, mot de passe crypté, historique de connexion.</li>
                <li><strong>Données de transaction :</strong> Détails des produits achetés, date et heure des transactions, montant des achats.</li>
                <li><strong>Données techniques et de navigation :</strong> Adresse IP, type de navigateur, pages visitées.</li>
            </ul>

            <h2>3. Pourquoi utilisons-nous vos données ?</h2>
            <p>Nous utilisons vos données personnelles pour les finalités suivantes :</p>
            <ul>
                <li>Exécution des commandes et gestion de la relation client.</li>
                <li>Gestion de votre compte client.</li>
                <li>Marketing et communication (si vous y avez consenti).</li>
                <li>Amélioration de notre Site et de nos services.</li>
                <li>Respect des obligations légales et réglementaires.</li>
            </ul>

            <h2>4. Avec qui partageons-nous vos données ?</h2>
            <p>Nous pouvons partager vos données personnelles avec les catégories de destinataires suivantes :</p>
            <ul>
                <li>Prestataires de services (paiement, livraison, hébergement).</li>
                <li>Autorités légales et réglementaires.</li>
            </ul>

            <h2>5. Vos droits en matière de protection des données (RGPD)</h2>
            <p>Vous disposez des droits suivants concernant vos données personnelles :</p>
            <ul>
                <li>Droit d'accès</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement ("droit à l'oubli")</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit d'opposition</li>
                <li>Droit à la portabilité des données</li>
                <li>Droit de retirer votre consentement</li>
                <li>Droit d'introduire une réclamation auprès de la CNIL</li>
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
