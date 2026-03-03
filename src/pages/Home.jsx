import React from "react";
import SEO from "../components/SEO"; // Import the new SEO component
import Hero from "../components/Hero";
import Engagement from "../components/Engagement";
import FeaturedProducts from "../components/FeaturedProducts";
import Universes from "../components/Universes";

function Home() {
  return (
    <div>
      <SEO
        title="CafThé - Votre Boutique en Ligne de Café et Thé de Qualité"
        description="Découvrez CafThé, votre destination pour les meilleurs cafés torréfiés et thés fins du monde entier. Livraison rapide et paiement sécurisé."
      />
      <Hero />
      <Engagement />
      <FeaturedProducts />
      <Universes />
    </div>
  );
}

export default Home;
