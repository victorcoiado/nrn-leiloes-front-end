import React, { useMemo, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import Paginacao from "./Paginacao";

const Tabela = ({ id, cabecalho, dados, visualizar, editar, deletar }) => {
  const [possuiAcoes, setPossuiAcoes] = useState(visualizar !== undefined || editar !== undefined || deletar !== undefined)
  const { currentColor } = useStateContext();
  const [busca, setBusca] = useState("")
  const [offset, setOffset] = useState(0)

  // const buscaTabela = useMemo(() => {
  //   if (dados) {
  //     return dados.filter(item => item.nota.toString().includes(busca));
  //   }
  //   return dados;
  // }, [busca, dados]);


  const limite = 10
  const inicioIndice = offset
  const finalIndice = inicioIndice + limite
  const itensAtual = dados.slice(inicioIndice, finalIndice); // buscaTabela.slice(inicioIndice, finalIndice)

  return (
    <div className="overflow-x-auto">
      <div className="min-w-fit flex items-center justify-center bg-white font-sans overflow-hidden dark:bg-secondary-dark-bg">
        <div className="w-full lg:w-5/6">
          <div className="bg-white pt-2 rounded my-6 dark:bg-secondary-dark-bg">

            {/* INPUT PESQUISAR NA TABELA - REFATORAR O CODIGO E CRIAR UM COMPONENTE*/}
            <div className="relative mt-1 mb-3 dark:bg-secondary-dark-bg">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              </div>
              <input
                type="number"
                id="table-search"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Pesquise pelo número da nota"
                onChange={e => setBusca(e.target.value)}
              >

              </input>
            </div>

            <table className="min-w-max w-full table-auto">
              <thead>
                <tr
                  className="text-white text-sm leading-normal uppercase"
                  style={{ background: currentColor }}
                >
                  {cabecalho.map((item, index) => (
                    <th className="py-3 px-5 text-center" key={index}>
                      {item}
                    </th>
                  ))}
                  {possuiAcoes && <th className="py-3 px-5 text-center">Ações</th>}
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {dados.length === 0 ? (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td
                      colSpan="8"
                      className="py-3 px-6 text-center whitespace-nowrap"
                    >
                      <div className="flex items-center justify-center">
                        <span className="font-medium">Não há resultados.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  itensAtual.map((item, index) => (
                    <tr key={index}
                      className={index % 2 === 0
                        ? "border-b border-gray-200 hover:bg-gray-100 dark:bg-main-dark-bg dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        : "border-b border-gray-200 hover:bg-gray-100 bg-gray-50 dark:bg-secondary-dark-bg dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                      }
                    >
                      {Object.values(item).map((val, index) => (
                        <td
                          className="py-3 px-6 text-center whitespace-nowrap"
                          key={index}
                        >
                          {/* <div className="bg-green-200 text-green-600 py-1 px-3 rounded-full text-xs"> */}
                          <div className="flex items-center justify-center">
                            <span className="font-medium">{val}</span>
                          </div>
                        </td>
                      ))}

                      {possuiAcoes &&
                        <td className="py-3 px-6 text-center whitespace-nowrap">
                          <div className="flex item-center justify-center">
                            {visualizar && <div
                              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer"
                              onClick={() => visualizar(item)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </div>}
                            {editar && <div
                              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer"
                              onClick={() => editar(item)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </div>}
                            {deletar && <div
                              className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110 cursor-pointer"
                              onClick={() => deletar(item)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </div>}
                          </div>
                        </td>}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {dados &&

              <Paginacao
                limit={limite}
                total={dados.length}
                offset={offset}
                setOffset={setOffset}
                inicioIndice={inicioIndice}
                finalIndice={finalIndice}
              />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabela;
