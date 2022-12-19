import { combineReducers, configureStore } from '@reduxjs/toolkit'
import bankAccountReducer from './bankAccountsSlice'
import transactionReducer from './transactionsSlice'
import authReducer from './authSlice'
import modalControllerReducer from './modalControllerSlice'
import typeBankAccountReducer from './typeBankAccountsSlice'
import categoriesReducer from './categoriesSlice'
import messageReducer from './messageSlice'
import bankAccountGroupsReducer from './bankAccountGroupsSlice'

const rootReducer = combineReducers({
    bankAccounts: bankAccountReducer,
    bankAccountGroups: bankAccountGroupsReducer,
    typesBankAccount: typeBankAccountReducer,
    transactions: transactionReducer,
    auth: authReducer,
    modal: modalControllerReducer,
    categories: categoriesReducer,
    message: messageReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}
