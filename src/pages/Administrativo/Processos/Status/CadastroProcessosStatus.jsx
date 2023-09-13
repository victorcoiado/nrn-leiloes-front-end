import React, { useEffect, useState } from 'react'
import { Header } from '../../../../components'
import { IMaskInput, IMaskMixin } from 'react-imask'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useAuthContext, useStateContext } from "../../../../contexts/ContextProvider";
import axios from "axios";
import { getApiLeadUrl } from "../../../../apiUtils";

export default function CadastroProcessosStatus(processos_status) {
    const [status, setStatus] = useState(null)


    const navigate = useNavigate();

    const { id } = useParams()

    const [descricaoProcessosStatus, setDescricaoProcessosStatus] = useState(id ? status?.descricao : "")

    const { user } = useAuthContext();
    const handleSubmit = async (acao) => {

        try {
            const headers = {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            };

            const body = {
                "Id": id ? id : 0,
                "Descricao": descricaoProcessosStatus ? descricaoProcessosStatus : status?.descricao,
                "TipoDominios": status?.TipoDominios ? status?.TipoDominios : "processos_status",
                "TipoAcaoMovimento": acao
            };

            const res = await axios.post(`${getApiLeadUrl()}/nrn/dominios/movimento`, body,
                {
                    headers: headers,
                });

            navigate('/manutencao/processo-status')

        } catch (err) {
            console.log(err);
        }
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = { Authorization: `Bearer ${user.token}` };

                var res = await axios.get(
                    `${getApiLeadUrl()}/nrn/dominios?dominios=processos_status`,
                    {
                        headers: headers,
                    }
                );



                var resFiltrada = res.data.processos_status.filter((item) => {
                    if (item.id == id) {

                        setStatus(item)
                        // reset(item)
                    }
                })
                console.log("resFiltrada", resFiltrada);
                console.log(status);





                console.log("PstatusEffect", res.data.processos_status);
            } catch (err) {


                console.log(err);
            }
        };
        fetchData();
    }, []);








    return (
        <>
            <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:bg-main-dark-bg">
                <Header title={id ? "Editando status do processo" : "Cadastro de status do processo"} />



                <form onSubmit={handleSubmit}>
                    <div class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 ">

                        <div className='col-span-4'>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status do Processo</label>
                            <input
                                type="text"
                                defaultValue={status?.descricao}
                                onChange={(e) => setDescricaoProcessosStatus(e.target.value)}
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
