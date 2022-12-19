import { createSlice } from '@reduxjs/toolkit'
import typeBankAccountService from '../services/typeBankAccountService'

const initialState = {
    entities: [],
    isLoading: true,
    error: null
}

const typesBankAccountSlice = createSlice({
    name: 'typeBankAccounts',
    initialState,
    reducers: {
        typesBankAccountRequested: (state) => {
            state.isLoading = true
        },
        typesBankAccountReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        typesBankAccountRequestedFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        typesBankAccountreated: (state, action) => {
            if (!Array.isArray(state.entities)) state.entities = []
            state.entities.push(action.payload)
        },
        typesBankAccountemoved: (state, action) => {
            state.entities = state.entities.filter(el => el._id !== action.payload._id)
        },
        typesBankAccountUpdate: (state, action) => {
            const updateBankAccountIndex = state.entities.findIndex(el => el._id === action.payload._id)
            state.entities[updateBankAccountIndex] = { ...state.entities[updateBankAccountIndex], ...action.payload }
        }
    }
})

const { reducer: typeBankAccountReducer, actions } = typesBankAccountSlice
const {
    typesBankAccountRequested,
    typesBankAccountReceved,
    typesBankAccountRequestedFailed
} = actions

export const loadTypeBankAccountsList = () => async (dispatch) => {
    dispatch(typesBankAccountRequested())
    try {
        const data = await typeBankAccountService.get()
        dispatch(typesBankAccountReceved(data))
    } catch (error) {
        dispatch(typesBankAccountRequestedFailed(error.message))
    }
}

export const getTypesBankAccountList = () => (state) => state.typesBankAccount.entities
export const getBankAccountTypeById = (id) => (state) => state.typesBankAccount.entities.find(a => a._id === id)

export default typeBankAccountReducer
