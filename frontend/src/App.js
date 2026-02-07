import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import PolizaList from './components/PolizaList';
import ProveedorList from './components/ProveedorList';
import SiniestroList from './components/SiniestroList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Navigate to="/polizas" replace />} />
            <Route path="/polizas" element={<PolizaList />} />
            <Route path="/proveedores" element={<ProveedorList />} />
            <Route path="/siniestros" element={<SiniestroList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
