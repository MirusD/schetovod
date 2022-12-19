import httpService from './http.service'

const groupsBankAccountsEndpoint = 'bank-accounts/groups'

const bankAccountGroupsService = {
    get: async () => {
        const { data } = await httpService.get(groupsBankAccountsEndpoint)
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.post(groupsBankAccountsEndpoint, payload)
        return data
    },
    update: async (payload, bankAccountId) => {
        const { data } = await httpService.patch(groupsBankAccountsEndpoint + bankAccountId, payload)
        return data
    },
    remove: async (id) => {
        const { data } = await httpService.delete(groupsBankAccountsEndpoint + id)
        return data
    }
}

export default bankAccountGroupsService
