import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import BankAccountsBar from '../components/BankAccountBar/BankAccountsBar'
import { getBankAccounts } from '../store/bankAccountsSlice'
import { getBankAccountTypes } from '../store/typeBankAccountsSlice'
import { loadCategoriesList } from '../store/categoriesSlice'
import { useDispatch } from 'react-redux'
import { getTransactions } from '../store/transactionsSlice'
import { getBankAccountGroups } from '../store/bankAccountGroupsSlice'

const DashboardLayout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBankAccounts())
        dispatch(getBankAccountGroups())
        dispatch(getBankAccountTypes())
        dispatch(loadCategoriesList())
        dispatch(getTransactions())
    }, [])

    return (
        <div
            className="container mx-auto mt-6 grid grid-cols-[1fr_8fr] mb-4"
        >
            <div className="">
                <BankAccountsBar/>
            </div>
            <div className="ml-4">
                <Outlet/>
            </div>
        </div>
    )
}

export default DashboardLayout
