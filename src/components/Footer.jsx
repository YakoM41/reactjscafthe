import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <h3>CafThé</h3>
          <p>
            " L'art du thé et du café depuis 1892. De la terre à la tasse. "
          </p>
        </div>
        <div className="footer-links">
          <h4>Boutique</h4>
          <ul>
            <li>
              <Link to="/produits?category=thes" className="footer-style">
                Thés
              </Link>
            </li>
            <li>
              <Link to="/produits?category=cafes" className="footer-style">
                Cafés
              </Link>
            </li>
            <li>
              <Link to="/produits?category=accessoires">Accessoires</Link>
            </li>
            <li>
              <Link
                to="/produits?category=coffrets-cadeaux"
                className="footer-style"
              >
                Coffrets Cadeaux
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>À Propos</h4>
          <ul>
            <li>
              <Link to="/notre-histoire" className="footer-style">
                Notre Histoire
              </Link>
            </li>
            <li>
              <Link to="/contact" className="footer-style">
                Nous contacter
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Aide & Service</h4>
          <ul>
            <li>
              <Link to="/service-client" className="footer-style">
                Service Client
              </Link>
            </li>
            <li>
              <Link to="/faq" className="footer-style">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/politique-de-retour" className="footer-style">
                Politique de Retour
              </Link>
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
        <div className="footer-bottom-left">
          <p>© {new Date().getFullYear()} CafThé. Tous droits réservés.</p>
          <ul>
            <li>
              <Link to="/mentions-legales" className="footer-style">
                Mentions Légales
              </Link>
            </li>
            <li>
              <Link to="/politique-de-confidentialite" className="footer-style">
                Politique de Confidentialité
              </Link>
            </li>
            <li>
              <Link
                to="/conditions-generales-de-vente"
                className="footer-style"
              >
                CGV
              </Link>
            </li>
            <li>
              <Link to="/plan-du-site" className="footer-style">
                Plan du site
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
