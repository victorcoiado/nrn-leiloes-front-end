import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { GoLaw } from "react-icons/go";
import { FaCoins } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiTimerLine } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import { FaUserTie, FaUser } from "react-icons/fa";
import axios from "axios";
import { Header } from '../../../components';
import { useAuthContext, useStateContext } from "../../../contexts/ContextProvider";
import { getApiLeadUrl } from "../../../apiUtils";
import profile_Photo from '../../../assets/images/dog_profile.jpg'
import { Tooltip } from 'flowbite-react';
import { set } from 'react-hook-form';

export default function ProfileColaboradores() {
    const { state } = useLocation()
    const [colaborador, setColaborador] = useState(state);
    console.log(colaborador);


    const navigate = useNavigate()
    const { user } = useAuthContext();

    // useEffect(() => {

    //     try {
    //         function dadosColaborador() {
    //             Pessoa.filter((item) => {
    //                 if (item.id == id) {
    //                     setColaborador(item)
    //                 }
    //             })
    //         }
    //         dadosColaborador()

    //     } catch (error) {
    //         console.log(error);
    //     }


    // }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = { Authorization: `Bearer ${user.token}` };

                var res = await axios.get(
                    `${getApiLeadUrl()}/nrn/colaboradores`,
                    {
                        headers: headers,
                    }
                );


                // var resFiltrada = res.data.filter((item) => {
                //     if (item.id == id) {

                //         setColaborador(item)
                //         // reset(item)
                //     }
                // })
                // console.log("resFiltrada", resFiltrada);
                // console.log(colaborador);

                console.log("PacoesEffect", res.data);
            } catch (err) {


                console.log(err);
            }
        };
        fetchData();
    }, []);

    const handleEdit = () => navigate(`/manutencao/cadastro_colaboradores/`, { state: state })


    return (
        <>



            <div className="mt-2 ml-2 md:mt-10 md:ml-10 bg-white rounded-3xl dark:bg-main-dark-bg">
                <Header
                    title="Perfil do Colaborador"
                    category=""
                />
            </div>

            {/* CARDS */}
            {/* <div className="mb-12 ml-10 mr-10 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">



                <Card icon={<GoLaw size={27} />} title={"Processos"} subtitle={"Em andamento"} num={8} cor={"azul"} />
                <Card icon={<BsFillPersonFill size={27} />} title={"Clientes"} subtitle={"Ativo"} num={12} />
                <Card icon={<FaCoins size={27} />} title={"Financeiro"} cor={"verde"} />



            </div> */}

            <div className="ml-10 mb-10 mr-10 mt-20 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">

                <div className="flex justify-between bg-clip-border mx-4 rounded-full overflow-hidden  shadow-lg absolute -mt-12 h-28 w-28 place-items-center dark:shadow-none">
                    {/* <BsFillPersonFill size={30} /> */}

                    <img className="-mt-4" src={profile_Photo}></img>



                </div>


                <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">

                    <div className="flex items-center justify-end mb-4">

                        <Tooltip
                            content="Editar informações do colaborador"
                            style='dark'
                        >

                            <button
                                type="button"

                                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 hover:text-blue-800 dark:hover:text-blue-300" >
                                <RiEdit2Fill onClick={handleEdit} size={25} />
                            </button>
                        </Tooltip>
                        <div id="tooltip-default" role="tooltip" class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            Tooltip content
                            <div class="tooltip-arrow" data-popper-arrow></div>
                        </div>

                    </div>




                    <div className="flex flex-col mt-12">
                        <h5 className="text-3xl mb-2 font-bold leading-none text-gray-900 dark:text-gray-50">{colaborador?.nome}</h5>
                        <h3 className="text-xl leading-none text-gray-900 dark:text-gray-200">{colaborador?.sobrenome}</h3>


                    </div>
                    <div className="flex flex-col mb-8 mt-8">
                        <div className="items-center mb-1 text-gray-900 truncate dark:text-gray-200">
                            {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" /> */}
                            Cargo: <strong>{colaborador?.cargo}</strong>

                        </div>
                        <div className="items-center mb-1 text-gray-900 truncate dark:text-gray-200">
                            {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" /> */}
                            Função: <strong>{colaborador?.funcao}</strong>

                        </div>
                        <div className="items-center mb-1 text-gray-900 truncate dark:text-gray-200">
                            {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" /> */}
                            Departamento: <strong>{colaborador?.departamento}</strong>

                        </div>
                        <div className="items-center mt-8 text-gray-900 truncate dark:text-gray-100">
                            {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" /> */}
                            Status:
                            <button type="button" className={colaborador?.ativoSN ? "text-white  bg-green-700 font-medium rounded-lg text-sm px-3 py-2 ml-4 mr-2 mb-2 dark:bg-green-600" : "text-white bg-red-700 font-medium rounded-lg text-sm px-3 py-2 ml-4 mr-2 mb-2 dark:bg-red-600"}>{colaborador?.ativoSN ? "Ativo" : "Inativo"}</button>
                        </div>



                    </div>
                    {/* <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">

                                    <div className="items-center text-gray-900 truncate dark:text-white">
                                        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" />
                                        Status:
                                    </div>
                                    <button type="button" className={colaborador.ativoInativo == "Ativo" ? "text-white bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600" : "text-white bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600"}>{colaborador.ativoInativo}</button>

                                </div>
                            </li>


                        </ul>
                    </div> */}
                </div>

                <div className="w-full col-span-3 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <div className='flex items-end'>


                        <h5 className="text-3xl mb-2 font-bold leading-none text-gray-900 dark:text-gray-200">Sobre</h5>
                    </div>
                    <div className=" mt-8 grid grid-cols-1 gap-y-10 gap-x-6 xl:grid-cols-2">
                        <div>
                            <div className='flex items-center mb-4'>
                                <FaUser className='text-gray-700 dark:text-gray-200 mr-4' size={25} />
                                <strong className='text-gray-700 dark:text-gray-200'>Dados Pessoais</strong>
                            </div>

                            <ul className="text-sm font-medium text-gray-900 bg-white  dark:bg-gray-800 dark:text-gray-200">
                                <li className="w-10/12 px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:text-gray-200">
                                    Nome: {""}
                                    <strong>{colaborador?.nome} {""} {colaborador?.sobrenome}</strong>
                                </li>
                                <li className="w-10/12 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                                    Aniversário: {""}
                                    <strong>{colaborador?.dt_nasc}</strong>
                                </li>
                                <li className="w-10/12 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                                    Email: {""}
                                    <strong>{colaborador?.email}</strong>
                                </li>
                                <li className="w-10/12 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                                    CPF: {""}
                                    <strong>{colaborador?.email}</strong>
                                </li>
                                <li className="w-10/12 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                                    Telefone: {""}
                                    <strong>{colaborador?.telefone}</strong>
                                </li>

                            </ul>
                        </div>
                        <div>
                            <div className='flex items-center mb-4'>
                                <FaUserTie className='text-gray-700 dark:text-gray-200 mr-4' size={25} />
                                <strong className='text-gray-700 dark:text-gray-200'>Dados Profissionais</strong>
                            </div>

                            <ul className="text-sm font-medium text-gray-900 bg-white  dark:bg-gray-800 dark:text-white">
                                <li className="w-10/12 px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                                    Cargo: {""}
                                    <strong>{colaborador?.cargo}</strong>
                                </li>
                                <li className="w-10/12 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                                    Função: {""}
                                    <strong>{colaborador?.funcao}</strong>
                                </li>
                                <li className="w-10/12 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                                    Departamento: {""}
                                    <strong>{colaborador?.departamento}</strong>
                                </li>
                                <li className="w-10/12 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                                    Admissão: {""}
                                    <strong>{colaborador?.admissao}</strong>
                                </li>
                                <li className="w-10/12 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                                    Usuário do sistema: {""}
                                    <strong>{colaborador?.id_sys}</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


            </div>




































            {/* <div className="p-16">
                <div className="p-8  text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-200 shadow mt-24 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">

                        </div>
                        <div className="relative mb-24">
                            <div className="w-48 h-48 bg-indigo-100  dark:bg-gray-700 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500  dark:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>

                    </div>

                    <div className="mt-20 text-center border-b pb-12">

                        <h1 className="text-4xl font-medium text-gray-700  dark:text-gray-200">{colaborador?.nome},&nbsp;
                            <span className="font-light text-gray-500  dark:text-gray-400">27
                            </span>
                        </h1>
                        <p className="font-light text-gray-600  dark:text-gray-200 mt-3"> {colaborador?.sobrenome} </p>
                        <p className="mt-8 text-gray-500  dark:text-gray-200"> {colaborador?.cargo} </p>
                        <p className="mt-8 text-gray-500  dark:text-gray-200"> {colaborador?.funcao} </p>
                        <p className="mt-2 text-gray-500  dark:text-gray-200"> {colaborador?.departamento} </p>
                    </div>

                    <div className="mt-12 flex flex-col justify-center">
                        <p className="text-gray-600  dark:text-gray-200 text-center font-light lg:px-16"></p>
                        <button className="text-indigo-500  dark:text-gray-200 py-2 px-4  font-medium mt-4">
                        </button>
                    </div>
                </div>
            </div> */}
        </>
    )
}
