import React from 'react'
import BankAccountControllerBar from "./BankAccountBar/BankAccountControllerBar"
import Profits from "./Profits"
import Expenses from "./Expenses"
import { useParams } from "react-router-dom"
import { getBankAccountById } from "../store/bankAccountsSlice"
import { useSelector } from "react-redux"
import { getTransactionsListById } from "../store/transactionsSlice"
import Transactions from "./Transactions"
import rubIcon from "../static/icons/rub.svg"

const BankAccountStatus = () => {
    const { bankAccountId } = useParams()
    const transactions = useSelector(getTransactionsListById(bankAccountId))
    const currentBankAccount = useSelector(getBankAccountById(bankAccountId))

    if (!transactions || !currentBankAccount) return "Loading..."

    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <BankAccountControllerBar/>
                </div>
                <div className="flex justify-end items-start grow text-4xl">
                    <span className="flex items-center text-green-600 font-bold">{currentBankAccount.amount}&#8381;</span>
                </div>
            </div>
            <div className="flex">
                <Profits/>
                <Expenses/>
            </div>
            <Transactions transactions={transactions}/>
        </div>
    )
}

export default BankAccountStatus
