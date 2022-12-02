import React from 'react'

const Condition = ({ total }) => {
    return (
        <div className="flex justify-between text-4xl rounded-md text-gray-600 mb-8">
            Общий баланс:
            <span className="text-green-600 font-bold">{total}&#8381;</span>
        </div>
    )
}

export default Condition
