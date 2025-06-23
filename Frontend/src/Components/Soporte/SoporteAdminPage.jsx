import { obtenerTickets } from "../../Services/SoporteService.js";
import {useEffect, useState} from 'react';


const SoportePage = () => {

    //set y get 
    const [tickets, setTicket] = useState([]);

    const [cargando, setCargando] = useState(true);

    useEffect( () => 
        {
            obtenerTickets()
                .then((respuesta)=> {
                    console.log(respuesta.data.datos);
                    setTicket(respuesta.data.datos);
                }
            )
                .catch((error)=>{
                    console.log('Error',error);   
                }
            )
    
        }, []
    );

    return(
        <div>
<table>
  <thead>
    <tr>
      <th>idUsuario</th>
      <th>idSoporte</th>
      <th>asunto</th>
      <th>descripcion</th>
      <th>estado</th>
      <th>fechaReporte</th>
    </tr>
  </thead>
  <tbody>
    {
      tickets.map((items) =>
        <tr key={items.idSoporte}>
          <td>{items.idSoporte}</td>
          <td>{items.idUsuario}</td>
          <td>{items.asunto}</td>
          <td>{items.descripcion}</td>
          <td>{items.estado}</td>
          <td>{items.fechaReporte}</td>
        </tr>
      )
    }
  </tbody>
</table>

        </div>
    );
};


export default SoportePage;