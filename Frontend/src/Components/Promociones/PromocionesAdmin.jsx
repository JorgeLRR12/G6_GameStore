import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import promoNavbar from "../Header/HeaderAdmin"

const PromocionesAdmin = () => {
  const [promos, setPromos] = useState([]);
  const [nuevaPromo, setNuevaPromo] = useState({ titulo: "", descripcion: "", descuento: "" });
  const [mensaje, setMensaje] = useState(null);
  const { usuario } = useAuth();

  const cargarPromociones = () => {
    axios
      .get("http://localhost/G6_GameStore/Backend/API/promocion.php")
      .then((res) => setPromos(res.data.datos || []))
      .catch((err) => console.error("Error al cargar promociones", err));
  };

  useEffect(() => {
    cargarPromociones();
  }, []);

  const agregarPromocion = () => {
    if (!nuevaPromo.titulo || !nuevaPromo.descripcion || !nuevaPromo.descuento) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }

    const data = {
      ...nuevaPromo,
      idUsuario: usuario?.idUsuario || 1, // Por si el admin está logueado
    };

    axios
      .post("http://localhost/G6_GameStore/Backend/API/promocion.php", data)
      .then((res) => {
        if (res.data.codigo === 200) {
          setMensaje("Promoción creada exitosamente");
          setNuevaPromo({ titulo: "", descripcion: "", descuento: "" });
          cargarPromociones();
        } else {
          setMensaje("No se pudo crear la promoción");
        }
      })
      .catch((err) => {
        console.error("Error al crear promoción", err);
        setMensaje("Error al crear promoción");
      });
  };

  return (
    <>
    <HeaderAdmin />
    <div className="container mt-4 promociones-admin-container">
      <h2 className="text-white text-center mb-4">🎯 Promociones Actuales</h2>

      {mensaje && <div className="alert alert-info text-center">{mensaje}</div>}

      <div className="card bg-dark text-white p-4 mb-4">
        <h5 className="mb-3">➕ Crear nueva promoción</h5>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Título"
            value={nuevaPromo.titulo}
            onChange={(e) => setNuevaPromo({ ...nuevaPromo, titulo: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <textarea
            className="form-control"
            placeholder="Descripción"
            value={nuevaPromo.descripcion}
            onChange={(e) => setNuevaPromo({ ...nuevaPromo, descripcion: e.target.value })}
          />
        </div>
        <div className="mb-2">
          <input
            type="number"
            className="form-control"
            placeholder="Descuento (%)"
            value={nuevaPromo.descuento}
            onChange={(e) => setNuevaPromo({ ...nuevaPromo, descuento: e.target.value })}
          />
        </div>
        <button className="btn btn-success" onClick={agregarPromocion}>
          Guardar promoción
        </button>
      </div>

      <div className="row">
        {promos.length === 0 ? (
          <p className="text-muted">No hay promociones registradas.</p>
        ) : (
          promos.map((promo) => (
            <div key={promo.idPromocion} className="col-md-6 mb-4">
              <div className="card h-100 bg-secondary text-white p-3 border-info">
                <h5 className="card-title">{promo.titulo}</h5>
                <p className="card-text">{promo.descripcion}</p>
                <p className="mb-1">🎁 Descuento: <strong>{promo.descuento}%</strong></p>
                <p className="text-muted small">
                  Registrado por usuario #{promo.idUsuario}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default PromocionesAdmin;
