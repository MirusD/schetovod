import httpService from "./http.service";

const bankAccountEndpoint = '/api/bank-accounts/types'

const bankAccountService = {
    get: async () => {
        const { data } = await httpService.get(bankAccountEndpoint)
        return data
    }
}

export default bankAccountService
