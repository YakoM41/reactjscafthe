import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/MyAccount.css";

const MyAccount = () => {
  const { user, logout, updateUser, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="account-container">
        <div className="loading-state">
          <p>Chargement de votre compte...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="account-container">
        <div className="error-state">
          <p>Vous devez être connecté pour accéder à cette page.</p>
          <Link to="/login" className="btn-primary">
            Se connecter
          </Link>
        </div>
      </div>
    );
  }
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
  });
  const [updateStatus, setUpdateStatus] = useState(null);

  // Address Management State
  const [isManagingAddresses, setIsManagingAddresses] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null); // null = list, -1 = add, 0+ = edit index
  const [addressFormData, setAddressFormData] = useState({
    nom: "",
    rue: "",
    ville: "",
    codePostal: "",
    pays: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        prenom: user.prenom || "",
        nom: user.nom || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate("/"); // Redirect to homepage after logout
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setUpdateStatus(null);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    if (user) {
      setFormData({
        prenom: user.prenom || "",
        nom: user.nom || "",
        email: user.email || "",
      });
    }
    setUpdateStatus(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateStatus({ loading: true });

    const result = await updateUser(formData);

    if (result.success) {
      setUpdateStatus({
        success: true,
        message: "Informations mises à jour avec succès !",
      });
      setIsEditing(false);
    } else {
      setUpdateStatus({
        success: false,
        message: result.error || "Erreur lors de la mise à jour.",
      });
    }
  };

  // Address Handlers
  const handleManageAddresses = () => {
    setIsManagingAddresses(true);
    setEditingAddressId(null);
    setUpdateStatus(null);
  };

  const handleCloseManageAddresses = () => {
    setIsManagingAddresses(false);
    setEditingAddressId(null);
    setUpdateStatus(null);
  };

  const handleAddAddressClick = () => {
    setAddressFormData({
      nom: "",
      rue: "",
      ville: "",
      codePostal: "",
      pays: "",
    });
    setEditingAddressId(-1);
    setUpdateStatus(null);
  };

  const handleEditAddressClick = (index) => {
    const addressToEdit = user.addresses[index];
    setAddressFormData(addressToEdit);
    setEditingAddressId(index);
    setUpdateStatus(null);
  };

  const handleDeleteAddress = async (index) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette adresse ?"))
      return;

    const currentAddresses = user.addresses || [];
    const newAddresses = currentAddresses.filter((_, i) => i !== index);

    setUpdateStatus({ loading: true });
    const result = await updateUser({ addresses: newAddresses });
    if (result.success) {
      setUpdateStatus({
        success: true,
        message: "Adresse supprimée avec succès.",
      });
    } else {
      setUpdateStatus({
        success: false,
        message: "Erreur lors de la suppression.",
      });
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    setUpdateStatus({ loading: true });

    const currentAddresses = user.addresses || [];
    let newAddresses;

    if (editingAddressId === -1) {
      // Add
      newAddresses = [...currentAddresses, addressFormData];
    } else {
      // Edit
      newAddresses = currentAddresses.map((addr, i) =>
        i === editingAddressId ? addressFormData : addr,
      );
    }

    const result = await updateUser({ addresses: newAddresses });

    if (result.success) {
      setUpdateStatus({
        success: true,
        message: "Carnet d'adresses mis à jour !",
      });
      setEditingAddressId(null); // Go back to list
    } else {
      setUpdateStatus({
        success: false,
        message: result.error || "Erreur de mise à jour.",
      });
    }
  };

  const handleCancelAddressForm = () => {
    setEditingAddressId(null);
    setUpdateStatus(null);
  };

  return (
    <div className="account-container">
      <div className="account-welcome-header">
        <h1>Bonjour, {user?.prenom} !</h1>
        <p>
          Bienvenue dans votre espace personnel. D'ici, vous pouvez gérer vos
          commandes et vos informations personnelles.
        </p>
      </div>

      {/* Info Banner */}
      <div className="info-banner">
        <p>
          ✨ Vous avez <strong>250 points</strong> de fidélité. Plus que 50
          points pour obtenir une réduction de 10% !
        </p>
      </div>

      {updateStatus && (
        <div
          className={`status-message ${updateStatus.success ? "success" : "error"}`}
        >
          {updateStatus.message}
        </div>
      )}

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
            {isEditing ? (
              <form onSubmit={handleSubmit} className="edit-profile-form">
                <div className="form-group">
                  <label htmlFor="prenom">Prénom</label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nom">Nom</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary-small">
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelClick}
                    className="btn-secondary-small"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            ) : (
              <div className="user-details">
                <p>
                  <strong>Nom :</strong> {user?.nom}
                </p>
                <p>
                  <strong>Prénom :</strong> {user?.prenom}
                </p>
                <p>
                  <strong>Email :</strong> {user?.email}
                </p>
              </div>
            )}
          </div>
          {!isEditing && (
            <div className="account-card-footer">
              <button onClick={handleEditClick} className="btn-secondary">
                Modifier mes informations
              </button>
            </div>
          )}
        </div>

        {/* Address Book Card */}
        <div className="account-card">
          <div className="account-card-header">
            <h2>Carnet d'adresses</h2>
          </div>
          <div className="account-card-body">
            {!isManagingAddresses ? (
              <>
                {user?.addresses && user.addresses.length > 0 ? (
                  <p>{user.addresses.length} adresse(s) enregistrée(s).</p>
                ) : (
                  <p>Vous n'avez pas encore enregistré d'adresse.</p>
                )}
              </>
            ) : editingAddressId === null ? (
              // List View
              <div className="address-list">
                {user?.addresses && user.addresses.length > 0 ? (
                  user.addresses.map((addr, index) => (
                    <div key={index} className="address-item">
                      <p><strong>{addr.nom}</strong></p>
                      <p>{addr.rue}</p>
                      <p>{addr.codePostal} {addr.ville}</p>
                      <p>{addr.pays}</p>
                      <div className="address-actions">
                        <button onClick={() => handleEditAddressClick(index)} className="btn-text">Modifier</button>
                        <button onClick={() => handleDeleteAddress(index)} className="btn-text delete">Supprimer</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Aucune adresse.</p>
                )}
                <button onClick={handleAddAddressClick} className="btn-primary-small full-width">+ Ajouter une adresse</button>
              </div>
            ) : (
              // Add/Edit Form
              <form onSubmit={handleAddressSubmit} className="edit-profile-form">
                 <div className="form-group">
                  <label htmlFor="addressNom">Nom de l'adresse (ex: Maison)</label>
                  <input
                    type="text"
                    id="addressNom"
                    name="nom"
                    value={addressFormData.nom}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rue">Rue</label>
                  <input
                    type="text"
                    id="rue"
                    name="rue"
                    value={addressFormData.rue}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="row-group">
                    <div className="form-group half">
                      <label htmlFor="codePostal">Code Postal</label>
                      <input
                        type="text"
                        id="codePostal"
                        name="codePostal"
                        value={addressFormData.codePostal}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                    <div className="form-group half">
                      <label htmlFor="ville">Ville</label>
                      <input
                        type="text"
                        id="ville"
                        name="ville"
                        value={addressFormData.ville}
                        onChange={handleAddressChange}
                        required
                      />
                    </div>
                </div>
                <div className="form-group">
                  <label htmlFor="pays">Pays</label>
                  <input
                    type="text"
                    id="pays"
                    name="pays"
                    value={addressFormData.pays}
                    onChange={handleAddressChange}
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-primary-small">Enregistrer</button>
                  <button type="button" onClick={handleCancelAddressForm} className="btn-secondary-small">Annuler</button>
                </div>
              </form>
            )}
          </div>
          <div className="account-card-footer">
            {!isManagingAddresses ? (
                <button onClick={handleManageAddresses} className="btn-secondary">Gérer mes adresses</button>
            ) : (
                editingAddressId === null && (
                    <button onClick={handleCloseManageAddresses} className="btn-secondary">Retour</button>
                )
            )}
          </div>
        </div>

        {/* card fidelité */}
        <div className="fidelity-card">
          <div className="fidelity-card-header">
            <h2>Programme de Fidélité</h2>
          </div>
          <div className="fidelity-card-body">
            <p>
              <strong>Vos points :</strong> 250
            </p>
            <p>Statut : Connaisseur</p>
          </div>
          <div className="fidelity-card-footer">
            <Link to="/programme-fidelite" className="btn-secondary-green">
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
              <li>
                <Link to="/service-client">Service Client</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/politique-de-retour">Politique de retour</Link>
              </li>
              <li>
                <Link to="/contact">Nous contacter</Link>
              </li>
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
