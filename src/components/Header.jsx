import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext, useAuth } from "../contexts/AuthContext.jsx";
import { useCart } from "../contexts/CartContext.jsx";
import { useWishlist } from "../contexts/WishlistContext.jsx";
import "../styles/header.css";

// --- Regroupement des assets ---
import logoDefault from "/images/Caf’TheResultat.webp";
import logoHome from "/images/LogoHome.webp";
import searchIcon from "/images/icons/ButtonSearch.svg";
import loginIcon from "/images/icons/ButtonLog.svg";
import favIcon from "/images/icons/ButtonFav.svg";
import cartIcon from "/images/icons/ButtonCart.svg";
import searchIconHome from "/images/icons/ButtonSearch2.svg";
import loginIconHome from "/images/icons/ButtonLog2.svg";
import favIconHome from "/images/icons/ButtonFav2.svg";
import cartIconHome from "/images/icons/ButtonCart2.svg";

function Header({ isTransparent }) {
  const { user, isAuthenticated } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/produits?search=${encodeURIComponent(searchTerm)}`);
      setIsSearchOpen(false);
      setSearchTerm("");
      setIsMobileMenuOpen(false);
    }
  };

  const isHome = location.pathname === "/";
  const currentLogo = isHome ? logoHome : logoDefault;

  // variable pour gérer les icônes
  const icons = {
    search: isHome ? searchIconHome : searchIcon,
    login: isHome ? loginIconHome : loginIcon,
    fav: isHome ? favIconHome : favIcon,
    cart: isHome ? cartIconHome : cartIcon,
  };

  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <nav className={`navBar ${isTransparent ? "navBar-transparent" : ""}`}>
      <div className="nav-left">
        <Link to="/panier" className="navIcons cart-icon-container mobile-cart">
          <img src={icons.cart} className="nav-icon-img" alt="Panier" />
          {totalItemsInCart > 0 && (
            <span className="cart-badge">{totalItemsInCart}</span>
          )}
        </Link>
      </div>

      <div className={`navLink ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}>
        <Link
          to="/produits?category=thes"
          className="navThe"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Thés
        </Link>
        <Link
          to="/produits?category=cafes"
          className="navCaf"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Cafés
        </Link>
        <Link
          to="/produits?category=accessoires"
          className="navAcc"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Accessoires
        </Link>
        <Link
          to="/notre-histoire"
          className="navHist"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Notre histoire
        </Link>

        <div className="navActions-mobile">
          <div className={`search-container ${isSearchOpen ? "active" : ""}`}>
            {isSearchOpen && (
              <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                  id="searchInputMobile"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher..."
                  className="search-input"
                />
              </form>
            )}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="navIcons search-btn"
            >
              <img
                src={icons.search}
                className="nav-icon-img"
                alt="Recherche"
              />
            </button>
          </div>

          <div className="accountSection">
            {isAuthenticated ? (
              <Link
                to="/compte"
                className="nav-account-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Bonjour, {user.prenom}
              </Link>
            ) : (
              <Link
                to="/connexion"
                className="navIcons"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <img
                  src={icons.login}
                  className="nav-icon-img"
                  alt="Connexion / Inscription"
                />
              </Link>
            )}
          </div>

          <Link
            to="/favoris"
            className="navIcons cart-icon-container"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img src={icons.fav} className="nav-icon-img" alt="Favoris" />
            {wishlistItems.length > 0 && (
              <span className="cart-badge">{wishlistItems.length}</span>
            )}
          </Link>
        </div>
      </div>

      <Link to="/" className="navbar-brand">
        <img src={currentLogo} alt="CafThé - Accueil" className="logo-img" />
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
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="navIcons search-btn"
          >
            <img src={icons.search} className="nav-icon-img" alt="Recherche" />
          </button>
        </div>

        <div className="accountSection">
          {isAuthenticated ? (
            <Link to="/compte" className="nav-account-link">
              Bonjour, {user.prenom}
            </Link>
          ) : (
            <Link to="/connexion" className="navIcons">
              <img
                src={icons.login}
                className="nav-icon-img"
                alt="Connexion / Inscription"
              />
            </Link>
          )}
        </div>

        <Link to="/favoris" className="navIcons cart-icon-container">
          <img src={icons.fav} className="nav-icon-img" alt="Favoris" />
          {wishlistItems.length > 0 && (
            <span className="cart-badge">{wishlistItems.length}</span>
          )}
        </Link>

        <Link
          to="/panier"
          className="navIcons cart-icon-container desktop-cart"
        >
          <img src={icons.cart} className="nav-icon-img" alt="Panier" />
          {totalItemsInCart > 0 && (
            <span className="cart-badge">{totalItemsInCart}</span>
          )}
        </Link>

        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Header;
