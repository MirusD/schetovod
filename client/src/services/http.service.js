import axios from 'axios'
import localStorageService from './localStorage.service'
import authService from './auth.service'
import configFile from '../config/default.json'

const http = axios.create({
    baseURL: configFile.apiEndpoint
})

http.interceptors.request.use(
    async function (config) {
        const expiresDate = localStorageService.getExpiresDateToken()
        const refreshToken = localStorageService.getRefreshToken()
        if (refreshToken && expiresDate < Date.now()) {
            const data = authService.refresh()
            console.log(data)
            localStorageService.setTokens({
                refreshToken: data.refreshToken,
                accessToken: data.accessToken,
                expiresIn: data.expiresIn,
                userID: data.userId
            })
        }
        const accessToken = localStorageService.getAccessToken()
        if (accessToken) {
            config.headers = { Authorization: `Bearer ${accessToken}` }
        }
        return config
    }
)

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch
}

export default httpService
