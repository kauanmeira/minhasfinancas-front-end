import React from "react";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import ConsultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import Home from '../views/home'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

function Rotas() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro-usuarios" element={<CadastroUsuario />} />
                <Route path="/home" element={<Home />} />
                <Route path="/consulta-lancamentos" element={<ConsultaLancamentos />} />
            </Routes>
        </Router>
    )
}

export default Rotas
