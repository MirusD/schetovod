import React from 'react'
import PropTypes from 'prop-types'

const SelectField = ({
    label,
    value,
    name,
    onChange,
    defaultOption,
    options,
    error,
    disabled,
    selectClassName
}) => {
    const optionsArray =
        !Array.isArray(options) && typeof options === 'object'
            ? Object.values(options)
            : options
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value })
    }
    return (
        <div className="relative w-full">
            <label className="mb-1 block">
                {label}
            </label>
            <select
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                className={selectClassName}
            >
                <option value="">
                    {defaultOption}
                </option>
                {optionsArray.length > 0 &&
                    optionsArray.map(option => (
                        <option value={option.value} key={option.value}>
                            {option.label}
                        </option>
                    ))}

            </select>
            {error && <div className="absolute text-slate-500 ring-blue-700 ring-opacity-5 whitespace-nowrap appearance-none rounded block w-full sm:text-sm -bottom-6 text-end"
            >
                {error}
            </div>}
        </div>
    )
}

SelectField.propTypes = {
    defaultOption: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string,
    disabled: PropTypes.bool,
    selectClassName: PropTypes.string
}

export default SelectField
