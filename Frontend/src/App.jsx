import { Routes, Route } from "react-router-dom";
import LoginPage from "./Components/Inicio/LoginPage.jsx";
import RegistroUsuario from "./Components/Inicio/RegistroUsuario.jsx";
import HomeCliente from "./Components/Inicio/HomeCliente.jsx";
import HomeAdmin from "./Components/Inicio/HomeAdmin.jsx";
import SoporteCliente from "./Components/Soporte/SoporteClientePage.jsx";
import SoporteAdmin from "./Components/Soporte/SoporteAdminPage.jsx";
import CarritoPage from "./Components/Carrito/CarritoPage.jsx";
import RegistroCompra from "./Components/Compra/RegistroCompra.jsx";
import Unauthorized from "./Components/Inicio/Unauthorized.jsx";
import PrivateRoute from "./Routes/PrivateRoute.jsx";
import Promociones from "./Components/Promociones/Promociones.jsx";
import ControlUsuarios from './Components/Usuarios/ControlUsuarios.jsx';
import JuegosPage from "./Components/Juegos/JuegosPage.jsx";
import ListaJuegos from "./Components/Juegos/ListaJuegos.jsx";

import FormularioJuego from "./Components/Juegos/FormularioJuego.jsx";
import CrudCategorias from "./Components/Categoria/CrudCategorias.jsx";


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
        path="/Compras"
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

       <Route
  path="/biblioteca"
  element={
    <PrivateRoute rolPermitido="Cliente">
      <JuegosPage />
    </PrivateRoute>
  }
/>


    

         <Route
        path="/juegos"
        element={
          <PrivateRoute rolPermitido="Cliente">
            <JuegosPage />
          </PrivateRoute>
        }
      />
       <Route
        path="/Promociones"
        element={
          <PrivateRoute rolPermitido="Cliente">
            <Promociones />
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
      <Route
        path="/admin/usuarios"
        element={
          <PrivateRoute rolPermitido="Administrador">
            <ControlUsuarios />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/soporte"
        element={
          <PrivateRoute rolPermitido="Administrador">
            <SoporteAdmin />
          </PrivateRoute>
        }
      />

      <Route
        path="/juegos-admin"
        element={
          <PrivateRoute rolPermitido="Administrador">
            <ListaJuegos />
          </PrivateRoute>
        }
      />
      <Route
        path="/juegos/registrar"
        element={
          <PrivateRoute rolPermitido="Administrador">
            <FormularioJuego />
          </PrivateRoute>
        }
      />
      <Route
        path="/juegos/editar/:id"
        element={
          <PrivateRoute rolPermitido="Administrador">
            <FormularioJuego />
          </PrivateRoute>
        }
      />


    </Routes>
  );
}

export default App;
