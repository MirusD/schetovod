import React from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { getTransactionById } from '../store/transactionsSlice'
import { getCurrentOpenModal } from '../store/modalControllerSlice'
import { getCategoryById } from '../store/categoriesSlice'
import { getBankAccountById } from '../store/bankAccountsSlice'
import { NumericFormat } from 'react-number-format'

const TransactionDetails = () => {
    const { id } = useSelector(getCurrentOpenModal())
    const transaction = useSelector(getTransactionById(id))
    const category = useSelector(getCategoryById(transaction.categoryID))
    const bankAccount = useSelector(getBankAccountById(transaction.bankAccountsID[0]))
    return (
        <>
            <div className="grid grid-cols-2 gap-y-3 mt-4 mb-4 text-gray-600">
                <span>Сумма:</span>
                <span>
                    <NumericFormat
                        value={transaction.amount}
                        displayType={'text'}
                        thousandSeparator={true}
                        suffix={'₽'}
                    />
                </span>
                <span>Тип:</span><span>{transaction.type}</span>
                <span>Счёт:</span><span>{bankAccount.name}</span>
                <span>Категория:</span><span>{category.name}</span>
                <span>Дата:</span><span>{moment(transaction.createdAt).format('DD.MM.YYYY')}</span>
                <span>Комментарии:</span><span>{transaction.component}</span>
            </div>
            <button className="inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none my-2 mt-8">Удалить</button>
        </>
    )
}

export default TransactionDetails
