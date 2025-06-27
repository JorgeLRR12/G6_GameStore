
import axios from "axios";

const URL = "http://localhost/G6_GameStore/Backend/API/juegodesarrollador.php";


export const crearRelacionJuegoDesarrollador = async (idJuego, idDesarrollador) => {
  try {
    const response = await axios.post(
      'http://localhost/G6_GameStore/Backend/API/juegodesarrollador.php',
      {
        idJuego: idJuego,
        idDesarrollador: idDesarrollador,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al insertar relación juego-desarrollador', error);
    throw error;
  }
};




export const obtenerJuegoDesarrollador = async () => {
  try {
    const response = await axios.get(URL);
    return response.data.datos;
  } catch (error) {
    console.error("Error al obtener juego-desarrollador", error);
    throw error;
  }
};

export const eliminarJuegoDesarrollador = async (idJuego, idDesarrollador) => {
  try {
    const response = await axios.delete(`${URL}?idJuego=${idJuego}&idDesarrollador=${idDesarrollador}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar relación juego-desarrollador", error);
    throw error;
  }
};
