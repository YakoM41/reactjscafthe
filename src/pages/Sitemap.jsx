import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import "../styles/Sitemap.css";

const sitemapSections = [
  {
    title: "Boutique",
    links: [
      { text: "Accueil", to: "/" },
      { text: "Tous les produits", to: "/produits" },
      { text: "Thés", to: "/produits?category=thes" },
      { text: "Cafés", to: "/produits?category=cafes" },
      { text: "Accessoires", to: "/produits?category=accessoires" },
      { text: "Coffrets Cadeaux", to: "/produits?category=coffrets-cadeaux" },
      { text: "Mon panier", to: "/panier" },
    ],
  },
  {
    title: "Mon compte",
    links: [
      { text: "Connexion", to: "/connexion" },
      { text: "Inscription", to: "/inscription" },
      { text: "Mot de passe oublié", to: "/mot-de-passe-oublie" },
      { text: "Mon compte", to: "/compte" },
    ],
  },
  {
    title: "À propos",
    links: [
      { text: "Notre histoire", to: "/notre-histoire" },
      { text: "Nous contacter", to: "/contact" },
    ],
  },
  {
    title: "Aide & Service",
    links: [
      { text: "Service client", to: "/service-client" },
      { text: "FAQ", to: "/faq" },
      { text: "Politique de retour", to: "/politique-de-retour" },
    ],
  },
  {
    title: "Informations légales",
    links: [
      { text: "Mentions légales", to: "/mentions-legales" },
      {
        text: "Politique de confidentialité",
        to: "/politique-de-confidentialite",
      },
      {
        text: "Conditions générales de vente",
        to: "/conditions-generales-de-vente",
      },
    ],
  },
];

function Sitemap() {
  return (
    <div className="sitemap-container">
      <SEO title="Plan du site - CafThé" />
      <h1>Plan du site</h1>
      <p className="sitemap-intro">
        Retrouvez toutes les pages de notre site CafThé
      </p>

      <div className="sitemap-grid">
        {sitemapSections.map((section) => (
          <div key={section.title} className="sitemap-section">
            <h2>{section.title}</h2>
            <ul>
              {section.links.map((link) => (
                <li key={link.text}>
                  <Link to={link.to}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sitemap;
