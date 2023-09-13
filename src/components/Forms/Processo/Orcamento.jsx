import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input';
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { IMaskInput, IMaskMixin } from 'react-imask'
import { Pessoa } from '../../../data/dummy'

import { Radio } from 'flowbite-react';
import TabelaSimples from '../../TabelaSimples';
import { useAuthContext } from '../../../contexts/ContextProvider';
import SelectCustom from '../../SelectCustom';

export default function Orcamento({ pessoas_data }) {

    const { state } = useLocation()
    // console.log("PESSOA_DATA", pessoas_data);
    const [dados, setDados] = useState(state?.itensOrcamento ? state?.itensOrcamento : "")

    const [pessoas, setPessoas] = useState(pessoas_data)
    const [pessoa, setPessoa] = useState()

    const dadosGrid = []

    for (const p of dados) {
        dadosGrid.push({
            nome: p?.pessoaVeiculo?.nome,
            valorTotalOrcamento: p?.valorTotalOrcamento,
            qtdPublicacoes: p?.qtdPublicacoes
        });

    }


    const [dadosTable, setDadosTable] = useState(dadosGrid)




    const [descricao, setDescricao] = useState("")
    const [valor, setValor] = useState("")
    const [publicacoes, setPublicacoes] = useState("")

    const { user } = useAuthContext();
    const navigate = useNavigate();





    const [openModal, setOpenModal] = useState("");
    const props = { openModal, setOpenModal };

    const colunas = [
        { head: 'Descrição', value: 'nome' },
        { head: 'Valor do Orçamento', value: 'valorTotalOrcamento' },
        { head: 'Qtd. de Publicações', value: 'qtdPublicacoes' },

    ]



    const pessoasOptions = pessoas.map((item) => {

        return { value: item.id, label: item.nome }
    })




    const setValueFromChild = (childData) => {
        setPessoa(childData)

    }







    const handleEdit = (obj) => {

        console.log("MEU OBJETO COMPLETO", obj);


        // navigate(`/cadastros/cadastro_processo/`, { state: obj.objprocessocompleto })
    }

    const handleOpenModal = async (obj) => {

        props.setOpenModal(obj)
    }

    const handleSubmit = async () => {
        try {
            // const headers = {
            //     Authorization: `Bearer ${user.token}`,
            //     "Content-Type": "application/json",
            // };




            const body = [

                {
                    nome: descricao ? descricao : pessoa?.label,
                    valorTotalOrcamento: valor ? valor : valor,
                    qtdPublicacoes: publicacoes ? publicacoes : publicacoes,
                }
            ]



            body.map((item) => setDadosTable([...dadosTable, item]))







            return


            // const res = await axios.post(`${getApiLeadUrl()}/nrn/processos/add`, body,
            //     {
            //         headers: headers,
            //     });

            // navigate('/cadastros/pessoas')



        } catch (err) {
            console.log(err);
        }
    }










    return (
        <>
            <h5 class="mb-8 mt-4 text-xl font-bold leading-none text-gray-900 dark:text-gray-200">Dados do Orçamento</h5>
            <form>
                {/* <div class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 ">

                    <div className='col-span-12'>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Licitante</label>
                        <input
                            type="text"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>



                </div> */}



                {/* <h5 className="mb-8 mt-8 text-xl font-bold leading-none text-gray-900 dark:text-gray-200">Endereço</h5> */}
                {/* <div class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 mt-6">


                    <div className="col-span-3">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CEP</label>
                       
                        <IMaskInput
                            type='text'
                            mask="00.000-000"
                            value={cep}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={e => setCep(e.target.value.replace(/\D/g, ''))}
                            onBlur={checkCEP}
                        />
                    </div>
                    <div className="col-span-3">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
                        <input
                            type="text"
                            value={uf}
                            readOnly
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="col-span-3">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade</label>
                        <input
                            type="text"
                            value={cidade}
                            readOnly
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="col-span-3">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IBGE</label>
                        <input type="text" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>


                </div> */}

                <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 mt-6">
                    <div className="col-span-6">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Veículo de comunicação</label>
                        {/* <input
                            type="text"
                            onChange={e => setDescricao(e.target.value)}

                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}

                        <SelectCustom options={pessoasOptions} setValueFromChild={setValueFromChild} isMulti={false} placeholder={"Selecione"} closeMenuOnSelect={true} />
                    </div>
                    <div className="col-span-2">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor Orçamento</label>
                        <input
                            type="numeric"
                            onChange={e => setValor(e.target.value)}

                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="col-span-2">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Publicações</label>
                        <input
                            type="numeric"

                            onChange={e => setPublicacoes(e.target.value)}
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="col-span-2">
                        <label hidden class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">&nbsp;</label>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Adicionar Item</button>


                    </div>
                    {/* <div className="col-span-3">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Complemento</label>
                        <input
                            type="text"
                            value={complemento}
                            onChange={e => setComplemento(e.target.value)}
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div> */}



                </div>



                {/* <div className="mt-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Observação:</label>
                    <textarea
                        rows="4"
                        value={obs}
                        onChange={e => setObs(e.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escreva aqui sua observação..."></textarea>
                </div>
 */}



                <div class="m-2 md:m-10 p-2 bg-white  rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">


                    <TabelaSimples dados={dadosTable} colunas={colunas} edit handleEdit={handleEdit} handleDelete={handleOpenModal} />
                </div>









                <div className="mt-12">

                    <button type="submit" class="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cadastrar</button>
                    <button
                        type="submit"
                        onClick={() => navigate(-1)}
                        class="text-white bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800">Cancelar</button>
                </div>
            </form >
        </>
    )
}
