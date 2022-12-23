import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import validator from '../../utils/validator'
import { setCurrentOpenModal } from '../../store/modalControllerSlice'
import StyledTextField from '../common/form/styled/StyledTextField'
import { getCategoryById, updateCategory } from '../../store/categoriesSlice'
import PropTypes from 'prop-types'
import StyledSelectField from '../common/form/styled/StyledSelectField'

const types = [
    { label: 'Доход', value: 'Доход' },
    { label: 'Расход', value: 'Расход' }
]

const CategoryEditForm = ({ categoryId }) => {
    const category = useSelector(getCategoryById(categoryId))
    const dispatch = useDispatch()
    const initialState = {
        name: category.name,
        type: category.type
    }
    const [data, setData] = useState(initialState)
    const [errors, setErrors] = useState({})

    const validatorConfig = {
        name: {
            isRequired: {
                message: 'Поле обязательно для заполнения'
            }
        },
        type: {
            isRequired: {
                message: 'Полу обязательно для заполенния'
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
            dispatch(updateCategory({ payload: data, categoryId }))
            dispatch(setCurrentOpenModal(''))
        }
    }
    return (
        <form onSubmit={handlerSubmite}>
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
                options={types}
                error={errors.type}
            />
            <button className="inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none my-2 mt-8">
                Сохранить
            </button>
        </form>
    )
}

CategoryEditForm.propTypes = {
    categoryId: PropTypes.string
}

export default CategoryEditForm
