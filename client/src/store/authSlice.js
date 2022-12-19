import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import localStorageService from '../services/localStorage.service'
import { setMessage } from './messageSlice'

export const signUp = createAsyncThunk(
    'auth/signup',
    async (payload, thunkAPI) => {
        try {
            const response = await authService.register(payload)
            console.log(response)
            const { userId, username, avatar, email } = response
            localStorageService.setTokens(response)
            return { userId, username, avatar, email }
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
    'auth/login',
    async (payload, thunkAPI) => {
        try {
            const response = await authService.login(payload)
            const { accessToken, refreshToken, expiresIn, userId, username: name, avatar, email } = response
            localStorageService.setTokens({ accessToken, refreshToken, userId, expiresIn, username: name, avatar, email })
            return { userId, username: name, avatar, email }
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

export const userUpdate = createAsyncThunk(
    'auth/updateUser',
    async (payload, thunkAPI) => {
        try {
            const response = await authService.update(payload)
            localStorageService.updateUser(response)
            return response
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

export const logout = createAsyncThunk('auth/logout', async () => await authService.logout())

const initialState = localStorageService.getAccessToken() && localStorageService.getExpiresDateToken() > Date.now()
    ? {
        isLoggedIn: true,
        user: {
            userId: localStorageService.getUserId(),
            username: localStorageService.getUserName(),
            avatar: localStorageService.getUserAvatar(),
            email: localStorageService.getUserEmail()
        }
    }
    : {
        isLoggedIn: false,
        user: {}
    }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [signUp.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.user = action.payload
        },
        [signUp.rejected]: (state) => {
            state.isLoggedIn = false
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
        },
        [userUpdate.fulfilled]: (state, action) => {
            state.user = action.payload
        }
    }
})

const { reducer: authReducer } = authSlice

export const getCurrentUser = () => (state) => state.auth.user
export const getIsLoggedIn = () => (state) => state.auth.isLoggedIn
export default authReducer
