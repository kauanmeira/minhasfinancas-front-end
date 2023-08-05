import React from "react";
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

function Rotas(){
    return (
        <Router>
            <Routes>
                <Route path ="/login" element={<Login />} />
                <Route path="/cadastro-usuarios" element={<CadastroUsuario />} />
            </Routes>
        </Router>
    )
}

export default Rotas
