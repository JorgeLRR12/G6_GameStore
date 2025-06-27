import axios from "axios";

//const API_URL = "http://localhost/G6_GameStore/Backend/API/autenticacion.php";
const API_URL = "http://localhost/G6_GameStore/Backend/API/autenticacion.php";

//const API_URL = 'http://localhost/2025/ProyectoApi/G6_GameStore/Backend/API/autenticacion.php'; // prueba Fernando

export const loginService = async (correo, clave) => {
  const response = await axios.post(API_URL, { correo, clave });
  return response.data;
};