import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
import "../styles/Auth.css";
import authImage from "../assets/images/ImgAuth.png";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/clients/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email,
            Mot_de_passe: motDePasse,
          }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        setErrorMsg(data.message || "Erreur de connexion");
        return;
      }
      const { client } = data;
      login(client);
      navigate("/");
    } catch (err) {
      console.error("Erreur lors de la connexion", err);
      setErrorMsg("Une erreur s'est produite lors de la connexion");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image-section">
        <img src={authImage} alt="Illustration" className="auth-image" />
      </div>
      <div className="auth-form-section">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Content de vous revoir !</h2>
          <p>Connectez-vous pour continuer.</p>

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

          {errorMsg && <div className="error-msg">{errorMsg}</div>}

          <button type="submit" className="auth-button">
            Se connecter
          </button>

          <div className="auth-link">
            <p>
              <Link to="/mot-de-passe-oublie">Mot de passe oublié ?</Link>
            </p>
          </div>

          <div className="auth-link">
            <p>
              Vous n'avez pas de compte ?{" "}
              <Link to="/inscription">Inscrivez-vous</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
