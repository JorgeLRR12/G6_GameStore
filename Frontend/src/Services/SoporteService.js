import axios from 'axios';

const API_URL = 'http://localhost/2025/ProyectoApi/G6_GameStore/Backend/API/soporte.php';


export const obtenerTickets = () => axios.get(`${API_URL}`);

export const crearTicket = (ticket) => axios.post(`${API_URL}`, ticket);

export const actualizarSoporte = (ticket) => axios.put(`${API_URL}`,ticket);

export const eliminarSoporte = (id) => axios.delete(`${API_URL}`, id);


