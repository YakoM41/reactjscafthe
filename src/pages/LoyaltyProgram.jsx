import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/InfoPages.css';

function LoyaltyProgram() {
  return (
    <div className="info-page-container">
      <div className="info-page-header">
        <h1>Programme de Fidélité</h1>
        <p>Gagnez des points à chaque achat</p>
      </div>
      <div className="info-page-content">
        <div className="loyalty-info">
          <h2>Comment ça marche ?</h2>
          <div className="loyalty-section">
            <h3>Gagnez des points</h3>
            <p>Vous gagnez 1 point pour chaque euro dépensé. Vos points s'accumulent automatiquement sur votre compte.</p>
          </div>
          <div className="loyalty-section">
            <h3>Utilisez vos points</h3>
            <p>Convertissez vos points en réductions :</p>
            <ul>
              <li>50 points = 5€ de réduction</li>
              <li>100 points = 10€ de réduction</li>
              <li>250 points = 30€ de réduction</li>
            </ul>
          </div>
          <div className="loyalty-section">
            <h3>Statuts VIP</h3>
            <p>Plus vous achetez, plus vos avantages augmentent :</p>
            <ul>
              <li><strong>Connaisseur :</strong> À partir de 100€ d'achats</li>
              <li><strong>Passionné :</strong> À partir de 500€ d'achats</li>
              <li><strong>Expert :</strong> À partir de 1000€ d'achats</li>
            </ul>
          </div>
        </div>
        <div className="loyalty-cta">
          <Link to="/compte" className="btn-primary">
            Voir mon compte
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoyaltyProgram;
