import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useCart } from "../contexts/CartContext";
import "../styles/ProductDetails.css";

// Accordion Component
const AccordionItem = ({ title, children, isOpen, onClick }) => {
  return (
    <div className="accordion-item">
      <button className="accordion-title" onClick={onClick}>
        <span>{title}</span>
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        <div className="accordion-content-inner">{children}</div>
      </div>
    </div>
  );
};

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [produit, setProduit] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openAccordion, setOpenAccordion] = useState("description");

  useEffect(() => {
    const fetchProduit = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/produits/${id}`,
        );
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        const data = await response.json();
        setProduit(data.produit);
      } catch (err) {
        console.error("Erreur lors du chargement du produit : ", err);
        setError("Impossible de charger le produit");
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProduit();
  }, [id]);

  const handleAccordionClick = (title) => {
    setOpenAccordion(openAccordion === title ? null : title);
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    if (produit) {
      addToCart(produit, quantity);
    }
  };

  if (isLoading) {
    return (
      <div className="product-detail-container">
        <div className="product-image-section">
          <Skeleton height={500} width={"100%"} />
        </div>
        <div className="product-info-section">
          <Skeleton
            height={20}
            width="50%"
            style={{ marginBottom: "1.5rem" }}
          />
          <Skeleton height={50} width="90%" style={{ marginBottom: "1rem" }} />
          <Skeleton height={30} width="40%" style={{ marginBottom: "2rem" }} />
          <Skeleton height={60} width="100%" style={{ marginBottom: "2rem" }} />
          <Skeleton height={50} width="100%" style={{ marginBottom: "1rem" }} />
          <Skeleton height={50} width="100%" style={{ marginBottom: "1rem" }} />
          <Skeleton height={50} width="100%" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Une Erreur est survenue</h3>
        <p>{error}</p>
        <Link to="/">Retour à l'accueil</Link>
      </div>
    );
  }

  if (!produit) {
    return <div className="error-container">Produit non trouvé.</div>;
  }

  const imageUrl = produit.Images
    ? `${import.meta.env.VITE_API_URL}/images/${produit.Images}`
    : "https://placehold.co/600x400";

  return (
    <div className="product-detail-container">
      <div className="product-image-section">
        <img
          src={imageUrl}
          alt={produit.Nom_produit}
          className="product-image"
          onError={(e) => (e.target.src = "https://placehold.co/600x400")}
        />
      </div>
      <div className="product-info-section">
        <div className="breadcrumb">
          <Link to="/">Accueil</Link> / <Link to="/produits">Produits</Link> /{" "}
          {produit.Nom_produit}
        </div>
        <h1>{produit.Nom_produit}</h1>
        <p className="product-price">{produit.Prix_TTC} €</p>

        <div className="product-actions">
          <div className="quantity-selector">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <input type="text" value={quantity} readOnly />
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Ajouter au panier
          </button>
        </div>

        <div className="product-accordion">
          <AccordionItem
            title="Description"
            isOpen={openAccordion === "description"}
            onClick={() => handleAccordionClick("description")}
          >
            <p dangerouslySetInnerHTML={{ __html: produit.Description }}></p>
          </AccordionItem>
          <AccordionItem
            title="Caractéristiques"
            isOpen={openAccordion === "features"}
            onClick={() => handleAccordionClick("features")}
          >
            <ul>
              <li>
                <strong>Poids :</strong> {produit.Poids || "N/A"}
              </li>
              <li>
                <strong>Origine :</strong> {produit.Origines || "N/A"}
              </li>
              <li>
                <strong>Catégorie :</strong> {produit.Catégorie || "N/A"}
              </li>
            </ul>
          </AccordionItem>
          <AccordionItem
            title="Avis"
            isOpen={openAccordion === "reviews"}
            onClick={() => handleAccordionClick("reviews")}
          >
            <p>Aucun avis pour le moment.</p>
          </AccordionItem>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
