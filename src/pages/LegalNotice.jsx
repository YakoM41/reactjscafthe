import React from "react";
import SEO from "../components/SEO.jsx"; // Import SEO component
import "../styles/LegalPages.css";

function LegalNotice() {
    return (
        <div className="legal-page-container">
            <SEO 
                title="Mentions Légales - CafThé"
                description="Consultez les mentions légales de CafThé, incluant les informations sur l'éditeur du site, l'hébergeur, la propriété intellectuelle et plus encore."
            />
            <h1>Mentions Légales</h1>
            <p>Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du site Caf'Thé l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.</p>

            <h2>1. Éditeur du Site</h2>
            <p>
                <strong>Dénomination sociale :</strong> Caf'Thé
                <br />
                <strong>Forme juridique :</strong> Société par actions simplifiée (SAS)
                <br />
                <strong>Capital social :</strong> 1 000 Euros
                <br />
                <strong>Adresse du siège social :</strong> 123 Rue du Café, 75000 Paris, France
                <br />
                <strong>Téléphone :</strong> +33 1 23 45 67 89
                <br />
                <strong>Adresse e-mail :</strong> contact@cafthe.com
                <br />
                <strong>Numéro d'immatriculation au RCS :</strong> Paris B 123 456 789
                <br />
                <strong>Numéro de TVA intracommunautaire :</strong> FR12345678901
                <br />
                <strong>Directeur de la publication :</strong> Jean Dupont
            </p>

            <h2>2. Hébergeur du Site</h2>
            <p>
                <strong>Nom de l'hébergeur :</strong> Vercel
                <br />
                <strong>Adresse :</strong> 340 S Lemon Ave #4133 Walnut, CA 91789
                <br />
                <strong>Site web :</strong> www.vercel.com
            </p>

            <h2>3. Conditions Générales de Vente (CGV)</h2>
            <p>Les conditions générales de vente applicables aux produits et services proposés on le site Caf'Thé sont accessibles via le lien suivant : <a href="/terms-of-sale">Conditions Générales de Vente</a>.</p>

            <h2>4. Propriété Intellectuelle</h2>
            <p>L'ensemble du contenu du site Caf'Thé (textes, images, graphismes, logo, icônes, sons, logiciels, etc.) est la propriété exclusive de Caf'Thé à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.</p>
            <p>Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Caf'Thé.</p>

            <h2>5. Protection des Données Personnelles</h2>
            <p>Pour plus d'informations sur la manière dont nous traitons vos données personnelles, veuillez consulter notre <a href="/privacy-policy">Politique de Confidentialité</a>.</p>

            <h2>6. Droit Applicable et Attribution de Juridiction</h2>
            <p>Tout litige en relation avec l'utilisation du site Caf'Thé est soumis au droit français. En dehors des cas où la loi ne le permet pas, il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.</p>
        </div>
    );
}

export default LegalNotice;