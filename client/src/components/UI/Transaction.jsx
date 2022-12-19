import React from 'react'
import { useSelector } from 'react-redux'
import { getBankAccountById } from '../../store/bankAccountsSlice'
import { getCategoryById } from '../../store/categoriesSlice'
import { ArrowsRightLeftIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { NumericFormat } from 'react-number-format'
import PropTypes from 'prop-types'

const Transaction = ({ amount, bankAccountsID, type, categoryID }) => {
    const isTransfer = type === 'Перевод'
    const bankAccount = useSelector(getBankAccountById(bankAccountsID[0]))
    const transferToBankAccount = useSelector(getBankAccountById(bankAccountsID[1]))
    const category = useSelector(getCategoryById(categoryID))
    const getIconType = (type) => {
        switch (type) {
            case 'Доход':
                return <PlusIcon className="h-10 w-10"/>
            case 'Расход':
                return <MinusIcon className="h-10 w-10"/>
            case 'Перевод':
                return <ArrowsRightLeftIcon className="h-10 w-10"/>
            default:
                return ''
        }
    }
    if (!bankAccount) return 'Loading...'
    return (
        <div className="grid grid-cols-[1fr_1fr_1fr] items-center">
            <div className="flex items-center">
                <div className="rounded-full bg-green-400 text-white h-12 w-12 mr-4 flex justify-center items-center">
                    {getIconType(type)}
                </div>
                <div>
                    <p>
                        <NumericFormat
                            value={amount}
                            displayType={'text'}
                            thousandSeparator={true}
                            suffix={'₽'}
                        />
                    </p>
                    <p className="text-sm text-gray-400">{type}</p>
                </div>
            </div>
            {!isTransfer
                ? <span>{type === 'Доход' ? 'Зачислено на счёт:' : 'Списано со счёта:'} { bankAccount.name }</span>
                : <span>с { bankAccount.name } -&gt; на { transferToBankAccount.name }</span>
            }
            <span className="justify-self-end">{ category?.name || '-' }</span>
        </div>
    )
}

Transaction.propTypes = {
    amount: PropTypes.number,
    bankAccountsID: PropTypes.array,
    type: PropTypes.string,
    categoryID: PropTypes.string
}

export default Transaction
