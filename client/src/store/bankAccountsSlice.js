import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import bankAccountService from '../services/bankAccount.service'
import { setMessage } from './messageSlice'

export const getBankAccounts = createAsyncThunk(
    'bankAccounts/get',
    async (_, thunkAPI) => {
    try {
        const data = await bankAccountService.get()
        return data
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

export const createBankAccount = createAsyncThunk(
    'bankAccounts/created',
    async (payload, thunkAPI) => {
    try {
        const response = await bankAccountService.create({ ...payload })
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

export const updateBankAccount = createAsyncThunk(
    'bankAccounts/updated',
    async ({ data, bankAccountId }, thunkAPI) => {
    try {
        const response = await bankAccountService.update(data, bankAccountId)
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

export const removeBankAccount = createAsyncThunk(
    'bankAccunts/removed',
    async (id, thunkAPI) => {
    try {
        await bankAccountService.remove(id)
        return { id }
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

export const recoveryBankAccount = createAsyncThunk('', async (id, thunkAPI) => {
    try {
        const data = await bankAccountService.update({ existing: true }, id)
        return data
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

const bankAccountsSlice = createSlice({
    name: 'bankAccounts',
    initialState,
    extraReducers: {
        [getBankAccounts.fulfilled]: (state, action) => {
            state.loading = 'succeeded'
            state.entities = action.payload
        },
        [getBankAccounts.rejected]: (state) => {
            state.loading = 'failed'
        },
        [getBankAccounts.pending]: (state) => {
            state.loading = 'pending'
        },
        [createBankAccount.fulfilled]: (state, action) => {
            state.loading = 'succeeded'
            state.entities.push(action.payload)
        },
        [createBankAccount.rejected]: (state) => {
            state.loading = 'failed'
        },
        [createBankAccount.pending]: (state) => {
            state.loading = 'pending'
        },
        [updateBankAccount.fulfilled]: (state, action) => {
            state.loading = 'succeeded'
            const updateBankAccountIndex = state.entities.findIndex(el => el._id === action.payload._id)
            state.entities[updateBankAccountIndex] = { ...state.entities[updateBankAccountIndex], ...action.payload }
        },
        [updateBankAccount.rejected]: (state) => {
            state.loading = 'failed'
        },
        [updateBankAccount.pending]: (state) => {
            state.loading = 'pending'
        },
        [removeBankAccount.fulfilled]: (state, action) => {
            state.loading = 'succeeded'
            state.entities = state.entities.map(group => group._id === action.payload.id ? { ...group, existing: false } : group)
        },
        [removeBankAccount.rejected]: (state) => {
            state.loading = 'failed'
        },
        [removeBankAccount.pending]: (state) => {
            state.loading = 'pending'
        },
        [recoveryBankAccount.fulfilled]: (state, action) => {
            state.loading = 'succeded'
            const updateBankAccountIndex = state.entities.findIndex(el => el._id === action.payload._id)
            state.entities[updateBankAccountIndex] = { ...state.entities[updateBankAccountIndex], ...action.payload }
        },
        [recoveryBankAccount.pending]: (state) => {
            state.loading = 'pending'
        },
        [recoveryBankAccount.rejected]: (state) => {
            state.loading = 'failed'
        }
    }
})

const { reducer: bankAccountReducer } = bankAccountsSlice

export const getBankAccountsLoadingStatus = () => (state) => state.bankAccounts.loading
export const getBankAccountsList = () => (state) => state.bankAccounts.entities.filter(ba => ba.existing)
export const getBankAccountsNoExisting = () => (state) => state.bankAccounts.entities.filter(ba => !ba.existing).map(ba => ({ ...ba, name: ba.name + ' (Закрыт)' }))
export const getBankAccountById = (id) => (state) => state.bankAccounts.entities.find(ba => ba._id === id)

export default bankAccountReducer
