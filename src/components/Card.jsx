import React from 'react'

export default function Card({ icon, title, subtitle, num = '.', cor }) {

    return (
        <>
            <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md dark:bg-gray-800 dark:border-gray-700 dark:shadow-none">
                <div className={cor == "azul" ? "bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center dark:shadow-none" : cor == "verde" ? "bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center dark:shadow-none" : "bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center dark:shadow-none"}>
                    {icon}
                </div>
                <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600 dark:text-white">{title}</p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900 dark:text-white">{num}</h4>
                </div>
                <div className="border-t border-gray-700 p-4">
                    <p className="block antialiased font-sans text-base leading-relaxed font-normal text-blue-gray-600">
                        <strong className="text-green-500">{subtitle}</strong>&nbsp;
                    </p>
                </div>
            </div>
        </>
    )
}
