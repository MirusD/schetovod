import React from 'react'
import CardInfo from '../common/cards/CardInfo'
import _ from 'lodash'
import moment from 'moment'
import PropTypes from 'prop-types'
import BarChart from '../common/charts/BarChart'

const Dynamics = ({ data = [] }) => {
    const withOutNull = data.filter(d => d.type !== 'Перевод')
    const group = _.groupBy(withOutNull, df => moment(df.createdAt).startOf('day').format())
    const keys = Object.keys(group).sort((a, b) => new Date(a) - new Date(b))
    const sum = keys.reduce((acc, key) => {
        const transactions = group[key]
        return {
            ...acc,
            [key]: transactions.reduce((acc2, t) => t.type === 'Доход'
                    ? [{ ...acc2[0], amount: acc2[0].amount + t.amount }, { ...acc2[1] }]
                    : [{ ...acc2[0] }, { ...acc2[1], amount: acc2[1].amount + t.amount }]
                , [
                    { amount: 0, type: 'Доход', createdAt: moment(key).format('DD.MM.YYYY') },
                    { amount: 0, type: 'Расход', createdAt: moment(key).format('DD.MM.YYYY') }
                ])
        }
    }, {})

    const test = keys.reduce((acc, key) => {
        const date = sum[key]
        return [...acc, {
            country: moment(key).format('DD.MM.YYYY'),
            Доход: date[0].amount,
            Расход: date[1].amount
        }]
    }, [])
    return (
        <CardInfo className="h-96">
            <CardInfo.Title>Динамика</CardInfo.Title>
            <CardInfo.Content>
                <BarChart data={test}/>
            </CardInfo.Content>
        </CardInfo>
    )
}

Dynamics.propTypes = {
    data: PropTypes.array
}

export default Dynamics
