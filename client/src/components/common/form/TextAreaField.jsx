import React from 'react'
import PropTypes from 'prop-types'

const textAreaField = ({ label, name, value, onChange, error, placeholder, disabled, textAreaClassName, labelClassName, containerClassName }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value })
    }

    const getInputClasses = () => {
        return 'form-control ' + (error ? ' is-invalid ' : ' ') + textAreaClassName
    }

    return (
        <div className={'mb-4 ' + containerClassName}>
            <label
                className={labelClassName}
                htmlFor={name}
            >
                {label}
            </label>{' '}
            <div className="input-group has-validation">
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    )
}

textAreaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    textAreaField: PropTypes.string,
    labelClassName: PropTypes.string,
    containerClassName: PropTypes.string
}

export default textAreaField
