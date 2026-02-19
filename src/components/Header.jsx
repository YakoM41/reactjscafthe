import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useCart } from "../contexts/CartContext.jsx";
import "../styles/header.css";

// Import assets
import logoImg from "../assets/images/Caf’Thé (5) (1).png";
import searchIcon from "../assets/images/icons/ButtonSearch.svg";
import loginIcon from "../assets/images/icons/ButtonLog.svg";
import favIcon from "../assets/images/icons/ButtonFav.svg";
import cartIcon from "../assets/images/icons/ButtonCart.svg";


function Header({ isTransparent }) {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { cartItems } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/produits?search=${encodeURIComponent(searchTerm)}`);
      setIsSearchOpen(false);
      setSearchTerm("");
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => document.getElementById("searchInput")?.focus(), 100);
    }
  };

  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <nav className={`navBar ${isTransparent ? "navBar-transparent" : ""}`}>
      <div className="navLink">
        <Link to="/produits" className="navThe">
          Thés
        </Link>
        <Link to="/produits" className="navCaf">
          Cafés
        </Link>
        <Link to="/produits" className="navAcc">
          Accessoires
        </Link>
        <Link to="/about" className="navHist">
          Notre histoire
        </Link>
      </div>

      <Link to="/" className="navbar-brand">
        <img
          src={logoImg}
          alt="CafThé - Accueil"
          className="logo-img"
        />
      </Link>

      <div className="navActions">
        <div className={`search-container ${isSearchOpen ? "active" : ""}`}>
          {isSearchOpen && (
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                id="searchInput"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher..."
                className="search-input"
              />
            </form>
          )}
          <button onClick={toggleSearch} className="navIcons search-btn">
            <img
              src={searchIcon}
              className="nav-icon-img"
              alt="Recherche"
            />
          </button>
        </div>

        <div className="accountSection">
          {isAuthenticated ? (
            <Link to="/compte" className="nav-account-link">
              Bonjour, {user.prenom}
            </Link>
          ) : (
            <Link to="/login" className="navIcons">
              <img
                src={loginIcon}
                className="nav-icon-img"
                alt="Connexion / Inscription"
              />
            </Link>
          )}
        </div>

        <Link to="/wishlist" className="navIcons">
          <img
            src={favIcon}
            className="nav-icon-img"
            alt="Favoris"
          />
        </Link>

        <Link to="/panier" className="navIcons cart-icon-container">
          <img
            src={cartIcon}
            className="nav-icon-img"
            alt="Panier"
          />
          {totalItemsInCart > 0 && (
            <span className="cart-badge">{totalItemsInCart}</span>
          )}
        </Link>
      </div>
    </nav>
  );
}

export default Header;
