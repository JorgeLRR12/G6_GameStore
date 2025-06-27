import axios from 'axios';

const API_URL = 'https://gamestorecr.onrender.com/API/valoracion.php';


export const obtenerValoraciones = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data; 
};


export const obtenerValoracionJuego = async (idJuego) => {
  const response = await axios.get(`${API_URL}?idJuego=${idJuego}`);
  return response.data;
};



export const crearValoracion= (Valoracion) => axios.post(`${API_URL}`, Valoracion);

export const actualizarValoracion = (Valoracion) => axios.put(`${API_URL}`,Valoracion);

export const eliminarValoracion = (id) => axios.delete(`${API_URL}`, { data: { idValoracion: id } });
