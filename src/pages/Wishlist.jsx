import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/InfoPages.css';

function Wishlist() {
  return (
    <div className="info-page-container">
      <div className="info-page-header">
        <h1>Mes Favoris</h1>
        <p>Votre liste de produits préférés</p>
      </div>
      <div className="info-page-content">
        <div className="empty-state">
          <p>Vous n'avez pas encore ajouté de produits à vos favoris.</p>
          <Link to="/produits" className="btn-primary">
            Découvrir nos produits
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
