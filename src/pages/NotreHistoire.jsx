import React from "react";
import "../styles/notreHistoire.css";
import "../styles/header.css";

const NotreHistoire = () => {
  return (
    <div className="notre-histoire-page">
      {/* Section 1: Hero */}
      <section
        className="nh-hero"
        style={{ backgroundImage: "url('src/assets/images/BrandStory.png')" }}
      >
        <div className="nh-hero-content">
          <p className="pre-title">NOS ORIGINES</p>
          <h1>Des meilleurs terroirs du monde</h1>
          <p>
            Nous parcourons les régions les plus prestigieuses d'Asie, d'Afrique
            et d'Amérique Latine pour sélectionner les thés et cafés d'exception
            qui composent nos collections.
          </p>
          <div className="nh-stats">
            <div>
              <h2>12+</h2>
              <p>Pays Partenaires</p>
            </div>
            <div>
              <h2>50+</h2>
              <p>Producteurs</p>
            </div>
            <div>
              <h2>130</h2>
              <p>Ans d'Histoire</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Notre Vision */}
      <section className="nh-vision">
        <div className="nh-vision-title">
          <p className="pre-title">NOTRE VISION</p>
          <h2>L'excellence artisanale depuis 1892</h2>
        </div>
        <div className="nh-vision-text">
          <p>
            Fondée par la famille Beaumont, CafThé est née d'une passion
            intransigeante pour l'excellence et d'un profond respect pour les
            artisans qui cultivent nos produits.
          </p>
          <p>
            Au fil des générations, nous avons construit des relations durables
            avec les meilleurs producteurs de thé et de café à travers le monde.
            Notre expertise en torréfaction et en sélection nous permet d'offrir
            des produits d'une qualité exceptionnelle, tout en garantissant des
            pratiques responsables et équitables.
          </p>
          <p>
            Chaque tasse de thé ou de café CafThé raconte l'histoire d'un
            terroir unique, du savoir-faire ancestral de nos producteurs et de
            notre engagement indéfectible envers la qualité.
          </p>
          <blockquote className="nh-quote">
            "Le véritable luxe réside dans la pureté du produit et le respect de
            ceux qui le cultivent."
            <footer>— Marie Beaumont, Maître Torréfactrice & Directrice</footer>
          </blockquote>
        </div>
      </section>

      {/* Section 3: Image placeholders */}
      <section className="nh-image-grid">
        <div
          className="nh-image-placeholder"
          style={{
            backgroundImage: "url('src/assets/images/BrandStory2.jpg')",
          }}
        ></div>
        <div
          className="nh-image-placeholder"
          style={{
            backgroundImage: "url('src/assets/images/BrandStory3.jpg')",
          }}
        ></div>
      </section>

      {/* Section 4: Eco-responsabilité */}
      <section className="nh-eco">
        <p>NOS ENGAGEMENTS</p>
        <h2>Éco-responsabilité & Commerce Équitable</h2>
        <p>
          Notre engagement envers la planète et les producteurs est au cœur de
          chaque décision que nous prenons.
        </p>
        <div className="nh-eco-cards">
          <div className="nh-card">
            <div className="nh-card-icon">
              <img
                src="src/assets/images/icons/BrandStory1.svg"
                alt="fair trade"
              />
            </div>
            <h3>Agriculture Biologique</h3>
            <p>
              100% de nos produits sont certifiés bio et cultivés sans
              pesticides
            </p>
          </div>
          <div className="nh-card">
            <div className="nh-card-icon">
              <img
                src="src/assets/images/icons/BrandStory2.svg"
                alt="Commerce equitable "
              />
            </div>
            <h3>Commerce Équitable</h3>
            <p>Rémunération juste des producteurs et relations durables</p>
          </div>
          <div className="nh-card">
            <div className="nh-card-icon">
              <img
                src="src/assets/images/icons/BrandStory3.svg"
                alt="Empreinte Carbone"
              />
            </div>
            <h3>Empreinte Carbone</h3>
            <p>Transport optimisé et packaging recyclable et compostable</p>
          </div>
          <div className="nh-card">
            <div className="nh-card-icon">
              <img
                src="src/assets/images/icons/BrandStory4.svg"
                alt="Impacte social"
              />
            </div>
            <h3>Impact Social</h3>
            <p>Soutien aux communautés locales et projets éducatifs</p>
          </div>
        </div>
      </section>

      {/* Section 5: Certifications */}
      <section className="nh-certifications">
        <h2>Nos Certifications</h2>
        <div className="nh-cert-logos">
          <div className="nh-cert-card-log">
            <div className="nh-cert-icon">🌿</div>
            <p>AB - Agriculture Biologique</p>
          </div>
          <div className="nh-cert-card-log">
            <div className="nh-cert-icon">🤝</div>
            <p>Fair Trade Certified</p>
          </div>
          <div className="nh-cert-card-log">
            <div className="nh-cert-icon">🌳</div>
            <p>Rainforest Alliance</p>
          </div>
          <div className="nh-cert-card-log">
            <div className="nh-cert-icon">🏆</div>
            <p>B Corporation</p>
          </div>
        </div>
      </section>

      {/* Section 6: CTA */}
      <section
        className="nh-cta"
        style={{ backgroundImage: "url('src/assets/images/Container2.png')" }}
      >
        <h2>Ensemble pour un avenir durable</h2>
        <p>
          Chaque achat CafThé contribue directement au bien-être des communautés
          agricoles et à la préservation de l'environnement.
        </p>
        <button>Voir nos certifications</button>
      </section>
    </div>
  );
};

export default NotreHistoire;
