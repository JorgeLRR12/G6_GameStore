import axios from "axios";

const API_URL = "https://gamestorecr.onrender.com/API/categoria.php";

export const obtenerCategorias = async () => {
  const res = await axios.get(API_URL);
  return res.data.datos;
};
