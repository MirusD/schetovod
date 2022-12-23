import httpService from './http.service'

const transactionsEndpoint = 'categories/'
const transactionsService = {
    get: async () => {
        const { data } = await httpService.get(transactionsEndpoint)
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.post(transactionsEndpoint, payload)
        return data
    },
    update: async (payload, categoryId) => {
        const { data } = await httpService.patch(transactionsEndpoint + categoryId, payload)
        return data
    },
    remove: async (categoryId) => {
        const { data } = await httpService.delete(transactionsEndpoint + categoryId)
        return data
    }
}

export default transactionsService
