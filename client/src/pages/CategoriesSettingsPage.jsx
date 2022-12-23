import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getCategoriesExpense,
    getCategoriesNoExisting,
    getCategoriesProfit,
    recoveryCategory
} from '../store/categoriesSlice'
import CardInfo from '../components/common/cards/CardInfo'
import { setCurrentOpenModal } from '../store/modalControllerSlice'
import PropTypes from 'prop-types'

const CategoryItem = ({ name, id, onEditCategory, onRemoveCategory, onRevocerCategory, existing }) => {
    return (
        <li className=" py-2 px-4 cursor-pointer hover:bg-green-100 flex justify-between items-center border-b last:border-none">
            <span>{name}</span>
            {existing ? (
                <div>
                    <button
                        className="bg-green-600 hover:bg-green-500 focus:outline-none rounded-md text-white py-1 px-3 mr-2"
                        onClick={() => onEditCategory(id)}
                    >
                        Изменить
                    </button>
                    <button
                        className="bg-red-700 hover:bg-red-600 focus:outline-none rounded-md text-white py-1 px-3"
                        onClick={() => onRemoveCategory(id)}
                    >
                        Удалить
                    </button>
                </div>
            ) : (
                <button
                    className="bg-green-600 hover:bg-green-500 focus:outline-none rounded-md text-white py-1 px-3"
                    onClick={() => onRevocerCategory(id)}
                >
                    Востановить
                </button>
            )
            }
        </li>
    )
}

const CategoriesSettingsPage = () => {
    const categoriesProfit = useSelector(getCategoriesProfit()).filter(c => c.existing)
    const categoriesExpense = useSelector(getCategoriesExpense()).filter(c => c.existing)
    const categoriesNoExisting = useSelector(getCategoriesNoExisting())
    const dispatch = useDispatch()
    const handleEditCategory = (id) => {
        dispatch(setCurrentOpenModal({ current: 'categoryEdit', data: id }))
    }
    const handleRemoveCategory = (id) => {
        dispatch(setCurrentOpenModal({ current: 'removeCategory', data: id }))
    }
    const handleCreateCategory = () => {
        dispatch(setCurrentOpenModal({ current: 'newCategory' }))
    }
    const handleRecoverCategory = (id) => {
        dispatch(recoveryCategory(id))
    }
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl">Настройка категории</h1>
                <button
                    className="inline-flex items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-500 focus:outline-none"
                    onClick={() => handleCreateCategory()}
                >
                    Добавить категорию
                </button>
            </div>
            <CardInfo>
                <CardInfo.Title>
                    Категории для доходов
                </CardInfo.Title>
                <CardInfo.Content>
                    <ul>
                        {categoriesProfit.map(category => (
                            <CategoryItem
                                key={category._id}
                                name={category.name}
                                id={category._id}
                                existing={category.existing}
                                onEditCategory={handleEditCategory}
                                onRemoveCategory={handleRemoveCategory}
                            />
                        ))}
                    </ul>
                </CardInfo.Content>
            </CardInfo>
            <CardInfo>
                <CardInfo.Title>
                    Категории для расходов
                </CardInfo.Title>
                <CardInfo.Content>
                    <ul>
                        {categoriesExpense.map(category => (
                            <CategoryItem
                                key={category._id}
                                name={category.name}
                                id={category._id}
                                existing={category.existing}
                                onEditCategory={handleEditCategory}
                                onRemoveCategory={handleRemoveCategory}
                            />
                        ))}
                    </ul>
                </CardInfo.Content>
            </CardInfo>
            {categoriesNoExisting.length !== 0 && (
                <CardInfo>
                    <CardInfo.Title>
                        Удаленные категории
                    </CardInfo.Title>
                    <CardInfo.Content>
                        <ul>
                            {categoriesNoExisting.map(category => (
                                <CategoryItem
                                    key={category._id}
                                    name={category.name}
                                    id={category._id}
                                    existing={category.existing}
                                    onEditCategory={handleEditCategory}
                                    onRemoveCategory={handleRemoveCategory}
                                    onRevocerCategory={handleRecoverCategory}
                                />
                            ))}
                        </ul>
                    </CardInfo.Content>
                </CardInfo>
            )
            }
        </div>
    )
}

CategoryItem.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    onEditCategory: PropTypes.func,
    onRemoveCategory: PropTypes.func,
    onRevocerCategory: PropTypes.func,
    existing: PropTypes.bool
}

export default CategoriesSettingsPage
