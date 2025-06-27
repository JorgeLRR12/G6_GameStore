import axios from 'axios';

const API_URL = 'http://localhost/G6_GameStore/Backend/API/valoracion.php';


export const obtenerValoraciones = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las valoraciones:", error);
    throw error;
  }
};

export const obtenerValoracionJuego = async (idJuego) => {
  try {
    const response = await axios.get(`${API_URL}?idJuego=${idJuego}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener valoraciones del juego con ID ${idJuego}:`, error);
    throw error;
  }
};


export const crearValoracion = async (valoracion) => {
  try {
    const response = await axios.post(`${API_URL}`, valoracion);
    return response.data;
  } catch (error) {
    console.error("Error al crear valoración:", error);
    throw error;
  }
};


export const actualizarValoracion = async (valoracion) => {
  try {
    const response = await axios.put(`${API_URL}`, valoracion);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar valoración:", error);
    throw error;
  }
};

export const eliminarValoracion = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}`, {
      data: { idValoracion: id },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar valoración:", error);
    throw error;
  }
};
