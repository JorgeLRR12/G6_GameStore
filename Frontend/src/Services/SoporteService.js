import axios from 'axios';

const API_URL = 'https://gamestorecr.onrender.com/API/soporte.php';


export const obtenerTickets = () => axios.get(`${API_URL}`);

export const crearTicket = (ticket) => axios.post(`${API_URL}`, ticket);

export const actualizarTicket = (ticket) => axios.put(`${API_URL}`,ticket);

export const eliminarTikc = (id) => axios.delete(`${API_URL}`, id);


