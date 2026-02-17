import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/MyAccount.css';

const MyAccount = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/'); // Redirect to homepage after logout
    };

    return (
        <div className="account-container">
            <div className="account-welcome-header">
                <h1>Bonjour, {user?.prenom} !</h1>
                <p>Bienvenue dans votre espace personnel. D'ici, vous pouvez gérer vos commandes et vos informations personnelles.</p>
            </div>
            
            {/* Info Banner */}
            <div className="info-banner">
                <p>✨ Vous avez <strong>250 points</strong> de fidélité. Plus que 50 points pour obtenir une réduction de 10% !</p>
            </div>

            <div className="account-grid">
                {/* Orders Card */}
                <div className="account-card">
                    <div className="account-card-header">
                        <h2>Mes Commandes</h2>
                    </div>
                    <div className="account-card-body">
                        <p>Vous n'avez passé aucune commande pour le moment.</p>
                    </div>
                    <div className="account-card-footer">
                        <Link to="/produits" className="btn-secondary">
                            Commencer mes achats
                        </Link>
                    </div>
                </div>

                {/* Account Details Card */}
                <div className="account-card">
                    <div className="account-card-header">
                        <h2>Mes Informations</h2>
                    </div>
                    <div className="account-card-body">
                        <div className="user-details">
                            <p><strong>Nom :</strong> {user?.nom}</p>
                            <p><strong>Prénom :</strong> {user?.prenom}</p>
                            <p><strong>Email :</strong> {user?.email}</p>
                        </div>
                    </div>
                    <div className="account-card-footer">
                        <button className="btn-secondary">Modifier mes informations</button>
                    </div>
                </div>

                {/* Address Book Card */}
                <div className="account-card">
                    <div className="account-card-header">
                        <h2>Carnet d'adresses</h2>
                    </div>
                    <div className="account-card-body">
                        <p>Vous n'avez pas encore enregistré d'adresse.</p>
                    </div>
                    <div className="account-card-footer">
                        <button className="btn-secondary">Gérer mes adresses</button>
                    </div>
                </div>

                {/* Loyalty Program Card */}
                <div className="account-card">
                    <div className="account-card-header">
                        <h2>Programme de Fidélité</h2>
                    </div>
                    <div className="account-card-body">
                        <p><strong>Vos points :</strong> 250</p>
                        <p>Statut : Connaisseur</p>
                    </div>
                    <div className="account-card-footer">
                        <Link to="/programme-fidelite" className="btn-secondary">
                            En savoir plus
                        </Link>
                    </div>
                </div>

                {/* Quick Links Card */}
                <div className="account-card quick-links-card">
                    <div className="account-card-header">
                        <h2>Liens rapides</h2>
                    </div>
                    <div className="account-card-body">
                        <ul className="quick-links-list">
                            <li><Link to="/service-client">Service Client</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                            <li><Link to="/politique-de-retour">Politique de retour</Link></li>
                            <li><Link to="/contact">Nous contacter</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="account-logout-section">
                <button onClick={handleLogout} className="logout-button-main">
                    Se déconnecter
                </button>
            </div>
        </div>
    );
};

export default MyAccount;
