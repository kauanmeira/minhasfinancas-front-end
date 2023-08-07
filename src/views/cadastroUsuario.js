import React, { useState } from "react";
import Card from '../components/card'
import FormGroup from "../components/form-group";
import { useNavigate } from 'react-router-dom';
import UsuarioService from "../app/services/usuarioService";
import { mensagemSucesso } from "../components/toastr";
import { mensagemErro } from "../components/toastr";


function CadastroUsuario() {
    const navigate = useNavigate();
    const service = new UsuarioService();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const validar = () => {
        const msgs = []
        if (!nome) {
            msgs.push('O campo Nome é obrigatório')
        }
        if (!email) {
            msgs.push('O campo Email é obrigatório')
        } else if (!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            msgs.push('Informe um Email válido')
        }
        if (!senha || !confirmarSenha) {
            msgs.push('O campo Senha é obrigatório')
        } else if (senha !== confirmarSenha){
            msgs.push('As Senhas não batem')
        }
    
        return msgs;
    }

    const cadastrar = () => {
        const msgs = validar();

        if(msgs && msgs.length > 0 ){
            msgs.forEach( (msg, index) =>{
                mensagemErro(msg)
            })
            return false;
        }


        const usuario = {
            nome: nome,
            email: email,
            senha: senha
        }

        service.salvar(usuario)
            .then(response => {
                mensagemSucesso('Usuario cadastrado com sucesso! Faça o Login para acessar o sistema.');
                navigate('/login');
            }).catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    mensagemErro(error.response.data.message);
                } else {
                    mensagemErro('Erro desconhecido ao cadastrar usuário.');
                }
            });

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
