import React from "react";
import SEO from "../components/SEO.jsx"; // Import SEO component
import "../styles/LegalPages.css";

function TermsOfSale() {
    return (
        <div className="legal-page-container">
            <SEO 
                title="Conditions Générales de Vente - CafThé"
                description="Consultez les conditions générales de vente de CafThé. Informations sur les commandes, les prix, le paiement, la livraison, le droit de rétractation et plus encore."
            />
            <h1>Conditions Générales de Vente (CGV)</h1>

            <h2>1. Identification du Vendeur</h2>
            <p>
                <strong>Raison sociale :</strong> Caf'Thé
                <br />
                <strong>Forme juridique :</strong> SAS
                <br />
                <strong>Adresse :</strong> 123 Rue du Café, 75000 Paris, France
                <br />
                <strong>SIRET :</strong> 123 456 789 00010
                <br />
                <strong>TVA intracommunautaire :</strong> FR12345678901
                <br />
                <strong>Contact :</strong> contact@cafthe.com
            </p>

            <h2>2. Objet</h2>
            <p>Les présentes conditions générales de vente visent à définir les relations contractuelles entre Caf'Thé et l'acheteur et les conditions applicables à tout achat effectué par le biais du site internet Caf'Thé.</p>

            <h2>3. Caractéristiques des Produits</h2>
            <p>Les produits proposés sont ceux qui figurent dans le catalogue publié sur le site de Caf'Thé. Ces produits sont proposés dans la limite des stocks disponibles.</p>

            <h2>4. Prix</h2>
            <p>Les prix figurant dans le catalogue sont des prix TTC en euro tenant compte de la TVA applicable au jour de la commande. Caf'Thé se réserve le droit de modifier ses prix à tout moment.</p>

            <h2>5. Commandes</h2>
            <p>L’acheteur, qui souhaite acheter un produit doit obligatoirement :</p>
            <ul>
                <li>Remplir la fiche d’identification sur laquelle il indiquera toutes les coordonnées demandées ;</li>
                <li>Valider sa commande après l’avoir vérifiée ;</li>
                <li>Effectuer le paiement dans les conditions prévues ;</li>
                <li>Confirmer sa commande et son règlement.</li>
            </ul>

            <h2>6. Droit de Rétractation</h2>
            <p>En vertu de l’article L121-20 du Code de la consommation, l’acheteur dispose d'un délai de quatorze jours ouvrables à compter de la livraison de leur commande pour exercer son droit de rétractation et ainsi faire retour du produit au vendeur pour échange ou remboursement sans pénalité, à l’exception des frais de retour.</p>

            <h2>7. Modalités de Paiement</h2>
            <p>Le paiement est exigible immédiatement à la commande. Les paiements seront effectués par carte bancaire ; ils seront réalisés par le biais du système sécurisé qui utilise le protocole SSL (Secure Socket Layer) de telle sorte que les informations transmises sont cryptées par un logiciel et qu’aucun tiers ne peut en prendre connaissance au cours du transport sur le réseau.</p>

            <h2>8. Livraisons</h2>
            <p>Les livraisons sont faites à l’adresse indiquée dans le bon de commande qui ne peut être que dans la zone géographique convenue. Les risques sont à la charge de l'acquéreur à compter du moment où les produits ont quitté les locaux de Caf'Thé.</p>

            <h2>9. Litiges</h2>
            <p>Les présentes conditions de vente à distance sont soumises à la loi française. Pour tous litiges ou contentieux, le Tribunal compétent sera celui de Paris.</p>
        </div>
    );
}

export default TermsOfSale;
