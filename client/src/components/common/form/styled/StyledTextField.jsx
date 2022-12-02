import React from 'react'
import TextField from "../TextField"
import PropTypes from "prop-types";

const StyledTextField = (props) => {
    const MainIcon = props.icon ? props?.icon[0] : null
    const ShowPasswordIcon = props.icon ? props?.icon[1] : null
    const HidePasswordIcon = props.icon ? props?.icon[2] : null

    return (
        <TextField
            {...props}
            containerClassName="mt-4 mb-5"
            inputContainerClassName="relative text-slate-500"
            inputClassName={`w-full py-2 px-3 ${MainIcon ? 'sm:pl-12' : ''} rounded-md flex items-center h-12 shadow-sm focus:outline-none ring-1 ring-slate-900/10 focus:ring-2 focus:ring-green-600 hover:ring-slate-300`}
            labelClassName="block mb-1"
            icon={[
                MainIcon && <MainIcon className="h-6 w-6 absolute z-10 inset-y-3 left-4 hidden sm:inline-block"/>,
                HidePasswordIcon && <HidePasswordIcon className="relative w-6 h-6"/>,
                ShowPasswordIcon && <ShowPasswordIcon className="relative w-6 h-6"/>
            ]}
        />
    )
}

StyledTextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    using: PropTypes.bool,
    icon: PropTypes.array
}

export default StyledTextField
