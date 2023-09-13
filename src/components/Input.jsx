import React from 'react'

export default function Input({ name, label, type, id, autoComplete, className, style, placeholder, ...props }) {
    return (
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
                <label className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-200">
                    {label}
                </label>
                <div className="mt-2">
                    <input
                        type={type}
                        name={name}
                        id={id}
                        autoComplete={autoComplete}
                        className={className}
                        style={style}
                        placeholder={placeholder}
                        onChange={props.onChange}
                    />
                </div>

            </div>
        </div>
    )
}
