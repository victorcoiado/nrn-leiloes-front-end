import React from 'react'
import Select, { Props } from "react-select";
import makeAnimated from 'react-select/animated';

export default function SelectCustom({ options, defaultValue, setValueFromChild, isMulti, placeholder, closeMenuOnSelect }) {


    const animatedComponents = makeAnimated();



    // const handleTipoPessoa = (e) => {
    //     setValueFromChild(e)

    //     // setValues(e)
    //     // setTipoPessoa(e);
    // }


    const controlStyles = {
        base: "border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600  hover:cursor-pointer",
        focus: "border rounded-lg bg-white dark:bg-gray-700 hover:cursor-pointer ring-blue-500 border-blue-500 dark:ring-blue-500 dark:border-blue-500 dark:text-gray-100 text-sm",
        nonFocus: "border rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600  hover:cursor-pointer border-gray-300 hover:border-gray-400 dark:text-gray-100 text-sm",
    };
    const placeholderStyles = "sm:text-sm dark:text-gray-400 pl-1 py-0.5";
    const selectInputStyles = "pl-1 py-0.5";
    const valueContainerStyles = "p-1 gap-1";
    // {
    //     base: "p-1 gap-1",
    //     focus: "p-1 gap-1 dark:text-gray-700 text-gray-50"

    // };
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
    return (
        <div>
            <Select
                value={defaultValue}
                closeMenuOnSelect={false}
                maxMenuHeight={220}
                components={animatedComponents}
                loadingMessage="(...)"
                noOptionsMessage={() => "Nenhuma opção encontrada."}
                isSearchable
                isMulti={isMulti}
                closeMenuOnSelect={closeMenuOnSelect}
                unstyled
                options={options}
                onChange={e => setValueFromChild(e)}
                placeholder={placeholder}
                loadOptions={options}

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

            />
        </div>
    )
}
