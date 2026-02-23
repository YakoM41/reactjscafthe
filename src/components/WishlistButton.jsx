import React from 'react';
import { useWishlist } from '../contexts/WishlistContext';
import '../styles/WishlistButton.css';

const WishlistButton = ({ product, variant = 'icon' }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.Référence);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  if (variant === 'icon') {
    return (
      <button
        className={`wishlist-button wishlist-icon ${inWishlist ? 'active' : ''}`}
        onClick={handleClick}
        title={inWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        aria-label={inWishlist ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      >
        <span className="heart-icon">♥</span>
      </button>
    );
  }

  return (
    <button
      className={`wishlist-button wishlist-text ${inWishlist ? 'active' : ''}`}
      onClick={handleClick}
    >
      {inWishlist ? '♥ Retirer des favoris' : '♡ Ajouter aux favoris'}
    </button>
  );
};

export default WishlistButton;
