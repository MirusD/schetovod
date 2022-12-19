import httpService from './http.service'

const transactionsEndpoint = 'transactions/'
const transactionsService = {
    get: async () => {
        const { data } = await httpService.get(transactionsEndpoint)
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.post(transactionsEndpoint, payload)
        return data
    }
}

export default transactionsService
