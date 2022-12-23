import React, { useState } from 'react'
import StyledTextField from '../common/form/styled/StyledTextField'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getBankAccountGroupsById, updateBankAccountGroup } from '../../store/bankAccountGroupsSlice'
import validator from '../../utils/validator'
import { setCurrentOpenModal } from '../../store/modalControllerSlice'

const GroupEditFrom = ({ groupId }) => {
    const group = useSelector(getBankAccountGroupsById(groupId))
    const dispatch = useDispatch()
    const initialState = {
        name: group.name
    }
    const [data, setData] = useState(initialState)
    const [errors, setErrors] = useState({})

    const validatorConfig = {
        name: {
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
    const closeModal = () => {
        dispatch(setCurrentOpenModal(''))
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
            dispatch(updateBankAccountGroup({ payload: data, groupId }))
            closeModal()
        }
    }
    const handleRemoveGroup = (e) => {
        e.preventDefault()
        dispatch(setCurrentOpenModal({ current: 'removeGroup', data: groupId }))
    }
    return (
        <form onSubmit={handlerSubmite}>
            <StyledTextField
                name="name"
                label="Название группы"
                type="text"
                value={data.name}
                placeholder="Название категории"
                onChange={handleChange}
                error={errors.name}
            />
            <div className="flex">
                <button className="inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none my-2 mt-4 mr-2">
                    Сохранить
                </button>
                <button
                    className="inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-600 focus:outline-none my-2 mt-4"
                    onClick={handleRemoveGroup}
                >
                    Удалить
                </button>
            </div>
        </form>
    )
}

GroupEditFrom.propTypes = {
    groupId: PropTypes.string
}

export default GroupEditFrom
