import { createSlice } from '@reduxjs/toolkit'
import categoriesService from '../services/categories.service'

const initialState = {
    entities: [],
    isLoading: true,
    error: null
}

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
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
export const getCategoryById = (id) => (state) => state.categories.entities.find(c => c._id === id)

export default categoriesReducer
