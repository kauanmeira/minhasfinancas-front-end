import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { AuthConsumer } from "../main/provedorAutenticacao";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import ConsultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import Home from "../views/home";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";

function Rotas() {
  return (
    <AuthConsumer>
      {(context) => (
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro-usuarios" element={<CadastroUsuario />} />
            <Route path="/home" element={context.isAutenticado ? <Home /> : <Navigate to="/login" />} />
            <Route path="/consulta-lancamentos" element={context.isAutenticado ? <ConsultaLancamentos /> : <Navigate to="/login" />}/>
            <Route path="/cadastro-lancamentos/:id?" element={context.isAutenticado ? <CadastroLancamentos /> : <Navigate to="/login" />}/>
          </Routes>
        </BrowserRouter>
      )}
    </AuthConsumer>
  );
}

export default Rotas;
