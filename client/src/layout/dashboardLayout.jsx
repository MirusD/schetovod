import React, { useEffect } from 'react'
import { Outlet } from "react-router-dom"
import BankAccountsBar from "../components/BankAccountBar/BankAccountsBar"
import Modals from "../components/Modals"
import { loadBankAccountsList } from "../store/bankAccountsSlice"
import { loadTypeBankAccountsList } from "../store/typeBankAccountsSlice"
import { loadCategoriesList } from "../store/categoriesSlice"
import {useDispatch} from "react-redux";
import {loadTransactionsList} from "../store/transactionsSlice";

const DashboardLayout = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadBankAccountsList())
        dispatch(loadTypeBankAccountsList())
        dispatch(loadCategoriesList())
        dispatch(loadTransactionsList())
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
            <Modals/>
        </div>
    )
}

export default DashboardLayout
