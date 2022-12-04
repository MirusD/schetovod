import axios from 'axios'
import localStorageService from "./localStorage.service"

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
            password,
        })
        return data
    },
    refresh: async () => {
        const { data } = await httpAuth.post('token', {
            grant_type: 'refresh_token',
            refresh_token: localStorageService.getRefreshToken()
        })
        return data
    },
    logout: () => {
        localStorageService.removeAuthData()
    }
}

export default authService
