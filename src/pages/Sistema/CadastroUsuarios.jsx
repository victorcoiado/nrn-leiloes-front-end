import React, { useState } from 'react'
import { Header } from '../../components'
import { IMaskInput, IMaskMixin } from 'react-imask'
import { useNavigate, useLocation } from 'react-router-dom'

export default function CadastroUsuarios() {

    const { state } = useLocation()
    console.log("STATE", state);
    const [ativoSNN, setAtivoSNN] = useState(state?.ativoSN == 1 ? true : false);
    const [usuario, setUsuario] = useState(state?.usuario ? state?.usuario : "")
    const [nome, setNome] = useState(state?.nome ? state?.nome : "")
    const [sobrenome, setSobrenome] = useState(state?.sobrenome ? state?.sobrenome : "")
    const [email, setEmail] = useState(state?.email ? state?.email : "")
    const [telefone, setTelefone] = useState(state?.telefone ? state?.telefone : "")
    const [grupo, setGrupo] = useState(state?.grupo ? state?.grupo : "comum")

    console.log(ativoSNN);

    const navigate = useNavigate();
    const handleToggle = (e) => {
        if (e.target.checked) {
            setAtivoSNN(true)
        } else {
            setAtivoSNN(false)
        }
    }




    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(nome);
    }



    return (
        <>
            <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:bg-main-dark-bg">
                <Header title={"Cadastro de Usuários do Sistema"} />



                <form onSubmit={handleSubmit}>
                    <div class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 ">

                        <div className='col-span-2'>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome de usuário</label>
                            <input
                                type="text"
                                value={usuario}
                                onChange={e => setUsuario(e.target.value)}
                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className='col-span-3'>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                            <input
                                type="text"
                                id="nome"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className='col-span-3'>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sobrenome</label>
                            <input
                                type="text"

                                value={sobrenome}
                                onChange={e => setSobrenome(e.target.value)}
                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>


                        <div className='flex items-center mt-6'>
                            <label class="relative inline-flex items-center justify-center cursor-pointer">
                                <input
                                    type="checkbox" class="sr-only peer"
                                    value={ativoSNN}
                                    checked={ativoSNN}
                                    onChange={handleToggle} />
                                <div class="items-center w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                                </div>
                                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{ativoSNN == true ? "Ativo" : "Inativo"}</span>
                            </label>
                        </div>
                    </div>



                    <div class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 mt-6">


                        <div className='col-span-6'>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input
                                type="text"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>


                        <div className='col-span-3'>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
                            <IMaskInput
                                type="text"
                                value={telefone}
                                onChange={e => setTelefone(e.target.value)}
                                mask="(00) 00000-0000"
                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>







                    </div>


                    <div class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 mt-6">
                        <div className='col-span-2'>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grupo</label>
                            <select
                                value={grupo}
                                onChange={e => setGrupo(e.target.value)}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                <option value="adm">Administrador</option>
                                <option value="comum">Comum</option>


                            </select>
                        </div>
                    </div>




                    <div className="mt-12">

                        <button type="button" class="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cadastrar</button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            class="text-white bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800">Cancelar</button>
                    </div>
                </form >


            </div >

        </>
    )
}
