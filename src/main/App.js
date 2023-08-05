import { render } from "@testing-library/react";
import React from "react";
import 'bootswatch/dist/flatly/bootstrap.css'
import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'
import Rotas from "./rotas";

import '../custom.css'
import Navbar from '../components/navbar'

class App extends React.Component {
    render() {
        return (
            <>
            <Navbar />
            <div className="container">
                <Rotas/>
            </div>
            </>
        )

    }

}

export default App;
