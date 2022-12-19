import React, { useState } from 'react'
import StyledTextField from '../common/form/styled/StyledTextField'
import StyledSelectField from '../common/form/styled/StyledSelectField'
import { useDispatch, useSelector } from 'react-redux'
import { getBankAccountById, getBankAccountsList, updateBankAccount } from '../../store/bankAccountsSlice'
import { useParams } from 'react-router-dom'
import validator from '../../utils/validator'
import { newTransaction } from '../../store/transactionsSlice'
import { setCurrentOpenModal } from '../../store/modalControllerSlice'

const NewTransferForm = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const { bankAccountId } = params
    const initialState = {
        amount: '',
        from: bankAccountId,
        to: ''
    }
    const [data, setData] = useState(initialState)
    const bankAccounts = useSelector(getBankAccountsList())
    const currentBankAccount = useSelector(getBankAccountById(bankAccountId))
    const toBankAccount = useSelector(getBankAccountById(data.to))
    const bankAccountsList = bankAccounts.map(ba => ({ label: ba.name, value: ba._id }))
    const [errors, setErrors] = useState({})

    const validatorConfig = {
        amount: {
            isRequired: {
                message: 'Поле обязательно для заполнения'
            }
        },
        to: {
            isRequired: {
                message: 'Поле обязательно для заполнения'
            }
        }
    }

    const validate = (validateData = data) => {
        const errors = validator(validateData, validatorConfig)
        setErrors(prevState => ({ ...prevState, ...errors }))
        return Object.values(errors).filter(e => e !== '').length === 0
    }

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
        const isValid = validate()
        if (isValid) {
            dispatch(updateBankAccount({
                data: {
                    ...currentBankAccount,
                    amount: Number(currentBankAccount.amount) - Number(data.amount)
                },
                bankAccountId
            }))
            dispatch(updateBankAccount({
                data: {
                    ...toBankAccount,
                    amount: Number(toBankAccount.amount) + Number(data.amount)
                },
                bankAccountId: toBankAccount._id
            }))
            dispatch(newTransaction(
                {
                    amount: data.amount,
                    categoryID: null,
                    type: 'Перевод',
                    bankAccountsID: [currentBankAccount._id, toBankAccount._id],
                    comment: ''
                }))
            dispatch(setCurrentOpenModal(''))
        }
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
                    error={errors.amount}
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
                    value={data.to}
                    onChange={handleChange}
                    defaultOption="Не выбрана..."
                    options={bankAccountsList.filter(ba => ba.value !== bankAccountId)}
                    error={errors.to}
                />
                <button className="inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none my-2 mt-8">
                    Перевести
                </button>
            </form>
        </>
    )
}

export default NewTransferForm
