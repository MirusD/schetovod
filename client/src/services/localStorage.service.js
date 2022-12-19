const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'jwt-refresh-token'
const EXPIRES_KEY = 'jwt-expires'
const USERID_KEY = 'user-local-id'
const USERNAME_KEY = 'user-local-name'
const USERAVATAR_KEY = 'user-local-avatar'
const USEREMAIL_KEY = 'user-local-email'

export function setTokens({ accessToken, refreshToken, userId, expiresIn = 3600, username, avatar, email }) {
    const expiresDate = new Date().getTime() + expiresIn * 1000
    localStorage.setItem(USERID_KEY, userId)
    localStorage.setItem(TOKEN_KEY, accessToken)
    localStorage.setItem(REFRESH_KEY, refreshToken)
    localStorage.setItem(EXPIRES_KEY, expiresDate)
    localStorage.setItem(USERNAME_KEY, username)
    localStorage.setItem(USERAVATAR_KEY, avatar)
    localStorage.setItem(USEREMAIL_KEY, email)
}

export function updateUser({ username, email, avatar }) {
    localStorage.setItem(USERNAME_KEY, username)
    localStorage.setItem(USERAVATAR_KEY, avatar)
    localStorage.setItem(USEREMAIL_KEY, email)
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY)
}

export function getExpiresDateToken() {
    return localStorage.getItem(EXPIRES_KEY)
}

export function removeAuthData() {
    localStorage.removeItem(USERID_KEY)
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_KEY)
    localStorage.removeItem(EXPIRES_KEY)
    localStorage.removeItem(USERNAME_KEY)
    localStorage.removeItem(USERAVATAR_KEY)
}

export function getUserId() {
    return localStorage.getItem(USERID_KEY)
}

export function getUserName() {
    return localStorage.getItem(USERNAME_KEY)
}

export function getUserAvatar() {
    return localStorage.getItem(USERAVATAR_KEY)
}

export function getUserEmail() {
    return localStorage.getItem(USEREMAIL_KEY)
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getExpiresDateToken,
    getUserId,
    getUserName,
    getUserAvatar,
    removeAuthData,
    getUserEmail,
    updateUser
}

export default localStorageService
