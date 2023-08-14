import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentoService from '../../app/services/lancamentoService';
import * as messages from '../../components/toastr';
import LocalStorageService from '../../app/services/localStorageService';
import ErroValidacao from '../../app/exceptions/erroValidacao';

function CadastroLancamentos() {
    const navigate = useNavigate();
    const service = new LancamentoService();
    const { id } = useParams();

    const [state, setState] = useState({
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    });

    useEffect(() => {
        setState({
            descricao: '',
            valor: '',
            mes: '',
            ano: '',
            tipo: '',
            status: '',
            usuario: null,

        });


        if (id) {
            service.obterPorId(id)
                .then(response => {
                    setState(prevState => ({
                        ...prevState,
                        ...response.data,
                        atualizando: true
                    }));
                })
                .catch(erros => {
                    messages.mensagemErro(erros.response.data)
                });
        }
    }, [id]);


    const submit = () => {

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const { descricao, valor, mes, ano, tipo } = state;

        const lancamento = {
            descricao,
            valor,
            mes,
            ano,
            tipo,
            usuario: usuarioLogado.id,
        };
        try {
            service.validar(lancamento)
        } catch (erro) {
            const mensagens = erro.mensagens; 
            mensagens.forEach(msg => messages.mensagemErro(msg));
            return false;
        }



        service
            .salvar(lancamento)
            .then((response) => {
                navigate('/consulta-lancamentos');
                messages.mensagemSucesso('Lançamento cadastrado com sucesso!');
            })
            .catch((error) => {
                messages.mensagemErro(error.response.data);
            });
    };

    const atualizar = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const { descricao, valor, mes, ano, tipo, id, usuario } = state;

        const lancamento = {
            descricao,
            valor,
            mes,
            ano,
            tipo,
            id,
            usuario
        };

        service
            .atualizar(lancamento)
            .then((response) => {
                navigate('/consulta-lancamentos');
                messages.mensagemSucesso('Lançamento atualizado com sucesso!');
            })
            .catch((error) => {
                messages.mensagemErro(error.response.data);
            });
    };

    const handleChanche = (event) => {
        const { name, value } = event.target;

        setState({ ...state, [name]: value });
    };

    const tipos = service.obterListaTipos();
    const meses = service.obterListaMeses();

    return (
        <Card title={state.atualizando ? 'Atualização de lançcamento' : 'Cadastro de lançamento'}>
            <div className="row">
                <div className="col-md-12">
                    <FormGroup id="inputDescricao" label="Descrição: *">
                        <input
                            id="inputDescricao"
                            type="text"
                            className="form-control"
                            name="descricao"
                            value={state.descricao}
                            onChange={handleChanche}
                        />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <FormGroup id="inputAno" label="Ano: *">
                        <input
                            id="inputAno"
                            type="text"
                            className="form-control"
                            name="ano"
                            value={state.ano}
                            onChange={handleChanche}
                        />
                    </FormGroup>
                </div>
                <div className="col-md-6">
                    <FormGroup id="inputMes" label="Mês: *">
                        <SelectMenu
                            id="inputMes"
                            className="form-control"
                            name="mes"
                            value={state.mes}
                            onChange={handleChanche}
                            lista={meses}
                        />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <FormGroup id="inputValor" label="Valor: *">
                        <input
                            id="inputValor"
                            type="text"
                            className="form-control"
                            name="valor"
                            value={state.valor}
                            onChange={handleChanche}
                        />
                    </FormGroup>
                </div>
                <div className="col-md-4">
                    <FormGroup id="inputTipo" label="Tipo: *">
                        <SelectMenu
                            id="inputTipo"
                            className="form-control"
                            name="tipo"
                            value={state.tipo}
                            onChange={handleChanche}
                            lista={tipos}
                        />
                    </FormGroup>
                </div>
                <div className="col-md-4">
                    <FormGroup id="inputStatus" label="Status: *">
                        <input
                            type="text"
                            className="form-control"
                            name="status"
                            value={state.status}
                            disabled
                        />
                    </FormGroup>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                    {state.atualizando ?
                        (
                            <button onClick={atualizar} type="button" className="btn btn-success">
                                Atualizar
                            </button>
                        ) :
                        (
                            <button onClick={submit} type="button" className="btn btn-success">
                                Salvar
                            </button>
                        )
                    }


                    <button onClick={e => navigate('/consulta-lancamentos')} type="button" className="btn btn-danger">
                        Cancelar
                    </button>
                </div>
            </div>
        </Card>
    );
}

export default CadastroLancamentos;
