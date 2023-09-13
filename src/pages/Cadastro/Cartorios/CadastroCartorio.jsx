import React, { useEffect, useState } from 'react'
import { Header } from '../../../components'
import { IMaskInput, IMaskMixin } from 'react-imask'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useAuthContext, useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
import { getApiLeadUrl } from "../../../apiUtils";

export default function CadastroCartorios() {

    const [cartorio, setCartorio] = useState(null)

    const { id } = useParams()
    const { user } = useAuthContext();
    console.log("CARTORIO", cartorio);

    // FORM
    const [nome, setNome] = useState(id ? cartorio?.nome : "")
    console.log(nome);
    const [razaoSocial, setRazaoSocial] = useState(id ? cartorio?.razaoSocial : "")
    const [ativoSN, setAtivoSN] = useState(1)
    const [contato, setContato] = useState(id ? cartorio?.contato : "")
    const [telefone, setTelefone] = useState(id ? cartorio?.telefone : "")
    console.log(telefone);
    const [cep, setCep] = useState(id ? cartorio?.cep : "")
    const [uf, setUf] = useState(id ? cartorio?.uf : '')
    const [cidade, setCidade] = useState(id ? cartorio?.cidade : '')
    const [ibge, setIbge] = useState(id ? cartorio?.ibge : "")
    const [bairro, setBairro] = useState(id ? cartorio?.bairro : '')
    const [endereco, setEndereco] = useState(id ? cartorio?.endereco : '')
    const [numero, setNumero] = useState(id ? cartorio?.numero : "")
    const [complemento, setComplemento] = useState(id ? cartorio?.complemento : '')
    const [observacao, setObservacao] = useState(id ? cartorio?.observacao : "")
    console.log(numero);
    const [error, setError] = useState('')



    const navigate = useNavigate();
    const handleToggle = (e) => {
        if (e.target.checked) {
            setAtivoSN(1)
        } else {
            setAtivoSN(null)
        }
    }


    const checkCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        try {

            fetch(`http://viacep.com.br/ws/${cep}/json/`)
                .then((res) => res.json())
                .then((data) => {

                    setEndereco(data.logradouro)
                    setBairro(data.bairro)
                    setCidade(data.localidade)
                    setUf(data.uf)
                })
                .catch((err) => {
                    if (err.message == 'failed to fetch') {

                        setError("Coloque um numero válido do cep")
                    } else {
                        setError(err.message)
                    }
                })

        } catch (error) {
            setError(error)
        }
    }

    const handleSubmit = async (acao) => {

        try {
            const headers = {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            };

            const body = {
                "id": id ? id : 0,
                "nome": nome ? nome : cartorio?.nome,
                "razaoSocial": razaoSocial ? razaoSocial : cartorio?.razaoSocial,
                "ativoSN": ativoSN ? ativoSN : cartorio?.ativoSN,
                "nomeContato": contato ? contato : cartorio?.nomeContato,
                "telefone": telefone ? telefone : cartorio?.telefone,
                "celular": telefone ? telefone : cartorio?.celular,
                "email": "",
                "observacao": observacao ? observacao : cartorio?.observacao,
                "cep": cep ? cep : cartorio?.cep,
                "uf": uf ? uf : cartorio?.uf,
                "cidade": cidade ? cidade : cartorio?.cidade,
                "ibge": ibge ? ibge : cartorio?.ibge,
                "bairro": bairro ? bairro : cartorio?.bairro,
                "endereco": endereco ? endereco : cartorio?.endereco,
                "numero": numero ? numero : cartorio?.numero,
                "complemento": complemento ? complemento : cartorio?.complemento,
                "usuarioInclusao": null
            };



            console.log("BODY", body);





            const res = await axios.post(`${getApiLeadUrl()}/nrn/cartorios/add`, body,
                {
                    headers: headers,
                });

            navigate('/manutencao/cartorios')

            console.log("RES", res);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = { Authorization: `Bearer ${user.token}` };

                var res = await axios.get(
                    `${getApiLeadUrl()}/nrn/cartorios`,
                    {
                        headers: headers,
                    }
                );

                console.log("res", res.data);

                var resFiltrada = res.data.filter((item) => {
                    if (item.id == id) {

                        setCartorio(item)

                        // reset(item)
                    }
                })
                console.log("resFiltrada", resFiltrada);
                console.log(cartorio);





                console.log("CartoriosEffect", res.data.cartorios);
            } catch (err) {


                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:bg-main-dark-bg">
                <Header title={id ? "Editando Cartório" : "Cadastro de Cartório"} category={"Cadastre aqui uma cartório."} />


                <h5 class="mb-8 text-xl font-bold leading-none text-gray-900 dark:text-gray-200">Dados</h5>
                <form>

                    <div class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 ">

                        <div className='col-span-4'>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                            <input
                                type="text"
                                id="nome"
                                defaultValue={cartorio?.nome}
                                onChange={e => setNome(e.target.value)}
                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className='col-span-4'>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razão Social</label>
                            <input
                                type="text"
                                id="nome"
                                defaultValue={cartorio?.razaoSocial}
                                onChange={e => setRazaoSocial(e.target.value)}
                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>

                        <div className='flex items-center mt-6 col-span-3'>
                            <label class="relative inline-flex items-center justify-center cursor-pointer">
                                <input type="checkbox" class="sr-only peer" defaultValue={cartorio?.ativoSN} onChange={handleToggle} />
                                <div class="items-center w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{ativoSN ? "Ativo" : "Inativo"}</span>
                            </label>
                        </div>


                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 mt-6">

                        <div className='col-span-4'>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contato</label>
                            <input
                                type="text"
                                id="nome"
                                defaultValue={cartorio?.nomeContato}
                                onChange={e => setContato(e.target.value)}
                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className='col-span-2'>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
                            <IMaskInput
                                type="text"
                                defaultValue={cartorio?.telefone}
                                onChange={e => setTelefone(e.target.value)}
                                mask="(00) 00000-0000"
                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>




                    </div>

                    <h5 className="mb-8 mt-8 text-xl font-bold leading-none text-gray-900 dark:text-gray-200">Endereço</h5>

                    <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 mt-6">
                        <div className="col-span-3">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CEP</label>
                            {/* <input type="text" id="tratamento" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}

                            <IMaskInput
                                type='text'
                                mask="00.000-000"
                                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={e => setCep(e.target.value.replace(/\D/g, ''))}
                                defaultValue={cartorio?.cep}
                                onBlur={checkCEP}

                            />
                        </div>
                        <div className="col-span-3">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
                            <input
                                type="text"
                                value={cartorio?.uf ? cartorio?.uf : uf}
                                readOnly
                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="col-span-3">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade</label>
                            <input
                                type="text"
                                value={cartorio?.cidade ? cartorio?.cidade : cidade}
                                readOnly
                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="col-span-3">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IBGE</label>
                            <input

                                onChange={e => setIbge(e.target.value)}
                                type="text"
                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>



                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 mt-6">
                        <div className="col-span-3">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bairro</label>
                            <input
                                type="text"
                                value={cartorio?.bairro ? cartorio?.bairro : bairro}
                                readOnly
                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="col-span-3">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Endereço</label>
                            <input
                                type="text"
                                value={cartorio?.endereco ? cartorio?.endereco : endereco}
                                readOnly
                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="col-span-3">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nº</label>
                            <input
                                type="text"
                                onChange={e => setNumero(e.target.value)}

                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className="col-span-3">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Complemento</label>
                            <input
                                type="text"
                                onChange={e => setComplemento(e.target.value)}
                                defaultValue={cartorio?.complemento}
                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>



                    </div>

                    <div className="mt-6">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Observação:</label>
                        <textarea
                            defaultValue={cartorio?.observacao}
                            onChange={e => setObservacao(e.target.value)}
                            rows="4"
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escreva aqui sua observação..."></textarea>
                    </div>



                    <div className="mt-12">

                        <button type="button" onClick={handleSubmit} class="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{id ? "Editar" : "Cadastrar"}</button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            class="text-white bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800">Cancelar</button>
                    </div>
                </form>


            </div>

        </>
    )
}
