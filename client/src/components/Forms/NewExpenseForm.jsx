import React, { useState } from 'react'
import StyledTextField from '../common/form/styled/StyledTextField'
import { useDispatch, useSelector } from 'react-redux'
import { addNewCategory, getCategoriesExpense } from '../../store/categoriesSlice'
import { useParams } from 'react-router-dom'
import { getBankAccountById, updateBankAccount } from '../../store/bankAccountsSlice'
import { setCurrentOpenModal } from '../../store/modalControllerSlice'
import { newTransaction } from '../../store/transactionsSlice'
import validator from '../../utils/validator'
import SelectFieldWithBtn from '../common/form/SelectFieldWithBtn'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

const NewExpenseForm = () => {
    const initialState = {
        amount: '',
        category: '',
        newCategory: '',
        comment: ''
    }
    const [data, setData] = useState(initialState)
    const [newCategory, setNewCategory] = useState(false)
    const dispatch = useDispatch()
    const { bankAccountId } = useParams()
    const currentBankAccount = useSelector(getBankAccountById(bankAccountId))
    const categories = useSelector(getCategoriesExpense())
    const categoriesList = categories.map(category => ({ label: category.name, value: category._id }))
    const [errors, setErrors] = useState({})

    const validatorConfig = newCategory
        ? {
            amount: {
                isRequired: {
                    message: 'Поле обязательно для заполнения'
                },
                isNegative: {
                    message: 'Сумма траты больше остатка на счету'
                }
            },
            newCategory: {
                isRequired: {
                    message: 'Полe обязательно для заполнения'
                }
            }
        }
        : {
            amount: {
                isRequired: {
                    message: 'Поле обязательно для заполнения'
                }
            },
            category: {
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
        const isValid = validate({ ...data, amount: data.amount ? currentBankAccount.amount - data.amount : data.amount })
        if (isValid) {
            if (data.newCategory) {
                const newCategory = await dispatch(addNewCategory({
                    name: data.newCategory,
                    type: 'Расход',
                    icon: ''
                }))
                addExpense({ ...data, category: newCategory._id })
            } else {
                setNewCategory(false)
                addExpense(data)
            }
            function addExpense(data) {
                const updatedBankAccount = { ...currentBankAccount, amount: currentBankAccount.amount - data.amount }
                dispatch(updateBankAccount({ data: updatedBankAccount, bankAccountId }))
                dispatch(newTransaction(
                    {
                        amount: data.amount,
                        categoryID: data.category,
                        type: 'Расход',
                        bankAccountsID: [updatedBankAccount._id],
                        comment: ''
                    }))
                dispatch(setCurrentOpenModal(''))
            }
        }
    }

    const handleEnabledFieldNewCategory = (e) => {
        e.preventDefault()
        setNewCategory(prevState => !prevState)
        setData(prevState => ({ ...prevState, category: '' }))
        setErrors(prevState => ({}))
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
                <SelectFieldWithBtn
                    name="category"
                    label="Категория"
                    value={data.category}
                    onChange={handleChange}
                    defaultOption="Не выбрана..."
                    options={categoriesList}
                    error={errors.category}
                    disabled={newCategory}
                >
                    <button className="w-full h-full" onClick={handleEnabledFieldNewCategory}>
                        {newCategory
                            ? <MinusIcon className='text-white h-9 w-full'/>
                            : <PlusIcon className='text-white h-9 w-full'/>
                        }
                    </button>
                </SelectFieldWithBtn>
                {newCategory &&
                    <StyledTextField
                        name="newCategory"
                        label="Новая категория"
                        value={data.newCategory}
                        placeholder="Название новой категории"
                        onChange={handleChange}
                        error={errors.newCategory}
                    />
                }
                <button className="inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none my-2 mt-8">
                    Применить
                </button>
            </form>
        </>
    )
}

export default NewExpenseForm
