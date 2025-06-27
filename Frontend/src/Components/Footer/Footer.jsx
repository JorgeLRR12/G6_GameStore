import React from "react";
import "./Footer.css";

const Footer = () => (
  <footer className="footer-gamer">
    <div className="footer-content-gamer">
      <div className="footer-logo-section">
        <img
          src="../../../public/img/logoStoreCR.png"
          alt="GameStore Logo"
          className="footer-logo-gamer"
        />
        <span className="footer-title-gamer">GameStoreCR</span>
      </div>
      <div className="footer-info-gamer">
        <span>© 2025 GameStoreCR. Todos los derechos reservados.</span>
      </div>
    </div>
  </footer>
);


export default Footer;
