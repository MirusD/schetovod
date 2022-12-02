import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    current: "",
}

const modalControllerSlice = createSlice({
    name: 'modalController',
    initialState,
    reducers: {
        modalControllerSet: (state,action) => {
            state.current = action.payload
        }
    }
})

const { reducer: modalControllerReducer, actions } = modalControllerSlice
const { modalControllerSet } = actions

export const setCurrentOpenModal = (data) => (dispatch) => {
    dispatch(modalControllerSet(data))
}

export const getCurrentOpenModal = () => (state) => state.openModal.current

export default modalControllerReducer
