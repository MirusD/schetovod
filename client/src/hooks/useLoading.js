import { useSelector } from 'react-redux'
import { getTransactionsLoadingStatus } from '../store/transactionsSlice'
import { getBankAccountsLoadingStatus } from '../store/bankAccountsSlice'
import { getBankAccountTypesLoadingStatus } from '../store/typeBankAccountsSlice'
import { getBankAccountGroupsLoadingStatus } from '../store/bankAccountGroupsSlice'

const useLoading = () => {
    const loadingTransactionsStatus = useSelector(getTransactionsLoadingStatus())
    const loadingBankAccountsStatus = useSelector(getBankAccountsLoadingStatus())
    const loadingBankAccountTypes = useSelector(getBankAccountTypesLoadingStatus())
    const loadingBankAccountGroups = useSelector(getBankAccountGroupsLoadingStatus())

    const isLoadingTransactions = loadingTransactionsStatus === 'idle' || loadingTransactionsStatus === 'pending'
    const isLoadingBankAccounts = loadingBankAccountsStatus === 'idle' || loadingBankAccountsStatus === 'pending'
    const isLoadingBankAccountTypes = loadingBankAccountTypes === 'idle' || loadingBankAccountTypes === 'pending'
    const isLoadingBankAccountGroups = loadingBankAccountGroups === 'idle' || loadingBankAccountGroups === 'pending'

    const isLoading = isLoadingTransactions || isLoadingBankAccounts || isLoadingBankAccountTypes || isLoadingBankAccountGroups

    return {
        isLoadingTransactions,
        isLoadingBankAccounts,
        isLoadingBankAccountTypes,
        isLoadingBankAccountGroups,
        isLoading
    }
}

export default useLoading
