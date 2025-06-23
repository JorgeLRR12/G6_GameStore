import { Routes, Route, Link } from 'react-router-dom';
import HomeCliente from './Components/Inicio/HomeCliente.jsx';
import SoporteCliente from './Components/Soporte/SoporteClientePage.jsx'
import CarritoPage from './Components/Carrito/CarritoPage.jsx';
import RegistroCompra from './Components/Compra/RegistroCompra.jsx';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeCliente />} />
        <Route path="/Soporte" element={<SoporteCliente />} />
        <Route path="/Carrito" element={<CarritoPage />} />
        <Route path="/Compra/Registro" element={<RegistroCompra />} />
      </Routes>
    </>
  );
}

export default App;

