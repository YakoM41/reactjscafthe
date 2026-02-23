import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../contexts/WishlistContext"; // 1. Import du Context
import ProductCard from "../components/ProductCard"; // 2. Import de la carte produit
import "../styles/InfoPages.css";
import "../styles/ProductList.css"; // 3. Import indispensable pour avoir la grille .products-grid

function Wishlist() {
  // 4. On récupère le tableau des favoris
  const { wishlistItems } = useWishlist();

  return (
    <div className="info-page-container">
      <div className="info-page-header">
        <h1>Mes Favoris</h1>
        <p>Votre liste de produits préférés</p>
      </div>

      <div className="info-page-content">
        {/* Rendu conditionnel : on vérifie la taille du tableau */}
        {wishlistItems.length === 0 ? (
          /* --- CAS 1 : AUCUN FAVORIS --- */
          <div className="empty-state">
            <p>Vous n'avez pas encore ajouté de produits à vos favoris.</p>
            <Link to="/produits" className="btn-primary">
              Découvrir nos produits
            </Link>
          </div>
        ) : (
          /* --- CAS 2 : DES FAVORIS SONT PRÉSENTS --- */
          /* On réutilise la classe de ta page boutique pour un affichage homogène */
          <div className="products-grid">
            {wishlistItems.map((product) => (
              // La 'key' est obligatoire et permet à React d'optimiser le rendu
              <ProductCard key={product.Référence} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
