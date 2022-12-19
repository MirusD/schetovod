import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import transactionsService from '../services/transactions.service'
import { setMessage } from './messageSlice'

export const getTransactions = createAsyncThunk('transactions/get', async (_, thunkAPI) => {
    try {
        const response = await transactionsService.get()
        return response
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        thunkAPI.dispatch(setMessage(message))
        return thunkAPI.rejectWithValue()
    }
})

export const newTransaction = createAsyncThunk('transactions/create', async (payload, thunkAPI) => {
    try {
        const response = await transactionsService.create(payload)
        return response
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString()
        thunkAPI.dispatch(setMessage(message))
        return thunkAPI.rejectWithValue()
    }
})

const initialState = {
    entities: [],
    loading: 'idle'
}

const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,

    extraReducers: {
        [getTransactions.fulfilled]: (state, action) => {
            state.loading = 'succeeded'
            state.entities = action.payload
        },
        [getTransactions.rejected]: (state) => {
            state.loading = 'failed'
        },
        [getTransactions.pending]: (state) => {
            state.loading = 'pending'
        },
        [newTransaction.fulfilled]: (state, action) => {
            if (!Array.isArray(state.entities)) state.entities = []
            state.entities.push(action.payload)
        },
        [newTransaction.rejected]: (state) => {
            state.loading = 'failed'
        },
        [newTransaction.pending]: (state) => {
            state.loading = 'pending'
        }
    },
    reducers: {
        transactionUpdated: (state, action) => {
            const updateTransactionIndex = state.entities.findIndex(el => el._id === action.payload._id)
            state.entities[updateTransactionIndex] = { ...state.entities[updateTransactionIndex], ...action.payload }
        },
        transactionRemoved: (state, action) => {
            state.entities.filter(el => el._id !== action.payload._id)
        }
    }
})

const { reducer: transactionReducer } = transactionsSlice

export const getTransactionsLoadingStatus = () => (state) => state.transactions.loading
export const getTransactionsList = () => (state) => state.transactions.entities
export const getTransactionsListById = (id) => (state) =>
    state.transactions.entities.filter(transaction => {
        if (transaction.bankAccountsID.length === 2) {
            if (transaction.bankAccountsID[0] === id) return true
            if (transaction.bankAccountsID[1] === id) return true
        } else {
            if (transaction.bankAccountsID[0] === id) return true
        }
        return false
    })
export const getTransactionById = (id) => (state) => state.transactions.entities.find(t => t._id === id)

export default transactionReducer
