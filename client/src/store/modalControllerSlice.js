import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    current: '',
    data: ''
}

const modalControllerSlice = createSlice({
    name: 'modalController',
    initialState,
    reducers: {
        modalControllerSet: (state, action) => {
            state.current = action.payload.current
            state.data = action.payload.data
        }
    }
})

const { reducer: modalControllerReducer, actions } = modalControllerSlice
const { modalControllerSet } = actions

export const setCurrentOpenModal = (data) => (dispatch) => {
    dispatch(modalControllerSet(data))
}

export const getCurrentOpenModal = () => (state) => state.modal

export default modalControllerReducer
