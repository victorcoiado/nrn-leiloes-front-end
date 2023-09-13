import React from 'react'
import { Header, Tabela } from "../components";
import { useAuthContext, useStateContext } from '../contexts/ContextProvider'
import { GoLaw } from "react-icons/go";
import { FaCoins } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiTimerLine } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";
import Card from '../components/Card';
import '../data/dummy'
import TabelaSimples from '../components/TabelaSimples';

export default function Home() {



    const {
        currentColor,
        activeMenu,
        setActiveMenu,
        userProfileClicked,
        setUserProfileClicked,
        screenSize,
        setScreenSize,
    } = useStateContext();
    const { user } = useAuthContext();

    const iconCard = () => {
        return <GoLaw size={27} />
    }

    const AgendaLeiloes = [
        {
            data: '27/07/2023',
            leilao: '(002 - TJSP/001) APARTAMENTO | JD. MARAJOARA - SP',
            modalidade: 'ONLINE',
            situacao: 'AGUARDANDO',
            edital: '22/06/2023'
        },
        {
            data: '27/07/2023',
            leilao: '(002 - TJSP/001) APARTAMENTO | JD. MARAJOARA - SP',
            modalidade: 'ONLINE',
            situacao: 'AGUARDANDO',
            edital: '22/06/2023'
        },
        {
            data: '27/07/2023',
            leilao: '(002 - TJSP/001) APARTAMENTO | JD. MARAJOARA - SP',
            modalidade: 'ONLINE',
            situacao: 'AGUARDANDO',
            edital: '22/06/2023'
        },
        {
            data: '27/07/2023',
            leilao: '(002 - TJSP/001) APARTAMENTO | JD. MARAJOARA - SP',
            modalidade: 'ONLINE',
            situacao: 'AGUARDANDO',
            edital: '22/06/2023'
        },

    ];

    const colunas = [
        { head: "Data", value: "data" },
        { head: "Leilão", value: "leilao" },
        { head: "Modalidade", value: "modalidade" },
        { head: "Situação", value: "situacao" },
        { head: "Edital", value: "edital" },

    ]





    return (
        <>
            <div className='ml-16'>
                <span className="text-gray-400 text-2xl">Olá, </span>{" "}
                <span className="text-gray-400 dark:text-white font-bold text-2xl">
                    {user.username}
                </span>


            </div>
            <div className="ml-1 sm:ml-16 bg-white rounded-3xl dark:bg-main-dark-bg">
                <Header
                    title="Dashboard"
                    category=""
                />
            </div>

            {/* CARDS */}

            <div className="mb-12 ml-0 sm:ml-10 mr-0 sm:mr-10 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">


                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center dark:shadow-none">
                    <FaRegBell size={27} />
                </div>

                <div className="col-span-1 md:col-span-2 py-4 sm:py-8 bg-white border-gray-200 rounded-lg shadow  dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex items-center justify-end mt-8">
                        {/* <p classNameName="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600 dark:text-white">Lembretes</p> */}
                        {/* <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                            View all
                        </a> */}
                    </div>
                    <div className="flow-root">
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="items-center text-gray-900 truncate dark:text-white">
                                        {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" /> */}
                                        <RiTimerLine size={32} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Restando 2 dias para
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            Entrega do produto *123 - Resumo do lembrete
                                        </p>
                                    </div>
                                    <button className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        <RiEyeLine size={20} />
                                    </button>
                                    {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        <RiDeleteBin5Fill size={16} />
                                    </div> */}
                                </div>
                            </li>

                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="items-center text-gray-900 truncate dark:text-white">
                                        {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" /> */}
                                        <RiTimerLine size={32} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Restando 5 dias para
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            Entrega do produto *123 - Resumo do lembrete
                                        </p>
                                    </div>
                                    <button className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        <RiEyeLine size={20} />
                                    </button>
                                    {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        <RiDeleteBin5Fill size={16} />
                                    </div> */}
                                </div>
                            </li>

                            <li className="py-3 sm:py-4">
                                <div className="flex items-center space-x-4">
                                    <div className="items-center text-gray-900 truncate dark:text-white">
                                        {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image" /> */}
                                        <RiTimerLine size={32} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            Restando 1 semana para
                                        </p>
                                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                            Entrega do produto *123 - Resumo do lembrete
                                        </p>
                                    </div>
                                    <button className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        <RiEyeLine size={20} />
                                    </button>
                                    {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                        <RiDeleteBin5Fill size={16} />
                                    </div> */}
                                </div>
                            </li>


                        </ul>
                    </div>
                </div>

                <div className="col-span-1 md:col-span-2">

                    <Card icon={<GoLaw size={27} />} title={"Processos"} subtitle={"Em andamento"} num={8} cor={"azul"} />
                    {/* <Card icon={<BsFillPersonFill size={27} />} title={"Clientes"} subtitle={"Ativo"} num={12} />
                <Card icon={<FaCoins size={27} />} title={"Financeiro"} cor={"verde"} /> */}
                </div>









            </div>

            <div className="mb-12 ml-10 mr-10 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-3">



                {/* <div class="w-full col-span-2 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <TabelaSimples dados={AgendaLeiloes} colunas={colunas} />
                </div> */}


            </div>










        </>
    )
}
