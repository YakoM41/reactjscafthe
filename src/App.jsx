import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout.jsx";
import Home from "./pages/Home.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Login from "./pages/Login.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import { WishlistProvider } from "./contexts/WishlistContext.jsx";
import ProductList from "./pages/ProductList.jsx";
import NotreHistoire from "./pages/NotreHistoire.jsx";
import Checkout from "./pages/Checkout.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import MyAccount from "./pages/MyAccount.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import LegalNotice from "./pages/LegalNotice.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import TermsOfSale from "./pages/TermsOfSale.jsx";
import ServiceClient from "./pages/ServiceClient.jsx";
import Faq from "./pages/Faq.jsx";
import PolitiqueDeRetour from "./pages/PolitiqueDeRetour.jsx";
import Contact from "./pages/Contact.jsx";
import NotFound from "./pages/NotFound.jsx";
import Sitemap from "./pages/Sitemap.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import LoyaltyProgram from "./pages/LoyaltyProgram.jsx";
import TermsOfUse from "./pages/TermsOfUse.jsx";

// Imports des polices (conservés)

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/* Public */}
                <Route index element={<Home />} />

                {/* Catalogue et Produits */}
                <Route path="produits" element={<ProductList />} />
                <Route path="produit/:id" element={<ProductDetails />} />

                {/* Authentification */}
                <Route path="connexion" element={<Login />} />
                <Route path="inscription" element={<Register />} />
                <Route
                  path="mot-de-passe-oublie"
                  element={<ForgotPassword />}
                />

                {/* E-commerce & Client */}
                <Route path="panier" element={<Checkout />} />
                <Route path="favoris" element={<Wishlist />} />
                <Route path="programme-fidelite" element={<LoyaltyProgram />} />

                {/* Pages d'information (SEO très important) */}
                <Route path="notre-histoire" element={<NotreHistoire />} />
                <Route path="service-client" element={<ServiceClient />} />
                <Route path="faq" element={<Faq />} />
                <Route path="contact" element={<Contact />} />
                <Route path="plan-du-site" element={<Sitemap />} />

                {/* Pages Légales (Traduites) */}
                <Route path="mentions-legales" element={<LegalNotice />} />
                <Route
                  path="politique-de-confidentialite"
                  element={<PrivacyPolicy />}
                />
                <Route
                  path="conditions-generales-de-vente"
                  element={<TermsOfSale />}
                />
                <Route path="conditions-utilisation" element={<TermsOfUse />} />
                <Route
                  path="politique-de-retour"
                  element={<PolitiqueDeRetour />}
                />

                {/* Privé (Correction de la route imbriquée) */}
                <Route path="compte" element={<PrivateRoute />}>
                  {/* L'index permet de charger MyAccount directement sur /compte */}
                  <Route index element={<MyAccount />} />
                </Route>

                {/* 404 - Must be last */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
