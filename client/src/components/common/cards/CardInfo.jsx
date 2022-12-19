import React, { useContext, useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import PropTypes from 'prop-types'

const context = React.createContext()

const CardInfo = ({ children, className, open = true }) => {
    const [isOpen, setIsOpen] = useState(open)
    return (
        <div className={`bg-white rounded-lg overflow-hidden mb-6 ring-1 ring-slate-900/5 min-w-[100%] sm:min-w-[425px] flex flex-col ${!isOpen ? ' h-auto self-start' : `${className}`} `}>
            <context.Provider value={[isOpen, setIsOpen]}>
                { children }
            </context.Provider>
        </div>
    )
}

const CardTitle = ({ children, label }) => {
    const [isOpen, setIsOpen] = useContext(context)
    return (
        <h1 className='text-slate-800 text-xl font-bold border-b p-4 flex justify-between items-center'>
            { children || label }
            <button
                className="h-6 w-6"
                onClick={() => setIsOpen(prevState => !prevState)}>
                {isOpen ? <ChevronUpIcon/> : <ChevronDownIcon/>}
            </button>
        </h1>
    )
}

const CardContent = ({ children }) => {
    const [isOpen] = useContext(context)
    if (!isOpen) return null
    return (
        <div className="pt-4 pb-4 grow">
            {children}
        </div>
    )
}

CardInfo.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    className: PropTypes.string,
    open: PropTypes.bool
}
CardTitle.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    label: PropTypes.string
}
CardContent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
CardInfo.Title = CardTitle
CardInfo.Content = CardContent

export default CardInfo
