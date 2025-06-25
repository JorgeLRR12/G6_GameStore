import axios from "axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  /* const [usuario, setUsuario] = useState(() => {
  // Solo para pruebas: usuario "logueado" por defecto
  const mockUsuario = {
    idUsuario: 11,
    nombre: "Jorge",
    correo: "jorgelcr09@gmail.com",
    rol: "Administrador",
  };
  localStorage.setItem("usuario", JSON.stringify(mockUsuario)); // Opcional: persistirlo

  return mockUsuario;
});  */
  

  const login = async (correo, clave) => {
    try {
      // const response = await axios.post("http://localhost/G6_GameStore/Backend/API/autenticacion.php", {
      //   correo,
      //   clave,
      // });

      // Uso mi ruta para pruebas locales
      const response = await axios.post("http://localhost/MultimediosProyecto/G6_GameStore/Backend/API/autenticacion.php", {
        correo,
        clave,
      });

      if (response.data.codigo === 200) {
        const userData = response.data.datos;
        setUsuario(userData);
        localStorage.setItem("usuario", JSON.stringify(userData));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error al hacer login:", error);
      return false;
    }
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  const isAuthenticated = () => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser && !usuario) setUsuario(JSON.parse(storedUser)); // sincroniza si hace falta
    return storedUser !== null;
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
