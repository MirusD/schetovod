import httpService from "./http.service";

const transactionsEndpoint = '/api/categories/'
const transactionsService = {
    get: async () => {
        const { data } = await httpService.get(transactionsEndpoint)
        return data
    }
}

export default transactionsService
