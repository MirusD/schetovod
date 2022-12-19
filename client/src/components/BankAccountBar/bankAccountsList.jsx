import React from 'react'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useParams } from 'react-router-dom'
import { NumericFormat } from 'react-number-format'
import card from '../../static/icons/bankAccountsIcons/credit-card.svg'
import PropTypes from 'prop-types'

const BankAccountsList = ({ children }) => {
    return (
        <>{children}</>
    )
}

const BankAccountsListGroup = ({ name, children, id, isOpen, onClick }) => {
    return (
        <div className="border-b pb-2 mb-2">
            <div className="flex justify-between items-center mb-3">
                <span className="text-slate-500 text-gray-600 uppercase font-bold">{name}</span>
                <button className="relative border border-gray-600 rounded-md text-2xl text-white font-bold h-7 w-7" onClick={() => onClick(id)}>
                        <span className="absolute inset-1 text-gray-800">
                            {isOpen ? <MinusIcon/> : <PlusIcon/>}
                        </span>
                </button>
            </div>
            {isOpen && <>{children}</>}
        </div>
    )
}

const BankAccountsListItem = ({ item, onClick }) => {
    const { _id: id, name, amount, icon } = item
    const params = useParams()
    const { bankAccountId } = params
    const classBankAccountItem =
        'flex flex-col py-2 px-2 hover:bg-green-100 cursor-pointer h-24 w-full rounded-md shadow-xl mb-2 ' + (bankAccountId === id ? 'bg-green-100' : 'bg-white')

    return (
        <div className={classBankAccountItem} onClick={() => onClick(id)}>
            <div className="flex justify-between">
                <img src={icon && card} className="h-9 w-9"/>
                <span className="text-green-600 font-bold">
                    <NumericFormat
                        value={amount}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'₽'}
                    />
                </span>
            </div>
            <div className="mt-auto">
                <span>{name}</span>
            </div>
        </div>
    )
}

const BankAccountsListSkeleton = () => {
    return (
        <div className='relative group rounded-md opacity-75 animate-pulse'>
            <div className='relative'>
                {/* bankAccount */}
                <div className='mt-2 mb-4 w-full max-w-[65ch] h-20 bg-slate-300 rounded-md' />
            </div>
        </div>)
}

BankAccountsList.Group = BankAccountsListGroup
BankAccountsListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    onClick: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
BankAccountsList.Item = BankAccountsListItem
BankAccountsListItem.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func
}
BankAccountsList.ItemSkeleton = BankAccountsListSkeleton
BankAccountsList.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default BankAccountsList
