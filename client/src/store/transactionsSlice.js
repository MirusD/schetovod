import { createSlice } from "@reduxjs/toolkit";
import transactionsService from "../services/transactions.service";

const initialState = {
    entities: [],
    isLoading: true,
    error: null
}

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        transactionsRequested: (state) => {
            state.isLoading = true
        },
        transactionsRecived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        transactionsRequestedFailed:  (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        transactionCreated: (state, action) => {
            if (!Array.isArray(state.entities)) state.entities = []
            state.entities.push(action.payload)
        },
        transactionUpdated: (state, action) => {
            const updateTransactionIndex = state.entities.findIndex(el => el._id === action.payload._id)
            state.entities[updateTransactionIndex] = {...state.entities[updateTransactionIndex], ...action.payload}
        },
        transactionRemoved: (state, action) => {
            state.entities.filter(el => el._id !== action.payload._id)
        }
    }
})

const { reducer: transactionReducer, actions } = transactionsSlice
const { transactionsRequested, transactionsRecived, transactionCreated, transactionsRequestedFailed } = actions

export const loadTransactionsList = () => async (dispatch) => {
    dispatch(transactionsRequested())
    try {
        const data = await transactionsService.get()
        dispatch(transactionsRecived(data))
    } catch (error) {
        dispatch(transactionsRequestedFailed(error.message))
    }
}

export const newTransaction = (payload) => async (dispatch) => {
    try {
        dispatch(transactionCreated(payload))
    } catch (error) {
        dispatch(transactionsRequestedFailed(error.message))
    }
}

export const getTransactionsList = () => (state) => state.transactions.entities
export const getTransactionsListById = (id) => (state) => state.transactions.entities.filter(t => t.bankAccountsID[0] === id)


export default transactionReducer
