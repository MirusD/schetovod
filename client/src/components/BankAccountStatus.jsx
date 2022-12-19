import React, { useEffect } from 'react'
import BankAccountControllerBar from './BankAccountBar/BankAccountControllerBar'
import { useNavigate, useParams } from 'react-router-dom'
import { getBankAccountById, getBankAccountsLoadingStatus } from '../store/bankAccountsSlice'
import { useSelector } from 'react-redux'
import { getTransactionsListById, getTransactionsLoadingStatus } from '../store/transactionsSlice'
import Balance from './UI/Balance'
import Analytics from './UI/Analytics'
import { getBankAccountTypeById } from '../store/typeBankAccountsSlice'

const BankAccountStatusSkeleton = () => {
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

const BankAccountStatus = () => {
    const { bankAccountId } = useParams()
    const currentBankAccount = useSelector(getBankAccountById(bankAccountId))
    const transactions = useSelector(getTransactionsListById(bankAccountId))
    const loadingTransactionsStatus = useSelector(getTransactionsLoadingStatus())
    const loadingBankAccountsStatus = useSelector(getBankAccountsLoadingStatus())
    const typeBankAccount = useSelector(getBankAccountTypeById(currentBankAccount?.typeId))
    const navigate = useNavigate()

    const isLoading = loadingTransactionsStatus === 'idle' || loadingTransactionsStatus === 'pending' ||
        loadingBankAccountsStatus === 'idle' || loadingBankAccountsStatus === 'pending'

    useEffect(() => {
        if (!currentBankAccount && !isLoading) navigate('/dashboard/bank-accounts', { replace: false })
    }, [isLoading])

    if (isLoading) return <BankAccountStatusSkeleton/>
    return (
        <>
            {currentBankAccount && typeBankAccount && !isLoading && (
                <div>
                    <div className="flex justify-between">
                        <div>
                            <BankAccountControllerBar disabled={!currentBankAccount.existing}/>
                        </div>
                        <div className="flex justify-end items-start grow text-4xl">
                            <Balance value={currentBankAccount.amount}/>
                        </div>
                    </div>
                    <p className="text-4xl">{currentBankAccount.name}</p>
                    <p className="mb-4 text-2xl">{typeBankAccount.name}</p>
                    <Analytics data={transactions}/>
                </div>)
            }
        </>
    )
}

export default BankAccountStatus
