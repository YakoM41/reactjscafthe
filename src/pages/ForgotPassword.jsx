import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setMessage("");
    setIsLoading(true);

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
        setErrorMsg(data.message || "Erreur lors de l'envoi de l'email");
        setIsLoading(false);
        return;
      }

      setMessage(
        "Un email de réinitialisation a été envoyé à votre adresse email.",
      );
      setEmail("");
    } catch (err) {
      console.error("Erreur lors de la réinitialisation", err);
      setErrorMsg("Une erreur s'est produite lors de l'envoi de l'email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image-section">
        <img
          src="src/assets/images/ImgAuth.png"
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

          {errorMsg && <div className="error-msg">{errorMsg}</div>}
          {message && <div className="success-msg">{message}</div>}

          <button
            type="submit"
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? "Envoi en cours..." : "Envoyer le lien"}
          </button>

          <div className="auth-link">
            <p>
              <Link to="/login">Retour à la connexion</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
