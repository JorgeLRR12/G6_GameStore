import axios from "axios";

const API_URL = "http://localhost/G6_GameStore/Backend/API/juego.php";

// 🔥 Este es el método que te falta
export const obtenerJuegoPorId = async (id) => {
  const res = await axios.get(`${API_URL}?id=${id}`);
  return res.data.datos;
};

export const obtenerJuegos = async () => {
  const res = await axios.get(API_URL);
  return res.data.datos;
};

export const insertarJuego = async (juego) => {
  const res = await axios.post(API_URL, juego);
  return res.data;
};

export const actualizarJuego = async (juego) => {
  const res = await axios.put(API_URL, juego);
  return res.data;
};

export const eliminarJuego = async (idJuego) => {
  const res = await axios.delete(API_URL, {
    data: { idJuego: idJuego }, //  Nombre correcto
  });
  return res.data;
};

