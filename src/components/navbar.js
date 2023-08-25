import React from "react";
import NavbarItem from "./navbarItem";
import { AuthConsumer } from "../main/provedorAutenticacao";

function Navbar() {
  return (
    <AuthConsumer>
      {(context) => (
        <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
          <div className="container">
            <a href="/home" className="navbar-brand">Minhas Finanças</a>
            <button className="navbar-toggler" type="button" 
                    data-toggle="collapse" data-target="#navbarResponsive" 
                    aria-controls="navbarResponsive" aria-expanded="false" 
                    aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
              <ul className="navbar-nav">
                <NavbarItem render={context.isAutenticado} href="/home" label="Home" />
                <NavbarItem render={context.isAutenticado} href="/cadastro-usuarios" label="Usuários" />
                <NavbarItem render={context.isAutenticado} href="/consulta-lancamentos" label="Lançamentos" />
                <NavbarItem render={context.isAutenticado} onClick={context.encerrarSessao} href="/login" label="Sair" />
              </ul>
            </div>
          </div>
        </div>
      )}
    </AuthConsumer>
  );
}

export default Navbar;
