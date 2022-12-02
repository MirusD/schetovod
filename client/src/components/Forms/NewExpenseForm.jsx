import React, { useState } from 'react'
import StyledTextField from "../common/form/styled/StyledTextField"
import StyledSelectField from "../common/form/styled/StyledSelectField"
import { useDispatch, useSelector } from "react-redux"
import { getCategoriesExpense } from "../../store/categoriesSlice"
import { useParams } from "react-router-dom"
import { getBankAccountById, updateBankAccount } from "../../store/bankAccountsSlice"
import { setCurrentOpenModal } from "../../store/modalControllerSlice"
import { newTransaction } from "../../store/transactionsSlice"


const NewExpenseForm = () => {
    const dispatch = useDispatch()
    const { bankAccountId } = useParams()
    const currentBankAccount = useSelector(getBankAccountById(bankAccountId))
    const categories = useSelector(getCategoriesExpense())
    const categoriesList = categories.map(category => ({label: category.name, value: category._id}))
    const initialState = {
        amount: '',
        category: ''
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
        const updatedBankAccount = {...currentBankAccount, amount: currentBankAccount.amount - data.amount}
        dispatch(updateBankAccount(updatedBankAccount))
        dispatch(newTransaction(
            {
                _id: Date.now(),
                amount: data.amount,
                categoryID: data.category,
                type: "Расход",
                bankAccountsID: [updatedBankAccount._id],
                comment: "",
                createdAt: Date.now()
            }))
        dispatch(setCurrentOpenModal(""))
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
                    name="category"
                    label="Категория"
                    value={data.category}
                    onChange={handleChange}
                    defaultOption="Не выбрана..."
                    options={categoriesList}
                />
                <button className="inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none my-2 mt-8">
                    Применить
                </button>
            </form>
        </>
    )
}

export default NewExpenseForm
