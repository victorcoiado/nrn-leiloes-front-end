import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input';
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { IMaskInput, IMaskMixin } from 'react-imask'
import { Pessoa } from '../../../data/dummy';
import SelectCustom from '../../SelectCustom';
import { useEffect } from 'react';

import { Radio } from 'flowbite-react';

export default function Advogado({ pessoas_data }) {

    const { state } = useLocation()
    // console.log("state.pessoaAdvogado", state?.pessoaAdvogado?.id);

    const [pessoas, setPessoas] = useState(pessoas_data)
    const [advogado, setAdvogado] = useState()

    const [nome, setNome] = useState(state?.pessoaAdvogado.nome ? state?.pessoaAdvogado.nome : "")
    const [cep, setCep] = useState(state?.pessoaAdvogado.cep ? state?.pessoaAdvogado.cep : "")
    const [endereco, setEndereco] = useState(state?.pessoaAdvogado.endereco ? state?.pessoaAdvogado.endereco : "")
    const [bairro, setBairro] = useState(state?.pessoaAdvogado.bairro ? state?.pessoaAdvogado.bairro : "")
    const [cidade, setCidade] = useState(state?.pessoaAdvogado.cidade ? state?.pessoaAdvogado.cidade : "")
    const [uf, setUF] = useState(state?.pessoaAdvogado.uf ? state?.pessoaAdvogado.uf : "")
    const [numero, setNumero] = useState(state?.pessoaAdvogado.numero ? state?.pessoaAdvogado.numero : "")
    const [complemento, setComplemento] = useState(state?.pessoaAdvogado.complemento ? state?.pessoaAdvogado.complemento : "")
    const [ibge, setIbge] = useState(state?.pessoaAdvogado.ibge ? state?.pessoaAdvogado.ibge : "")
    const [obs, setObs] = useState(state?.pessoaAdvogado.observacao ? state?.pessoaAdvogado.observacao : "")

    const [error, setError] = useState('')
    const [ativo, setAtivo] = useState("Ativo")

    const { id } = useParams()

    const checkCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        try {
            fetch(`http://viacep.com.br/ws/${cep}/json/`)
                .then((res) => res.json())
                .then((data) => {

                    setEndereco(data.logradouro)
                    setBairro(data.bairro)
                    setCidade(data.localidade)
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


    const navigate = useNavigate();
    const handleToggle = (e) => {
        if (e.target.checked) {
            setAtivo("Ativo")
        } else {
            setAtivo("Inativo")
        }
    }



    //FORM
    const { register, handleSubmit, reset } = useForm({

    });
    const registerWithMask = useHookFormMask(register);


    const pessoasOptions = pessoas.map((item) => {

        return { value: item.id, label: item.nome }
    })




    const setValueFromChild = (childData) => {
        setAdvogado(childData)
        pessoas.map((item) => {
            if (item.id == childData?.value) {
                setCep(item?.cep);
                setUF(item?.uf);
                setCidade(item?.cidade);
                setIbge(item?.ibge);
                setBairro(item?.bairro);
                setEndereco(item?.endereco);
                setNumero(item?.numero);
                setComplemento(item?.complemento);
                setObs(item?.observacao);
            }
        })
    }


    const onSubmit = async (data) => {

        console.log(data);



    }



    useEffect(() => {

        const autorDefaultValue = () => {

            pessoas.map((item) => {
                if (item.id == state?.pessoaAdvogado?.id) {
                    //  console.log("ITEMPESSOA", item);
                    setAdvogado(
                        { value: item.id, label: item.nome }
                    )

                }
            })

        }
        autorDefaultValue()


    }, [])


    return (
        <>
            <h5 class="mb-8 mt-4 text-xl font-bold leading-none text-gray-900 dark:text-gray-200">Dados do Advogado</h5>
            <form onSubmit={handleSubmit}>
                <div class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 ">

                    <div className='col-span-12'>
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Advogado</label>
                        {/* <input
                            type="text"
                            value={nome}
                            onChange={e => setNome(e.target.value)}

                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}

                        <SelectCustom options={pessoasOptions} setValueFromChild={setValueFromChild} isMulti={false} placeholder={"Selecione"} closeMenuOnSelect={true} defaultValue={advogado} />


                    </div>



                </div>


                {<h5 className="mb-8 mt-8 text-sm leading-none text-gray-700 dark:text-gray-100">.:dados de endereço do cadastro (somente para consulta):.</h5>}

                <div class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 mt-6">


                    <div className="col-span-3">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CEP</label>
                        {/* <input type="text" id="tratamento" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> */}

                        <IMaskInput
                            type='text'
                            mask="00.000-000"
                            value={cep}
                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={e => setCep(e.target.value.replace(/\D/g, ''))}
                            onBlur={checkCEP}
                        />
                    </div>
                    <div className="col-span-3">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado</label>
                        <input
                            type="text"
                            value={uf}
                            readOnly
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="col-span-3">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade</label>
                        <input
                            type="text"
                            value={cidade}
                            readOnly
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="col-span-3">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IBGE</label>
                        <input
                            type="text"
                            value={ibge}
                            readOnly
                            onChange={e => setIbge(e.target.value)}
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>


                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 mt-6">
                    <div className="col-span-3">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bairro</label>
                        <input
                            type="text"
                            value={bairro}
                            readOnly
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="col-span-3">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Endereço</label>
                        <input
                            type="text"
                            value={endereco}
                            readOnly
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="col-span-3">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nº</label>
                        <input
                            type="text"
                            value={numero}
                            onChange={e => setNumero(e.target.value)}
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>
                    <div className="col-span-3">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Complemento</label>
                        <input
                            type="text"
                            value={complemento}
                            onChange={e => setComplemento(e.target.value)}
                            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>



                </div>

                <div className="mt-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Observação:</label>
                    <textarea
                        rows="4"
                        value={obs}
                        onChange={e => setObs(e.target.value)}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Escreva aqui sua observação..."></textarea>
                </div>


                <div className="mt-12">

                    <button type="submit" class="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cadastrar</button>
                    <button
                        type="submit"
                        onClick={() => navigate(-1)}
                        class="text-white bg-gray-500 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800">Cancelar</button>
                </div>
            </form >
        </>
    )
}
