import React from 'react';
import Hero from '../components/Hero';
import Engagement from '../components/Engagement';
import FeaturedProducts from '../components/FeaturedProducts';
import Universes from '../components/Universes';

function Home() {
  return (
    <div>
      <Hero />
      <Engagement />
      <FeaturedProducts />
      <Universes />
    </div>
  );
}

export default Home;