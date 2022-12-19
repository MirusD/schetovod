import React from 'react'
import Condition from './UI/Condition'
import { useSelector } from 'react-redux'
import { getTransactionsList } from '../store/transactionsSlice'
import { getBankAccountsList } from '../store/bankAccountsSlice'
import Analytics from './UI/Analytics'

const GeneralStatus = () => {
    const transactions = useSelector(getTransactionsList())
    const bankAccounts = useSelector(getBankAccountsList())
    const totalAmount = bankAccounts.reduce((acc, { amount }) => acc + Number(amount), 0)

    if (!bankAccounts.length) {
        return (
            <div className="text-3xl text-gray-600">
                У вас нет ни одного счёта. <br/>
                Вы можете добавить его нажав на плюс
            </div>
        )
    }
    return (
        <>
            <Condition total={totalAmount}/>
            <Analytics data={transactions}/>
        </>
    )
}

export default GeneralStatus
