import React from 'react';
import SEO from '../components/SEO.jsx'; // Import SEO component
import '../styles/InfoPages.css';

const PolitiqueDeRetour = () => {
    return (
        <div className="info-page-container">
            <SEO 
                title="Politique de Retour - CafThé"
                description="Consultez notre politique de retour. Apprenez comment retourner un article, les conditions de retour et les délais de remboursement."
            />
            <h1>Politique de Retour</h1>
            
            <h2>Droit de Rétractation</h2>
            <p>Conformément à la législation en vigueur, vous disposez d'un délai de 14 jours à compter de la réception de vos articles pour exercer votre droit de rétractation sans avoir à justifier de motifs ni à payer de pénalités.</p>

            <h2>Conditions de Retour</h2>
            <p>Pour être éligible à un retour, votre article doit être inutilisé et dans le même état où vous l'avez reçu. Il doit également être dans son emballage d'origine.</p>
            <p>Certains types de produits ne peuvent pas être retournés, comme les produits périssables (café en grains, thé en feuilles).</p>

            <h2>Procédure de Retour</h2>
            <p>Pour retourner un article, veuillez nous contacter à l'adresse contact@cafthe.com avec votre numéro de commande et les détails du produit que vous souhaitez retourner. Nous vous fournirons les instructions pour le retour.</p>

            <h2>Remboursements</h2>
            <p>Une fois votre retour reçu et inspecté, nous vous enverrons un e-mail pour vous informer que nous avons reçu votre article retourné. Nous vous informerons également de l'approbation ou du rejet de votre remboursement.</p>
            <p>Si votre demande est approuvée, votre remboursement sera traité et un crédit sera automatiquement appliqué à votre carte de crédit ou à votre méthode originale de paiement, dans un délai de quelques jours.</p>

            <h2>Frais de Retour</h2>
            <p>Les frais de retour sont à votre charge, sauf en cas d'erreur de notre part ou de produit défectueux.</p>
        </div>
    );
};

export default PolitiqueDeRetour;
