import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/variables.css"; // Variables CSS en premier
import "./styles/global.css"; // Global styles
import "./styles/InfoPages.css"; // Styles globaux (sera peut-être renommé/déplacé plus tard)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
