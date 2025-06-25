import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css"; // Para usar Bootstrap y sus modals
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import { AuthProvider } from "./Context/AuthContext"; // ← NUEVO

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {" "}
        {/* ← ENVUELVE App CON EL CONTEXTO DE AUTENTICACIÓN */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
