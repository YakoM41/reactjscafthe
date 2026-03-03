import React, { useEffect, useState, useMemo } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import ProductCard from "../components/ProductCard.jsx";
import SEO from "../components/SEO.jsx"; // Import SEO component
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
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [openAccordion, setOpenAccordion] = useState(null); // État pour l'accordéon

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

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
    { name: "Coffrets Cadeaux" },
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
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.Nom_produit.toLowerCase().includes(lowerQuery) ||
          (p.Description && p.Description.toLowerCase().includes(lowerQuery)),
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

    // Origin Filter
    if (activeOrigine !== "Tous") {
      filteredProducts = filteredProducts.filter(
        (p) => p.Origines && p.Origines.includes(activeOrigine),
      );
    }

    // Price Filter
    if (activePrice !== "Tous les prix") {
      filteredProducts = filteredProducts.filter((p) => {
        const price = p.Prix_TTC;
        switch (activePrice) {
          case "Moins de 30€":
            return price < 30;
          case "30€ - 60€":
            return price >= 30 && price <= 60;
          case "60€ - 100€":
            return price > 60 && price <= 100;
          case "Plus de 100€":
            return price > 100;
          default:
            return true;
        }
      });
    }

    const sortedProducts = [...filteredProducts];
    if (sortOrder === "asc") {
      sortedProducts.sort((a, b) => a.Prix_TTC - b.Prix_TTC);
    } else if (sortOrder === "desc") {
      sortedProducts.sort((a, b) => b.Prix_TTC - a.Prix_TTC);
    }

    return sortedProducts;
  }, [
    produits,
    activeCategory,
    activeOrigine,
    activePrice,
    sortOrder,
    searchQuery,
  ]);

  // Pagination calculations
  const totalPages = Math.ceil(
    filteredAndSortedProducts.length / productsPerPage,
  );
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  // Reset à page 1 quand changement de filtre
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeOrigine, activePrice, sortOrder, searchQuery]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Titre dynamique pour le SEO
  const pageTitle = useMemo(() => {
    if (searchQuery) {
      return `Résultats de recherche pour "${searchQuery}" - CafThé`;
    }
    if (activeCategory && activeCategory !== "Tous les produits") {
      return `${activeCategory} - Notre Sélection | CafThé`;
    }
    return "Nos Thés, Cafés et Accessoires d'Exception | CafThé";
  }, [searchQuery, activeCategory]);

  const pageDescription =
    "Explorez notre collection de thés fins, cafés de spécialité et accessoires uniques. Trouvez le produit parfait pour chaque moment.";

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
      <SEO title={pageTitle} description={pageDescription} />
      <div className="product-list-header">
        {searchQuery ? (
          <>
            <h1>Résultats de recherche</h1>
            <p>Pour : "{searchQuery}"</p>
            <Link to="/produits" className="reset-search-link">
              Voir tous les produits
            </Link>
          </>
        ) : (
          <>
            <h1>Nos Collections d'Exception</h1>
            <p>
              Découvrez notre sélection artisanale de thés, cafés et
              accessoires.
            </p>
          </>
        )}
      </div>
      <div className="page-content">
        <div className="sidebar">
          <div className="filter-section">
            <button className="accordion-toggle" onClick={() => toggleAccordion('collections')}>
              <h4>Collections</h4>
              <span>{openAccordion === 'collections' ? '-' : '+'}</span>
            </button>
            <div className={`accordion-content ${openAccordion === 'collections' ? 'open' : ''}`}>
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
          </div>

          <div className="filter-section">
            <button className="accordion-toggle" onClick={() => toggleAccordion('origine')}>
              <h4>Origine</h4>
              <span>{openAccordion === 'origine' ? '-' : '+'}</span>
            </button>
            <div className={`accordion-content ${openAccordion === 'origine' ? 'open' : ''}`}>
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
          </div>

          <div className="filter-section">
            <button className="accordion-toggle" onClick={() => toggleAccordion('prix')}>
              <h4>Prix</h4>
              <span>{openAccordion === 'prix' ? '-' : '+'}</span>
            </button>
            <div className={`accordion-content ${openAccordion === 'prix' ? 'open' : ''}`}>
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
            <>
              <div className="product-grid">
                {currentProducts.map((produit) => (
                  <ProductCard key={produit.Référence} product={produit} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Précédent
                  </button>

                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => (
                        <button
                          key={pageNum}
                          className={`pagination-number ${currentPage === pageNum ? "active" : ""}`}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </button>
                      ),
                    )}
                  </div>

                  <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Suivant
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductList;
