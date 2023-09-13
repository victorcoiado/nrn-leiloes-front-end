import React, { useState, useEffect } from 'react'
import { Header } from '../../../components'
import { IMaskInput, IMaskMixin } from 'react-imask'
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useAuthContext, useStateContext } from "../../../contexts/ContextProvider";
import axios from "axios";
import { getApiLeadUrl } from "../../../apiUtils";
import Select, { Props } from "react-select";
import makeAnimated from 'react-select/animated';
import { RiEdit2Fill } from "react-icons/ri";
import SelectCustom from '../../../components/SelectCustom'



export default function CadastroPessoa() {

    const { state } = useLocation()

    const [pessoa, setPessoa] = useState([state])

    const [ativoSN, setAtivoSN] = useState(state?.ativoSN == 1 ? true : false)
    const [nome, setNome] = useState(state?.nome ? String(state?.nome) : "")

    const [tratamento, setTratamento] = useState(state?.tratamento ? state?.tratamento : "")
    const [telefone, setTelefone] = useState(state?.telefone ? state?.telefone : "")
    const [fisicaJuridica, setfisicaJuridica] = useState(state?.fisicaJuridica ? state?.fisicaJuridica : "F")

    const [cep, setCep] = useState(state?.cep ? state?.cep : "")
    const [endereco, setEndereco] = useState(state?.endereco ? state?.endereco : "")
    const [bairro, setBairro] = useState(state?.bairro ? state?.bairro : "")
    const [cidade, setCidade] = useState(state?.cidade ? state?.cidade : "")
    const [uf, setUf] = useState(state?.uf ? state?.uf : "")
    const [numero, setNumero] = useState(state?.numero ? state?.numero : "")
    const [ibge, setIbge] = useState(state?.ibge ? state?.ibge : "")
    const [complemento, setComplemento] = useState(state?.complemento ? state?.complemento : "")
    const [error, setError] = useState("")
    const [cpfCnpj, setCpfCnpj] = useState(state?.cpfCnpj ? state?.cpfCnpj : "")
    const [ieRg, setIeRg] = useState(state?.ieRg ? state?.ieRg : "")
    const [oab, setOab] = useState(state?.oab ? state?.oab : "")
    const [observacao, setObservacao] = useState(state?.observacao ? state?.observacao : "")
    const [tipoPessoa, setTipoPessoa] = useState([])

    const [tipoPessoaData, setTipoPessoaData] = useState([])
    const [tipoDaPessoa, setTipoDaPessoa] = useState({})

    const [values, setValues] = useState([])
    const [ativoChecado, setAtivoChecado] = useState(state?.ativoSN == 1 ? true : false)


    console.log("state", state);

    const { user } = useAuthContext();

    const navigate = useNavigate();

    const handleToggle = (e) => {
        if (e.target.checked) {
            setAtivoChecado(true)
        } else {
            setAtivoChecado(false)
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


    const handleSubmit = async () => {

        try {
            const headers = {
                Authorization: `Bearer ${user.token}`,
                "Content-Type": "application/json",
            };

            let tipoP = values.map((item) => {
                console.log(item);
                return ({

                    "idTipo": item.value

                })
            })

            // setTipoPessoa(tipoP)
            const body = {
                "id": state?.id ? parseInt(state?.id) : 0,
                "tratamento": tratamento ? tratamento : tratamento,
                "nome": nome ? nome : nome,
                "telefone": telefone ? telefone : telefone,
                "ativoSN": ativoChecado == true ? 1 : 0,
                "fisicaJuridica": fisicaJuridica ? fisicaJuridica : fisicaJuridica,
                "cpfCnpj": cpfCnpj ? cpfCnpj : cpfCnpj,
                "ieRg": ieRg ? ieRg : ieRg,
                "oab": oab ? oab : oab,
                "observacao": observacao != undefined ? observacao : observacao,
                "cep": cep ? cep : cep,
                "uf": uf ? uf : uf,
                "cidade": cidade ? cidade : cidade,
                "ibge": ibge != undefined ? ibge : ibge,
                "bairro": bairro ? bairro : bairro,
                "endereco": endereco ? endereco : endereco,
                "numero": numero ? numero : numero,
                "complemento": complemento ? complemento : complemento,
                "tipoPessoa": tipoP
            };





            console.log("BODY", body);

            // return



            const res = await axios.post(`${getApiLeadUrl()}/nrn/pessoas/add`, body,
                {
                    headers: headers,
                });

            navigate('/cadastros/pessoas')



        } catch (err) {
            console.log(err);
        }
    }



    useEffect(() => {
        const fetchData = async () => {
            try {
                const headers = { Authorization: `Bearer ${user.token}` };

                var ress = await axios.get(
                    `${getApiLeadUrl()}/nrn/dominios?dominios=pessoas_tipo`,
                    {
                        headers: headers,
                    }
                );








                setTipoPessoaData(ress.data.pessoas_tipo);
                console.log("RES", tipoPessoaData);

                // const resFiltroTipo = state?.tipoPessoa?.map((item) => item.tipoPessoa[0])
                // setTipoDaPessoa(resFiltroTipo);
                // console.log("tipoDaPessoa", tipoDaPessoa);


                console.log("VALUES", values);
            } catch (err) {


                console.log(err);
            }
        };
        fetchData();



    }, []);



    useEffect(() => {
        let defaultValueTipoPessoa = []
        console.log("tipopesoadata", tipoPessoaData);
        // console.log("stateTipoPessoa", state.tipoPessoa);
        for (var i = 0; i < tipoPessoaData?.length; i++) {
            for (var x = 0; x < state?.tipoPessoa?.length; x++) {
                if (state?.tipoPessoa[x].idTipo == tipoPessoaData[i]?.id) {
                    console.log("entrou");

                    defaultValueTipoPessoa.push(
                        { value: tipoPessoaData[i]?.id, label: tipoPessoaData[i]?.descricao }
                    )
                }
            }

            // state?.tipoPessoa.forEach(element => {
            //     if (element.idTipo == tipoPessoaData[i]?.id) {

            //         defaultValueTipoPessoa.push(
            //             { value: tipoDaPessoa[i]?.idTipo, label: tipoDaPessoa[i]?.descricaoTipo }
            //         )
            //     }
        };

        console.log("DEFAULVALUE", defaultValueTipoPessoa);
        setValues(defaultValueTipoPessoa)

    }, [tipoPessoaData])



    // useEffect(() => {
    //     const resFiltroTipo = state[0]?.map((item) => item.tipoPessoa[0])
    //     setTipoDaPessoa(resFiltroTipo);
    //     console.log("tipoDaPessoa", tipoDaPessoa);

    // }, [pessoa])

    // useEffect(() => {
    //     const defaultValue = []
    //     for (var i = 0; i < tipoDaPessoa?.length; i++) {
    //         if (tipoDaPessoa[i]?.idTipo) {

    //             defaultValue.push(
    //                 { value: tipoDaPessoa[i]?.idTipo, label: tipoDaPessoa[i]?.descricaoTipo }
    //             )
    //         }
    //     }
    //     console.log("defaultValue", defaultValue);
    //     setValues(defaultValue)


    // }, [tipoDaPessoa])



    const animatedComponents = makeAnimated();




    const tipoPessoaOptions =

        tipoPessoaData.map((item) => {
            return (

                { value: item.id, label: item.descricao }

            )
        })








    const handleTipoPessoa = (e) => {
        setValues(e)
        setTipoPessoa(e);
    }

    const setValueFromChild = (childData) => {

        setValues(childData)
        setTipoPessoa(childData)

    }


    const controlStyles = {
        base: "border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600  hover:cursor-pointer",
        focus: "border rounded-lg bg-white dark:bg-gray-700 hover:cursor-pointer ring-blue-500 border-blue-500 dark:ring-blue-500 dark:border-blue-500 dark:text-gray-100 text-sm",
        nonFocus: "border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600  hover:cursor-pointer border-gray-300 hover:border-gray-400 dark:text-gray-100 text-sm",
    };
    const placeholderStyles = "sm:text-sm dark:text-gray-400 pl-1 py-0.5";
    const selectInputStyles = "pl-1 py-0.5";
    const valueContainerStyles = "p-1 gap-1";
    const singleValueStyles = "leading-7 ml-1";
    const multiValueStyles =
        "dark:bg-gray-500 bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5";
    const multiValueLabelStyles = "leading-6 py-0.1";
    const multiValueRemoveStyles =
        "border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md ml-1";
    const indicatorsContainerStyles = "p-1 gap-1";
    const clearIndicatorStyles =
        "text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800";
    const indicatorSeparatorStyles = "bg-gray-300";
    const dropdownIndicatorStyles =
        "p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black";
    const menuStyles = "p-1 mt-2 border border-gray-500 bg-white dark:bg-gray-700 rounded-lg dark:text-gray-200 ";
    const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm";
    const optionStyles = {
        base: "hover:cursor-pointer px-3 py-2 rounded",
        focus: "dark:bg-gray-600 bg-gray-200 active:bg-gray-400",
        selected: "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500",
    };
    const noOptionsMessageStyles =
        "text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm";


    console.log(state?.id);

    return (
        <>
            <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:bg-main-dark-bg">
                <Header title={state?.id ? `Editando dados de ${state?.nome}` : "Cadastro de Pessoa"} category={state?.id ? "" : "Cadastre aqui uma pessoa, pode ser um cliente, advogado ou até mesmo uma empresa."} />


                <h5 class="mb-8 text-xl font-bold leading-none text-gray-900 dark:text-gray-200">Dados Pessoais</h5>
                <form>
                    <div class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 ">
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tratamento</label>
                            <select
                                value={tratamento}
                                onChange={e => setTratamento(e.target.value)}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                <option value="Dr">Dr.&#40;a&#41;</option>
                                <option value="Sr">Sr.&#40;a&#41;</option>

                            </select>
                        </div>
                        <div className='col-span-4'>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome</label>
                            <input
                                type="text"
                                value={nome}
                                onChange={e => setNome(e.target.value)}
                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className='col-span-6'>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de Pessoa</label>




                            {/* <Select
                                value={values}
                                closeMenuOnSelect={false}
                                maxMenuHeight={220}
                                components={animatedComponents}
                                loadingMessage="(...)"
                                noOptionsMessage={() => "Nenhuma opção encontrada."}
                                isSearchable
                                isMulti
                                unstyled
                                options={tipoPessoaOptions}
                                onChange={e => handleTipoPessoa(e)}
                                placeholder="Selecione o tipo de pessoa"
                                classNames={{
                                    control: ({ isFocused }) => isFocused ? controlStyles.focus : controlStyles.nonFocus,

                                    placeholder: () => placeholderStyles,
                                    input: () => selectInputStyles,
                                    valueContainer: () => valueContainerStyles,
                                    singleValue: () => singleValueStyles,
                                    multiValue: () => multiValueStyles,
                                    multiValueLabel: () => multiValueLabelStyles,
                                    multiValueRemove: () => multiValueRemoveStyles,
                                    indicatorsContainer: () => indicatorsContainerStyles,
                                    clearIndicator: () => clearIndicatorStyles,
                                    indicatorSeparator: () => indicatorSeparatorStyles,
                                    dropdownIndicator: () => dropdownIndicatorStyles,
                                    menu: () => menuStyles,
                                    groupHeading: () => groupHeadingStyles,
                                    option: () => optionStyles.base,
                                    option: ({ isSelected }) => isSelected && optionStyles.selected,
                                    option: ({ isFocused }) => isFocused && optionStyles.focus,


                                    noOptionsMessage: () => noOptionsMessageStyles,
                                }}

                            /> */}

                            <SelectCustom options={tipoPessoaOptions} defaultValue={values} setValueFromChild={setValueFromChild} isMulti={true} placeholder={"Selecione os tipos de pessoa"} />




                        </div>
                        <div className='col-span-2'>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone</label>
                            <IMaskInput
                                type="text"
                                defaultValue={telefone}
                                onChange={e => setTelefone(e.target.value)}
                                mask="(00) 00000-0000"
                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className='flex items-center mt-6'>
                            <label class="relative inline-flex items-center justify-center cursor-pointer">
                                <input type="checkbox" class="sr-only peer" checked={ativoChecado} defaultValue={ativoChecado} onChange={handleToggle} />
                                <div class="items-center w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                                </div>
                                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{ativoChecado == true ? "Ativo" : "Inativo"}</span>
                            </label>
                        </div>
                    </div>



                    <div class="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-12 gap-6 mt-6">
                        <div>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Física/Jur.</label>
                            <select
                                id="tipo"
                                defaultValue={fisicaJuridica}
                                onChange={e => setfisicaJuridica(e.target.value)}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

                                <option value="F">CPF</option>
                                <option value="J">CNPJ</option>

                            </select>
                        </div>

                        {fisicaJuridica == "F" ?
                            <div className='col-span-4'>


                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF</label>
                                <IMaskInput
                                    type="text"
                                    value={cpfCnpj}
                                    onChange={e => setCpfCnpj(e.target.value)}
                                    mask="000.000.000-00"
                                    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>

                            :

                            <div className='col-span-4'>
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CNPJ</label>
                                <IMaskInput
                                    type="text"
                                    value={cpfCnpj}
                                    onChange={e => setCpfCnpj(e.target.value)}
                                    mask="00.000.000/0000-00"
                                    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        }



                        <div className='col-span-4'>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">IE/RG</label>
                            <input
                                type="text"
                                value={ieRg}
                                onChange={e => setIeRg(e.target.value)}
                                class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div className='col-span-3'>
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">OAB</label>
                            <input
                                type="text"
                                value={oab}
                                onChange={e => setOab(e.target.value)}
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
                                onBlur={checkCEP}
                                defaultValue={cep}
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
                                value={ibge}
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



                    <div className="mt-12">

                        <button
                            type="button"
                            onClick={handleSubmit}
                            class="mr-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{state?.id ? "Editar" : "Cadastrar"}</button>
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
