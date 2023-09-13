import React, { useState } from 'react'
import Header from './Header';
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Paginacao from "./Paginacao";
export default function TabelaSimples({ dados, colunas, edit, handleEdit, handleClick, handleDelete }) {


    const [offset, setOffset] = useState(0)
    // console.log("COLUNAS -->>",colunas);
    // console.log("dados -->>",dados);
    //console.log("COLUNAS -->>",colunas);
    const limite = 10
    const inicioIndice = offset
    const finalIndice = inicioIndice + limite
    const itensAtual = dados.slice(inicioIndice, finalIndice);

    return (
        <>


            <table className="w-full shadow-md text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs rounded-xl text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                    <tr>

                        {colunas.map((item, index) => <Cabecalho key={index} item={item} />)}
                        {edit &&

                            <th scope="col" className="px-6 py-4 text-center">
                                Editar | Remover
                            </th>
                        }
                    </tr>
                </thead>
                <tbody>


                    {itensAtual.map((item, index) => <Linha key={index} item={item} colunas={colunas} edit={edit} handleClick={handleClick} handleEdit={handleEdit} handleDelete={handleDelete} />)}




                </tbody>
            </table>
            {dados.length > 10 &&

                <Paginacao
                    limit={limite}
                    total={dados.length}
                    offset={offset}
                    setOffset={setOffset}
                    inicioIndice={inicioIndice}
                    finalIndice={finalIndice}
                />
            }

        </>

    )
}


const Cabecalho = ({ item, index }) => <th key={index} scope="col" className="px-6 py-4 ">{item.head}</th>
const Linha = ({ item, colunas, edit, handleClick, handleEdit, handleDelete }) => (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

        {colunas.map((colunasItem, index) => <td key={index} onClick={handleClick ? () => handleClick(item) : () => { }} className="px-6 py-4">{item[`${colunasItem.value}`]}</td>)}
        {edit &&

            <td className="px-6 py-4 text-center">
                <div className='flex flex-row justify-center'>
                    <button onClick={handleEdit ? () => handleEdit(item) : () => { }} className="mr-4 text-xl font-medium text-blue-600 dark:text-blue-500 hover:underline"> <RiEdit2Fill />
                    </button>
                    <button onClick={handleDelete ? () => handleDelete(item) : () => { }} className="mr-4 text-xl font-medium text-red-600 dark:text-red-500 hover:underline"> <RiDeleteBin5Fill /> </button>

                </div>
            </td>
        }
    </tr>
)
