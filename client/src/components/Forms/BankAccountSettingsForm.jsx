import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTypesBankAccountList } from '../../store/typeBankAccountsSlice'
import { getBankAccountById, updateBankAccount } from '../../store/bankAccountsSlice'
import { setCurrentOpenModal } from '../../store/modalControllerSlice'
import { getBankAccountGroupsList } from '../../store/bankAccountGroupsSlice'
import validator from '../../utils/validator'
import StyledTextField from '../common/form/styled/StyledTextField'
import StyledSelectField from '../common/form/styled/StyledSelectField'
import SelectIconsField from '../common/form/SelectIconsField'
import bankAccountsIcons from '../../static/icons/bankAccountsIcons'
import PropTypes from 'prop-types'

const listIcons = bankAccountsIcons

const BankAccountSettingsForm = ({ bankAccountId }) => {
    const currentBankAccount = useSelector(getBankAccountById(bankAccountId))
    const types = useSelector(getTypesBankAccountList())
    const groups = useSelector(getBankAccountGroupsList())
    const listGroups = groups.map(group => ({ label: group.name, value: group._id }))

    const listTypes = types.map(t => ({ label: t.name, value: t._id }))
    const initialState = {
        name: currentBankAccount.name,
        amount: String(currentBankAccount.amount),
        typeId: currentBankAccount.typeId,
        groupId: currentBankAccount.groupId,
        icon: currentBankAccount.icon
    }
    const dispatch = useDispatch()
    const [data, setData] = useState(initialState)
    const [errors, setErrors] = useState({})

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
        typeId: {
            isRequired: {
                message: 'Поле обязательно для заполнения'
            }
        },
        groupId: {
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
            dispatch(updateBankAccount({ data, bankAccountId }))
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
                    name="typeId"
                    label="Тип счета"
                    value={data.typeId}
                    onChange={handleChange}
                    defaultOption="Не выбрана..."
                    options={listTypes}
                    error={errors.typeId}
                />
                <StyledSelectField
                    name="groupId"
                    label="Группа"
                    value={data.groupId}
                    onChange={handleChange}
                    defaultOption="Не выбрана..."
                    options={listGroups}
                    error={errors.groupId}
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

BankAccountSettingsForm.propTypes = {
    bankAccountId: PropTypes.string
}

export default BankAccountSettingsForm
