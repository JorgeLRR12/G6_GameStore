import { Routes, Route, Link } from 'react-router-dom';
import HomeCliente from './Components/Inicio/HomeCliente.jsx';
import SoporteCliente from './Components/Soporte/SoporteClientePage.jsx'
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeCliente />} />
        <Route path="/Soporte" element={<SoporteCliente />} />        
      </Routes>
    </>
  );
}

export default App;

