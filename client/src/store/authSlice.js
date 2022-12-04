import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import authService from "../services/auth.service"
import localStorageService from "../services/localStorage.service"
import { setMessage } from "./messageSlice"

export const signUp = createAsyncThunk(
    "auth/signup",
    async ({ username, email, password }, thunkAPI) => {
        try {
            const response = await authService.register({
                    username,
                    email,
                    password
                },
            )
            const { accessToken, refreshToken, expiresIn, userID, username: name, avatar } = response
            localStorageService.setTokens({ accessToken, refreshToken, userID, expiresIn})
            return { userID, username: name, avatar }
        } catch (error) {
            const message = (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) || error.message || error.toString()
            thunkAPI.dispatch(setMessage(message))
            return thunkAPI.rejectWithValue()
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await authService.login({
                email,
                password
            })
            const { accessToken, refreshToken, expiresIn, userID, username: name, avatar } = response
            localStorageService.setTokens({ accessToken, refreshToken, userID, expiresIn})
            return { userID, username: name, avatar }
        } catch (error) {
            const message = (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) || error.message || error.toString()
            thunkAPI.dispatch(setMessage(message))
            return thunkAPI.rejectWithValue()
        }
    }
)

export const logout = createAsyncThunk("auth/logout", async () => await authService.logout())

const initialState = {
    isLoggedIn: false,
    user: {}
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
        [signUp.fulfilled]: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
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
