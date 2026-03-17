import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import '../styles/InfoPages.css';

const loyaltySections = [
  {
    title: "Gagnez des points",
    content: "Vous gagnez 1 point pour chaque euro dépensé. Vos points s'accumulent automatiquement sur votre compte."
  },
  {
    title: "Utilisez vos points",
    content: "Convertissez vos points en réductions :",
    list: [
      "50 points = 5€ de réduction",
      "100 points = 10€ de réduction",
      "250 points = 30€ de réduction"
    ]
  },
  {
    title: "Statuts VIP",
    content: "Plus vous achetez, plus vos avantages augmentent :",
    list: [
      "<strong>Connaisseur :</strong> À partir de 100€ d'achats",
      "<strong>Passionné :</strong> À partir de 500€ d'achats",
      "<strong>Expert :</strong> À partir de 1000€ d'achats"
    ]
  }
];

function LoyaltyProgram() {
  return (
    <div className="info-page-container">
      <SEO 
        title="Programme de Fidélité - CafThé"
        description="Découvrez notre programme de fidélité. Gagnez des points à chaque achat et profitez de réductions et d'avantages exclusifs."
      />
      <div className="info-page-header">
        <h1>Programme de Fidélité</h1>
        <p>Gagnez des points à chaque achat</p>
      </div>
      <div className="info-page-content">
        <div className="loyalty-info">
          <h2>Comment ça marche ?</h2>
          {loyaltySections.map((section, index) => (
            <div key={index} className="loyalty-section">
              <h3>{section.title}</h3>
              <p>{section.content}</p>
              {section.list && (
                <ul>
                  {section.list.map((item, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: item }}></li>
                  ))}
                </ul>
              )}
            </div>
          ))}
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
