import React, { useState } from 'react'
import { useSelector } from "react-redux"
import { getBankAccountsList } from "../../store/bankAccountsSlice"
import BankAccountsGroup from "./BankAccountsGroup"

const BankAccountsBar = () => {
    const users = [{id: 0, name: "Ваши счета"}]
    const [isOpenId, setIsOpenId] = useState(0)
    const handleClickBtnAccordionStatus = (id) => {
        setIsOpenId(prevState => prevState !== id ? id : 'null')
    }
    const bankAccounts = useSelector(getBankAccountsList())

    if (!bankAccounts) return "Loading..."
    return (
        <div>
            {users.map(u => (
                <BankAccountsGroup
                    key={u.id}
                    name={u.name}
                    id={u.id}
                    isOpenId={isOpenId}
                    bankAccounts={bankAccounts}
                    onClickBtnAccordionStatus={handleClickBtnAccordionStatus}
                />
            ))}
        </div>
    )
}

export default BankAccountsBar
