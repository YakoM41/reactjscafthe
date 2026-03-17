import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import { useWishlist } from "../contexts/WishlistContext";
import ProductCard from "../components/ProductCard";
import "../styles/InfoPages.css";
import "../styles/ProductList.css";

function Wishlist() {
  const { wishlistItems } = useWishlist();

  const hasItems = wishlistItems.length > 0;

  return (
    <div className="info-page-container">
      <SEO title="Mes Favoris - CafThé" noindex={true} />
      <div className="info-page-header">
        <h1>Mes Favoris</h1>
        <p>Votre liste de produits préférés</p>
      </div>

      <div className="info-page-content">
        {hasItems ? (
          <div className="products-grid">
            {wishlistItems.map((product) => (
              <ProductCard key={product.Référence} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>Vous n'avez pas encore ajouté de produits à vos favoris.</p>
            <Link to="/produits" className="btn-primary">
              Découvrir nos produits
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
