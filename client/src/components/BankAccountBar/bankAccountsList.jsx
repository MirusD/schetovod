import React, { useState } from 'react'
import { PlusIcon } from "@heroicons/react/24/outline"
import { useDispatch } from "react-redux"
import { setCurrentOpenModal } from "../../store/modalControllerSlice"
import { useNavigate } from "react-router-dom"
import BankAccount from "../BankAccount"

const BankAccountsList = ({ bankAccounts }) => {
    const [currentBankAccount, setCurrentBankAccount] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleClick = (id) => {
        if (currentBankAccount === id ) {
            setCurrentBankAccount(null)
            navigate('/dashboard/bank-accounts/')
        } else {
            setCurrentBankAccount(id)
            navigate(`/dashboard/bank-accounts/${id}`)
        }
    }

    return (
        <ul className="mt-2 space-y-2">
            {bankAccounts.map(a => (
                <li key={a._id}>
                    <div onClick={() => handleClick(a._id)}>
                        <BankAccount
                            id={a._id}
                            name={a.name}
                            amount={a.amount}
                            typeID={a.typeID}
                            icon={a.icon}
                        />
                    </div>
                </li>
            ))}
            <li className={"flex flex-col py-2 px-2 hover:bg-green-100 cursor-pointer h-24 w-full rounded-md shadow-xl bg-white"} onClick={() => dispatch(setCurrentOpenModal('newBankAccount'))}>
                <PlusIcon/>
            </li>
        </ul>
    )
}

export default BankAccountsList
