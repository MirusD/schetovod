import httpService from './http.service'

const bankAccountEndpoint = 'bank-accounts/'

const bankAccountService = {
    get: async () => {
        const { data } = await httpService.get(bankAccountEndpoint)
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.post(bankAccountEndpoint, payload)
        return data
    },
    update: async (payload, bankAccountId) => {
        const { data } = await httpService.patch(bankAccountEndpoint + bankAccountId, payload)
        return data
    },
    remove: async (id) => {
        const { data } = await httpService.delete(bankAccountEndpoint + id)
        return data
    }
}

export default bankAccountService
