import { combineReducers, configureStore } from "@reduxjs/toolkit"
import bankAccountReducer from "./bankAccountsSlice"
import transactionReducer from "./transactionsSlice"
import authReducer from "./authSlice"
import modalControllerReducer from "./modalControllerSlice"
import typeBankAccountReducer from "./typeBankAccountsSlice"
import categoriesReducer from "./categoriesSlice"
import messageReducer from "./messageSlice";

const rootReducer = combineReducers({
    bankAccounts: bankAccountReducer,
    typesBankAccount: typeBankAccountReducer,
    transactions: transactionReducer,
    auth: authReducer,
    openModal: modalControllerReducer,
    categories: categoriesReducer,
    message: messageReducer
})

export function createStore() {
    return configureStore({
        reducer: rootReducer
    })
}
