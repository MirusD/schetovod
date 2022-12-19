import React from 'react'
import CardInfo from '../common/cards/CardInfo'
import PieChart from '../common/charts/PieChart'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { getCategoriesProfit } from '../../store/categoriesSlice'
import ChartCurclePlaceholder from '../common/charts/ChartCurclePlaceholder'
import PropTypes from 'prop-types'

const Profits = ({ data = [] }) => {
    const transactionsProfit = data.filter(t => t.type === 'Доход')
    const profitCategories = useSelector(getCategoriesProfit())
    const isGetData = data.length && profitCategories.length && transactionsProfit.length
    const groupCategoriesById = _.groupBy(transactionsProfit, t => t.categoryID)
    const profitsList = Object.keys(groupCategoriesById).map(id => {
        const category = profitCategories.find(c => c._id === id)
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
        <CardInfo className="w-full h-[35rem]">
            <CardInfo.Title >
                Доходы
            </CardInfo.Title>
            <CardInfo.Content>
                { isGetData
                    ? <PieChart data={profitsList}/>
                    : <ChartCurclePlaceholder/>
                }
            </CardInfo.Content>
        </CardInfo>
    )
}

Profits.propTypes = {
    data: PropTypes.array
}

export default Profits
