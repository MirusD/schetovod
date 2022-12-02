import { createSlice } from "@reduxjs/toolkit"
import bankAccountService from "../services/bankAccount.service";

const initialState = {
    entities: [],
    isLoading: true,
    error: null
}

const bankAccountsSlice = createSlice({
    name: 'bankAccounts',
    initialState,
    reducers: {
        bankAccountsRequested: (state) => {
            state.isLoading = true
        },
        bankAccountsReceved: (state,action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        bankAccountsRequestedFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        bankAccountCreated: (state, action) => {
            if (!Array.isArray(state.entities)) state.entities = []
            state.entities.push(action.payload)
        },
        bankAccountRemoved: (state, action) => {
            state.entities = state.entities.filter(el => el._id !== action.payload._id)
        },
        bankAccountUpdate: (state, action) => {
            const updateBankAccountIndex = state.entities.findIndex(el => el._id === action.payload._id)
            state.entities[updateBankAccountIndex] = { ...state.entities[updateBankAccountIndex], ...action.payload }
        }
    }
})

const { reducer: bankAccountReducer, actions } = bankAccountsSlice
const {
    bankAccountsRequested,
    bankAccountCreated,
    bankAccountRemoved,
    bankAccountsReceved,
    bankAccountsRequestedFailed,
    bankAccountUpdate
} = actions

export const loadBankAccountsList = () => async (dispatch) => {
    dispatch(bankAccountsRequested())
    try {
        const data = await bankAccountService.get()
        dispatch(bankAccountsReceved(data))
    } catch (error) {
        dispatch(bankAccountsRequestedFailed(error.message))
    }
}

export const createBankAccount = (payload) => async (dispatch) => {
    dispatch(bankAccountsRequested())
    try {
        dispatch(bankAccountCreated(payload))
    } catch (error) {
        dispatch(bankAccountsRequestedFailed(error.message))
    }
}

export const updateBankAccount = (payload) => async (dispatch) => {
    dispatch(bankAccountsRequested())
    try {
        dispatch(bankAccountUpdate(payload))
    } catch (error) {
        dispatch(bankAccountsRequestedFailed(error.message))
    }
}

export const getBankAccountsList = () => (state) => state.bankAccounts.entities
export const getBankAccountById = (id) => (state) => state.bankAccounts.entities.find(ba => ba._id === id)

export default bankAccountReducer
