import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authService from "../services/auth.service"

export const signUp = createAsyncThunk(
    "auth/signup",
    async ({ username, email, password }, thunkAPI) => {
        try {
            const response = await authService.signUp(
                username,
                email,
                password
            )
        } catch (error) {
            console.log(error.message)
            return thunkAPI.rejectWithValue();
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async ({ login, password }, thunkAPI) => {
        try {
            const user = await authService.login()
            return user
        } catch (error) {
            console.log(error.message)
            return thunkAPI.rejectWithValue()
        }
    }
)

export const logout = createAsyncThunk("auth/logout", async () => await authService.logout())

const initialState = {
    isLoggedIn: false,
    user: {
        name: "User",
        avatar: null
    }
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [signUp.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        },
        [signUp.rejected]: (state) => {
            state.isLoggedIn = false;
        },
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.user = action.payload
        },
        [login.rejected]: (state) => {
            state.isLoggedIn = false
            state.user = null
        },
        [logout.rejected]: (state) => {
            state.isLoggedIn = false
            state.user = null
        },
        [logout.fulfilled]: (state) => {
            state.isLoggedIn = false
            state.user = null
        }
    }
})

const { reducer: authReducer } = authSlice

export const getCurrentUser = () => (state) => state.auth.user
export const getIsLoggedIn = () => (state) => state.auth.isLoggedIn
export default authReducer
