import React, { useEffect, useState } from 'react'
import TabelaSimples from '../../../components/TabelaSimples';
import { RiFileAddFill } from "react-icons/ri";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Header } from '../../../components';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getApiLeadUrl } from "../../../apiUtils";
import { useAuthContext, useStateContext } from "../../../contexts/ContextProvider";
import { Button, Modal, Tooltip } from 'flowbite-react';

export default function Processos({ processos_data }) {

    const [processos, setProcessos] = useState(processos_data.map((item) => item))
    const [arrayPro, setArrayPro] = useState([])


    //console.log("processos", processos);

    //const nome_autor = processos.map((item) => item.pessoaAutor?.nome)
    //console.log("pro", pro.pessoaAutor);
    // console.log("array_processos", processos);
    const navigate = useNavigate()

    const { user } = useAuthContext();


    const { criacaoProcesso, setCriacaoProcesso, criado, setCriado, setBody } = useStateContext()

    const date = new Date()
    const hoje = date.toLocaleDateString()

    //MODAL
    for (const p of processos) {
        arrayPro.push({
            id: p?.id,
            numero: p?.numero,
            dataCriacao: p?.dataCriacao,
            reu: p?.reu,
            status: p?.status,
            nomeAdvogado: p?.pessoaAdvogado?.nome,
            nomeAutor: p?.pessoaAutor?.nome,
            tipoProcesso: p?.tipoProcesso == 1 ? "LEILAO" : "EDITAL",
            objprocessocompleto: p
        });
    }


    // console.log("array_processos--->>>", arrayPro);



    const [openModal, setOpenModal] = useState("");
    const props = { openModal, setOpenModal };

    const colunas = [
        { head: 'Processo', value: 'numero' },
        { head: 'DATA', value: 'dataCriacao' },
        { head: 'Réu', value: 'reu' },
        { head: 'Status', value: 'status' },
        { head: 'Advogado', value: 'nomeAdvogado' },
        { head: 'Autor', value: 'nomeAutor' },
        { head: 'Tipo', value: 'tipoProcesso' },
    ]

    //console.log(colunas);

    const handleAdd = () => {
        setCriado(false)
        setCriacaoProcesso({
            id: 0,
            tipo: ""
        })
        setBody({
            "ID": 0,
            "Numero": "",
            "TipoProcesso": "",
            "FisicoDigital": "",
            "IdPessoaAutor": 0,
            "IdPessoaAdvogado": 0,
            "IdPessoaLicitante": 0,
            "IdSetor": 0,
            "Reu": "",
            "IdAcao": 0,
            "IdStatus": 0,
            "IdCartorio": 0,
            "ProtocoloCorreios": "",
            "RastreioCorreios": "",
            "ValorDje": 0.00,
            "DataRemessa": "",
            "UrlArquivosProcesso": "",
            "Obs": ""
        })
        navigate('/cadastros/cadastro_processo')
    }

    const handleEdit = (obj) => {
        setCriacaoProcesso(
            {
                id: 1,
                tipo: ""
            }
        )
        setCriado(true)

        // console.log("MEU OBJETO COMPLETO", obj.objprocessocompleto);

        navigate(`/cadastros/cadastro_processo/`, { state: obj.objprocessocompleto })
    }

    const handleOpenModal = async (obj) => {

        props.setOpenModal(obj)
    }
    const handleDelete = async (obj) => {
        try {

            const headers = {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            }; 



            var res = await axios.get(
                `${getApiLeadUrl()}/nrn/processos/del?id=${obj.id}`,
                {
                    headers: headers,
                }
            );

            console.log("RES DEL", res);

            const h = { Authorization: `Bearer ${user.token}` };

            var ress = await axios.get(
                `${getApiLeadUrl()}/nrn/processos`,
                {
                    headers: h,
                }
            );

            console.log("RES GET", ress);
            //setCartorios(ress.data)

            props.setOpenModal("")




        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                props.setOpenModal("")
                const headers = { Authorization: `Bearer ${user.token}` };

                var res = await axios.get(
                    `${getApiLeadUrl()}/nrn/processos`,
                    {
                        headers: headers,
                    }
                );

                // console.log(res.data);

                // setProcessos(res.data)



            } catch (err) {


                console.log(err);
            }
        };
        fetchData();
    }, []);



    return (
        <div>
            <div className="mt-2 ml-2 sm:mt-20 md:mt-20 md:ml-10 bg-white rounded-3xl dark:bg-main-dark-bg">
                <Header title="Processos" category="Aqui você encontra os processos cadastrados" />

            </div>

            <div class="m-2 md:m-10 p-2 bg-white  rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">

                {/* <TabelaSimples dados={pessoas} colunas={colunas} label={"Pessoas"} edit={true} /> */}

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">





                    <label for="table-search" class="sr-only">Busca</label>
                    <div class="flex justify-between m-4 relative">
                        <div>

                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>

                            <input type="text" id="table-search-users" class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 sm:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Busca por pessoa" />
                        </div>
                        <Tooltip
                            content="Cadastrar um novo processo"
                            placement="left"
                            style='dark'
                            className='w-max'
                        >
                            <div>
                                <button
                                    type="submit"
                                    onClick={handleAdd}
                                    className="mr-0 sm:mr-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"><RiFileAddFill /></button>
                            </div>
                        </Tooltip>
                    </div>




                </div>



                {/* <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4">
                                #
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Nome
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Tipo Pessoa
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Telefone
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Editar
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {pessoas.map((item) => {
                            return (

                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                                    <td class="w-4 p-4">
                                        {""}
                                    </td>
                                    <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <div class="pl-3">
                                            <div class="text-base font-semibold">{item.nome}</div>
                                            <div class="font-normal text-gray-500">{item.email}</div>
                                        </div>
                                    </th>
                                    <td class="px-6 py-4">
                                        {item.tipoDePessoa}
                                    </td>
                                    <td class="px-6 py-4">
                                        {item.telefone}
                                    </td>
                                    <td class="px-6 py-4">
                                        <div className='flex flex-row'>
                                            <a href="#" class="mr-4 text-xl font-medium text-blue-600 dark:text-blue-500 hover:underline"> <RiEdit2Fill /> </a>
                                            <a href="#" class="mr-4 text-xl font-medium text-red-600 dark:text-red-500 hover:underline"> <RiDeleteBin5Fill /> </a>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table> */}

                <TabelaSimples dados={arrayPro} colunas={colunas} edit handleEdit={handleEdit} handleDelete={handleOpenModal} />
            </div>

            {/* MODAL */}

            <Modal show={props.openModal != ""} size="md" popup onClose={() => props.setOpenModal("")}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Tem certeza que deseja apagar esse item?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => handleDelete(props.openModal)}>
                                Sim
                            </Button>
                            <Button color="gray" onClick={() => props.setOpenModal("")}>
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div >


    )
}
