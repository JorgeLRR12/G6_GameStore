import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(JSON.parse(storedUser));
    }
  }, []);

  const login = async (correo, clave) => {
    try {
      const response = await axios.post(
        "http://localhost/G6_GameStore/Backend/API/autenticacion.php",
        { correo, clave }
      );

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

  const isAuthenticated = () => !!usuario;

  return (
    <AuthContext.Provider value={{ usuario, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
