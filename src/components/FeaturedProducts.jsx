import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../styles/Home.css";

// Import assets directly
import MatchaImage from "../assets/images/MatchaImperialJap.png";
import CafeImage from "../assets/images/CafeEthiopienYirga.png";
import TheImage from "../assets/images/TheOolongTaiwan.png";

// Placeholders si l'API ne fonctionne pas
const fallbackProducts = [
  {
    Référence: "MJP01",
    Nom_produit: "Matcha Impérial du Japon",
    Categorie: "Thé Vert Premium",
    Images: MatchaImage,
    isFallback: true,
  },
  {
    Référence: "CEY01",
    Nom_produit: "Café Éthiopien Yirgacheffe",
    Categorie: "Arabica Single Origin",
    Images: CafeImage,
    isFallback: true,
  },
  {
    Référence: "TOT01",
    Nom_produit: "Thé Oolong Premium de Taiwan",
    Categorie: "Thé Semi-fermenté",
    Images: TheImage,
    isFallback: true,
  },
];

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/produits?limit=3`,
        );
        if (!response.ok) {
          throw new Error("API response was not ok.");
        }
        const data = await response.json();
        const productsData = Array.isArray(data) ? data : data.produits;
        setProducts(productsData.slice(0, 3));
      } catch (error) {
        console.error(
          "Impossible d'afficher les produits phares, utilisation du fallback.",
          error,
        );
        setProducts(fallbackProducts);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderSkeleton = () => (
    <div className="featured-product">
      <Skeleton height={300} width={"100%"} />
      <Skeleton height={24} width={"80%"} style={{ marginTop: "1.5rem" }} />
      <Skeleton height={18} width={"60%"} style={{ marginTop: "0.5rem" }} />
      <Skeleton height={18} width={"40%"} style={{ marginTop: "1rem" }} />
    </div>
  );

  return (
    <section className="featured-products-section">
      <div className="container">
        <p className="section-subtitle">Sélection Artisanale</p>
        <h2 className="section-title">Nos produits phares</h2>
        <p className="section-description">
          Une sélection de nos meilleurs crus, choisis pour leur caractère
          d'exception.
        </p>

        <div className="featured-products-grid">
          {isLoading ? (
            <>
              {renderSkeleton()}
              {renderSkeleton()}
              {renderSkeleton()}
            </>
          ) : (
            products.map((product) => {
              const imageUrl = product.isFallback
                ? product.Images
                : product.Images
                  ? `${import.meta.env.VITE_API_URL}/images/${product.Images}`
                  : fallbackProducts[0].Images;

              return (
                <div key={product.Référence} className="featured-product">
                  <Link to={`/produit/${product.Référence}`}>
                    <div className="featured-product-image-container">
                      <img
                        src={imageUrl}
                        alt={product.Nom_produit}
                        className="featured-product-image"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = fallbackProducts[0].Images;
                        }}
                      />
                    </div>
                  </Link>
                  <h3 className="featured-product-name">
                    {product.Nom_produit}
                  </h3>
                  <p className="featured-product-category">
                    {product.Categorie}
                  </p>
                  <Link
                    to={`/produit/${product.Référence}`}
                    className="featured-product-link"
                  >
                    Découvrir
                  </Link>
                </div>
              );
            })
          )}
        </div>

        <div className="section-cta">
          <Link to="/produits" className="btn-primary">
            Voir tous nos produits
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
