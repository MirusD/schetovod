import React from 'react'
import Condition from './UI/Condition'
import { useSelector } from 'react-redux'
import { getTransactionsList } from '../store/transactionsSlice'
import { getBankAccountsList } from '../store/bankAccountsSlice'
import Analytics from './UI/Analytics'
import useLoading from '../hooks/useLoading'

const GeneralStatus = () => {
    const { isLoadingTransactions, isLoadingBankAccounts } = useLoading()
    const transactions = useSelector(getTransactionsList())
    const bankAccounts = useSelector(getBankAccountsList())
    const totalAmount = bankAccounts.reduce((acc, { amount }) => acc + Number(amount), 0)
    const isLoading = isLoadingBankAccounts || isLoadingTransactions

    if (isLoading) {
        return (
            <BankAccountStatusSkeleton/>
        )
    }
    if (!bankAccounts.length && !isLoading) {
        return (
            <div className="text-3xl text-gray-600">
                У вас нет ни одного счёта. <br/>
                Вы можете добавить его нажав на плюс
            </div>
        )
    }
    return (
        <>
            <Condition total={totalAmount}/>
            <Analytics data={transactions}/>
        </>
    )
}

function BankAccountStatusSkeleton() {
    return (
        <div className='relative group rounded-md opacity-75 animate-pulse'>
            <div className='absolute -inset-y-2.5 -inset-x-4 md:-inset-y-4 md:-inset-x-6 sm:rounded-2xl'></div>
            <div className='relative'>
                {/* bankAccountControllBar */}
                <div className='h-16 mb-4 w-full bg-slate-300 rounded-md'></div>
                {/* bankAccountTitle */}
                <div className='h-16 max-w-[35ch] mb-4 w-full bg-slate-300 rounded-md'></div>
                {/* filter */}
                <div className='h-16 mb-4 w-full bg-slate-300 rounded-md'></div>
                {/* dinamics */}
                <div className='mt-4 mb-4 w-full w-full h-80 bg-slate-300 rounded-md' />
                {/* profit */}
                <div className='mt-4 mb-4 w-full w-full h-80 bg-slate-300 rounded-md' />
                {/* expense */}
                <div className='mt-4 mb-4 w-full w-full h-80 bg-slate-300 rounded-md' />
                {/* transactions */}
                <div className='mt-4 mb-4 w-full w-full h-80 bg-slate-300 rounded-md' />
            </div>
        </div>
    )
}

export default GeneralStatus
