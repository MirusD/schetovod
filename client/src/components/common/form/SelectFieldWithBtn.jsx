import React from 'react'
import StyledSelectField from './styled/StyledSelectField'
import PropTypes from 'prop-types'

const SelectFieldWithBtn = (props) => {
    const {
        name,
        label,
        value,
        onChange,
        defaultOption,
        options,
        error,
        children,
        className
    } = props
    return (
        <div className={'flex items-end ' + className}>
            <StyledSelectField
                name={name}
                label={label}
                value={value}
                onChange={onChange}
                defaultOption={defaultOption}
                options={options}
                error={error}
                {...props}
            />
            <div className="border rounded h-12 w-14 ml-2 bg-indigo-600 hover:bg-indigo-500">
                {children}
            </div>
        </div>
    )
}

SelectFieldWithBtn.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    options: PropTypes.array,
    error: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    className: PropTypes.string
}

export default SelectFieldWithBtn
