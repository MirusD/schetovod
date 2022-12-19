import React, { useState } from 'react'
import Dynamics from './Dynamics'
import Profits from './Profits'
import Expenses from './Expenses'
import FiltersBar from './FiltersBar'
import Transactions from './Transactions'
import moment from 'moment'
import PropTypes from 'prop-types'

const Analytics = ({ data = [] }) => {
    const [filter, setFilter] = useState({
        year: moment(new Date()).format('YYYY'),
        month: moment(new Date()).format('MMMM'),
        type: '',
        category: ''
    })

    const filterYear = data.filter(d => filter.year ? moment(d.createdAt).format('YYYY') === filter.year : true)
    const filterMonth = filterYear.filter(d => filter.month ? moment(d.createdAt).format('MMMM') === filter.month : true)
    const filterType = filterMonth.filter(d => filter.type ? filter.type === d.type : true)
    const filterCategory = filterType.filter(d => filter.category ? filter.category === d.categoryID : true)
    return (
        <>
            <FiltersBar data={data} filterSet={setFilter} filter={filter}/>
            <Dynamics data={filterCategory}/>
            <Profits data={filterCategory}/>
            <Expenses data={filterCategory}/>
            <Transactions transactions={filterCategory}/>
        </>
    )
}

Analytics.propTypes = {
    data: PropTypes.array
}

export default Analytics
