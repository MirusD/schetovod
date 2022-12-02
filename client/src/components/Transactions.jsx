import React from 'react'
import CardInfo from "./common/cards/CardInfo"
import {useSelector} from "react-redux";
import {getBankAccountById} from "../store/bankAccountsSlice";

const TransactionItem = ({ amount, bankAccountID, type, date}) => {
    const bankAccountName = useSelector(getBankAccountById(bankAccountID))
    if (!bankAccountName) return 'Loading...'
    return (
        <>
            <span>{amount}</span>
            <span>{bankAccountName.name}</span>
            <span>{type}</span>
            <span>{date}</span>
        </>
    )
}

const Transactions = ({ transactions }) => {
    const getColor = (type) => type === 'Доход' ? 'bg-green-200': type === 'Расход' ? 'bg-red-200':'bg-yellow-200'
    if (!transactions) return 'Loading...'
    return (
        <CardInfo>
            <CardInfo.Title>
                История операции
            </CardInfo.Title>
            <CardInfo.Content>
                <div className="grid grid-cols-[1fr_1fr_1fr_1fr]">
                    <span>Сумма</span>
                    <span>Счёт</span>
                    <span>Тип</span>
                    <span>Дата</span>
                </div>
                <ul className="">
                    {transactions.map(transaction => (
                        <li key={transaction._id} className={"h-9 grid grid-cols-[1fr_1fr_1fr_1fr] items-center cursor-pointer border-b border-b-gray-400 justify-between hover:bg-gray-100 " + getColor(transaction.type)}>
                            <TransactionItem
                                amount={transaction.amount}
                                bankAccountID={transaction.bankAccountsID[0]}
                                type={transaction.type}
                                date={transaction.createdAt}
                            />
                        </li>
                    ))}
                </ul>
            </CardInfo.Content>
        </CardInfo>
    )
}

export default Transactions
