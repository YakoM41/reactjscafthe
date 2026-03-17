import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import "../styles/NotFound.css";

function NotFound() {
  return (
    <div className="not-found-container">
      <SEO title="404 - Page Introuvable" noindex={true} />
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page introuvable</h2>
        <p className="not-found-text">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/" className="not-found-button">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
