import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input';
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Pessoa } from '../../../data/dummy'
import axios from "axios";
import { getApiLeadUrl } from "../../../apiUtils";
import { Radio } from 'flowbite-react';
import SelectCustom from '../../SelectCustom';
import { useStateContext, useAuthContext } from "../../../contexts/ContextProvider";

export default function DoProcessoForm({ setores_data, acoes_data, status_data, cartorios_data, id, tipoId }) {


    const { state } = useLocation()
    console.log("STATE DO PROCESSO", state);
    const [setores, setSetores] = useState(setores_data)
    const [setor, setSetor] = useState("")

    const [acoes, setAcoes] = useState(acoes_data)
    const [acao, setAcao] = useState("")

    const [statuss, setStatuss] = useState(status_data)
    const [status, setStatus] = useState("")

    const [cartorios, setCartorios] = useState(cartorios_data)
    const [cartorio, setCartorio] = useState("")


    //STATES FORMS
    const [dataCriacao, setDataCriacao] = useState(state?.dataCriacao ? state?.dataCriacao : "")
    const [numero, setNumero] = useState(state?.numero ? state?.numero : "")
    const [reu, setReu] = useState(state?.reu ? state?.reu : "")
    const [protocoloCorreios, setProtocoloCorreios] = useState(state?.protocoloCorreios ? state?.protocoloCorreios : "")
    const [rastreioCorreios, setRastreioCorreios] = useState(state?.rastreioCorreios ? state?.rastreioCorreios : "")
    const [valorDje, setValorDje] = useState(state?.valorDje ? state?.valorDje : 0)
    const [dataRemessa, setDataRemessa] = useState(state?.dataRemessa ? state?.dataRemessa : "")
    const [urlArquivosProcesso, setUrlArquivosProcesso] = useState(state?.urlArquivosProcesso ? state?.urlArquivosProcesso : "")
    const [usuarioCriador, setUsuarioCriador] = useState(state?.usuarioCriador ? state?.usuarioCriador : "")
    const [obs, setObs] = useState(state?.obs ? state?.obs : "")
    const [fisicoDigital, setFisicoDigital] = useState(state?.fisicoDigital ? state?.fisicoDigital : "F")
    const [idProcesso, setIdProcesso] = useState(state?.id ? parseInt(state?.id) : 0)


    const { user } = useAuthContext();


    const [ativo, setAtivo] = useState("Ativo")

    const { criacaoProcesso, setCriacaoProcesso, criado, setCriado, body, setBody } = useStateContext()



    console.log("BODY3", body);
    console.log("BODY4", body?.Numero);

    //VAR DOS PROCESSOS

    // const { id } = useParams()




    const navigate = useNavigate();
    const handleToggle = (e) => {
        if (e.target.checked) {
            setAtivo("Ativo")
        } else {
            setAtivo("Inativo")
        }
    }



    //FORM HOOK
    const { register, handleSubmit, reset, setValue, watch } = useForm({
        defaultValues: state
    });
    const registerWithMask = useHookFormMask(register);
    const onSubmit = async (data, e) => {

        e.preventDefault()
        console.log("click");
        console.log("antes de set objeto TIPOID", tipoId)

        setCriacaoProcesso(
            {
                id: 1,
                tipo: parseInt(tipoId)
            }
        )
        setCriado(true)

        console.log("handleClickCRIACAO", criacaoProcesso);
        console.log("handleClickCRIADO", criado);
        //return

        try {
            const headers = {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            };

            let body = {};
            let url_post_processos = "";


            if (idProcesso > 0) {
                //bater na rota do processo completo
                url_post_processos = "/nrn/processos";
                body = {
                    "ID": idProcesso,
                    "Numero": "12",
                    "TipoProcesso": "1",
                    "FisicoDigital": "F",
                    "IdPessoaAutor": 4,
                    "IdPessoaAdvogado": 3,
                    "IdPessoaLicitante": 6,
                    "IdSetor": 5,
                    "Reu": "VICTOR O DESTINO DO REU",
                    "IdAcao": 3,
                    "IdStatus": 2,
                    "IdCartorio": 5,
                    "ProtocoloCorreios": "22323232",
                    "RastreioCorreios": "RT4334BR",
                    "ValorDje": 0.00,
                    "DataRemessa": "2023-09-01",
                    "UrlArquivosProcesso": "www.teste.com.br",
                    "Obs": "obs gerado do processo",
                    "ItensOrcamento": []
                    //{
                    //  "IdPessoaVeiculo":3,
                    //  "NomeContato":"Fulano contato do veiculo",
                    //  "ValorTotalOrcamento":0.00,
                    //  "QtdPublicacoes":4,
                    //  "Desconto":0.00
                    //}
                    //]

                }
            }
            else {
                //rota do draft (criar novo)
                url_post_processos = "/nrn/processos/draft";

                body = {
                    "DataCriacao": "2023-01-25", //data?.dataCriacao,
                    "Numero": data?.numero,
                    "TipoProcesso": String(tipoId),
                    "FisicoDigital": String(fisicoDigital),
                    "IdSetor": setor?.value,
                    "IdAcao": 3,
                    "IdStatus": status?.value,
                    "IdCartorio": cartorio?.value,
                    "Reu": data?.reu,
                    "ProtocoloCorreios": data?.protocoloCorreios,
                    "RastreioCorreios": data?.rastreioCorreios,
                    "ValorDje": 0, //data?.valorDje,
                    "DataRemessa": "2023-02-01", //data?.dataRemessa,
                    "UrlArquivosProcesso": data?.urlArquivosProcesso,
                    "Obs": data?.obs
                };
            }

            console.log("BODY2", body);
            //return;

            const res = await axios.post(`${getApiLeadUrl()}${url_post_processos}`, body,
                {
                    headers: headers,
                });

            if (res.status == 200) {
                //retorno ok, validando id gerado
                if (res.data.includes("sucesso")) {
                    //eh porque retorno o id
                    setIdProcesso(parseInt(res.data.split('|')[0]));
                    console.log("ID PROCESSO GERADO --->>> ", parseInt(res.data.split('|')[0]));
                }
            }
            else {
                //falhou
            }



        } catch (error) {
            console.log(error);
        }

    }




    //setor select
    const setoresOptions =

        setores?.map((item) => {
            return (

                { value: item.id, label: item.descricao }

            )
        })

    const handleSetor = (childData) => {
        setSetor(childData)
        setBody(body => {
            return {
                ...body, idSetor: childData.value
            }
        })
    }

    //acao select
    const acoesOptions =

        acoes?.map((item) => {
            return (

                { value: item.id, label: item.descricao }

            )
        })

    const handleAcao = (childData) => {

        setAcao(childData)
        setBody(body => {
            return {
                ...body, idAcao: childData.value
            }
        })



    }

    //status select
    const statusOptions =

        statuss?.map((item) => {
            return (

                { value: item.id, label: item.descricao }

            )
        })

    const handleStatus = (childData) => {
        setStatus(childData)

        setBody(body => {
            return {
                ...body, idStatus: childData.value
            }
        })



    }
    //cartorio select
    const cartoriosOptions =

        cartorios?.map((item) => {
            return (

                { value: item.id, label: item.nome }

            )
        })

    const handleCartorio = (childData) => {
        setCartorio(childData)
        setBody(body => {
            return {
                ...body, IdCartorio: childData.value
            }
        })




    }

    useEffect(() => {
        const setorDefaultValue = () => {
            if (state) {
                setores_data.map((item) => {
                    if (item.id == state?.idSetor) {
                        setSetor(
                            { value: item.id, label: item.descricao }
                        )
                    }
                })
            }
        }
        setorDefaultValue()

        const acaoDefaultValue = () => {
            if (state) {
                acoes_data.map((item) => {
                    if (item.id == state?.idAcao) {
                        setAcao(
                            { value: item.id, label: item.descricao }
                        )
                    }
                })
            }
        }
        acaoDefaultValue()

        const statusDefaultValue = () => {
            if (state) {
                status_data.map((item) => {
                    if (item.id == state?.idStatus) {
                        setStatus(
                            { value: item.id, label: item.descricao }
                        )
                    }
                })
            }
        }
        statusDefaultValue()

        const cartoriosDefaultValue = () => {
            if (state) {
                cartorios_data.map((item) => {
                    if (item.id == state?.idCartorio) {
                        setCartorio(
                            { value: item.id, label: item.nome }
                        )
                    }
                })
            }
        }
        cartoriosDefaultValue()




    }, [])



    //tipo de processo
    // const tipoProcessoOptions = 

    watch('dataCriacao')


    const handleClick = (e) => {
        e.preventDefault()
        console.log("click");
        console.log("antes de set objeto TIPOID", tipoId)

        setCriacaoProcesso(
            {
                id: 1,
                tipo: parseInt(tipoId)
            }
        )
        setCriado(true)

        console.log("handleClickCRIACAO", criacaoProcesso);
        console.log("handleClickCRIADO", criado);
    }

    return (
        <>
            <h5 class="mb-8 mt-4 text-xl font-bold leading-none text-gray-900 dark:text-gray-200">Dados do Processo</h5>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 ">

                    <div className='col-span-2'>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data Inclusão</label>
                        <input
                            type="text"

                            value={body?.dataCriacao}

                            onChange={(e) => setBody(body => {
                                return {

                                    ...body, dataCriacao: e.target.value
                                }
                            })}
                            // {...registerWithMask("dataCriacao", "datetime", {
                            //     inputFormat: "dd/mm/yyyy",
                            // })}

                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className='col-span-5'>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Processo</label>
                        <input
                            type="text"
                            // {...register("numero")}
                            value={body?.numero}
                            onChange={(e) => setBody(body => {
                                return {
                                    ...body,
                                    numero: e.target.value
                                }
                            })}

                            class="block w-full p-2  text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className='col-span-3'>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Setores</label>
                        {/* <select

                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {setores_data?.setores_data.map((item, index) => {
                                return (
                                    <option key={item.id} value="item">{item.descricao}</option>

                                )
                            })
                            }


                        </select> */}

                        <SelectCustom options={setoresOptions} setValueFromChild={handleSetor} isMulti={false} defaultValue={setor} placeholder={"Selecione"} closeMenuOnSelect={true} />
                    </div>

                    <div className='flex items-center mt-6'>

                        <input
                            type="radio"
                            name="radio"
                            checked={body?.fisicoDigital == "F" ? true : false}
                            value={body?.fisicoDigital}
                            onChange={(e) => setBody(body => {
                                return {

                                    ...body, fisicoDigital: "F"
                                }
                            })}
                            class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                        <label class="relative inline-flex items-center justify-center cursor-pointer mr-6">

                            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Físico</span>
                        </label>


                        <input
                            type="radio"
                            name="radio"
                            checked={body?.fisicoDigital == "D" ? true : false}
                            value={body?.fisicoDigital}
                            onChange={(e) => setBody(body => {
                                return {

                                    ...body, fisicoDigital: "D"
                                }
                            })}
                            class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" />
                        <label class="relative inline-flex items-center justify-center cursor-pointer">

                            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Digital</span>
                        </label>

                    </div>

                    {/* TOGGLE */}
                    {/* <div className='flex items-center mt-6'>
                        <label class="relative inline-flex items-center justify-center cursor-pointer">
                            <input type="checkbox" class="sr-only peer" defaultValue={ativo} onChange={handleToggle} />
                            <div class="items-center w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                            </div>
                            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{ativo}</span>
                        </label>
                    </div> */}


                </div>



                <div class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 mt-6">
                    <div className='col-span-5'>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Réu</label>
                        <input
                            type="text"
                            value={body?.reu}
                            onChange={(e) => setBody(body => {
                                return {

                                    ...body, reu: e.target.value
                                }
                            })}
                            // {...register("reu")}
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>





                    <div className='col-span-4'>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ação</label>
                        {/* <input type="text" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}

                        <SelectCustom options={acoesOptions} setValueFromChild={handleAcao} isMulti={false} defaultValue={acao} placeholder={"Selecione"} closeMenuOnSelect={true} />
                    </div>
                    <div className='col-span-3'>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                        {/* <input type="text" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}

                        <SelectCustom options={statusOptions} setValueFromChild={handleStatus} isMulti={false} defaultValue={status} placeholder={"Selecione"} closeMenuOnSelect={true} />
                    </div>




                </div>




                <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 mt-6">
                    <div className='col-span-4'>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cartório</label>
                        {/* <input
                            type="text"


                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}


                        <SelectCustom options={cartoriosOptions} setValueFromChild={handleCartorio} isMulti={false} defaultValue={cartorio} placeholder={"Selecione"} closeMenuOnSelect={true} />

                    </div>


                    <div className="col-span-3">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Protocolo Correios</label>
                        <input
                            type="text"
                            value={body?.protocoloCorreios}
                            onChange={(e) => setBody(body => {
                                return {

                                    ...body, protocoloCorreios: e.target.value
                                }
                            })}
                            // {...register("protocoloCorreios")}
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="col-span-3">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nº de Rastreio</label>
                        <input
                            type="text"
                            value={body?.rastreioCorreios}
                            onChange={(e) => setBody(body => {
                                return {

                                    ...body, rastreioCorreios: e.target.value
                                }
                            })}
                            // {...register("rastreioCorreios")}
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="col-span-2">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor DJE</label>
                        <input
                            type="numeric"
                            value={body?.valorDje}
                            onChange={(e) => setBody(body => {
                                return {

                                    ...body, valorDje: e.target.value
                                }
                            })}
                            // {...register("valorDje")}
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>



                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 mt-6">
                    <div className="col-span-2">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data de remessa</label>
                        <input
                            type="text"
                            valor={body?.dataRemessa}
                            onChange={(e) => setBody(body => {
                                return {

                                    ...body, dataRemessa: e.target.value
                                }
                            })}
                            // {...registerWithMask("dataRemessa", "datetime", {
                            //     inputFormat: "dd-mm-yyyy",
                            // })}
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="col-span-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Endereço dos arquivos do processo</label>
                        <input
                            type="text"
                            value={body?.urlArquivosProcesso}
                            onChange={(e) => setBody(body => {
                                return {

                                    ...body, urlArquivosProcesso: e.target.value
                                }
                            })}
                            // {...register("urlArquivosProcesso")}
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    {/* <div className='col-span-3'>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Funcionário</label>
                        <input
                            type="text"
                            value={state?.usuarioCriador ? usuarioCriador : user.username}
                            readOnly
                            onChange={(e) => setBody(body => {
                                return {

                                    ...body, UrlArquivosProcesso: e.target.value
                                }
                            })}
                            // {...register("usuarioCriador")}
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div> */}

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 mt-6">
                    <div className="col-span-12">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Observações</label>
                        <textarea
                            rows={4}
                            placeholder='Escreva aqui sua observação...'
                            value={body?.obs}
                            onChange={(e) => setBody(body => {
                                return {

                                    ...body, obs: e.target.value
                                }
                            })}
                            // {...register("obs")}
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>



                </div>



                <div className="mt-12">

                    <button
                        type="submit"

                        class="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{idProcesso > 0 ? 'Atualizar' : 'Cadastrar'}</button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        class="text-white bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800">Cancelar</button>
                </div>
            </form >
        </>
    )
}
