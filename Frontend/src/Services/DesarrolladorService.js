import axios from "axios";

const API_URL = "http://localhost/G6_GameStore/Backend/API/desarrollador.php";

export const obtenerDesarrolladores = async () => {
  const res = await axios.get(API_URL);
  return res.data.datos;
};

export const obtenerDesarrolladorPorId = async (id) => {
  const res = await axios.get(`${API_URL}?id=${id}`);
  return res.data.datos;
};

export const insertarDesarrollador = async (desarrollador) => {
  const res = await axios.post(API_URL, desarrollador);
  return res.data;
};

export const actualizarDesarrollador = async (desarrollador) => {
  const res = await axios.put(API_URL, desarrollador);
  return res.data;
};

export const eliminarDesarrollador = async (id) => {
  const res = await axios.delete(API_URL, { data: { idDesarrollador: id } });
  return res.data;
};
