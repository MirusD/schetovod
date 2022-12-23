import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import typeBankAccountService from '../services/typeBankAccountService'
import { setMessage } from './messageSlice'

export const getBankAccountTypes = createAsyncThunk('typeBankAccounts/get', async (_, thunkAPI) => {
    try {
        const data = await typeBankAccountService.get()
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

const typesBankAccountSlice = createSlice({
    name: 'typeBankAccounts',
    initialState,
    extraReducers: {
        [getBankAccountTypes.fulfilled]: (state, action) => {
            state.loading = 'succeeded'
            state.entities = action.payload
        },
        [getBankAccountTypes.rejected]: (state) => {
            state.loading = 'failed'
        },
        [getBankAccountTypes.pending]: (state) => {
            state.loading = 'pending'
        }
    }
})

const { reducer: typeBankAccountReducer } = typesBankAccountSlice

export const getTypesBankAccountList = () => (state) => state.typesBankAccount.entities
export const getBankAccountTypeById = (id) => (state) => state.typesBankAccount.entities.find(a => a._id === id)
export const getBankAccountTypesLoadingStatus = () => (state) => state.typesBankAccount.loading

export default typeBankAccountReducer
