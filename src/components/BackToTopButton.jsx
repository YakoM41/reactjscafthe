import React, { useState, useEffect } from "react";
import "../styles/BackToTopButton.css";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Affiche le bouton seulement si on descend, a partir de 300px
  const toggleVisibility = () => {
    setIsVisible(window.pageYOffset > 300);
  };

  // Effet lent pour le retour vers le haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="back-to-top">
      {isVisible && (
        <button onClick={scrollToTop} className="back-to-top-button">
          &uarr;
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;
