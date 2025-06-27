import React, { useEffect, useState } from "react";
import axios from "axios";
import compraNavbar from "../Header/HeaderAdmin"

const ComprasAdmin = () => {
    const [compras, setCompras] = useState([]);

    useEffect(() => {
        axios
            .get("https://gamestorecr.onrender.com/API/compra.php?detallado=1")
            .then((res) => setCompras(res.data.datos || []))
            .catch((err) => console.error("Error cargando compras:", err));
    }, []);

    return (
        <>
            {/* <compraNavbar /> */}
            <div className="admin-compras-container container mt-4">
                <h2 className="text-white text-center mb-4">🧾 Compras Registradas</h2>

                {compras.length === 0 ? (
                    <div className="alert alert-info text-center">
                        No se han registrado compras aún.
                    </div>
                ) : (
                    <table className="table table-dark table-hover table-bordered">
                        <thead className="table-primary">
                            <tr>
                                <th>#</th>
                                <th>Usuario</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Juegos</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compras.map((compra, index) => (
                                <tr key={compra.idCompra}>
                                    <td>{index + 1}</td>
                                    <td>{compra.nombreUsuario || "Usuario #" + compra.idUsuario}</td>
                                    <td>{new Date(compra.fecha).toLocaleDateString()}</td>
                                    <td>₡{compra.total.toLocaleString()}</td>
                                    <td>
                                        {compra.juegos?.map(j => j.nombre).join(", ") || "Sin detalles"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>

    );
};

export default ComprasAdmin;
