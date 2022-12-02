import React, { useState } from 'react'
import PropTypes from 'prop-types'

const TextField = (
    {
        name,
        label,
        type,
        value,
        placeholder,
        disabled,
        onChange,
        error,
        containerClassName,
        inputContainerClassName,
        inputClassName,
        labelClassName,
        icon,
        using,
        ...rest
    }) => {
    const [showPassword, setShowPassword] = useState(false)
    const toggleShowPassword = () => setShowPassword(prevState => !prevState)
    const handleChange = ({ target }) => {
        onChange({name: target.name, value: target.value})
    }
    const getInputClasses = () => {
        return inputClassName
            + (error ? ' is-invalid' : '')
            + (type === 'password' ? ' pr-10':'')
            + (using ? 'ring-1 ring-green-700 focus:ring-green-700': '')
    }

    return (
        <div className={containerClassName}>
            <label
                className={labelClassName}
                htmlFor={name}
            >{label}</label>
            <div className={inputContainerClassName}>
                {icon[0]}
                <input
                    {...rest}
                    name={name}
                    id={name}
                    type={showPassword ? "text" : type}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={handleChange}
                    className={getInputClasses()}
                />
                {type === 'password' && (
                    <button
                        className="absolute inset-y-0.5 right-2.5 btn btn-outline-secondary"
                        type='button'
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? icon[2] : icon[1]}
                    </button>
                )}
                {error && <div className="absolute text-slate-500 ring-blue-700 ring-opacity-5 whitespace-nowrap appearance-none rounded block w-full sm:text-sm -bottom-6 text-end"
                >
                    {error}
                </div>}
            </div>
        </div>
    )
}

TextField.defaultProps = {
    type: 'text'
}
TextField.propTypes = {
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

export default TextField

