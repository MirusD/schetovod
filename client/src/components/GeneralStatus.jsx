import React from 'react'
import Profits from "./Profits";
import Condition from "./Condition";
import Dynamics from "./Dynamics"
import Expenses from "./Expenses";
import {useSelector} from "react-redux";
import {getTransactionsList} from "../store/transactionsSlice";
import Transactions from "./Transactions";
import {getBankAccountsList} from "../store/bankAccountsSlice";

const GeneralStatus = () => {
    const transactions = useSelector(getTransactionsList())
    const bankAccounts = useSelector(getBankAccountsList())

    if (!bankAccounts.length) return "Loading..."

    const totalAmount = bankAccounts.reduce((acc, { amount }) => acc + Number(amount), 0)

    return (
        <>
            <Condition total={totalAmount}/>
            <Dynamics/>
            <div className="flex flex-wrap">
                <Profits/>
                <Expenses/>
            </div>
            <Transactions transactions={transactions}/>
        </>
    )
}

export default GeneralStatus
