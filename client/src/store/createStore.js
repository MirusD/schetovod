import { combineReducers, configureStore } from "@reduxjs/toolkit"
import bankAccountReducer from "./bankAccountsSlice"
import transactionReducer from "./transactionsSlice"
import authReducer from "./authSlice"
import modalControllerReducer from "./modalControllerSlice"
import typeBankAccountReducer from "./typeBankAccountsSlice"
import categoriesReducer from "./categoriesSlice"

const rootReducer = combineReducers({
    bankAccounts: bankAccountReducer,
    typesBankAccount: typeBankAccountReducer,
    transactions: transactionReducer,
    auth: authReducer,
    openModal: modalControllerReducer,
    categories: categoriesReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}
