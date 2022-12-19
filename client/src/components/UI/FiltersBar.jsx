import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import CardInfo from '../common/cards/CardInfo'
import StyledSelectField from '../common/form/styled/StyledSelectField'
import { useSelector } from 'react-redux'
import { getCategoriesList } from '../../store/categoriesSlice'
import PropTypes from 'prop-types'

const FiltersBar = ({ data = [], filterSet, filter }) => {
    const yearsGroup = _.groupBy(data, d => moment(d.createdAt).startOf('year').format())
    const yearsMonth = _.groupBy(data, d => moment(d.createdAt).startOf('month').format())
    const years = Object.keys(yearsGroup).map(year => {
        const yearFormat = moment(year).format('YYYY')
        return { label: yearFormat, value: yearFormat }
    })
    const months = Object.keys(yearsMonth).map(month => {
        const monthFormat = moment(month).format('MMMM')
        return { label: monthFormat, value: monthFormat }
    })
    const types = [
        { label: 'Доход', value: 'Доход' },
        { label: 'Расход', value: 'Расход' },
        { label: 'Перевод', value: 'Перевод' }
    ]
    const categories = useSelector(getCategoriesList()).map(category => ({ label: category.name, value: category._id }))

    const handleChange = (target) => {
        const { name, value } = target
        if (target) {
            filterSet(prevState => ({
                ...prevState,
                [name]: value
            }))
        }
    }

    return (
        <CardInfo open={false}>
            <CardInfo.Title>Фильтр</CardInfo.Title>
            <CardInfo.Content>
                <div className="pl-4 pr-4 grid grid-cols-4 gap-x-4">
                    <StyledSelectField
                        name="year"
                        label="Год"
                        value={filter.year}
                        onChange={handleChange}
                        defaultOption="Не выбрана..."
                        options={years}
                    />
                    <StyledSelectField
                        name="month"
                        label="Месяц"
                        value={filter.month}
                        onChange={handleChange}
                        defaultOption="Не выбрана..."
                        options={months}
                    />
                    <StyledSelectField
                        name="type"
                        label="Тип"
                        value={filter.type}
                        onChange={handleChange}
                        defaultOption="Не выбрана..."
                        options={types}
                    />
                    <StyledSelectField
                        name="category"
                        label="Категория"
                        value={filter.category}
                        onChange={handleChange}
                        defaultOption="Не выбрана..."
                        options={categories}
                    />
                </div>
            </CardInfo.Content>
        </CardInfo>
    )
}

FiltersBar.propTypes = {
    data: PropTypes.array,
    filterSet: PropTypes.func,
    filter: PropTypes.object
}

export default FiltersBar
