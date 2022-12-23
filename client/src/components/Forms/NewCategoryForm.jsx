import React, { useState } from 'react'
import validator from '../../utils/validator'
import StyledTextField from '../common/form/styled/StyledTextField'
import StyledSelectField from '../common/form/styled/StyledSelectField'
import { useDispatch } from 'react-redux'
import { addNewCategory } from '../../store/categoriesSlice'
import { setCurrentOpenModal } from '../../store/modalControllerSlice'

const listTypes = [
    { label: 'Доход', value: 'Доход' },
    { label: 'Расход', value: 'Расход' }
]

const NewCategoryForm = () => {
    const initialState = {
        name: '',
        type: ''
    }
    const [data, setData] = useState(initialState)
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()
    const validatorConfig = {
        name: {
            isRequired: {
                message: 'Поле обязательно для заполнения'
            }
        },
        type: {
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
    const handleSubmite = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (isValid) {
            dispatch(addNewCategory(data))
            dispatch(setCurrentOpenModal(''))
        }
    }
    return (
        <form onSubmit={handleSubmite}>
            <StyledTextField
                name="name"
                label="Название категории"
                type="text"
                value={data.name}
                placeholder="Название категории"
                onChange={handleChange}
                error={errors.name}
            />
            <StyledSelectField
                name="type"
                label="Тип категории"
                value={data.type}
                onChange={handleChange}
                defaultOption="Не выбрана..."
                options={listTypes}
                error={errors.type}
            />
            <button className="inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none my-2 mt-8">
                Создать
            </button>
        </form>
    )
}

export default NewCategoryForm
