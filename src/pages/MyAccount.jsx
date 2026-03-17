import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import { useAuth } from "../contexts/AuthContext";
import "../styles/MyAccount.css";

const MyAccount = () => {
  const { user, logout, updateUser, loading } = useAuth();
  const navigate = useNavigate();

  // --- State Management ---
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isManagingAddresses, setIsManagingAddresses] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null); // null: list, 'new': add form, number: edit form
  
  const [profileForm, setProfileForm] = useState({ nom: '', prenom: '', email: '' });
  const [addressForm, setAddressForm] = useState({ nom: '', rue: '', codePostal: '', ville: '', pays: '' });
  
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  // Sync profile form with user data
  useEffect(() => {
    if (user) {
      setProfileForm({
        nom: user.nom || '',
        prenom: user.prenom || '',
        email: user.email || '',
      });
    }
  }, [user]);

  // --- Handlers ---
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ message: 'Mise à jour...', type: 'loading' });
    const result = await updateUser(profileForm);
    if (result.success) {
      setIsEditingProfile(false);
      setFeedback({ message: 'Profil mis à jour avec succès !', type: 'success' });
    } else {
      setFeedback({ message: result.error || 'Erreur lors de la mise à jour.', type: 'error' });
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ message: 'Enregistrement...', type: 'loading' });
    
    const currentAddresses = user.addresses || [];
    let newAddresses;

    if (editingAddressId === 'new') {
      newAddresses = [...currentAddresses, addressForm];
    } else {
      newAddresses = currentAddresses.map((addr, index) => 
        index === editingAddressId ? addressForm : addr
      );
    }

    const result = await updateUser({ addresses: newAddresses });
    
    if (result.success) {
      setEditingAddressId(null); // Retour à la liste
      setFeedback({ message: "Carnet d'adresses mis à jour !", type: 'success' });
    } else {
      setFeedback({ message: result.error || "Erreur de mise à jour.", type: 'error' });
    }
  };

  const handleDeleteAddress = async (index) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette adresse ?")) return;
    
    const newAddresses = (user.addresses || []).filter((_, i) => i !== index);
    const result = await updateUser({ addresses: newAddresses });

    if (result.success) {
      setFeedback({ message: 'Adresse supprimée.', type: 'success' });
    } else {
      setFeedback({ message: result.error || 'Erreur de suppression.', type: 'error' });
    }
  };

  const openAddressForm = (index = 'new') => {
    if (index === 'new') {
      setAddressForm({ nom: '', rue: '', codePostal: '', ville: '', pays: '' });
    } else {
      setAddressForm(user.addresses[index]);
    }
    setEditingAddressId(index);
    setFeedback({ message: '', type: '' });
  };

  // --- Render Logic ---
  if (loading) {
    return <div className="account-container loading-state"><p>Chargement de votre compte...</p></div>;
  }

  if (!user) {
    return (
      <div className="account-container error-state">
        <p>Vous devez être connecté pour accéder à cette page.</p>
        <Link to="/login" className="btn-primary">Se connecter</Link>
      </div>
    );
  }

  return (
    <div className="account-container">
      <SEO title="Mon Compte - CafThé" noindex={true} />
      <div className="account-welcome-header">
        <h1>Bonjour, {user?.prenom} !</h1>
        <p>Bienvenue dans votre espace personnel. D'ici, vous pouvez gérer vos commandes et vos informations personnelles.</p>
      </div>

      <div className="info-banner"><p>✨ Vous avez <strong>250 points</strong> de fidélité. Plus que 50 points pour obtenir une réduction de 10% !</p></div>

      {feedback.message && <div className={`status-message ${feedback.type}`}>{feedback.message}</div>}

      <div className="account-grid">
        <div className="account-card">
          <div className="account-card-header"><h2>Mes Commandes</h2></div>
          <div className="account-card-body"><p>Vous n'avez passé aucune commande pour le moment.</p></div>
          <div className="account-card-footer"><Link to="/produits" className="btn-secondary">Commencer mes achats</Link></div>
        </div>

        <div className="account-card">
          <div className="account-card-header"><h2>Mes Informations</h2></div>
          <div className="account-card-body">
            {isEditingProfile ? (
              <form onSubmit={handleProfileSubmit} className="edit-profile-form">
                <div className="form-group"><label htmlFor="prenom">Prénom</label><input type="text" id="prenom" name="prenom" value={profileForm.prenom} onChange={handleProfileChange} required /></div>
                <div className="form-group"><label htmlFor="nom">Nom</label><input type="text" id="nom" name="nom" value={profileForm.nom} onChange={handleProfileChange} required /></div>
                <div className="form-group"><label htmlFor="email">Email</label><input type="email" id="email" name="email" value={profileForm.email} onChange={handleProfileChange} required /></div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary-small">Enregistrer</button>
                  <button type="button" onClick={() => setIsEditingProfile(false)} className="btn-secondary-small">Annuler</button>
                </div>
              </form>
            ) : (
              <div className="user-details">
                <p><strong>Nom :</strong> {user?.nom}</p>
                <p><strong>Prénom :</strong> {user?.prenom}</p>
                <p><strong>Email :</strong> {user?.email}</p>
              </div>
            )}
          </div>
          {!isEditingProfile && <div className="account-card-footer"><button onClick={() => setIsEditingProfile(true)} className="btn-secondary">Modifier mes informations</button></div>}
        </div>

        <div className="account-card">
          <div className="account-card-header"><h2>Carnet d'adresses</h2></div>
          <div className="account-card-body">
            {!isManagingAddresses ? (
              <p>{user?.addresses?.length || 0} adresse(s) enregistrée(s).</p>
            ) : editingAddressId === null ? (
              <div className="address-list">
                {user?.addresses?.length > 0 ? user.addresses.map((addr, index) => (
                  <div key={index} className="address-item">
                    <p><strong>{addr.nom}</strong></p>
                    <p>{addr.rue}</p>
                    <p>{addr.codePostal} {addr.ville}</p>
                    <p>{addr.pays}</p>
                    <div className="address-actions">
                      <button onClick={() => openAddressForm(index)} className="btn-text">Modifier</button>
                      <button onClick={() => handleDeleteAddress(index)} className="btn-text delete">Supprimer</button>
                    </div>
                  </div>
                )) : <p>Aucune adresse.</p>}
                <button onClick={() => openAddressForm('new')} className="btn-primary-small full-width">+ Ajouter une adresse</button>
              </div>
            ) : (
              <form onSubmit={handleAddressSubmit} className="edit-profile-form">
                <div className="form-group"><label htmlFor="addressNom">Nom de l'adresse (ex: Maison)</label><input type="text" id="addressNom" name="nom" value={addressForm.nom} onChange={handleAddressChange} required /></div>
                <div className="form-group"><label htmlFor="rue">Rue</label><input type="text" id="rue" name="rue" value={addressForm.rue} onChange={handleAddressChange} required /></div>
                <div className="row-group">
                  <div className="form-group half"><label htmlFor="codePostal">Code Postal</label><input type="text" id="codePostal" name="codePostal" value={addressForm.codePostal} onChange={handleAddressChange} required /></div>
                  <div className="form-group half"><label htmlFor="ville">Ville</label><input type="text" id="ville" name="ville" value={addressForm.ville} onChange={handleAddressChange} required /></div>
                </div>
                <div className="form-group"><label htmlFor="pays">Pays</label><input type="text" id="pays" name="pays" value={addressForm.pays} onChange={handleAddressChange} required /></div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary-small">Enregistrer</button>
                  <button type="button" onClick={() => setEditingAddressId(null)} className="btn-secondary-small">Annuler</button>
                </div>
              </form>
            )}
          </div>
          <div className="account-card-footer">
            {!isManagingAddresses ? (
              <button onClick={() => setIsManagingAddresses(true)} className="btn-secondary">Gérer mes adresses</button>
            ) : (
              editingAddressId === null && <button onClick={() => setIsManagingAddresses(false)} className="btn-secondary">Retour</button>
            )}
          </div>
        </div>

        <div className="fidelity-card">
          <div className="fidelity-card-header"><h2>Programme de Fidélité</h2></div>
          <div className="fidelity-card-body"><p><strong>Vos points :</strong> 250</p><p>Statut : Connaisseur</p></div>
          <div className="fidelity-card-footer"><Link to="/programme-fidelite" className="btn-secondary-green">En savoir plus</Link></div>
        </div>

        <div className="account-card quick-links-card">
          <div className="account-card-header"><h2>Liens rapides</h2></div>
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
        <button onClick={handleLogout} className="logout-button-main">Se déconnecter</button>
      </div>
    </div>
  );
};

export default MyAccount;
