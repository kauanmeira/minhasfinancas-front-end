import React, { useState } from "react";
import Card from '../components/card'
import FormGroup from "../components/form-group";
import { useNavigate } from 'react-router-dom';
import UsuarioService from "../app/services/usuarioService";
import { mensagemSucesso, mensagemErro } from "../components/toastr";
import ErroValidacao from "../app/exceptions/erroValidacao";

function CadastroUsuario() {
    const navigate = useNavigate();
    const service = new UsuarioService();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const cadastrar = () => {
        const usuario = { nome, email, senha, confirmarSenha };

        try {
            service.validar(usuario);
        } catch (erro) {
            const msgs = erro.mensagens;
            msgs.forEach(msg => mensagemErro(msg));
            return false;
        }

        service.salvar(usuario)
            .then(response => {
                mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.');
                navigate('/login');
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    mensagemErro(error.response.data);
                } else {
                    mensagemErro('Ocorreu um erro ao cadastrar o usuário.');
                }
            });
    };


    const cancelar = () => {
        navigate('/login');
    };

    return (
        <Card title="Cadastro de Usuário">
            <div className="row">
                <div className="col-lg-12">
                    <div className="bs-component">
                        <FormGroup label="Nome: *" htmlFor="inputNome">
                            <input
                                type="text"
                                id="inputNome"
                                className="form-control"
                                name="nome"
                                onChange={e => setNome(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup label="Email: *" htmlFor="inputEmail">
                            <input
                                type="email"
                                id="inputEmail"
                                className="form-control"
                                name="email"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup label="Senha: *" htmlFor="inputSenha">
                            <input
                                type="password"
                                id="inputSenha"
                                className="form-control"
                                name="senha"
                                onChange={e => setSenha(e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                            <input
                                type="password"
                                id="inputRepitaSenha"
                                className="form-control"
                                name="senha"
                                onChange={e => setConfirmarSenha(e.target.value)}
                            />
                        </FormGroup>
                        <button onClick={cadastrar} type="button" className="btn btn-success">
                            <i className="pi pi-save"></i> Salvar
                        </button>
                        <button onClick={cancelar} type="button" className="btn btn-danger">
                            <i className="pi pi-times"></i> Cancelar
                        </button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default CadastroUsuario;
