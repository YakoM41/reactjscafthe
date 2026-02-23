import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import authImage from "../assets/images/ImgAuth.png";

function Register() {
  const navigate = useNavigate();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [confirmMotDePasse, setConfirmMotDePasse] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (motDePasse !== confirmMotDePasse) {
      setErrorMsg("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!termsAccepted) {
      setErrorMsg("Veuillez accepter les conditions d'utilisation.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/clients/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Nom: nom,
            Prenom: prenom,
            Email: email,
            Mot_de_passe: motDePasse,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.message || "Erreur lors de l'inscription");
        return;
      }

      // Redirect to login page after successful registration
      navigate("/connexion");
    } catch (err) {
      console.error("Erreur lors de l'inscription", err);
      setErrorMsg("Une erreur s'est produite lors de l'inscription");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image-section">
        <img src={authImage} alt="Illustration" className="auth-image" />
      </div>
      <div className="auth-form-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Créer un compte</h2>
          <p>Rejoignez-nous pour une expérience unique.</p>

          <div className="input-group">
            <label htmlFor="nom">Nom</label>
            <input
              id="nom"
              type="text"
              value={nom}
              required
              placeholder="Votre nom"
              onChange={(e) => setNom(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="prenom">Prénom</label>
            <input
              id="prenom"
              type="text"
              value={prenom}
              required
              placeholder="Votre prénom"
              onChange={(e) => setPrenom(e.target.value)}
            />
          </div>

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

          <div className="input-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={motDePasse}
              required
              placeholder="Votre mot de passe"
              onChange={(e) => setMotDePasse(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirmer le mot de passe</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmMotDePasse}
              required
              placeholder="Confirmez le mot de passe"
              onChange={(e) => setConfirmMotDePasse(e.target.value)}
            />
          </div>

          <div className="checkbox-group">
            <input
              id="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label htmlFor="terms">
              J'ai lu et accepté les{" "}
              <Link to="/conditions-utilisation">
                conditions d'utilisations
              </Link>
            </label>
          </div>

          {errorMsg && <div className="error-msg">{errorMsg}</div>}

          <button type="submit" className="auth-button">
            S'inscrire
          </button>

          <div className="auth-link">
            <p>
              Vous avez déjà un compte ?{" "}
              <Link to="/connexion">Connectez-vous</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
