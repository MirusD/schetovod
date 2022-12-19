import axios from 'axios'
import localStorageService from './localStorage.service'
import httpService from './http.service'

const httpAuth = axios.create({
    baseURL: 'http://localhost:8080/api/auth/'
})

const authService = {
    register: async ({ username, email, password }) => {
        const { data } = await httpAuth.post('signUp', {
            username,
            email,
            password
        })
        return data
    },
    login: async ({ email, password }) => {
        const { data } = await httpAuth.post('signInWithPassword', {
            email,
            password
        })
        return data
    },
    refresh: async () => {
        const { data } = await httpAuth.post('token', {
            refresh_token: localStorageService.getRefreshToken()
        })
        return data
    },
    update: async (userData) => {
        const { data } = await httpService.post('auth/user', userData)
        return data
    },
    logout: () => {
        localStorageService.removeAuthData()
    }
}

export default authService
