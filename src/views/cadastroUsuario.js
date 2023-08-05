import React, { useState } from "react";
import Card from '../components/card'
import FormGroup from "../components/form-group";
import { useNavigate } from 'react-router-dom';

function CadastroUsuario() {
    const navigate = useNavigate();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const cadastrar = () => {
        console.log({ nome, email, senha, confirmarSenha });
    }

    const cancelar = () => {
        navigate('/login');
    }

    return (
        <Card title="Cadastro de Usuario">
            <div className="row">
                <div className="col-lg-12">
                    <div className="bs-component">
                        <FormGroup label="Nome: *" htmlFor="inputNome">
                            <input type="text" id="inputNome" className="form-control" name="nome"
                                onChange={e => setNome(e.target.value)} />
                        </FormGroup>
                        <FormGroup label="Email: *" htmlFor="inputEmail">
                            <input type="email" id="inputEmail" className="form-control" name="email"
                                onChange={e => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup label="Senha: *" htmlFor="inputSenha">
                            <input type="password" id="inputSenha" className="form-control" name="senha"
                                onChange={e => setSenha(e.target.value)} />
                        </FormGroup>
                        <FormGroup label="Confirme a Senha: *" htmlFor="inputConfirmeSenha">
                            <input type="password" id="inputConfirmeSenha" className="form-control" name="senha"
                                onChange={e => setConfirmarSenha(e.target.value)} />
                        </FormGroup>
                        <button onClick={cadastrar} type="button" className="btn btn-success">Salvar</button>
                        <button onClick={cancelar} type="button" className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default CadastroUsuario;
