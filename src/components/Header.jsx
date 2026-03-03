import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useCart } from "../contexts/CartContext.jsx";
import "../styles/header.css";
import { useWishlist } from "../contexts/WishlistContext.jsx";

// Import assets
import logoImg from "../assets/images/Caf’Thé (5) (1)_resultat.webp";
import logoHomeImg from "../assets/images/LogoHome.webp";
import searchIcon from "../assets/images/icons/ButtonSearch.svg";
import loginIcon from "../assets/images/icons/ButtonLog.svg";
import favIcon from "../assets/images/icons/ButtonFav.svg";
import cartIcon from "../assets/images/icons/ButtonCart.svg";

// Import new home icons
import searchIconHome from "../assets/images/icons/ButtonSearch2.svg";
import loginIconHome from "../assets/images/icons/ButtonLog2.svg";
import favIconHome from "../assets/images/icons/ButtonFav2.svg";
import cartIconHome from "../assets/images/icons/ButtonCart2.svg";

function Header({ isTransparent }) {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { cartItems } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { wishlistItems } = useWishlist();

  const handleLogout = () => {
    logout();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/produits?search=${encodeURIComponent(searchTerm)}`);
      setIsSearchOpen(false);
      setSearchTerm("");
      setIsMobileMenuOpen(false); // Close menu on search
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

  const isHome = location.pathname === "/";
  const currentLogo = isHome ? logoHomeImg : logoImg;
  
  // Select icons based on route
  const currentSearchIcon = isHome ? searchIconHome : searchIcon;
  const currentLoginIcon = isHome ? loginIconHome : loginIcon;
  const currentFavIcon = isHome ? favIconHome : favIcon;
  const currentCartIcon = isHome ? cartIconHome : cartIcon;

  return (
    <nav className={`navBar ${isTransparent ? "navBar-transparent" : ""}`}>
      <div className="nav-left">
        <Link to="/panier" className="navIcons cart-icon-container mobile-cart">
          <img src={currentCartIcon} className="nav-icon-img" alt="Panier" />
          {totalItemsInCart > 0 && (
            <span className="cart-badge">{totalItemsInCart}</span>
          )}
        </Link>
      </div>

      <div className={`navLink ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}>
        {/* Main navigation links */}
        <Link to="/produits?category=thes" className="navThe" onClick={() => setIsMobileMenuOpen(false)}>
          Thés
        </Link>
        <Link to="/produits?category=cafes" className="navCaf" onClick={() => setIsMobileMenuOpen(false)}>
          Cafés
        </Link>
        <Link to="/produits?category=accessoires" className="navAcc" onClick={() => setIsMobileMenuOpen(false)}>
          Accessoires
        </Link>
        <Link to="/notre-histoire" className="navHist" onClick={() => setIsMobileMenuOpen(false)}>
          Notre histoire
        </Link>

        {/* --- MOBILE-ONLY ACTIONS --- */}
        <div className="navActions-mobile">
          <div className={`search-container ${isSearchOpen ? "active" : ""}`}>
            {isSearchOpen && (
              <form onSubmit={handleSearchSubmit} className="search-form">
                <input id="searchInputMobile" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Rechercher..." className="search-input" />
              </form>
            )}
            <button onClick={toggleSearch} className="navIcons search-btn">
              <img src={currentSearchIcon} className="nav-icon-img" alt="Recherche" />
            </button>
          </div>

          <div className="accountSection">
            {isAuthenticated ? (
              <Link to="/compte" className="nav-account-link" onClick={() => setIsMobileMenuOpen(false)}>
                Bonjour, {user.prenom}
              </Link>
            ) : (
              <Link to="/connexion" className="navIcons" onClick={() => setIsMobileMenuOpen(false)}>
                <img src={currentLoginIcon} className="nav-icon-img" alt="Connexion / Inscription" />
              </Link>
            )}
          </div>

          <Link to="/favoris" className="navIcons cart-icon-container" onClick={() => setIsMobileMenuOpen(false)}>
            <img src={currentFavIcon} className="nav-icon-img" alt="Favoris" />
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
        {/* --- DESKTOP-ONLY ACTIONS --- */}
        <div className={`search-container ${isSearchOpen ? "active" : ""}`}>
          {isSearchOpen && (
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input id="searchInput" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Rechercher..." className="search-input" />
            </form>
          )}
          <button onClick={toggleSearch} className="navIcons search-btn">
            <img src={currentSearchIcon} className="nav-icon-img" alt="Recherche" />
          </button>
        </div>

        <div className="accountSection">
          {isAuthenticated ? (
            <Link to="/compte" className="nav-account-link">
              Bonjour, {user.prenom}
            </Link>
          ) : (
            <Link to="/connexion" className="navIcons">
              <img src={currentLoginIcon} className="nav-icon-img" alt="Connexion / Inscription" />
            </Link>
          )}
        </div>

        <Link to="/favoris" className="navIcons cart-icon-container">
          <img src={currentFavIcon} className="nav-icon-img" alt="Favoris" />
          {wishlistItems.length > 0 && (
            <span className="cart-badge">{wishlistItems.length}</span>
          )}
        </Link>

        {/* --- ALWAYS VISIBLE CART --- */}
        <Link to="/panier" className="navIcons cart-icon-container desktop-cart">
          <img src={currentCartIcon} className="nav-icon-img" alt="Panier" />
          {totalItemsInCart > 0 && (
            <span className="cart-badge">{totalItemsInCart}</span>
          )}
        </Link>
        
        <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Header;
