import React from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { getTransactionById, removeTransaction } from '../store/transactionsSlice'
import { getCurrentOpenModal, setCurrentOpenModal } from '../store/modalControllerSlice'
import { getCategoryById } from '../store/categoriesSlice'
import { getBankAccountById, updateBankAccount } from '../store/bankAccountsSlice'
import { NumericFormat } from 'react-number-format'

const TransactionDetails = () => {
    const { data } = useSelector(getCurrentOpenModal())
    const dispatch = useDispatch()
    const transaction = useSelector(getTransactionById(data))
    const category = useSelector(getCategoryById(transaction.categoryID))
    const bankAccountFrom = useSelector(getBankAccountById(transaction.bankAccountsID[0]))
    const bankAccountTo = useSelector(getBankAccountById(transaction.bankAccountsID[1]))
    const closeModal = () => {
        dispatch(setCurrentOpenModal(''))
    }
    const removeExpenceBankAccountFrom = () => {
        const updatedData = { ...bankAccountFrom, amount: bankAccountFrom.amount + transaction.amount }
        dispatch(updateBankAccount({ data: updatedData, bankAccountId: bankAccountFrom._id }))
        dispatch(removeTransaction(data))
        closeModal()
    }
    const removeProfitBankAccountFrom = () => {
        const updatedData = { ...bankAccountFrom, amount: bankAccountFrom.amount - transaction.amount }
        dispatch(updateBankAccount({ data: updatedData, bankAccountId: bankAccountFrom._id }))
        dispatch(removeTransaction(data))
        closeModal()
    }
    const removeProfitBankAccountTo = () => {
        const updatedData = { ...bankAccountTo, amount: bankAccountTo.amount - transaction.amount }
        dispatch(updateBankAccount({ data: updatedData, bankAccountId: bankAccountTo._id }))
        dispatch(removeTransaction(data))
        closeModal()
    }
    const handleRemoveTransaction = () => {
        switch (transaction.type) {
            case 'Доход':
                removeProfitBankAccountFrom()
                break
            case 'Расход':
                removeExpenceBankAccountFrom()
                break
            case 'Перевод':
                removeExpenceBankAccountFrom()
                removeProfitBankAccountTo()
                break
            default:
                console.log('oppps')
        }
    }
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
                <span>Счёт:</span><span>{transaction.bankAccountsID.length === 2 ? bankAccountFrom.name + ' -> ' + bankAccountTo.name : bankAccountFrom.name}</span>
                <span>Категория:</span><span>{category.name}</span>
                <span>Дата:</span><span>{moment(transaction.createdAt).format('DD.MM.YYYY')}</span>
                <span>Комментарии:</span><span>{transaction.comment}</span>
            </div>
            <button
                className="inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none my-2 mt-8"
                onClick={handleRemoveTransaction}
            >
                Удалить
            </button>
        </>
    )
}

export default TransactionDetails
