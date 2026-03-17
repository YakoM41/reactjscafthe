import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// Import de Swiper
import "swiper/css";
import "swiper/css/effect-fade";

import "../styles/Home.css";

// Import des images
import heroImg1 from "/images/HeroSection_resultat.webp";
import heroImg2 from "/images/CuilleresT.webp";
import heroImg3 from "/images/TasseurCaf.webp";

const Hero = () => {
  const images = [heroImg1, heroImg2, heroImg3];

  return (
    <section className="hero-container">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="hero-swiper"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              loading={index === 0 ? "eager" : "lazy"}
              style={{ display: "none" }}
              alt=""
            />
            <div
              className="hero-slide-bg"
              style={{ backgroundImage: `url(${img})` }}
            />
            {/* Overlay sombre intégré au slide pour s'assurer qu'il couvre l'image */}
            <div className="hero-overlay"></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hero-content">
        <h1 className="hero-title">
          L'excellence en héritage, le goût en partage
        </h1>
        <p className="hero-subtitle">
          Découvrez notre sélection exclusive de thés et cafés d'exception,
          cultivés avec passion et respect de la terre
        </p>
        <div className="hero-separator"></div>
        <Link to="/produits" className="btn-hero">
          Explorer la Collection
        </Link>
      </div>
    </section>
  );
};

export default Hero;
