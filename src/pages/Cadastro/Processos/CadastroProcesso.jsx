import React, { useState, useEffect } from 'react'

import { Header } from '../../../components'
import DoProcessoForm from '../../../components/Forms/Processo/DoProcessoForm'

import { IMaskInput, IMaskMixin } from 'react-imask'
import { useLocation, useNavigate } from 'react-router-dom'


import { Tabs } from 'flowbite-react';
import { HiAdjustments, HiClipboardList, HiUserCircle } from 'react-icons/hi';
import { FaFileAlt } from 'react-icons/fa';
import { BsPersonVcardFill } from "react-icons/bs";
import { BiTask } from "react-icons/bi";


import { MdDashboard } from 'react-icons/md';
import Autor from '../../../components/Forms/Processo/Autor'
import Advogado from '../../../components/Forms/Processo/Advogado'
import Acompanhamento from '../../../components/Forms/Processo/Acompanhamento'
import { useParams } from 'react-router-dom'
import SelectCustom from '../../../components/SelectCustom';
import './CadastroProcesso.css'
import { ImHammer2 } from "react-icons/im";
import { BiNews } from "react-icons/bi";
import Licitante from '../../../components/Forms/Processo/Licitante'
import Orcamento from '../../../components/Forms/Processo/Orcamento'
import { useStateContext } from "../../../contexts/ContextProvider";



export default function CadastroProcesso({ processos_setores, processos_acoes, processos_status, cartorios_data, tipos_processo, pessoas_data }) {

    const { state } = useLocation()
    const [setores, setSetores] = useState(processos_setores)
    const [acoes, setAcoes] = useState(processos_acoes)
    const [status, setStatus] = useState(processos_status)
    const [cartorios, setCartorios] = useState(cartorios_data)
    const [tiposProcesso, setTiposProcesso] = useState(tipos_processo)
    const [pessoas, setPessoas] = useState(pessoas_data)
    const [values, setValues] = useState([])
    const [tipoId, setTipoId] = useState(state?.tipoProcesso ? state?.tipoProcesso : "")




    const { id } = useParams()

    const navigate = useNavigate()

    const { criacaoProcesso, setCriacaoProcesso, criado, setCriado, body, setBody } = useStateContext()
    // console.log("CONTEXT", criacaoProcesso);
    // console.log("CRIADO", criado);

    console.log("body", body);





    //tema da tabs
    const theme = {
        tablist: {
            tabitem: {
                base: "flex items-center justify-center p-4 rounded-t-lg text-sm font-medium first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500"
            }
        }
    }

    const tipoOptions = [
        tiposProcesso?.map((item) => {
            return (

                { value: item.id, label: item.tipo }

            )
        })
    ]

    useEffect(() => {
        setTiposProcesso(tipos_processo)
        const defaultValue = []
        for (var i = 0; i < tiposProcesso?.length; i++) {
            if (tiposProcesso[i]?.id) {

                defaultValue.push(
                    { value: tiposProcesso[i]?.id, label: tiposProcesso[i]?.tipo }
                )
            }
        }

        setValues(defaultValue)

        if (state) {
            setBody(state)
        }



        // if (!state?.id) {
        //     setCriacaoProcesso("")
        // }
        // console.log("useeffect CRIACAO PROCESSO", criacaoProcesso);

    }, [])

    useEffect(() => {
        if (tipoId) {
            setBody(body => {
                return {
                    ...body, TipoProcesso: tipoId
                }
            })


        }




    }, [tipoId])


    // const handleTipoId = (e) => {
    //     console.log(e);
    //     setTipoId(e)
    //     console.log("tipoId", tipoId);
    //     console.log("state?.tipoProcesso", state?.tipoProcesso);
    // }

    // console.log("tipoId", tipoId);
    // console.log("state?.tipoProcesso", state?.tipoProcesso);


    const handleClick = (e) => {
        e.preventDefault();
        console.log("CADASTRAR - BODY", body);

    }



    return (
        <>
            <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:bg-main-dark-bg">

                {/* TÍTULO */}
                <Header title={state?.id ? `Editando processo ${state?.numero}` : "Cadastro de Processos"} category={state?.id ? "" : "Cadastre aqui um processo."} />
                {/* <SelectCustom options={values} defaultValue={values} isMulti={false} placeholder={"Selecione"} closeMenuOnSelect={true} /> */}
                <p className='text-gray-400 text-center'>{(state == null && criado == false) && "Qual tipo de processo quer cadastrar?"}</p>

                <div class="flex items-center justify-center m-4 mb-12">
                    <div className="grid grid-cols-2 gap-2 max-w-screen-sm">

                        {(state?.tipoProcesso == 1 || !criado || criacaoProcesso.tipo == 1) &&

                            <div className="flex items-center justify-center">

                                <input
                                    disabled={(state?.id) && true}
                                    defaultChecked={(state?.tipoProcesso == 1 || tipoId == 1) && true}
                                    value={1}

                                    type="radio"
                                    name="radio"
                                    onChange={(e) => setTipoId(e.target.value)}
                                    className="hidden" id="radio_1"
                                />
                                <label className="flex flex-col p-6 px-8 border-2 border-gray-600 cursor-pointer" for="radio_1">

                                    <span className={(state?.tipoProcesso == 1 || tipoId == 1) ? "mb-4 text-xs font-semibold uppercase text-black dark:text-cyan-600" : "mb-4 text-xs font-semibold uppercase text-black dark:text-gray-600"}>Leilão</span>
                                    <ImHammer2 className={(state?.tipoProcesso == 1 || tipoId == 1) ? "text-black dark:text-cyan-600" : "text-black dark:text-gray-600"} size={32} />
                                </label>

                            </div>

                        }

                        {(state?.tipoProcesso == 2 || !criado || criacaoProcesso.tipo == 2) &&

                            <div className="flex items-center justify-center mr-4">

                                <input
                                    disabled={(state?.id) && true}
                                    className="hidden"
                                    onChange={(e) => setTipoId(e.target.value)}
                                    id="radio_2"
                                    value={2}

                                    defaultChecked={(state?.tipoProcesso == 2 || tipoId == 2) && true}
                                    type="radio"
                                    name="radio"
                                />
                                <label className="flex flex-col p-6 px-8 border-2 border-gray-600 cursor-pointer" for="radio_2">

                                    <span className={(state?.tipoProcesso == 2 || tipoId == 2) ? "mb-4 text-xs font-semibold uppercase text-black dark:text-cyan-600" : "mb-4 text-xs font-semibold uppercase text-black dark:text-gray-600"}>Edital</span>
                                    <BiNews className={(state?.tipoProcesso == 2 || tipoId == 2) ? "text-black dark:text-cyan-600" : "text-black dark:text-gray-600"} size={32} />

                                </label>

                            </div>
                        }


                    </div>
                </div>






                {(tipoId == 1 && criacaoProcesso?.id == 0) &&
                    <Tabs.Group
                        aria-label="Tabs do Processo"
                        style='underline'
                        theme={theme}


                    >
                        <Tabs.Item
                            active
                            icon={FaFileAlt}
                            title="Do Processo"




                        >
                            <DoProcessoForm
                                id={id}
                                setores_data={setores}
                                acoes_data={acoes}
                                status_data={status}
                                cartorios_data={cartorios}
                                state={state}
                                tipoId={tipoId}
                            />
                        </Tabs.Item>

                    </Tabs.Group>

                }


                {(tipoId == 1 && criacaoProcesso?.id == 1) &&

                    <Tabs.Group
                        aria-label="Tabs do Processo"
                        style='underline'
                        theme={theme}


                    >
                        <Tabs.Item
                            active
                            icon={FaFileAlt}
                            title="Do Processo"




                        >
                            <DoProcessoForm
                                id={id}
                                setores_data={setores}
                                acoes_data={acoes}
                                status_data={status}
                                cartorios_data={cartorios}
                                state={state}
                                tipoId={tipoId}
                            />
                        </Tabs.Item>




                        <Tabs.Item
                            icon={HiUserCircle}
                            title="Autor"

                        >
                            <Autor
                                state={state}
                                pessoas_data={pessoas}
                            />
                        </Tabs.Item>





                        <Tabs.Item
                            icon={HiUserCircle}
                            title="Licitante"
                        >
                            <Licitante
                                state={state}
                                pessoas_data={pessoas}
                            />
                        </Tabs.Item>
                        <Tabs.Item
                            icon={BsPersonVcardFill}
                            title="Advogado"
                        >
                            <Advogado
                                state={state}
                                pessoas_data={pessoas}
                            />
                        </Tabs.Item>
                        <Tabs.Item
                            icon={BiTask}
                            title="Andamentos"
                        >
                            <Acompanhamento />
                        </Tabs.Item>
                        <Tabs.Item
                            icon={BiTask}
                            title="Orçamento"
                        >
                            <Orcamento
                                pessoas_data={pessoas}
                            />
                        </Tabs.Item>

                        <Tabs.Item
                            icon={BiTask}
                            title="Faturamento"
                        >
                            <p>
                                Orçamento
                            </p>
                        </Tabs.Item>
                        <Tabs.Item
                            icon={BiTask}
                            title="Publicações"
                        >
                            <p>
                                Orçamento
                            </p>
                        </Tabs.Item>
                        <Tabs.Item
                            icon={BiTask}
                            title="Petições"
                        >
                            <p>
                                Orçamento
                            </p>
                        </Tabs.Item>
                        <Tabs.Item
                            icon={BiTask}
                            title="Edital Finalizado"
                        >
                            <p>
                                Orçamento
                            </p>
                        </Tabs.Item>

                    </Tabs.Group>
                }

                {(tipoId == 2 && criacaoProcesso?.id == 0) &&
                    <Tabs.Group
                        aria-label="Tabs do Processo"
                        style='underline'
                        theme={theme}


                    >
                        <Tabs.Item
                            active
                            icon={FaFileAlt}
                            title="Do Processo"

                        >
                            <DoProcessoForm
                                id={id}
                                setores_data={setores}
                                acoes_data={acoes}
                                status_data={status}
                                cartorios_data={cartorios}
                                state={state}
                            />
                        </Tabs.Item>

                    </Tabs.Group>

                }

                {(tipoId == 2 && criacaoProcesso?.id == 1) &&
                    <Tabs.Group
                        aria-label="Tabs do Processo"
                        style='underline'
                        theme={theme}


                    >
                        <Tabs.Item
                            active
                            icon={FaFileAlt}
                            title="Do Processo"




                        >
                            <DoProcessoForm
                                id={id}
                                setores_data={setores}
                                acoes_data={acoes}
                                status_data={status}
                                cartorios_data={cartorios}
                            />
                        </Tabs.Item>
                        <Tabs.Item
                            icon={HiUserCircle}
                            title="Autor"
                        >
                            <Autor
                                state={state}
                                pessoas_data={pessoas}
                            />
                        </Tabs.Item>
                        <Tabs.Item
                            icon={BsPersonVcardFill}
                            title="Advogado"
                        >
                            <Advogado
                                state={state}
                                pessoas_data={pessoas} />
                        </Tabs.Item>
                        <Tabs.Item
                            icon={BiTask}
                            title="Andamentos"
                        >
                            <Acompanhamento />
                        </Tabs.Item>


                        <Tabs.Item
                            icon={BiTask}
                            title="Faturamento"
                        >
                            <p>
                                Orçamento
                            </p>
                        </Tabs.Item>
                        <Tabs.Item
                            icon={BiTask}
                            title="Publicações"
                        >
                            <p>
                                Orçamento
                            </p>
                        </Tabs.Item>
                        <Tabs.Item
                            icon={BiTask}
                            title="Petições"
                        >
                            <p>
                                Orçamento
                            </p>
                        </Tabs.Item>
                        <Tabs.Item
                            icon={BiTask}
                            title="Edital Finalizado"
                        >
                            <p>
                                Orçamento
                            </p>
                        </Tabs.Item>
                    </Tabs.Group>
                }


                <div className="mt-12">

                    <button
                        type="button"
                        onClick={handleClick}
                        class="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cadastrar</button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        class="text-white bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800">Cancelar</button>
                </div>


            </div >



        </>
    )
}
