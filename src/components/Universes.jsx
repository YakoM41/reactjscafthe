import React from "react";
import thesImage from "/src/assets/images/Image (Thés)_resultat.webp";
import cafesImage from "/src/assets/images/Image (Cafés)_resultat.webp";
import accessoiresImage from "/src/assets/images/Image (Accessoires)_resultat.webp";
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
    <section
      style={{
        padding: "4rem 2rem",
        backgroundColor: "#E8E2D9",
      }}
    >
      <p className="univers-text">COLLECTIONS</p>
      <h2
        style={{ fontSize: "72px", fontWeight: "bold", marginBottom: "2rem" }}
      >
        Explorez nos univers
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        {universes.map((universe, index) => (
          <Link
            to={universe.path}
            className="universe-card"
            key={index}
            style={{
              display: "block",
              textDecoration: "none",
              position: "relative",
              textAlign: "center",
              color: "white",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <img
              className="universe-image"
              src={universe.image}
              alt={universe.name}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 2,
              }}
            >
              <p>{universe.count}</p>
              <h3 style={{ fontSize: "2rem", fontWeight: "bold" }}>
                {universe.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Universes;
