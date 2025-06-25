import { Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Inicio/LoginPage.jsx";
import RegistroUsuario from "./Components/Inicio/RegistroUsuario.jsx";
import HomeCliente from "./Components/Inicio/HomeCliente.jsx";
import HomeAdmin from "./Components/Inicio/HomeAdmin.jsx";
import SoporteCliente from "./Components/Soporte/SoporteClientePage.jsx";
import CarritoPage from "./Components/Carrito/CarritoPage.jsx";
import RegistroCompra from "./Components/Compra/RegistroCompra.jsx";
import Unauthorized from "./Components/Inicio/Unauthorized.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";

import "./App.css";

function App() {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegistroUsuario />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Cliente */}
      <Route
        path="/"
        element={
          <PrivateRoute rolPermitido="Cliente">
            <HomeCliente />
          </PrivateRoute>
        }
      />
      <Route
        path="/Carrito"
        element={
          <PrivateRoute rolPermitido="Cliente">
            <CarritoPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/Compra/Registro"
        element={
          <PrivateRoute rolPermitido="Cliente">
            <RegistroCompra />
          </PrivateRoute>
        }
      />
      <Route
        path="/Soporte"
        element={
          <PrivateRoute rolPermitido="Cliente">
            <SoporteCliente />
          </PrivateRoute>
        }
      />

      {/* Admin */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute rolPermitido="Administrador">
            <HomeAdmin />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
