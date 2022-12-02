import React, { useState } from 'react'
import StyledTextField from "../common/form/styled/StyledTextField"
import StyledSelectField from "../common/form/styled/StyledSelectField"
import { useSelector } from "react-redux"
import { getBankAccountsList } from "../../store/bankAccountsSlice"
import { useParams } from "react-router-dom"

const NewTransferForm = () => {
    const params = useParams()
    const { bankAccountId } = params
    const bankAccounts = useSelector(getBankAccountsList())
    const bankAccountsList =
        bankAccounts.map(ba => ({label: ba.name, value: ba._id}))


    const initialState = {
        amount: '',
        from: bankAccountId,
        to: ''
    }
    const [data, setData] = useState(initialState)
    const handleChange = (target) => {
        const { name, value } = target
        if (target) {
            setData(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
    }
    const handlerSubmite = (e) => {
        e.preventDefault()
        console.log(data)
    }
    return (
        <>
            <form onSubmit={handlerSubmite}>
                <StyledTextField
                    name="amount"
                    label="Сумма"
                    type="number"
                    value={data.amount}
                    placeholder="Сумма"
                    onChange={handleChange}
                />
                <StyledSelectField
                    name="from"
                    label="Откуда"
                    value={bankAccountId}
                    onChange={handleChange}
                    defaultOption={bankAccountId}
                    options={bankAccountsList}
                    disabled={true}
                />
                <StyledSelectField
                    name="to"
                    label="Куда"
                    value={data.category}
                    onChange={handleChange}
                    defaultOption="Не выбрана..."
                    options={bankAccountsList.filter(ba => ba.value !== bankAccountId)}
                />
                <button className="inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none my-2 mt-8">
                    Перевести
                </button>
            </form>
        </>
    )
}

export default NewTransferForm
