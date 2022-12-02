import React from 'react'
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline"
import BankAccountsList from "./bankAccountsList"

const BankAccountsGroup = ({ name, bankAccounts, id, isOpenId, onClickBtnAccordionStatus }) => {
    return (
        <div className="border-b pb-2 mb-2">
            <div className="flex justify-between items-center">
                <span className="text-slate-500 text-gray-600 uppercase font-bold">{name}</span>
                <button className="relative border border-gray-600 rounded-md text-2xl text-white font-bold h-7 w-7" onClick={() => onClickBtnAccordionStatus(id)}>
                        <span className="absolute inset-1 text-gray-800">
                            {isOpenId === id ? <MinusIcon/> : <PlusIcon/>}
                        </span>
                </button>
            </div>
            {isOpenId === id && <BankAccountsList bankAccounts={bankAccounts}/>}
        </div>
    )
}

export default BankAccountsGroup
