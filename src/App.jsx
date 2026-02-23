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

// Imports des polices
// ... (font imports remain the same)

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
                <Route path="produits" element={<ProductList />} />
                <Route path="produit/:id" element={<ProductDetails />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="about" element={<NotreHistoire />} />
                <Route path="panier" element={<Checkout />} />
                <Route path="legal-notice" element={<LegalNotice />} />
                <Route path="privacy-policy" element={<PrivacyPolicy />} />
                <Route path="terms-of-sale" element={<TermsOfSale />} />
                <Route path="service-client" element={<ServiceClient />} />
                <Route path="faq" element={<Faq />} />
                <Route
                  path="politique-de-retour"
                  element={<PolitiqueDeRetour />}
                />
                <Route path="contact" element={<Contact />} />
                <Route path="sitemap" element={<Sitemap />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="programme-fidelite" element={<LoyaltyProgram />} />
                <Route path="terms" element={<TermsOfUse />} />

                {/* Privé */}
                <Route path="/compte" element={<PrivateRoute />}>
                  <Route path="/compte" element={<MyAccount />} />
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
