import React, { useEffect, useState } from 'react'
import { Header } from '../../../components'
import { IMaskInput, IMaskMixin } from 'react-imask'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export default function CadastroTipoAcoes(acoes_tipos) {
    const [acoes, setAcoes] = useState("")


    const navigate = useNavigate();

    const { id } = useParams()


    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log(nome);
    }

    useEffect(() => {

        try {
            function dadosAcoes() {
                acoes_tipos?.acoes_tipos.filter((item) => {
                    if (item.id == id) {
                        setAcoes(item)
                        // reset(item)
                    }
                })
            }
            dadosAcoes()

        } catch (error) {
            console.log(error);
        }


    }, [])

    return (
        <>
            <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:bg-main-dark-bg">
                <Header title={id ? "Editando tipo de ações" : "Cadastro de tipo de ações"} />



                <form onSubmit={handleSubmit}>
                    <div class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 ">

                        <div className='col-span-4'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de Ações</label>
                            <input
                                type="text"
                                value={id ? acoes.descricao : ""}

                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>


                    </div>







                    <div className="mt-12">

                        <button type="submit" class="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{id ? "Editar" : "Cadastrar"}</button>
                        <button
                            type="submit"
                            onClick={() => navigate(-1)}
                            class="text-white bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800">Cancelar</button>
                    </div>
                </form >


            </div >

        </>
    )
}
