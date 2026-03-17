# Caf'Thé - Boutique en ligne de cafés et thés

Application e-commerce React pour la vente de cafés et thés premium avec système d'authentification, panier, favoris et programme de fidélité.

<!-- ATTENTION PAS ENCORE VU EN COURS -->
<!-- Decommenter et adapter les badges selon votre CI/CD -->
<!-- ![Build](https://img.shields.io/github/actions/workflow/status/USER/REPO/ci.yml?branch=main) -->
<!-- ![Tests](https://img.shields.io/github/actions/workflow/status/USER/REPO/tests.yml?branch=main&label=tests) -->
<!-- ![License](https://img.shields.io/github/license/USER/REPO) -->

## Prerequis

- [Node.js](https://nodejs.org/) >= 18
- npm ou yarn
- Une API back-end fonctionnelle (PHP/MySQL recommandé)

## Quickstart

```bash
# 1. Cloner le depot
git clone https://github.com/USER/reactjscafthe.git
cd reactjscafthe

# 2. Installer les dependances
npm install

# 3. Configurer l'environnement
cp .env.example .env
# Editer .env et renseigner l'URL de votre API back-end

# 4. Lancer le serveur de developpement
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.

> **Note**: Assurez-vous que votre API back-end est lancée et accessible avant de démarrer l'application.

### Variables d'environnement

| Variable         | Description | Exemple |
| ---------------- | ----------- | ------- |
| `VITE_API_URL`   | URL de l'API back-end | `http://localhost:8000/api` |

## Scripts disponibles

| Commande          | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Lancer le serveur de developpement |
| `npm run build`   | Construire le projet pour la prod  |
| `npm run preview` | Previsualiser le build de prod     |
| `npm run lint`    | Lancer ESLint sur le projet        |

## Routes principales

| URL                                      | Description | Accès |
|------------------------------------------| ----------- | ----- |
| `/`                                      | Page d'accueil avec produits vedettes | Public |
| `/produits`                              | Catalogue complet avec filtres | Public |
| `/produit/:id`                           | Détails d'un produit | Public |
| `/connexion`                             | Connexion utilisateur | Public |
| `/inscription`                           | Inscription nouvel utilisateur | Public |
| `/mot-de-passe-oublie`                   | Réinitialisation mot de passe | Public |
| `/panier`                                | Panier et processus de checkout | Public |
| `/favoris`                               | Liste des produits favoris | Public |
| `/compte`                                | Tableau de bord client | Privé |
| `/programme-fidelite`                    | Programme de fidélité | Public |
| `/notre-histoire`                        | Histoire de la marque | Public |
| `/contact`                               | Formulaire de contact | Public |
| `/faq`                                   | Questions fréquentes | Public |
| `/service-client`                        | Service client | Public |
| `/mentions-legales`                      | Mentions légales | Public |
| `/politique-de-confidentialite`          | Politique de confidentialité | Public |
| `/conditions-generales-de-vente`         | CGV | Public |
| `/politique-de-retour`                   | Politique de retour | Public |
| `/plan-du-site`                          | Plan du site | Public |

## Structure du projet

```
src/
├── assets/                    # Ressources statiques (fonts)
│   └── fonts/
├── components/                # Composants réutilisables
│   ├── checkout/              # Composants du tunnel d'achat
│   │   ├── CartStep.jsx       # Étape 1: Panier
│   │   ├── ShippingStep.jsx   # Étape 2: Livraison
│   │   ├── PaymentStep.jsx    # Étape 3: Paiement
│   │   ├── ConfirmationStep.jsx # Étape 4: Confirmation
│   │   ├── OrderSummary.jsx   # Récapitulatif commande
│   │   └── Stepper.jsx        # Indicateur d'étapes
│   ├── BackToTopButton.jsx    # Bouton retour en haut
│   ├── Engagement.jsx         # Section engagements
│   ├── FeaturedProducts.jsx   # Produits vedettes
│   ├── Footer.jsx             # Pied de page
│   ├── Header.jsx             # En-tête avec navigation
│   ├── Hero.jsx               # Bannière principale (Swiper)
│   ├── PrivateRoute.jsx       # Protection des routes privées
│   ├── ProductCard.jsx        # Carte produit
│   ├── SEO.jsx                # Gestion des métadonnées
│   ├── Universes.jsx          # Section univers produits
│   └── WishlistButton.jsx     # Bouton favoris
├── contexts/                  # Contextes React (state global)
│   ├── AuthContext.jsx        # Authentification utilisateur
│   ├── CartContext.jsx        # Gestion du panier
│   └── WishlistContext.jsx    # Gestion des favoris
├── layout/
│   └── Layout.jsx             # Layout principal avec Header/Footer
├── pages/                     # Pages de l'application
│   ├── Home.jsx               # Page d'accueil
│   ├── ProductList.jsx        # Catalogue avec filtres
│   ├── ProductDetails.jsx     # Détails produit
│   ├── Login.jsx              # Connexion
│   ├── Register.jsx           # Inscription
│   ├── ForgotPassword.jsx     # Mot de passe oublié
│   ├── MyAccount.jsx          # Compte client
│   ├── Checkout.jsx           # Tunnel d'achat
│   ├── Wishlist.jsx           # Favoris
│   ├── LoyaltyProgram.jsx     # Programme de fidélité
│   ├── NotreHistoire.jsx      # Histoire de la marque
│   ├── Contact.jsx            # Contact
│   ├── Faq.jsx                # FAQ
│   ├── ServiceClient.jsx      # Service client
│   ├── LegalNotice.jsx        # Mentions légales
│   ├── PrivacyPolicy.jsx      # Politique de confidentialité
│   ├── TermsOfSale.jsx        # CGV
│   ├── TermsOfUse.jsx         # Conditions d'utilisation
│   ├── PolitiqueDeRetour.jsx  # Politique de retour
│   ├── Sitemap.jsx            # Plan du site
│   └── NotFound.jsx           # Page 404
├── styles/                    # Fichiers CSS
│   ├── global.css             # Styles globaux
│   ├── variables.css          # Variables CSS (couleurs, etc.)
│   ├── Auth.css               # Styles authentification
│   ├── checkout.css           # Styles checkout
│   ├── footer.css
│   ├── header.css
│   ├── Home.css
│   ├── ProductDetails.css
│   ├── ProductList.css
│   ├── MyAccount.css
│   ├── notreHistoire.css
│   ├── InfoPages.css
│   ├── LegalPages.css
│   └── ...
├── App.jsx                    # Configuration du routeur
└── main.jsx                   # Point d'entrée React
```

## Deploiement

### Build de production

```bash
npm run build
```

Les fichiers statiques sont generes dans le dossier `dist/`.

### Hebergement

Le projet peut être déployé sur les plateformes suivantes :

- **Vercel** (recommandé pour React) : `vercel deploy`
- **Netlify** : Drag & drop du dossier `dist/`
- **Plesk/cPanel** : Upload du contenu du dossier `dist/` via FTP
- **o2Switch** : Via gestionnaire de fichiers ou FTP

**Configuration importante** :
- Créer un fichier `.htaccess` ou configurer les redirections pour supporter le routing React (SPA)
- Configurer les variables d'environnement sur la plateforme d'hébergement


## Tests
<!-- ATTENTION PAS ENCORE VU EN COURS -->
<!-- Decrire comment lancer les tests -->

```bash
# Lancer les tests
npm run test
```

## Stack technique

### Core
- **React 19.2.0** — Bibliothèque UI
- **React Router DOM 7.13.0** — Routing et navigation
- **Vite (Rolldown) 7.2.5** — Build tool et dev server optimisé

### UI & Styling
- **CSS modules** — Styles scoped par composant
- **FontAwesome 7.1.0** — Icônes
- **Swiper 12.1.2** — Carrousel/slider pour Hero
- **React Loading Skeleton 3.5.0** — Squelettes de chargement

### Fonts
- **Playfair Display** — Titres élégants
- **Mukta** — Corps de texte

### State Management
- **React Context API** — Gestion d'état global (Auth, Cart, Wishlist)

### UX
- **React Toastify 11.0.5** — Notifications toast

### Dev Tools
- **ESLint 9.39.1** — Linting
- **Prettier 3.8.1** — Formatage de code

## Fonctionnalités

### E-commerce
- ✅ Catalogue de produits avec filtres (catégorie, origine, prix)
- ✅ Recherche de produits
- ✅ Détails produit avec images, description et avis
- ✅ Panier d'achat avec persistance localStorage
- ✅ Tunnel d'achat en 4 étapes (Panier → Livraison → Paiement → Confirmation)
- ✅ Liste de favoris/wishlist

### Authentification
- ✅ Inscription utilisateur
- ✅ Connexion/Déconnexion
- ✅ Mot de passe oublié
- ✅ Espace client privé avec :
  - Tableau de bord
  - Historique des commandes
  - Gestion des adresses
  - Informations personnelles

### UX
- ✅ Design responsive (mobile-first)
- ✅ Lazy loading des images (format WebP optimisé)
- ✅ Carrousel Hero avec Swiper
- ✅ Squelettes de chargement
- ✅ Notifications toast
- ✅ Bouton retour en haut
- ✅ SEO optimisé (métadonnées dynamiques)

### Pages
- ✅ Page d'accueil avec sections (Hero, Univers, Produits vedettes, Engagement)
- ✅ Programme de fidélité
- ✅ Histoire de la marque
- ✅ Service client & FAQ
- ✅ Formulaire de contact
- ✅ Pages légales (Mentions, CGV, Politique de confidentialité, etc.)
- ✅ Plan du site

## Architecture technique

### Contextes React

**AuthContext** (`src/contexts/AuthContext.jsx`)
- Gestion de l'authentification utilisateur
- État : `user`, `token`, `isAuthenticated`
- Méthodes : `login()`, `logout()`, `register()`, `updateUser()`

**CartContext** (`src/contexts/CartContext.jsx`)
- Gestion du panier d'achat
- Persistance dans localStorage
- Méthodes : `addToCart()`, `removeFromCart()`, `updateQuantity()`, `clearCart()`

**WishlistContext** (`src/contexts/WishlistContext.jsx`)
- Gestion des favoris
- Persistance dans localStorage
- Méthodes : `addToWishlist()`, `removeFromWishlist()`, `isInWishlist()`

### Composants clés

**PrivateRoute** — HOC pour protéger les routes nécessitant une authentification

**SEO** — Composant pour gérer les métadonnées de chaque page

**ProductCard** — Carte produit réutilisable avec intégration panier/favoris

**Stepper** — Indicateur visuel du processus de checkout

### Optimisations

- Images converties en WebP avec attribut `loading="lazy"`
- Variables CSS centralisées (`src/styles/variables.css`)
- Fichier CSS global (`src/styles/global.css`)
- Structure de filtres en accordéon pour mobile
- Opacité sur les boutons pour améliorer l'accessibilité

## Auteurs

- **Zakhari Moussaoui** — Développeur Full-Stack

## Licence

<!-- Choisir une licence : MIT, Apache 2.0, GPL v3... -->

Ce projet est sous licence [MIT](LICENSE).

## API Back-end requise

L'application nécessite une API REST avec les endpoints suivants :

### Authentification
- `POST /api/auth/register` — Inscription
- `POST /api/auth/login` — Connexion
- `POST /api/auth/forgot-password` — Réinitialisation mot de passe
- `GET /api/auth/profile` — Récupérer le profil utilisateur
- `PUT /api/auth/profile` — Mettre à jour le profil

### Produits
- `GET /api/products` — Liste des produits (avec filtres query params)
- `GET /api/products/:id` — Détails d'un produit
- `GET /api/products/featured` — Produits vedettes
- `GET /api/products/search?q=` — Recherche

### Commandes
- `POST /api/orders` — Créer une commande
- `GET /api/orders` — Historique des commandes (authentifié)
- `GET /api/orders/:id` — Détails d'une commande

### Client
- `GET /api/customers/:id/addresses` — Adresses du client
- `POST /api/customers/:id/addresses` — Ajouter une adresse
- `PUT /api/customers/:id/addresses/:addressId` — Modifier une adresse
- `DELETE /api/customers/:id/addresses/:addressId` — Supprimer une adresse

## Problèmes connus & Améliorations futures

Voir le fichier `word.doc` pour les erreurs critiques à gérer.

## Liens utiles

- [Documentation React](https://react.dev/)
- [Documentation Vite](https://vite.dev/)
- [Documentation React Router](https://reactrouter.com/)
- [Documentation Swiper](https://swiperjs.com/react)
- [FontAwesome Icons](https://fontawesome.com/icons)