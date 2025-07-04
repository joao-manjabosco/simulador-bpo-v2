import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index';
import Login from './pages/login';
import Register from './pages/register';
import Success from './pages/sucesso';
import Simulador from './pages/simulador';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/sucesso" element={<Success />} />
        <Route 
          path="/simulador" 
          element={
            <ProtectedRoute>
              <Simulador />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;

