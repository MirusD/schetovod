import httpService from "./http.service"

const authServiceEndpoint = "/api/auth/"

const authService = {
    login: async (login, password) => {
        const { data } = await httpService.get(authServiceEndpoint)
        return data
    },
    logout: async () => {}
}

export default authService
