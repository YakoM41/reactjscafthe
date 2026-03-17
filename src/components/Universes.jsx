import React from "react";
import thesImage from "/images/Image (Thés)_resultat.webp";
import cafesImage from "/images/Image (Cafés)_resultat.webp";
import accessoiresImage from "/images/Image (Accessoires)_resultat.webp";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const universes = [
  {
    name: "Thés",
    image: thesImage,
    count: "24 Variétés",
    path: "/produits?category=thes",
  },
  {
    name: "Cafés",
    image: cafesImage,
    count: "18 Origines",
    path: "/produits?category=cafes",
  },
  {
    name: "Accessoires",
    image: accessoiresImage,
    count: "32 Pièces",
    path: "/produits?category=accessoires",
  },
];

const Universes = () => {
  return (
    <section className="universes-section">
      <p className="univers-text">COLLECTIONS</p>
      <h2 className="universes-title">Explorez nos univers</h2>
      <div className="universes-grid">
        {universes.map((universe, index) => (
          <Link to={universe.path} className="universe-card" key={index}>
            <img
              className="universe-image"
              src={universe.image}
              alt={universe.name}
            />
            <div className="universe-card-content">
              <p>{universe.count}</p>
              <h3>{universe.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Universes;
