import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Engagement = () => {
  return (
    <section
      style={{
        display: "flex",
        alignItems: "center",
        padding: "4rem 2rem",
        backgroundColor: "#2C2419",
      }}
    >
      <div style={{ flex: 1 }}>
        <img
          src="/src/assets/images/NotreHistoireSection.png"
          alt="Moulin à café"
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </div>
      <div style={{ flex: 1, paddingLeft: "2rem" }}>
        <p className="engagement-text"> NOTRE HISTOIRE</p>
        <h2
          className="hero-histoire"
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginRight: "15rem",
          }}
        >
          De la terre à la tasse :{" "}
          <span className="engagement-text">notre engagement</span>
        </h2>
        <p style={{ margin: "1rem 0", color: "white", marginRight: "17rem" }}>
          Depuis 1892, notre famille cultive l'excellence à travers trois
          générations de maîtres torréfacteurs. Chaque grain de café, chaque
          feuille de thé est sélectionné avec soin sur les plus belles terres du
          monde.
        </p>
        <p style={{ margin: "1rem 0", color: "white", marginRight: "17rem" }}>
          Notre engagement envers la terre et les producteurs guide chacune de
          nos décisions. Commerce équitable, agriculture biologique et respect
          des savoir-faire ancestraux sont au cœur de notre philosophie.
        </p>
        <Link className="btn-engage" to="/notre-histoire">
          Découvrir notre histoire
        </Link>
      </div>
    </section>
  );
};

export default Engagement;
