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

  // Stop propagation to prevent link navigation when adding to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/produit/${product.Référence}`} className="product-card-link">
      <div className="product-card">
        <div className="product-card-image-container">
          <img
            src={imageUrl}
            alt={product.Nom_produit}
            className="product-card-image"
            onError={handleImageError}
          />
        </div>
        <div className="product-card-info">
          <h3 className="product-card-name">{product.Nom_produit}</h3>
          <p className="product-card-category">{product.Catégorie}</p>
          {/* A short description could be added here if available */}
          {/* <p className="product-card-description">{product.Description}</p> */}
        </div>
        <div className="product-card-footer">
          <p className="product-card-price">{product.Prix_TTC}€</p>
          <button onClick={handleAddToCart} className="product-card-button">
            Ajouter au panier
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
