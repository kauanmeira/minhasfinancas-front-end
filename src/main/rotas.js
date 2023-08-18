import React from "react";
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import ConsultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import Home from '../views/home'
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";
import AuthService from "../app/services/authService";

function RotaAutenticada({ element: Element, ...props }) {
  if (AuthService.isUsuarioAutenticado()) {
    return <Element {...props} />;
  } else {
    return <Navigate to="/login" />;
  }
}

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro-usuarios" element={<CadastroUsuario />} />
        <Route path="/home" element={<RotaAutenticada element={Home} />} />
        <Route path="/consulta-lancamentos" element={<RotaAutenticada element={ConsultaLancamentos} />} />
        <Route path="/cadastro-lancamentos/:id?" element={<RotaAutenticada element={CadastroLancamentos} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
