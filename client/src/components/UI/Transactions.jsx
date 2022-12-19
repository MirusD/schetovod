import React, { useState } from 'react'
import CardInfo from '../common/cards/CardInfo'
import _ from 'lodash'
import moment from 'moment'
import 'moment/locale/ru'
import Transaction from './Transaction'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setCurrentOpenModal } from '../../store/modalControllerSlice'
import Pagination from '../common/Pagination'
import { paginate } from '../../utils/pagination'
import TransactionsListPlaceholder from './TransactionsListPlaceholder'
moment.locale('ru')

const Transactions = ({ transactions = [] }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 6
    const count = transactions.length
    const sortTransactions = [...transactions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    const userCrop = paginate(sortTransactions, currentPage, pageSize)
    const groupTransactions = _.groupBy(userCrop, t =>
        moment(t.createdAt).startOf('day').format())
    const groupTransactionsKeys = Object.keys(groupTransactions)
    const dispatch = useDispatch()
    const handleClick = (id) => {
        dispatch(setCurrentOpenModal({ current: 'transaction', id }))
    }
    const handlePageChange = (pageIndex) => setCurrentPage(pageIndex)
    if (!transactions) return 'Loading...'
    return (
        <CardInfo>
            <CardInfo.Title>
                <div className="flex justify-between">
                    <span> История операции </span>
                </div>
            </CardInfo.Title>
            <CardInfo.Content>
                <ul>
                    { !transactions.length &&
                        <div className="h-60">
                            <TransactionsListPlaceholder/>
                        </div>
                    }
                    {groupTransactionsKeys.map(date => (
                        <div key={date}>
                            <div className="mt-4 pl-4">
                                {moment(date).calendar(null, {
                                    sameDay: '[Сегодня]',
                                    nextDay: '[Завтра]',
                                    nextWeek: 'dddd',
                                    lastDay: '[Вчера]',
                                    lastWeek: 'DD.MM.YYYY',
                                    sameElse: 'DD.MM.YYYY'
                                })}
                            </div>
                            {
                                groupTransactions[date].map(transaction => (
                                    <li key={transaction._id} className="p-4 hover:bg-green-100 cursor-pointer" onClick={() => handleClick(transaction._id)}>
                                        <Transaction
                                            amount={transaction.amount}
                                            bankAccountsID={transaction.bankAccountsID}
                                            type={transaction.type}
                                            date={transaction.createdAt}
                                            categoryID={transaction.categoryID}
                                        />
                                    </li>
                                ))
                            }
                        </div>
                    ))}
                </ul>
                <div className="flex justify-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </CardInfo.Content>
        </CardInfo>
    )
}

Transactions.propTypes = {
    transactions: PropTypes.array
}

export default Transactions
