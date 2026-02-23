import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Hero = () => {
  return (
    <section
      className="hero"
      style={{
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "120px",
          fontWeight: "bold",
          marginInline: "5rem",
          marginTop: "8rem",
        }}
      >
        Une Expérience Artisanale
      </h1>
      <p style={{ fontSize: "1.2rem", margin: "1rem 0" }}>
        Découvrez notre sélection exclusive de thés et cafés d'exception,
        cultivés avec passion et respect de la terre
      </p>
      <Link to="/produits" className="btn-hero">
        Explorer la Collection
      </Link>
    </section>
  );
};

export default Hero;
