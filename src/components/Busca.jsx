import React from 'react'

export default function Busca({ value, onChange }) {

    const handleChange = (e) => {
        onChange(e.target.value)
    }



    return (
        <div>

            <input
                type="search"
                value={value}
                onChange={handleChange}
                id="table-search-users"
                class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-50 sm:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Busca por pessoa" />

        </div>
    )
}
