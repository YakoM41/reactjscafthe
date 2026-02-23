import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import BackToTopButton from "../components/BackToTopButton.jsx";

//Sert a faire une structure de page avec un Header, Outlet(contenu variable) et un Footer

function Layout() {
  const location = useLocation();
  const isTransparentPage =
    location.pathname === "/" || location.pathname === "/about";

  return (
    <>
      <Header isTransparent={isTransparentPage} />
      <main style={{ paddingTop: isTransparentPage ? "0" : "10px" }}>
        {" "}
        {/* Adjust content padding based on header */}
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton />
    </>
  );
}

export default Layout;
