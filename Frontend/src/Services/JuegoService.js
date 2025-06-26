import axios from "axios";

const API_URL = "https://gamestorecr.onrender.com/API/juego.php";

export const obtenerJuegos = async () => {
  const response = await axios.get(API_URL);
  return response.data.datos;
};

export const insertarJuego = async (juego) => {
  const response = await axios.post(API_URL, juego);
  return response.data;
};

export const actualizarJuego = async (juego) => {
  const response = await axios.put(API_URL, juego);
  return response.data;
};

export const eliminarJuego = async (id) => {
  const response = await axios.delete(API_URL, {
    data: { id },
  });
  return response.data;
};

export const obtenerJuegoPorId = async (id) => {
  const response = await axios.get(`${API_URL}?id=${id}`);
  return response.data.datos;
};
