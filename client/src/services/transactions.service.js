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
    },
    remove: async (id) => {
        const { data } = await httpService.delete(transactionsEndpoint + id)
        return data
    }
}

export default transactionsService
