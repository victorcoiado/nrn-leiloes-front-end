import React from 'react'

const MAX_ITEMS = 7
const MAX_LEFT = (MAX_ITEMS - 1) / 2

export default function Paginacao({ limit, total, offset, setOffset, inicioIndice, finalIndice }) {

    //Define qual a pagina atual que irá ficar no centro
    const paginaAtual = offset ? (offset / limit) + 1 : 1
    //Define qtas paginas será mostrada, pega o total de itens e divide pelo o limite q será mostrado e arrendonda pra cima caso o total de itens for um número quebrado
    const totalPaginas = Math.ceil(total / limit)
    const primeiroBotaoPagina = Math.max(paginaAtual - MAX_LEFT, 1)


    const mudaPagina = (pagina) => {
        setOffset((pagina - 1) * limit)
    }


    return (
        <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Mostrando <span className="font-semibold text-gray-900 dark:text-white">{inicioIndice + 1} - {finalIndice}</span> de <span className="font-semibold text-gray-900 dark:text-white">{total}</span></span>
            <ul
                className="inline-flex items-center -space-x-px"

            >
                <li key={paginaAtual}>
                    <button
                        onClick={() => mudaPagina(paginaAtual - 1)}
                        disabled={paginaAtual === 1}
                        className="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Anterior</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                    </button>
                </li>
                {Array.from({ length: Math.min(MAX_ITEMS, totalPaginas) })
                    .map((_, index) => index + primeiroBotaoPagina)

                    .map((pagina) => {
                        if (pagina <= totalPaginas)
                            return (

                                <li key={pagina}>
                                    <button
                                        onClick={() => mudaPagina(pagina)}
                                        className={pagina === paginaAtual ? "px-3 py-2 leading-tight text-gray-500 bg-gray-200 border border-gray-300 font-bold  dark:bg-secondary-dark-bg dark:border-gray-700  dark:text-gray-400 dark:font-bold"
                                            :
                                            "px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}

                                    >

                                        {pagina}

                                    </button>
                                </li>
                            )

                    })
                }
                {/* <li>
                    <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                </li>
                <li>
                    <a href="#" aria-current="page" class="z-10 px-3 py-2 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                </li>
                <li>
                    <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">...</a>
                </li>
                <li>
                    <a href="#" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">100</a>
                </li> */}
                <li>
                    <button
                        onClick={() => mudaPagina(paginaAtual + 1)}
                        disabled={paginaAtual === totalPaginas}
                        className="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        <span className="sr-only">Próximo</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                    </button>
                </li>
            </ul>
        </nav>
    )
}
