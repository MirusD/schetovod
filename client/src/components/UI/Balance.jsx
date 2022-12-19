import React from 'react'
import { NumericFormat } from 'react-number-format'
import PropTypes from 'prop-types'

const Balance = ({ value }) => {
    return (
        <span className="flex items-center text-green-600 font-bold">
            <NumericFormat
                value={value}
                displayType={'text'}
                thousandSeparator={true}
                suffix={'₽'}
            />
        </span>
    )
}

Balance.propTypes = {
    value: PropTypes.number
}

export default Balance
