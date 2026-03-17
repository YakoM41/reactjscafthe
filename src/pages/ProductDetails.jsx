import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { useCart } from "../contexts/CartContext";
import SEO from "../components/SEO.jsx";
import "../styles/ProductDetails.css";

// Le composant Accordion est spécifique à cette page, on le garde ici.
const DetailAccordion = ({ title, children, isOpen, onClick }) => (
  <div className="accordion-item">
    <button className="accordion-title" onClick={onClick}>
      <span>{title}</span>
      <span>{isOpen ? "-" : "+"}</span>
    </button>
    <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
      <div className="accordion-content-inner">{children}</div>
    </div>
  </div>
);

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [productData, setProductData] = useState({ product: null, stock: 0 });
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState('loading'); // 'loading', 'error', 'success'
  const [openAccordion, setOpenAccordion] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      setStatus('loading');
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/produits/${id}`);
        if (!res.ok) throw new Error("Produit non trouvé");
        const data = await res.json();
        setProductData({
          product: data.produit,
          stock: data.produit.Stock,
        });
        setStatus('success');
      } catch (err) {
        console.error("Erreur chargement produit:", err);
        setStatus('error');
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (amount) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    if (productData.product) {
      addToCart(productData.product, quantity);
    }
  };

  if (status === 'loading') {
    return (
      <div className="product-detail-container">
        <div className="product-image-section"><Skeleton height={500} width={"100%"} /></div>
        <div className="product-info-section">
          <Skeleton height={20} width="50%" style={{ marginBottom: "1.5rem" }} />
          <Skeleton height={50} width="90%" style={{ marginBottom: "1rem" }} />
          <Skeleton height={30} width="40%" style={{ marginBottom: "2rem" }} />
          <Skeleton height={60} width="100%" style={{ marginBottom: "2rem" }} />
          <Skeleton height={50} width="100%" style={{ marginBottom: "1rem" }} />
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="error-container">
        <h3>Produit Introuvable</h3>
        <p>Nous n'avons pas pu charger ce produit. Il est possible qu'il n'existe plus.</p>
        <Link to="/produits" className="btn-primary">Voir tous les produits</Link>
      </div>
    );
  }

  const { product, stock } = productData;
  const imageUrl = product.Images ? `${import.meta.env.VITE_API_URL}/images/${product.Images}` : "https://placehold.co/600x400";

  return (
    <div className="product-detail-container">
      <SEO
        title={`${product.Nom_produit} | CafThé`}
        description={(product.Description || '').substring(0, 155).replace(/<[^>]*>/g, '') + '...'}
      />
      <div className="product-image-section">
        <img src={imageUrl} alt={product.Nom_produit} className="product-image" onError={(e) => (e.target.src = "https://placehold.co/600x400")} />
      </div>
      <div className="product-info-section">
        <div className="breadcrumb">
          <Link to="/">Accueil</Link> / <Link to="/produits">Produits</Link> / {product.Nom_produit}
        </div>
        <h1>{product.Nom_produit}</h1>
        <p className="product-price">{product.Prix_TTC} €</p>

        <p className={`product-stock ${stock > 0 ? '' : 'out-of-stock'}`}>
          {stock > 0 ? `En stock : ${stock}` : "En rupture de stock"}
        </p>

        <div className="product-actions">
          <div className="quantity-selector">
            <button onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1}>-</button>
            <input type="text" value={quantity} readOnly />
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={stock === 0}>
            {stock > 0 ? "Ajouter au panier" : "Indisponible"}
          </button>
        </div>

        <div className="product-accordion">
          <DetailAccordion title="Description" isOpen={openAccordion === 'description'} onClick={() => setOpenAccordion(openAccordion === 'description' ? null : 'description')}>
            <p dangerouslySetInnerHTML={{ __html: product.Description }}></p>
          </DetailAccordion>
          <DetailAccordion title="Caractéristiques" isOpen={openAccordion === 'features'} onClick={() => setOpenAccordion(openAccordion === 'features' ? null : 'features')}>
            <ul>
              <li><strong>Poids :</strong> {product.Poids || "N/A"}</li>
              <li><strong>Origine :</strong> {product.Origines || "N/A"}</li>
              <li><strong>Catégorie :</strong> {product.Catégorie || "N/A"}</li>
            </ul>
          </DetailAccordion>
          <DetailAccordion title="Avis" isOpen={openAccordion === 'reviews'} onClick={() => setOpenAccordion(openAccordion === 'reviews' ? null : 'reviews')}>
            <p>Aucun avis pour le moment.</p>
          </DetailAccordion>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
