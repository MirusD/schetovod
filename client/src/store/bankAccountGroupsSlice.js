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
    'bankAccountGroup/create',
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

export const updateBankAccountGroup = createAsyncThunk(
    'bankAccountGroup/update',
    async ({ payload, groupId }, thunkAPI) => {
        try {
            const data = await bankAccountGroupsService.update(payload, groupId)
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
    }
)

export const removeBankAccountGroup = createAsyncThunk(
    'bankAccountGroup/removed',
    async (id, thunkAPI) => {
        try {
            console.log(id)
            // await bankAccountGroupsService.remove(id)
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
    }
)

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
        },
        [updateBankAccountGroup.fulfilled]: (state, action) => {
            state.loading = 'succeeded'
            const updateBankAccountGroupIndex = state.entities.findIndex(el => el._id === action.payload._id)
            state.entities[updateBankAccountGroupIndex] = { ...state.entities[updateBankAccountGroupIndex], ...action.payload }
        },
        [updateBankAccountGroup.rejected]: (state) => {
            state.loading = 'failed'
        },
        [updateBankAccountGroup.pending]: (state) => {
            state.loading = 'pending'
        },
        [removeBankAccountGroup.fulfilled]: (state, action) => {
            state.loading = 'succeeded'
            state.entities = state.entities.map(ba => ba._id === action.payload.id ? { ...ba, existing: false, name: ba.name + ' (Удалена)' } : ba)
        },
        [removeBankAccountGroup.pending]: (state) => {
            state.loading = 'pending'
        },
        [removeBankAccountGroup.rejected]: (state) => {
            state.loading = 'failed'
        }
    }
})

const { reducer: bankAccountGroupsReducer } = bankAccountGroupsSlice

export const getBankAccountGroupsLoadingStatus = () => (state) => state.bankAccountGroups.loading
export const getBankAccountGroupsList = () => (state) => state.bankAccountGroups.entities
export const getBankAccountGroupsById = (id) => (state) => state.bankAccountGroups.entities.find(ba => ba._id === id)

export default bankAccountGroupsReducer
