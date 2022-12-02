import React, { useState } from 'react'
import StyledTextField from "../common/form/styled/StyledTextField"
import StyledSelectField from "../common/form/styled/StyledSelectField"
import {useDispatch, useSelector} from "react-redux"
import {setCurrentOpenModal} from "../../store/modalControllerSlice"
import {getTypesBankAccountList} from "../../store/typeBankAccountsSlice"
import SelectIconsField from "../common/form/SelectIconsField"
import card from "../../static/icons/credit-card.svg"
import bank from "../../static/icons/bank.svg"
import validator from "../../utils/validator"
import { createBankAccount } from "../../store/bankAccountsSlice"

const listIcons = [
    { label: 'card', value: card },
    { label: 'bank', value: bank },
]

const NewBankAccount = () => {
    const types = useSelector(getTypesBankAccountList())

    const listTypes = types.map(t => ({label: t.name, value: t._id}))
    const initialState = {
        name: '',
        amount: '',
        typeID: '',
        icon: card
    }
    const dispatch = useDispatch()
    const [data, setData] = useState(initialState)
    const [errors, setErrors] = useState({})
    const [usingField, setUsingField] = useState({login: false, password: false})

    const validatorConfig = {
        name: {
            isRequired: {
                message: 'Поле обязательно для заполнения'
            }
        },
        amount: {
            isRequired: {
                message: 'Поле обязательно для заполнения'
            }
        },
        typeID: {
            isRequired: {
                message: 'Поле обязательно для заполнения'
            }
        }
    }

    const validate = (validateData = data) => {
        const errors = validator(validateData, validatorConfig)
        setErrors(prevState => ({...prevState, ...errors}))
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
            dispatch(createBankAccount({...data, _id: String(Date.now())}))
            dispatch(setCurrentOpenModal(''))
        }
    }

    return (
        <>
            <form onSubmit={handlerSubmite}>
                <StyledTextField
                    name="name"
                    label="Название счета"
                    type="text"
                    value={data.name}
                    placeholder="Название счета"
                    onChange={handleChange}
                    error={errors.name}
                />
                <StyledSelectField
                    name="typeID"
                    label="Тип счета"
                    value={data.typeID}
                    onChange={handleChange}
                    defaultOption="Не выбрана..."
                    options={listTypes}
                    error={errors.typeID}
                />
                <StyledTextField
                    name="amount"
                    label="Текущая сумма на счету"
                    type="number"
                    value={data.amount}
                    placeholder="0"
                    onChange={handleChange}
                    error={errors.amount}
                />
                <SelectIconsField
                    name="icon"
                    label="Выберите иконку"
                    value={data.icon}
                    onChange={handleChange}
                    defaultOption="Не выбрана..."
                    options={listIcons}
                />
                <button className="inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none my-2 mt-8">
                    Применить
                </button>
            </form>
        </>
    )
}

export default NewBankAccount
