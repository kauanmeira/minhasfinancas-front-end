import React, { useState } from "react";
import '../components/card';
import Card from "../components/card";
import '../components/form-group';
import FormGroup from "../components/form-group";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagemErro, setMensagemErro] = useState(null);
    const navigate = useNavigate();

    const entrar = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/usuarios/autenticar', {
                email: email,
                senha: senha
            });

            if (response && response.data) {
                navigate('/home');
            } else {
                console.error('Resposta inválida da API:', response);
                setMensagemErro('Resposta inválida da API');
            }
        } catch (erro) {
            if (erro.response && erro.response.data) {
                setMensagemErro(erro.response.data);
            } else {
                console.error('Erro desconhecido:', erro);
                setMensagemErro('Ocorreu um erro desconhecido');
            }
        }
    }

    const prepareCadastrar = () => {
        navigate('/cadastro-usuarios');
    }

    return (
        <div className="row">
            <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                <div className="bs-docs-section">
                    <Card title="Login">
                        <div className="row">
                            <div className="row">
                                <span>{mensagemErro}</span>
                            </div>
                            <div className="col-lg-12">
                                <div className="bs-component">
                                    <fieldset>
                                        <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                                            <input type="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                className="form-control"
                                                id="exampleInputEmail1"
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
    );
}

export default Login;
