import React, { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import "../styles/Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState({
    message: "",
    error: "",
    loading: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState({ message: "", error: "", loading: true });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/clients/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de l'envoi de l'email");
      }

      setFormState({
        message:
          "Un email de réinitialisation a été envoyé à votre adresse email.",
        error: "",
        loading: false,
      });
      setEmail("");
    } catch (err) {
      setFormState({
        message: "",
        error: err.message || "Une erreur s'est produite.",
        loading: false,
      });
    }
  };

  return (
    <div className="auth-container">
      <SEO title="Mot de passe oublié - CafThé" noindex={true} />
      <div className="auth-image-section">
        <img
          src="/images/ImgAuth_resultat.webp"
          alt="Illustration"
          className="auth-image"
        />
      </div>
      <div className="auth-form-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Mot de passe oublié ?</h2>
          <p>
            Entrez votre adresse email et nous vous enverrons un lien pour
            réinitialiser votre mot de passe.
          </p>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              required
              placeholder="votre@email.fr"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {formState.error && (
            <div className="error-msg">{formState.error}</div>
          )}
          {formState.message && (
            <div className="success-msg">{formState.message}</div>
          )}

          <button
            type="submit"
            className="auth-button"
            disabled={formState.loading}
          >
            {formState.loading ? "Envoi en cours..." : "Envoyer le lien"}
          </button>

          <div className="auth-link">
            <p>
              <Link to="/connexion">Retour à la connexion</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
