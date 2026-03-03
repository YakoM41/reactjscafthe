import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import WishlistButton from "./WishlistButton";
import "../styles/ProductList.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const imageUrl = product.Images
    ? `${import.meta.env.VITE_API_URL}/images/${product.Images}`
    : "https://placehold.co/600x400";

  const handleImageError = (e) => {
    e.target.src = "https://placehold.co/600x400";
  };

  const handleAddToCart = () => {
    // La magie opère : plus besoin de preventDefault ou stopPropagation
    // car ce bouton n'est plus à l'intérieur d'un lien !
    addToCart(product);
  };

  // On stocke l'URL dans une variable pour ne pas se répéter
  const productUrl = `/produit/${product.Référence}`;

  return (
    <div className="product-card">
      <div className="product-card-image-container">
        {/* Le premier lien englobe uniquement l'image.
            On ajoute tabIndex="-1" pour éviter que les utilisateurs
            naviguant au clavier ne tabulent deux fois de suite sur le même produit. */}
        <Link to={productUrl} tabIndex="-1" aria-hidden="true">
          <img
            src={imageUrl}
            alt={product.Nom_produit}
            className="product-card-image"
            loading="lazy"
            onError={handleImageError}
          />
        </Link>

        {/* Le composant WishlistButton flotte désormais librement et légalement */}
        <div className="product-card-wishlist">
          <WishlistButton product={product} />
        </div>
      </div>

      <div className="product-card-info">
        {/* Le lien principal pour le SEO et l'accessibilité est placé sur le titre */}
        <Link to={productUrl} className="product-card-title-link">
          <h3 className="product-card-name">{product.Nom_produit}</h3>
        </Link>
        <p className="product-card-category">{product.Catégorie}</p>
      </div>

      <div className="product-card-footer">
        <p className="product-card-price">{product.Prix_TTC}€</p>
        <button onClick={handleAddToCart} className="product-card-button">
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
