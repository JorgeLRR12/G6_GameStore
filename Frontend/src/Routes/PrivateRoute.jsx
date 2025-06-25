import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PrivateRoute = ({ children, rolRequerido }) => {
  const { isAuthenticated, usuario } = useAuth();

  if (!isAuthenticated()) return <Navigate to="/login" replace />;
  if (rolRequerido && usuario?.rol !== rolRequerido)
    return <Navigate to="/unauthorized" replace />;

  return children;
};

export default PrivateRoute;
