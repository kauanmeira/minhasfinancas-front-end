import React, { useState } from "react";
import '../components/card'
import Card from "../components/card";
import '../components/form-group'
import FormGroup from "../components/form-group";
import { useNavigate } from 'react-router-dom'; 

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const entrar = () => {
        console.log('Email: ', email);
        console.log('Senha: ', senha);
    }

    const prepareCadastrar = () => {
        navigate('/cadastro-usuarios');
    }

    return (
        <div className="row">
            <div className="col-md-6" style={{ position: 'relative', left: '250px' }}>
                <div className="bs-docs-section">
                    <Card title="Login">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <fieldset>
                                        <FormGroup label="Email: *" htmlFor="exampleInputEmail">
                                            <input type="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                className="form-control"
                                                id="exampleInputEmail"
                                                aria-describedby="emailHelp"
                                                placeholder="Digite o Email" />
                                        </FormGroup>
                                        <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                            <input type="password"
                                                value={senha}
                                                onChange={e => setSenha(e.target.value)}
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                placeholder="Password" />

                                        </FormGroup>

                                        <button onClick={entrar} className="btn btn-success">Entrar</button>
                                        <button onClick={prepareCadastrar} className="btn btn-danger">Cadastrar</button>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Login;
