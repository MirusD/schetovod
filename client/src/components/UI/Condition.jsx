import React from 'react'
import Balance from './Balance'
import PropTypes from 'prop-types'

const Condition = ({ total }) => {
    return (
        <div className="flex justify-between text-4xl rounded-md text-gray-600 mb-8">
            Общий баланс:
            <Balance value={total}/>
        </div>
    )
}

Condition.propTypes = {
    total: PropTypes.number
}

export default Condition
