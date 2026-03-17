import React, { useEffect, useState, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import ProductCard from "../components/ProductCard.jsx";
import SEO from "../components/SEO.jsx";
import "../styles/ProductList.css";

// --- Données statiques des filtres ---
const COLLECTIONS = [
  { name: "Tous les produits", count: 24 },
  { name: "Thé", count: 6 },
  { name: "Café", count: 6 },
  { name: "Accessoire", count: 6 },
  { name: "Coffrets Cadeaux" },
];
const ORIGINES = ["Tous", "Japon", "Éthiopie", "Taiwan", "France", "Colombie", "Chine", "Italie"];
const PRICES = ["Tous les prix", "Moins de 30€", "30€ - 60€", "60€ - 100€", "Plus de 100€"];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ProductList() {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const query = useQuery();
  const searchQuery = query.get("search");
  const categoryFromUrl = query.get("category");

  const [filters, setFilters] = useState({
    category: "Tous les produits",
    origin: "Tous",
    price: "Tous les prix",
    sort: "default",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [openAccordion, setOpenAccordion] = useState(null);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/produits`);
        if (!res.ok) throw new Error(`Erreur HTTP ${res.status}`);
        const data = await res.json();
        setAllProducts(Array.isArray(data) ? data : data.produits || []);
      } catch (err) {
        console.error("Erreur lors du chargement des produits : ", err);
        setError("Impossible de charger les produits. Veuillez réessayer plus tard.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduits();
  }, []);

  useEffect(() => {
    if (categoryFromUrl) {
      const categoryMap = {
        thes: "Thé",
        cafes: "Café",
        accessoires: "Accessoire",
        "coffrets-cadeaux": "Coffrets Cadeaux",
      };
      setFilters(prev => ({ ...prev, category: categoryMap[categoryFromUrl] || "Tous les produits" }));
    }
  }, [categoryFromUrl]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
    setCurrentPage(1); // Reset page on filter change
  };

  const toggleAccordion = (section) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  // useMemo est crucial ici pour éviter de re-filtrer et re-trier la liste à chaque re-rendu.
  const displayedProducts = useMemo(() => {
    let productList = [...allProducts];

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      productList = productList.filter(p =>
        p.Nom_produit.toLowerCase().includes(lowerQuery) ||
        (p.Description && p.Description.toLowerCase().includes(lowerQuery))
      );
    }

    if (filters.category !== "Tous les produits") {
      const categoryToFilter = filters.category === "Coffrets Cadeaux" ? "Coffrets cadeaux" : filters.category;
      productList = productList.filter(p => p.Catégorie === categoryToFilter);
    }

    if (filters.origin !== "Tous") {
      productList = productList.filter(p => p.Origines?.includes(filters.origin));
    }

    if (filters.price !== "Tous les prix") {
      productList = productList.filter(p => {
        const price = p.Prix_TTC;
        switch (filters.price) {
          case "Moins de 30€": return price < 30;
          case "30€ - 60€": return price >= 30 && price <= 60;
          case "60€ - 100€": return price > 60 && price <= 100;
          case "Plus de 100€": return price > 100;
          default: return true;
        }
      });
    }

    if (filters.sort === 'asc') {
      productList.sort((a, b) => a.Prix_TTC - b.Prix_TTC);
    } else if (filters.sort === 'desc') {
      productList.sort((a, b) => b.Prix_TTC - a.Prix_TTC);
    }

    return productList;
  }, [allProducts, filters, searchQuery]);

  const totalPages = Math.ceil(displayedProducts.length / productsPerPage);
  const currentProducts = displayedProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

  const pageTitle = useMemo(() => {
    if (searchQuery) return `Résultats pour "${searchQuery}" - CafThé`;
    if (filters.category && filters.category !== "Tous les produits") return `${filters.category} - Notre Sélection | CafThé`;
    return "Nos Thés, Cafés et Accessoires d'Exception | CafThé";
  }, [searchQuery, filters.category]);

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
      <SEO title={pageTitle} description="Explorez notre collection de thés fins, cafés de spécialité et accessoires uniques." />
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
            <p>Découvrez notre sélection artisanale de thés, cafés et accessoires.</p>
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
              {COLLECTIONS.map((collection) => (
                <button key={collection.name} className={`filter-button ${filters.category === collection.name ? "active" : ""}`} onClick={() => handleFilterChange('category', collection.name)}>
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
              {ORIGINES.map((origine) => (
                <button key={origine} className={`filter-button ${filters.origin === origine ? "active" : ""}`} onClick={() => handleFilterChange('origin', origine)}>
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
              {PRICES.map((price) => (
                <button key={price} className={`filter-button ${filters.price === price ? "active" : ""}`} onClick={() => handleFilterChange('price', price)}>
                  {price}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="product-grid-container">
          <div className="product-list-controls">
            <div className="product-count">{displayedProducts.length} produits</div>
            <div className="sort-dropdown">
              <select value={filters.sort} onChange={(e) => handleFilterChange('sort', e.target.value)}>
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
                  <div style={{ marginTop: "0.5rem" }}><Skeleton height={20} width="70%" /></div>
                  <div style={{ marginTop: "0.3rem" }}><Skeleton height={20} width="40%" /></div>
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
                  <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Précédent</button>
                  <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button key={pageNum} className={`pagination-number ${currentPage === pageNum ? "active" : ""}`} onClick={() => setCurrentPage(pageNum)}>
                        {pageNum}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Suivant</button>
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
