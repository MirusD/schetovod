import React from 'react'
import PropTypes from 'prop-types'
import TextAreaField from '../TextAreaField'

const StyledTextAreaField = (props) => {
    return (
        <TextAreaField
            {...props}
            containerClassName="mb-4 mt-4"
            textAreaClassName="w-full h-32 py-2 px-3 rounded-md flex items-center h-12 shadow-sm focus:outline-none ring-1 ring-slate-900/10 focus:ring-2 focus:ring-green-600 hover:ring-slate-300"
            labelClassName="block mb-1"
        />
    )
}

StyledTextAreaField.propTypes = {
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

export default StyledTextAreaField
