import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { setMessage } from './messageSlice'
import bankAccountGroupsService from '../services/bankAccountGroupsService'

export const getBankAccountGroups = createAsyncThunk(
    'bankAccountGroups/get',
    async (_, thunkAPI) => {
    try {
        const data = await bankAccountGroupsService.get()
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

export const createBankAccountGroup = createAsyncThunk(
    'bankAccountGroups/create',
    async (payload, thunkAPI) => {
    try {
        const data = await bankAccountGroupsService.create(payload)
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

const bankAccountGroupsSlice = createSlice({
    name: 'bankAccountGroups',
    initialState,
    extraReducers: {
        [getBankAccountGroups.fulfilled]: (state, action) => {
            state.loading = 'succeeded'
            state.entities = action.payload
        },
        [getBankAccountGroups.rejected]: (state) => {
            state.loading = 'failed'
        },
        [getBankAccountGroups.pending]: (state) => {
            state.loading = 'pending'
        },
        [createBankAccountGroup.fulfilled]: (state, action) => {
            state.loading = 'succeeded'
            state.entities.push(action.payload)
        },
        [createBankAccountGroup.rejected]: (state) => {
            state.loading = 'failed'
        },
        [createBankAccountGroup.pending]: (state) => {
            state.loading = 'pending'
        }
    }
})

const { reducer: bankAccountGroupsReducer } = bankAccountGroupsSlice

export const getBankAccountGroupsLoadingStatus = () => (state) => state.bankAccountGroups.loading
export const getBankAccountGroupsList = () => (state) => state.bankAccountGroups.entities
export const getBankAccountGroupsById = (id) => (state) => state.bankAccountGroups.entities.find(ba => ba._id === id)

export default bankAccountGroupsReducer
