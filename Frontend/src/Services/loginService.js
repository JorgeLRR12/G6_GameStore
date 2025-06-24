import axios from "axios";

const API_URL = "http://localhost/G6_GameStore/Backend/API/autenticacion.php";

export const loginService = async (correo, clave) => {
  const response = await axios.post(API_URL, { correo, clave });
  return response.data;
};