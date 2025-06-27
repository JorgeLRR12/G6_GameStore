import axios from "axios";

const API_URL = "http://localhost/G6_GameStore/Backend/API/categoria.php";

export const obtenerCategorias = async () => {
  const res = await axios.get(API_URL);
  return res.data.datos;
};
