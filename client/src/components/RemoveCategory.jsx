import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setCurrentOpenModal } from '../store/modalControllerSlice'
import { removeCategory } from '../store/categoriesSlice'

const RemoveCategory = ({ categoryId }) => {
    const dispatch = useDispatch()
    const closeModal = () => {
        dispatch(setCurrentOpenModal(''))
    }
    const handleRemoveCategory = () => {
        dispatch(removeCategory(categoryId))
        closeModal()
    }

    const handleCancelRemoveCategory = () => {
        closeModal()
    }
    return (
        <div>
            <span className="mt-5 block">Вы уверены что хотите удалить категорию?</span>
            <div className="flex justify-between">
                <button
                    className="inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-600 focus:outline-none my-2 mt-8 mr-2"
                    onClick={handleRemoveCategory}
                >
                    Да
                </button>
                <button
                    className="inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none my-2 mt-8"
                    onClick={handleCancelRemoveCategory}
                >
                    Отмена
                </button>
            </div>
        </div>
    )
}

RemoveCategory.propTypes = {
    categoryId: PropTypes.string
}

export default RemoveCategory
