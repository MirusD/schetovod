import React, { useState } from 'react'
import StyledTextField from '../common/form/styled/StyledTextField'
import StyledSelectField from '../common/form/styled/StyledSelectField'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentOpenModal } from '../../store/modalControllerSlice'
import { getTypesBankAccountList } from '../../store/typeBankAccountsSlice'
import SelectIconsField from '../common/form/SelectIconsField'
import card from '../../static/icons/bankAccountsIcons/credit-card.svg'
import validator from '../../utils/validator'
import { createBankAccount, getBankAccountsList } from '../../store/bankAccountsSlice'
import bankAccountsIcons from '../../static/icons/bankAccountsIcons'
import { createBankAccountGroup, getBankAccountGroupsList } from '../../store/bankAccountGroupsSlice'
import SelectFieldWithBtn from '../common/form/SelectFieldWithBtn'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

const listIcons = bankAccountsIcons

const NewBankAccount = () => {
    const [newGroup, setNewGroup] = useState(false)
    const types = useSelector(getTypesBankAccountList())
    const bankAccounts = useSelector(getBankAccountsList())
    const groups = useSelector(getBankAccountGroupsList())

    const listTypes = types.map(t => ({ label: t.name, value: t._id }))
    const listGroups = groups.map(g => ({ label: g.name, value: g._id }))
    const isNewGroup = !bankAccounts.length || newGroup
    const initialState = {
        name: '',
        amount: '',
        typeId: '',
        groupId: '',
        newGroup: isNewGroup ? 'Мои счета' : '',
        icon: card
    }
    const [data, setData] = useState(initialState)
    const dispatch = useDispatch()
    const [errors, setErrors] = useState({})

    const validatorConfig = isNewGroup ? {
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
        newGroup: {
            isRequired: {
                message: 'Поле обязательно для заполнения'
            }
        }
    } : {
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
    const handlerSubmite = async (e) => {
        e.preventDefault()
        const isValid = validate()
        if (isValid) {
            const group = isNewGroup ? await dispatch(createBankAccountGroup({
                    name: !newGroup ? 'Мои счета' : data.newGroup
            })) : {}
            dispatch(createBankAccount({
                name: data.name,
                amount: data.amount,
                typeId: data.typeId,
                icon: data.icon,
                groupId: isNewGroup ? group.payload._id : data.groupId
            }))
            dispatch(setCurrentOpenModal(''))
        }
    }

    const handleEnabledFieldNewGroup = (e) => {
        e.preventDefault()
        setNewGroup(prevState => !prevState)
        setData(prevState => ({ ...prevState, groupId: '' }))
        setErrors(prevState => ({}))
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
                <SelectFieldWithBtn
                    name="groupId"
                    label="Группа"
                    value={data.groupId}
                    onChange={handleChange}
                    defaultOption="Не выбрана..."
                    options={listGroups}
                    error={errors.groupId}
                    disabled={isNewGroup}
                >
                    <button className="w-full h-full" onClick={handleEnabledFieldNewGroup}>
                        {newGroup
                            ? <MinusIcon className='text-white h-9 w-full'/>
                            : <PlusIcon className='text-white h-9 w-full'/>
                        }
                    </button>
                </SelectFieldWithBtn>
                {newGroup &&
                    <StyledTextField
                        name="newGroup"
                        label="Новая группа"
                        value={data.newGroup}
                        placeholder="Название новой группы"
                        onChange={handleChange}
                        error={errors.newGroup}
                    />}
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
