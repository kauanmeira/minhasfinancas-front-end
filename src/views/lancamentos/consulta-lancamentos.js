import React, { useState, useEffect, useContext } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../main/provedorAutenticacao';

import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentosTable from './lancamentosTable';
import LancamentoService from '../../app/services/lancamentoService';
import LocalStorageService from '../../app/services/localStorageService';
import * as messages from '../../components/toastr';

function ConsultaLancamentos() {
    const navigate = useNavigate();
    const service = new LancamentoService();
    const authContext = useContext(AuthContext);

    const [state, setState] = useState({
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoDeletar: {},
        lancamentos: [],
    });

    useEffect(() => {
        if (!authContext.isAutenticado) {
            navigate('/login');
        } else {
            buscar();
        }
    }, [authContext.isAutenticado, navigate]);

    const buscar = () => {
        if (!state.ano) {
            messages.mensagemErro('O preenchimento do campo Ano é obrigatório.');
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const lancamentoFiltro = {
            ano: state.ano,
            mes: state.mes,
            tipo: state.tipo,
            descricao: state.descricao,
            usuario: usuarioLogado.id,
        };

        service
            .consultar(lancamentoFiltro)
            .then((resposta) => {
                const lista = resposta.data;
                if (lista.length < 1) {
                    messages.mensagemAlerta("Nenhum resultado encontrado");
                }
                setState({ ...state, lancamentos: resposta.data });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const editar = (id) => {
        navigate(`/cadastro-lancamentos/${id}`);
    };

    const alterarStatus = (lancamento, status) => {
        service.alterarStatus(lancamento.id, status)
            .then(response => {
                const lancamentosCopy = [...state.lancamentos]; // Cria uma cópia do array de lancamentos
                const index = lancamentosCopy.findIndex(item => item.id === lancamento.id); // Encontra o índice do objeto pelo id
                if (index !== -1) {
                    lancamentosCopy[index].status = status; // Atualiza o status do objeto no array de cópia
                    setState({ ...state, lancamentos: lancamentosCopy }); // Atualiza o estado com o array modificado
                }
                messages.mensagemSucesso('Status atualizado com sucesso!');
            })
            .catch(error => {
                messages.mensagemErro('Ocorreu um erro ao atualizar o status.');
            });
    }

    const abrirConfirmacao = (lancamento) => {
        setState({ ...state, showConfirmDialog: true, lancamentoDeletar: lancamento });
    };

    const cancelarDelecao = () => {
        setState({ ...state, showConfirmDialog: false, lancamentoDeletar: {} });
    };

    const deletar = () => {
        service
            .deletar(state.lancamentoDeletar.id)
            .then((response) => {
                const lancamentos = state.lancamentos;
                const index = lancamentos.indexOf(state.lancamentoDeletar);
                lancamentos.splice(index, 1);
                setState({ ...state, lancamentos: lancamentos, showConfirmDialog: false });
                messages.mensagemSucesso('Lançamento deletado com sucesso!');
            })
            .catch((error) => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar o Lançamento');
            });
    };

    const preparaFormularioCadastro = () => {
        navigate('/cadastro-lancamentos');
    };

    const meses = service.obterListaMeses();
    const tipos = service.obterListaTipos();

    const confirmDialogFooter = (
        <div>
            <Button label="Confirmar" icon="pi pi-check" onClick={deletar} />
            <Button label="Cancelar" icon="pi pi-times" onClick={cancelarDelecao} className="p-button-secondary" />
        </div>
    );

    return (
        <Card title="Consulta Lançamentos">
            <div className="row">
                <div className="col-md-6">
                    <div className="bs-component">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input
                                type="text"
                                className="form-control"
                                id="inputAno"
                                value={state.ano}
                                onChange={(e) => setState({ ...state, ano: e.target.value })}
                                placeholder="Digite o Ano"
                            />
                        </FormGroup>

                        <FormGroup htmlFor="inputMes" label="Mês: ">
                            <SelectMenu
                                id="inputMes"
                                value={state.mes}
                                onChange={(e) => setState({ ...state, mes: e.target.value })}
                                className="form-control"
                                lista={meses}
                            />
                        </FormGroup>

                        <FormGroup htmlFor="inputDesc" label="Descrição: ">
                            <input
                                type="text"
                                className="form-control"
                                id="inputDesc"
                                value={state.descricao}
                                onChange={(e) => setState({ ...state, descricao: e.target.value })}
                                placeholder="Digite a descrição"
                            />
                        </FormGroup>

                        <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: ">
                            <SelectMenu
                                id="inputTipo"
                                value={state.tipo}
                                onChange={(e) => setState({ ...state, tipo: e.target.value })}
                                className="form-control"
                                lista={tipos}
                            />
                        </FormGroup>
                        <br />

                        <button onClick={buscar} type="button" className="btn btn-success">
                            <i className="pi pi-search"></i> Buscar
                        </button>
                        <button onClick={preparaFormularioCadastro} type="button" className="btn btn-danger">
                            <i className="pi pi-plus"></i> Cadastrar
                        </button>
                    </div>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-md-12">
                    <div className="bs-component">
                        <LancamentosTable
                            lancamentos={state.lancamentos}
                            deleteAction={abrirConfirmacao}
                            editAction={editar}
                            alterarStatus={alterarStatus}
                        />
                    </div>
                </div>
            </div>
            <div>
                <Dialog
                    header="Confirmação"
                    visible={state.showConfirmDialog}
                    style={{ width: '50vw' }}
                    footer={confirmDialogFooter}
                    modal={true}
                    onHide={() => setState({ ...state, showConfirmDialog: false })}
                >
                    Confirma a exclusão deste Lançamento?
                </Dialog>
            </div>
        </Card>
    );
}

export default ConsultaLancamentos;
