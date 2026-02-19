import React, { useEffect, useState, useMemo } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import ProductCard from "../components/ProductCard.jsx";
import "../styles/ProductList.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ProductList() {
  const [produits, setProduits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const query = useQuery();
  const categoryFromUrl = query.get("category");
  const searchQuery = query.get("search");

  const [activeCategory, setActiveCategory] = useState("Tous les produits");
  const [activeOrigine, setActiveOrigine] = useState("Tous");
  const [activePrice, setActivePrice] = useState("Tous les prix");
  const [sortOrder, setSortOrder] = useState("default"); // 'default', 'asc', 'desc'

  useEffect(() => {
    if (categoryFromUrl) {
      const categoryMap = {
        thes: "Thé",
        cafes: "Café",
        accessoires: "Accessoire",
        "coffrets-cadeaux": "Coffrets Cadeaux",
      };
      setActiveCategory(categoryMap[categoryFromUrl] || "Tous les produits");
    } else if (searchQuery) {
        // Reset category if searching
        setActiveCategory("Tous les produits");
    }
  }, [categoryFromUrl, searchQuery]);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/produits`,
        );
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.json();
        const productsData = Array.isArray(data) ? data : data.produits;
        setProduits(productsData || []); // Assurez-vous que produits est toujours un tableau
      } catch (err) {
        console.error("Erreur lors du chargement des produits : ", err);
        setError(
          "Impossible de charger les produits. Veuillez réessayer plus tard.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProduits();
  }, []);

  const collections = [
    { name: "Tous les produits", count: 24 },
    { name: "Thé", count: 6 },
    { name: "Café", count: 6 },
    { name: "Accessoire", count: 6 },
    { name: "Coffrets Cadeaux", count: 4 },
  ];

  const origines = [
    "Tous",
    "Japon",
    "Éthiopie",
    "Taiwan",
    "France",
    "Colombie",
    "Chine",
    "Italie",
  ];

  const prices = [
    "Tous les prix",
    "Moins de 30€",
    "30€ - 60€",
    "60€ - 100€",
    "Plus de 100€",
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let filteredProducts = produits;

    // Search Filter
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter((p) =>
        p.Nom_produit.toLowerCase().includes(lowerQuery) ||
        (p.Description && p.Description.toLowerCase().includes(lowerQuery))
      );
    }

    // Category Filter
    if (activeCategory !== "Tous les produits") {
      let categoryToFilter = activeCategory;
      switch (activeCategory) {
        case "Thé":
          categoryToFilter = "Thé";
          break;
        case "Café":
          categoryToFilter = "Café";
          break;
        case "Accessoire":
          categoryToFilter = "Accessoire";
          break;
        case "Coffrets Cadeaux":
          categoryToFilter = "Coffrets cadeaux";
          break;
      }
      filteredProducts = filteredProducts.filter(
        (p) => p.Catégorie === categoryToFilter,
      );
    }

    // The logic for filtering by origin and price is not implemented yet, as there is no data for it in the products

    const sortedProducts = [...filteredProducts];
    if (sortOrder === "asc") {
      sortedProducts.sort((a, b) => a.Prix_TTC - b.Prix_TTC);
    } else if (sortOrder === "desc") {
      sortedProducts.sort((a, b) => b.Prix_TTC - a.Prix_TTC);
    }

    return sortedProducts;
  }, [produits, activeCategory, activeOrigine, activePrice, sortOrder, searchQuery]);

  if (error) {
    return (
      <div className="product-list-container error-container">
        <h3>Une Erreur est survenue</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Réessayer</button>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        {searchQuery ? (
            <>
                <h1>Résultats de recherche</h1>
                <p>Pour : "{searchQuery}"</p>
                <Link to="/produits" className="reset-search-link">Voir tous les produits</Link>
            </>
        ) : (
            <>
                <h1>Nos Collections d'Exception</h1>
                <p>
                  Découvrez notre sélection artisanale de thés, cafés et accessoires.
                </p>
            </>
        )}
      </div>
      <div className="page-content">
        <div className="sidebar">
          <div className="filter-section">
            <h4>Collections</h4>
            {collections.map((collection) => (
              <button
                key={collection.name}
                className={`filter-button ${activeCategory === collection.name ? "active" : ""}`}
                onClick={() => setActiveCategory(collection.name)}
              >
                <span>{collection.name}</span>
                <span>{collection.count}</span>
              </button>
            ))}
          </div>
          <div className="filter-section">
            <h4>Origine</h4>
            {origines.map((origine) => (
              <button
                key={origine}
                className={`filter-button ${activeOrigine === origine ? "active" : ""}`}
                onClick={() => setActiveOrigine(origine)}
              >
                {origine}
              </button>
            ))}
          </div>
          <div className="filter-section">
            <h4>Prix</h4>
            {prices.map((price) => (
              <button
                key={price}
                className={`filter-button ${activePrice === price ? "active" : ""}`}
                onClick={() => setActivePrice(price)}
              >
                {price}
              </button>
            ))}
          </div>
        </div>
        <div className="product-grid-container">
          <div className="product-list-controls">
            <div className="product-count">
              {filteredAndSortedProducts.length} produits
            </div>
            <div className="sort-dropdown">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="default">Trier par</option>
                <option value="asc">Prix croissant</option>
                <option value="desc">Prix décroissant</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="product-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="product-skeleton">
                  <Skeleton height={200} width="100%" />
                  <div style={{ marginTop: "0.5rem" }}>
                    <Skeleton height={20} width="70%" />
                  </div>
                  <div style={{ marginTop: "0.3rem" }}>
                    <Skeleton height={20} width="40%" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="product-grid">
              {filteredAndSortedProducts.map((produit) => (
                <ProductCard key={produit.Référence} product={produit} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
