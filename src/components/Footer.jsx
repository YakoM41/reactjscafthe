import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <h3
            style={{ fontFamily: "serif", fontWeight: 600, fontSize: "2rem" }}
          >
            CafThé
          </h3>
          <p>
            " L'art du thé et du café depuis 1892. De la terre à la tasse. "
          </p>
        </div>
        <div className="footer-links">
          <h4>Boutique</h4>
          <ul>
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
          </ul>
        </div>
        <div className="footer-links">
          <h4>À Propos</h4>
          <ul>
            <li>
              <Link to="/about">Notre Histoire</Link>
            </li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>contact@cafthe.fr</p>
          <p>+33 1 23 45 67 89</p>
          <p>Blois, France</p>
          <div className="social-icons">
            <a href="#">📷</a>
            <a href="#">📘</a>
            <a href="#">🐦</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} CafThé. Tous droits réservés.</p>
        <ul>
          <li>
            <Link to="/legal-notice">Mentions Légales</Link>
          </li>
          <li>
            <Link to="/privacy-policy">Politique de Confidentialité</Link>
          </li>
          <li>
            <Link to="/terms-of-sale">CGV</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
