import React from 'react'

const CardInfo = ({ children, className }) => {
    return (
        <div className={`bg-white rounded-lg overflow-hidden mb-6 ring-1 ring-slate-900/5 min-w-[100%] sm:min-w-[425px] flex flex-col ` + className}>
            { children }
        </div>
    )
}

const CardTitle = ({ children, label }) => {
    return (
        <h1 className='text-slate-800 text-xl font-bold border-b p-4'>{ children || label }</h1>
    )
}

const CardContent = ({ children }) => {
    return (
        <div className="grow p-4 pt-0">
            {children}
        </div>
    )
}

CardInfo.Title = CardTitle
CardInfo.Content = CardContent

export default CardInfo
