import React from 'react';
import SEO from '../components/SEO.jsx'; // Import SEO component
import '../styles/InfoPages.css';

const Faq = () => {
    const faqItems = [
        {
            question: "Comment passer une commande ?",
            answer: "Pour passer une commande, parcourez nos produits, ajoutez les articles souhaités à votre panier, puis suivez les étapes du processus de commande. Vous devrez fournir vos informations de livraison et de paiement."
        },
        {
            question: "Quels sont les modes de paiement acceptés ?",
            answer: "Nous acceptons les paiements par carte de crédit (Visa, MasterCard, American Express) et via PayPal. Toutes les transactions sont sécurisées."
        },
        {
            question: "Quels sont les délais de livraison ?",
            answer: "Les délais de livraison varient en fonction de votre localisation et du mode de livraison choisi. Généralement, les commandes sont livrées sous 3 à 7 jours ouvrables après expédition."
        },
        {
            question: "Puis-je retourner un article ?",
            answer: "Oui, vous pouvez retourner un article dans les 14 jours suivant la réception de votre commande, à condition qu'il soit dans son état d'origine. Veuillez consulter notre Politique de Retour pour plus de détails."
        },
        {
            question: "Comment suivre ma commande ?",
            answer: "Une fois votre commande expédiée, vous recevrez un e-mail de confirmation contenant un numéro de suivi. Vous pourrez utiliser ce numéro sur le site du transporteur pour suivre l'acheminement de votre colis."
        },
        {
            question: "Comment puis-je contacter le service client ?",
            answer: "Vous pouvez nous contacter via le formulaire de contact sur notre site, par e-mail à support@votresite.com, ou par téléphone au +33 1 23 45 67 89 pendant les heures ouvrables."
        },
        {
            question: "Proposez-vous des cartes cadeaux ?",
            answer: "Oui, nous proposons des cartes cadeaux numériques de différentes valeurs. Elles sont parfaites pour offrir et peuvent être utilisées sur tous les produits de notre boutique."
        },
        {
            question: "Mes informations personnelles sont-elles sécurisées ?",
            answer: "Absolument. Nous prenons la sécurité de vos données très au sérieux. Toutes vos informations personnelles sont cryptées et traitées conformément à notre Politique de Confidentialité."
        }
    ];

    return (
        <div className="info-page-container">
            <SEO 
                title="FAQ - Foire Aux Questions | CafThé"
                description="Trouvez les réponses à vos questions les plus fréquentes sur CafThé. Informations sur les commandes, le paiement, la livraison, les retours et plus encore."
            />
            <h1>Foire Aux Questions (FAQ)</h1>
            <div className="faq-list">
                {faqItems.map((item, index) => (
                    <div key={index} className="faq-item">
                        <h2>{item.question}</h2>
                        <p>{item.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Faq;
