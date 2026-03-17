import React, { useState } from "react";
import SEO from "../components/SEO.jsx";
import "../styles/InfoPages.css";
import { Link } from "react-router-dom";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formState, setFormState] = useState({
    status: null, // 'sending', 'success', 'error'
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormState(prev => ({ ...prev, termsAccepted: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formState.termsAccepted) {
      alert("Veuillez accepter les conditions d'utilisation.");
      return;
    }
    
    setFormState(prev => ({ ...prev, status: 'sending' }));

    // Ici, on enverrait les données à une API
    // fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
    //   .then(...)

    setTimeout(() => {
      setFormState(prev => ({ ...prev, status: 'success' }));
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="info-page-container">
      <SEO
        title="Contactez-Nous - Service Client | CafThé"
        description="Contactez l'équipe de CafThé pour toute question ou suggestion. Remplissez notre formulaire ou contactez-nous par email, téléphone ou courrier."
      />
      <h1>Nous contacter</h1>
      <p>Une question ? Une suggestion ? N'hésitez pas à nous écrire via le formulaire ci-dessous.</p>

      {formState.status === "success" && (
        <div className="status-message success" style={{ marginBottom: "2rem" }}>
          Votre message a bien été envoyé ! Nous vous répondrons dans les plus brefs délais.
        </div>
      )}

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Nom complet</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="form-input" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="form-input" />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Sujet</label>
          <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className="form-input" />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required className="form-textarea" rows="5"></textarea>
        </div>
        
        <div className="checkbox-group">
          <input id="terms" type="checkbox" checked={formState.termsAccepted} onChange={handleChange} />
          <label htmlFor="terms">
            J'ai lu et accepté les <Link to="/conditions-utilisation" className="use-condition">conditions d'utilisations.</Link>
          </label>
        </div>

        <button type="submit" className="btn-primary" disabled={formState.status === 'sending' || !formState.termsAccepted}>
          {formState.status === 'sending' ? "Envoi en cours..." : "Envoyer"}
        </button>
      </form>

      <div className="contact-info-direct">
        <h3>Autres moyens de contact</h3>
        <p>Email: contact@cafthe.fr</p>
        <p>Téléphone: +33 1 23 45 67 89</p>
        <p>Adresse: 12 Rue du Commerce, 41000 Blois, France</p>
      </div>
    </div>
  );
};

export default Contact;
