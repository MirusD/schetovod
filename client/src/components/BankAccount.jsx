import React from 'react'
import { useParams } from "react-router-dom";
import card from "../static/icons/credit-card.svg";

const BankAccount = ({ id, name, amount, typeID, icon}) => {
    const params = useParams()
    const { bankAccountId } = params
    const getClassBankAccountItem = (id) => {
        return "flex flex-col py-2 px-2 hover:bg-green-100 cursor-pointer h-24 w-full rounded-md shadow-xl " + (bankAccountId === id ? "bg-green-100":"bg-white")
    }

    // const type = useSelector(getBankAccountTypeById(typeID))

    return (
        <div className={getClassBankAccountItem(id)}>
            <div className="flex justify-between">
                <img src={icon ? icon : card} className="h-9 w-9"/>
                <span className="text-green-600 font-bold">+{amount}</span>
            </div>
            <div className="mt-auto">
                <span>{name}</span>
            </div>
        </div>
    )
}

export default BankAccount
