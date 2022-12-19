import React from 'react'
import PropTypes from 'prop-types'

const Card = ({ children, className }) => {
    return (
        <div className={'bg-white rounded-lg ring-1 ring-slate-900/5 shadow-xl p-8 min-w-[100%] sm:min-w-[425px] flex flex-col ' + className}>
            { children }
        </div>
    )
}

const CardTitle = ({ children, label }) => {
    return (
        <h1 className='text-slate-800 mb-6 text-5xl'>{ children || label }</h1>
    )
}

Card.Title = CardTitle

Card.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    className: PropTypes.string
}
CardTitle.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    label: PropTypes.string
}

export default Card
