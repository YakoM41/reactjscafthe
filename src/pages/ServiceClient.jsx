import React from 'react';
import SEO from '../components/SEO.jsx';
import '../styles/InfoPages.css';

const ServiceClient = () => {
    return (
        <div className="info-page-container">
            <SEO 
                title="Service Client - CafThé"
                description="Contactez notre service client pour toute question concernant vos commandes, nos produits ou pour toute autre demande d'assistance."
            />
            <h1>Service Client</h1>
            <p>Notre équipe est à votre disposition pour répondre à toutes vos questions. N'hésitez pas à nous contacter par les moyens suivants :</p>
            
            <div className="info-page-content">
                <div className="contact-info-direct">
                    <h3>Par Email</h3>
                    <p>Pour toute question générale, écrivez-nous à : <a href="mailto:contact@cafthe.fr">contact@cafthe.fr</a></p>
                    <p>Pour le suivi de commande : <a href="mailto:support@cafthe.fr">support@cafthe.fr</a></p>
                </div>
                <div className="contact-info-direct">
                    <h3>Par Téléphone</h3>
                    <p>Notre service client est disponible du lundi au vendredi, de 9h à 18h.</p>
                    <p><strong>+33 1 23 45 67 89</strong></p>
                </div>
                <div className="contact-info-direct">
                    <h3>Courrier Postal</h3>
                    <p>Vous pouvez nous écrire à l'adresse suivante :</p>
                    <p>
                        CafThé - Service Client<br />
                        123 Rue du Café<br />
                        75000 Paris, France
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ServiceClient;
