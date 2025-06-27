import axios from 'axios';

const API_URL = 'https://gamestorecr.onrender.com/API/soporte.php';


export const obtenerTickets = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data.datos;
  } catch (error) {
    console.error("Error al obtener tickets:", error);
    throw error;
  }
};

export const crearTicket = async (ticket) => {
  try {
    const response = await axios.post(`${API_URL}`, ticket);
    return response.data;
  } catch (error) {
    console.error("Error al crear ticket:", error);
    throw error;
  }
};

export const actualizarTicket = async (ticket) => {
  try {
    const response = await axios.put(`${API_URL}`, ticket);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar ticket:", error);
    throw error;
  }
};

export const eliminarTikc = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}`, {
      data: { idSoporte: id }, // Asegúrate que tu backend lo espera así
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar ticket:", error);
    throw error;
  }
};


