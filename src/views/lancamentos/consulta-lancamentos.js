import React from "react";
import { Form, useNavigate } from 'react-router-dom';
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/services/lancamentoService";
import LocalStorageService from "../../app/services/localStorageService";
import * as messages from '../../components/toastr'


class ConsultaLancamentos extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: []
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    buscar = () => {
        if (!this.state.ano) {
            messages.mensagemErro('O preenchimento do Ano é obrigatório')
            return false;
        }


        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service
            .consultar(lancamentoFiltro)
            .then(response => {
                this.setState({ lancamentos: response.data })
            }).catch(error => {
                console.log(error)
            })
    }


    render() {
        const meses = this.service.obterListaMeses();


        const tipos = this.service.obterListaTipos();


        const lancamentos = [
            { id: 1, descricao: 'Salário', valor: 5000.0, mes: 8, tipo: 'RECEITA', status: 'EFETIVADO' }
        ]



        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text"
                                    className="form-control"
                                    id="inputAno"
                                    value={this.state.ano}
                                    onChange={e => this.setState({ ano: e.target.value })}
                                    placeholder="Digite o Ano" />
                            </FormGroup>
                            <FormGroup htmlFor="inputMes" label="Mês: ">
                                <SelectMenu
                                    id="inputMes"
                                    value={this.state.mes}
                                    onChange={e => this.setState({ mes: e.target.value })}
                                    className="form-control"
                                    lista={meses} />
                            </FormGroup>
                            <FormGroup htmlFor="inputDesc" label="Descrição: *">
                                <input type="text"
                                    className="form-control"
                                    id="inputDesc"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({ descricao: e.target.value })}
                                    placeholder="Digite a Descrição" />
                            </FormGroup>
                            <FormGroup htmlFor="inputTipo" label="Tipo: ">
                                <SelectMenu
                                    id="inputTipo"
                                    value={this.state.tipo}
                                    onChange={e => this.setState({ ano: e.target.tipo })}
                                    className="form-control"
                                    lista={tipos} />
                            </FormGroup>

                            <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>


                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos} />
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

}

export default ConsultaLancamentos