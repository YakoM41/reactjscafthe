import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Engagement = () => {
  return (
    <section className="engagement-section">
      <div className="engagement-image-container">
        <img
          src="/images/Gemini_Generated_Image_wbv4ivwbv4ivwbv4 (1).webp"
          alt="Moulin à café"
          className="engagement-image"
        />
      </div>
      <div className="engagement-content">
        <p className="engagement-text">NOTRE HISTOIRE</p>
        <h2 className="hero-histoire">
          De la terre à la tasse :{" "}
          <span className="engagement-text">notre engagement</span>
        </h2>
        <p>
          Depuis 1892, notre famille cultive l'excellence à travers trois
          générations de maîtres torréfacteurs. Chaque grain de café, chaque
          feuille de thé est sélectionné avec soin sur les plus belles terres du
          monde.
        </p>
        <p>
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
