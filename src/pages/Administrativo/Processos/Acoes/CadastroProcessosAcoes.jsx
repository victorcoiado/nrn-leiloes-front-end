import React, { useEffect, useState } from 'react'
import { Header } from '../../../../components'
import { IMaskInput, IMaskMixin } from 'react-imask'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useAuthContext, useStateContext } from "../../../../contexts/ContextProvider";
import axios from "axios";
import { getApiLeadUrl } from "../../../../apiUtils";

export default function CadastroProcessosAcoes(processos_acoes) {
    const [processosAcoes, setProcessosAcoes] = useState(null)
    console.log("processosAcoes", processosAcoes);
    const { id } = useParams()
    console.log("id", id);
    const [descricaoProcessosAcoes, setDescricaoProcessosAcoes] = useState(id ? processosAcoes?.descricao : "")
    const navigate = useNavigate();


    const { user } = useAuthContext();



    const handleSubmit = async (acao) => {

        try {
            const headers = {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            };

            const body = {
                "Id": id ? id : 0,
                "Descricao": descricaoProcessosAcoes ? descricaoProcessosAcoes : processosAcoes?.descricao,
                "TipoDominios": processosAcoes?.TipoDominios ? processosAcoes?.TipoDominios : "processos_acoes",
                "TipoAcaoMovimento": acao
            };


            const res = await axios.post(`${getApiLeadUrl()}/nrn/dominios/movimento`, body,
                {
                    headers: headers,
                });

            navigate('/manutencao/processo-acoes')

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = { Authorization: `Bearer ${user.token}` };

                var res = await axios.get(
                    `${getApiLeadUrl()}/nrn/dominios?dominios=processos_acoes`,
                    {
                        headers: headers,
                    }
                );



                var resFiltrada = res.data.processos_acoes.filter((item) => {
                    if (item.id == id) {

                        setProcessosAcoes(item)
                        // reset(item)
                    }
                })
                console.log("resFiltrada", resFiltrada);
                console.log(processosAcoes);





                console.log("PacoesEffect", res.data.processos_acoes);
            } catch (err) {


                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:bg-main-dark-bg">
                <Header title={id ? "Editando ações do processo" : "Cadastro de ações do processo"} />



                <form>
                    <div class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 ">

                        <div className='col-span-4'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ações do Processo</label>
                            <input
                                type="text"
                                defaultValue={processosAcoes?.descricao}
                                onChange={(e) => setDescricaoProcessosAcoes(e.target.value)}
                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>


                    </div>







                    <div className="mt-12">

                        <button
                            type="button"
                            onClick={() => handleSubmit(id ? "update" : "insert")}
                            class="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{id ? "Editar" : "Cadastrar"}</button>
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
