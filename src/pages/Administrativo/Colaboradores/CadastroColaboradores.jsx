import React, { forwardRef, useState } from 'react'
import { Header } from '../../../components'
import { IMaskInput, IMaskMixin } from 'react-imask'
import axios from "axios";
import { useNavigate, useLocation } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input';
import { useAuthContext, useStateContext } from '../../../contexts/ContextProvider';
import Loading from "../../../components/Loading"
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { getApiLeadUrl } from "../../../apiUtils";

export default function CadastroColaboradores() {
    const { state } = useLocation()

    //const [pessoa, setPessoa] = useState()


    const [colaborador, setColaborador] = useState([state]);

    const { currentColor, loading, setLoading } = useStateContext();
    const { user } = useAuthContext();

    const [idColab, setIdColab] = useState(state?.id ? parseInt(state?.id) : 0)
    console.log(idColab);

    // const [nome, setNome] = useState(state?.nome ? state?.nome : "")
    const [sobreNome, setSobreNome] = useState(state?.sobrenome ? state?.sobrenome : "")
    const [cep, setCep] = useState(state?.cep ? state?.cep : "")
    const [endereco, setEndereco] = useState(state?.endereco ? state?.endereco : "")
    const [rg, setRg] = useState(state?.rg ? state?.rg : "")
    const [pis, setPis] = useState(state?.pis ? state?.pis : "")
    const [sexo, setSexo] = useState(state?.sexo ? state?.sexo : "")
    const [cargo, setCargo] = useState(state?.cargo ? state?.cargo : "")
    const [funcao, setFuncao] = useState(state?.funcao ? state?.funcao : "")
    const [departamento, setDepartamento] = useState(state?.departamento ? state?.departamento : "")
    const [idSys, setIdSys] = useState(state?.idSys ? state?.idSys : "")
    const [telefone, setTelefone] = useState(state?.telefone ? state?.telefone : "")
    const [celular, setCelular] = useState(state?.celular ? state?.celular : "")
    const [dataNascimento, setDataNascimento] = useState(state?.dataNascimento ? state?.dataNascimento : "")
    const [bairro, setBairro] = useState(state?.bairro ? state?.bairro : "")
    const [cidade, setCidade] = useState(state?.cidade ? state?.cidade : "")
    const [estado, setEstado] = useState(state?.estado ? state?.estado : "")
    const [num, setNum] = useState(state?.num ? state?.num : "")
    const [complemento, setComplemento] = useState(state?.complemento ? state?.complemento : "")
    const [error, setError] = useState(state?.tratamento ? state?.tratamento : "")
    const [cpfCnpj, setCpfCnpj] = useState(state?.cpfCnpj ? state?.cpfCnpj : "")
    //const [cpf, setCpf] = useState('')
    //const [cnpj, setCnpj] = useState('')

    console.log(colaborador);
    const [ativoSNN, setAtivoSNN] = useState(state?.ativoSN == 1 ? true : false);
    console.log(ativoSNN);
    console.log(state?.ativoSN);

    //const { id } = useParams()

    const navigate = useNavigate();

    //FORM


    const { register, handleSubmit, reset, formState: { isDirty, dirtyFields } } = useForm({
        defaultValues: state ? state : ""
    });



    console.log("DIRTY", dirtyFields);
    console.log("ISDIRTY", isDirty);

    const registerWithMask = useHookFormMask(register);
    const onSubmit = async (data) => {

        console.log(data);

        try {
            const headers = {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            };

            const body = {
                "id": idColab,
                "funcional": data?.funcional,
                "nome": data?.nome,
                "sobrenome": data?.sobrenome,
                "telefone": data?.telefone,
                "celular": data?.celular,
                "dataNascimento": data?.dataNascimento,
                "email": data?.email,
                "cpf": data?.cpf,
                "rg": data?.rg,
                "pis": data?.pis,
                "sexo": data?.sexo,
                "cargo": data?.cargo,
                "funcao": data?.funcao,
                "departamento": data?.departamento,
                "ativoSN": ativoSNN == true ? 1 : 0,
                "usuarioLogin": data?.usuarioLogin,
                "dataAdmissao": data?.dataAdmissao
                // "dataDemissao": data?.dataDemissao,
                // "dataCadastro": dataCadastro,
                // "usuarioInclusao": usuarioInclusao


            };






            console.log("BODY", body);


            const res = await axios.post(`${getApiLeadUrl()}/nrn/colaboradores/add`, body,
                {
                    headers: headers,
                });

            navigate('/manutencao/colaboradores')

            console.log("RES", res);
        } catch (error) {
            console.log(error);
        }



    }







    const handleToggle = (e) => {
        if (e.target.checked) {
            setAtivoSNN(true)
        } else {
            setAtivoSNN(false)
        }
    }
    console.log("AHHHHHHHHHHHHHHHHH", dirtyFields.lenght)





    const handleOut = () => {
        console.log("esse", dirtyFields);

        if (typeof dirtyFields === 'object') {
            console.log("dentro do if", dirtyFields);
            // navigate(-1)
        } else {
            alert("NAO SAIAAAAAA")
        }
    }


    return (
        <>
            <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:bg-main-dark-bg">
                <Header title={idColab ? `Editando dados de ${state?.nome}` : "Cadastro de colaboradores"} category={"Cadastre aqui um colaborador da empresa."} />

                {loading && (
                    <Loading />
                )}
                <h5 className="mb-8 text-xl font-bold leading-none text-gray-900 dark:text-gray-200">Dados Pessoais</h5>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 ">

                        <div className='col-span-4'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                            <input
                                type="text"

                                {...register("nome")}


                                // onChange={e => setNome(e.target.value)}
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />


                        </div>
                        <div className='col-span-4'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sobrenome</label>
                            <input
                                type="text"
                                {...register("sobrenome")}
                                required
                                // onChange={e => setSobreNome(e.target.value)}
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className='col-span-2'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
                            <input
                                type="text"

                                {...registerWithMask("telefone", "(99) 99999-9999", {
                                })}

                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                            </input>



                        </div>

                        <div className='col-span-2'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Celular</label>
                            <input
                                type="text"

                                {...registerWithMask("celular", "(99) 99999-9999", {
                                })}

                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                            </input>



                        </div>
                        <div className='col-span-2'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data Nascimento</label>
                            <input
                                type="text"
                                required

                                {...registerWithMask("dataNascimento", "datetime", {
                                    inputFormat: "dd/mm/yyyy",
                                })}

                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                            {/* <IMaskInput
                                type="text"
                                mask="yyyy-MM-dd"
                                // {...register("telefone")}
                                placeholder='Data de nascimento'
                                // value={dataNascimento}
                                // onChange={e => setDataNascimento(e.target.value)}
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}

                        </div>

                    </div>



                    <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 mt-6">

                        <div className='col-span-4'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail</label>
                            <input
                                type="text"

                                {...registerWithMask("email", "email", {
                                })}
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        <div className='col-span-2'>


                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF</label>
                            <input
                                type="text"

                                {...registerWithMask("cpf", "cpf", {
                                })}
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>




                        <div className='col-span-2'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IE/RG</label>

                            <input
                                {...register("rg")}
                                // value={rg}
                                // onChange={e => setRg(e.target.value)}
                                type="text"
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>



                        <div className='col-span-2'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">PIS</label>
                            <input
                                {...register("pis")}
                                // value={pis}
                                // onChange={e => setPis(e.target.value)}
                                type="text"
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className='col-span-2'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sexo</label>
                            <select
                                {...register("sexo")}
                                required
                                // value={sexo}
                                // onChange={e => setSexo(e.target.value)}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>

                            </select>
                        </div>



                    </div>


                    <h5 className="mb-8 mt-8 text-xl font-bold leading-none text-gray-900 dark:text-gray-200">Dados Funcionais</h5>

                    <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 mt-6">
                        <div className='col-span-3'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cargo</label>
                            <input

                                {...register("cargo")}
                                required
                                // value={cargo}
                                // onChange={e => setCargo(e.target.value)}
                                type="text"
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className='col-span-3'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Função</label>
                            <input
                                {...register("funcao")}
                                required
                                // value={funcao}
                                // onChange={e => setFuncao(e.target.value)}
                                type="text"
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className='col-span-3'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Departamento</label>
                            <input
                                {...register("departamento")}
                                // value={departamento}
                                // onChange={e => setDepartamento(e.target.value)}
                                type="text"
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        {/* <div className='flex items-center mt-6'>
                            <label className="relative inline-flex items-center justify-center cursor-pointer">
                                <input
                                    // {...register("ativoSN")}
                                    value={ativoSNN}
                                    type="checkbox" className="sr-only peer"
                                    checked={ativoSNN}
                                    onChange={handleToggle} />
                                <div className="items-center w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                                </div>
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{ativoSNN == true ? "Ativo" : "Inativo"}</span>
                            </label>
                        </div> */}



                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 mt-6">
                        <div className="col-span-3">
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Login no sistema</label>
                            <input
                                type="text"
                                {...register("usuarioLogin")}
                                // value={idSys}
                                // onChange={e => setIdSys(e.target.value)}
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className='col-span-2'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Admissão</label>
                            <input
                                type="text"
                                required
                                {...registerWithMask("dataAdmissao", "datetime", {
                                    inputFormat: "dd/mm/yyyy",
                                })}
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className='col-span-2'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Demissão</label>
                            <input
                                type="text"
                                {...registerWithMask("demissao", "datetime", {
                                    inputFormat: "dd-mm-yyyy",
                                })}
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>




                    </div>



                    <div className="mt-12">

                        <button
                            type="submit"
                            className="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{state?.id ? "Editar" : "Cadastrar"}</button>
                        <button
                            type="button"
                            onClick={handleOut}
                            className="text-white bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800">Cancelar</button>
                    </div>
                </form >


            </div >

        </>
    )
}
