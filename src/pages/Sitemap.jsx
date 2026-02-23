import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sitemap.css";

function Sitemap() {
  return (
    <div className="sitemap-container">
      <h1>Plan du site</h1>
      <p className="sitemap-intro">
        Retrouvez toutes les pages de notre site CafThé
      </p>

      <div className="sitemap-grid">
        <div className="sitemap-section">
          <h2>Boutique</h2>
          <ul>
            <li>
              <Link to="/">Accueil</Link>
            </li>
            <li>
              <Link to="/produits">Tous les produits</Link>
            </li>
            <li>
              <Link to="/produits?category=thes">Thés</Link>
            </li>
            <li>
              <Link to="/produits?category=cafes">Cafés</Link>
            </li>
            <li>
              <Link to="/produits?category=accessoires">Accessoires</Link>
            </li>
            <li>
              <Link to="/produits?category=coffrets-cadeaux">
                Coffrets Cadeaux
              </Link>
            </li>
            <li>
              <Link to="/panier">Mon panier</Link>
            </li>
          </ul>
        </div>

        <div className="sitemap-section">
          <h2>Mon compte</h2>
          <ul>
            <li>
              <Link to="/login">Connexion</Link>
            </li>
            <li>
              <Link to="/register">Inscription</Link>
            </li>
            <li>
              <Link to="/forgot-password">Mot de passe oublié</Link>
            </li>
            <li>
              <Link to="/compte">Mon compte</Link>
            </li>
          </ul>
        </div>

        <div className="sitemap-section">
          <h2>À propos</h2>
          <ul>
            <li>
              <Link to="/about">Notre histoire</Link>
            </li>
            <li>
              <Link to="/contact">Nous contacter</Link>
            </li>
          </ul>
        </div>

        <div className="sitemap-section">
          <h2>Aide & Service</h2>
          <ul>
            <li>
              <Link to="/service-client">Service client</Link>
            </li>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>
            <li>
              <Link to="/politique-de-retour">Politique de retour</Link>
            </li>
          </ul>
        </div>

        <div className="sitemap-section">
          <h2>Informations légales</h2>
          <ul>
            <li>
              <Link to="/legal-notice">Mentions légales</Link>
            </li>
            <li>
              <Link to="/privacy-policy">Politique de confidentialité</Link>
            </li>
            <li>
              <Link to="/terms-of-sale">Conditions générales de vente</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sitemap;
