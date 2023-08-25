import React, { useState, useContext } from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { useNavigate } from 'react-router-dom';
import UsuarioService from "../app/services/usuarioService";
import { mensagemErro, mensagemSucesso } from '../components/toastr';
import { AuthContext } from "../main/provedorAutenticacao";

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const service = new UsuarioService();
    const authContext = useContext(AuthContext);

    const entrar = () => {
        service.autenticar({
            email: email,
            senha: senha
        }).then(response => {
            console.log(response);
            if (response && response.data) {
                mensagemSucesso('Usuário Logado com Sucesso!')
                authContext.iniciarSessao(response.data);
                navigate('/home');
            } else {
                console.error('Resposta inválida da API:', response);
                mensagemErro('Resposta inválida da API');
            }
        }).catch(erro => {
            if (erro.response && erro.response.data) {
                mensagemErro(erro.response.data);
            } else {
                console.error('Erro desconhecido:', erro);
                mensagemErro('Ocorreu um erro desconhecido');
            }
        });
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
                                {/* Não é necessário exibir a mensagem de erro aqui */}
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
                                        <br />
                                        <button onClick={entrar} className="btn btn-success"><i className="pi pi-sign-in"></i> Entrar</button>
                                        <button onClick={prepareCadastrar} className="btn btn-danger"><i className="pi pi-plus"></i> Cadastrar</button>
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
