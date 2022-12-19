import React from 'react'
import CardInfo from '../common/cards/CardInfo'
import PieChart from '../common/charts/PieChart'
import { useSelector } from 'react-redux'
import { getCategoriesExpense } from '../../store/categoriesSlice'
import _ from 'lodash'
import ChartCurclePlaceholder from '../common/charts/ChartCurclePlaceholder'
import PropTypes from 'prop-types'

const Expenses = ({ data = [] }) => {
    const transactionsExpense = data.filter(t => t.type === 'Расход')
    const expenseCategories = useSelector(getCategoriesExpense())
    const isGetData = data.length && expenseCategories.length && transactionsExpense.length
    const groupCategoriesById = _.groupBy(transactionsExpense, t => t.categoryID)
    const expenseList = Object.keys(groupCategoriesById).map(id => {
        const category = expenseCategories.find(c => c._id === id)
        return groupCategoriesById[id].reduce((acc, t) => {
            return {
                ...acc,
                value: acc.value + t.amount
            }
        }, {
            id: category?.name,
            label: category?.name,
            value: 0,
            color: 'hsl(176, 70%, 50%)'
        })
    })

    return (
        <CardInfo className='w-full h-[35rem]'>
            <CardInfo.Title>
                Расходы
            </CardInfo.Title>
            <CardInfo.Content>
                {isGetData
                    ? <PieChart data={expenseList}/>
                    : <ChartCurclePlaceholder/>
                }

            </CardInfo.Content>
        </CardInfo>
    )
}

Expenses.propTypes = {
    data: PropTypes.array
}

export default Expenses
