import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import categoriesService from '../services/categories.service'
import { setMessage } from './messageSlice'

export const updateCategory = createAsyncThunk(
    'catagory/updated',
    async ({ payload, categoryId }, thunkAPI) => {
    try {
        const data = await categoriesService.update(payload, categoryId)
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

export const removeCategory = createAsyncThunk(
    'category/removed',
    async (id, thunkAPI) => {
        try {
            await categoriesService.remove(id)
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

export const recoveryCategory = createAsyncThunk(
    'category/restored',
    async (id, thunkAPI) => {
        try {
            const data = await categoriesService.update({ existing: true }, id)
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

const initialState = {
    entities: [],
    isLoading: true,
    loading: 'idle',
    error: null
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    extraReducers: {
        [updateCategory.fulfilled]: (state, action) => {
            state.loading = 'succeeded'
            const updateCategoryIndex = state.entities.findIndex(el => el._id === action.payload._id)
            state.entities[updateCategoryIndex] = { ...state.entities[updateCategoryIndex], ...action.payload }
        },
        [updateCategory.rejected]: (state) => {
            state.loading = 'failed'
        },
        [updateCategory.pending]: (state) => {
            state.loading = 'pending'
        },
        [removeCategory.fulfilled]: (state, action) => {
            state.loading = 'succeeded'
            state.entities = state.entities.map(c => c._id === action.payload.id ? {
                ...c,
                existing: false,
                name: c.name
            } : c)
        },
        [removeCategory.rejected]: (state) => {
            state.loading = 'failed'
        },
        [removeCategory.pending]: (state) => {
            state.loading = 'pending'
        },
        [recoveryCategory.fulfilled]: (state, action) => {
            state.loading = 'succeeded'
            const updateCategoryIndex = state.entities.findIndex(el => el._id === action.payload._id)
            state.entities[updateCategoryIndex] = { ...state.entities[updateCategoryIndex], ...action.payload }
        },
        [removeCategory.rejected]: (state) => {
            state.loading = 'failed'
        },
        [removeCategory.pending]: (state) => {
            state.loading = 'pending'
        }
    },
    reducers: {
        categoriesRequested: (state) => {
            state.isLoading = true
        },
        categoriesReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        categoriesRequestedFailed: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        categoryCreated: (state, action) => {
            if (!Array.isArray(state.entities)) state.entities = []
            state.entities.push(action.payload)
        },
        categoryRemoved: (state, action) => {
            state.entities = state.entities.filter(el => el._id !== action.payload._id)
        },
        categoryUpdate: (state, action) => {
            const updateBankAccountIndex = state.entities.findIndex(el => el._id === action.payload._id)
            state.entities[updateBankAccountIndex] = { ...state.entities[updateBankAccountIndex], ...action.payload }
        }
    }
})

const { reducer: categoriesReducer, actions } = categoriesSlice
const {
    categoryCreated,
    categoriesRequested,
    categoriesReceved,
    categoriesRequestedFailed
} = actions

export const loadCategoriesList = () => async (dispatch) => {
    dispatch(categoriesRequested())
    try {
        const data = await categoriesService.get()
        dispatch(categoriesReceved(data))
    } catch (error) {
        dispatch(categoriesRequestedFailed(error.message))
    }
}

export const addNewCategory = (payload) => async (dispatch) => {
    try {
        const data = await categoriesService.create(payload)
        dispatch(categoryCreated(data))
        return data
    } catch (error) {
        dispatch(categoriesRequestedFailed(error.message))
    }
}

export const getCategoriesList = () => (state) => state.categories.entities
export const getCategoriesProfit = () => (state) => state.categories.entities.filter(c => c.type === 'Доход')
export const getCategoriesExpense = () => (state) => state.categories.entities.filter(c => c.type === 'Расход')
export const getCategoryTransfer = () => (state) => state.categories.entities.find(c => c.type === 'Перевод')
export const getCategoriesNoExisting = () => (state) => state.categories.entities.filter(c => !c.existing).map(c => ({ ...c, name: c.name + ' (Удалена)' }))
export const getCategoryById = (id) => (state) => state.categories.entities.find(c => c._id === id)

export default categoriesReducer
