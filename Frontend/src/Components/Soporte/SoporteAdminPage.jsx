import React, { useEffect, useState } from "react";
import {
  obtenerTickets,
  actualizarTicket,
} from "../../Services/SoporteService.js";
import ClienteNavbar from "../Header/HeaderCliente.jsx";
import "./SoporteAdminPage.css";

const SoporteAdminPage = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    obtenerTickets()
      .then((respuesta) => {
        setTickets(respuesta.data.datos);
      })
      .catch((error) => {
        console.log("Error al obtener tickets", error);
      });
  }, []);

  const handleEstadoChange = (ticketOriginal, nuevoEstado) => {
    const ticketActualizado = {
      idSoporte: ticketOriginal.idSoporte,
      estado: nuevoEstado,
      descripcion: ticketOriginal.descripcion, // 👈 requerido por el backend
    };

    actualizarTicket(ticketActualizado)
      .then(() => {
        setTickets((prev) =>
          prev.map((t) =>
            t.idSoporte === ticketOriginal.idSoporte
              ? { ...t, estado: nuevoEstado }
              : t
          )
        );
      })
      .catch((error) =>
        console.error(
          "Error al actualizar estado:",
          error.response?.data || error
        )
      );
  };

  const formatearFecha = (fechaHora) => {
    if (!fechaHora) return "Fecha no disponible";

    const fechaValida = new Date(fechaHora);

    if (isNaN(fechaValida)) return "Fecha inválida";

    return fechaValida.toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <>
      <ClienteNavbar />
      <div className="contenedor-tabla">
        <h2 className="titulo-tabla">Listado de Tickets</h2>
        <div className="table-responsive">
          <table className="table table-hover tabla-transparente text-white text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Asunto</th>
                <th>Descripción</th>
                <th>Fecha/Hora</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.idSoporte}>
                  <td>{ticket.idSoporte}</td>
                  <td>{ticket.asunto}</td>
                  <td>{ticket.descripcion}</td>
                  <td>{formatearFecha(ticket.fechaReporte)}</td>
                  <td>
                    <select
                      className={`form-select form-select-sm estado-select ${ticket.estado.toLowerCase().replace(/\s/g, "-")}`}
                      value={ticket.estado}
                      onChange={(e) =>
                        handleEstadoChange(ticket, e.target.value)
                      }
                    >
                      <option value="Abierto">Abierto</option>
                      <option value="En proceso">En proceso</option>
                      <option value="Cerrado">Cerrado</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default SoporteAdminPage;
