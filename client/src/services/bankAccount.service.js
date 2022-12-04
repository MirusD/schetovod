import axios from "axios";

const httpBankAccount = axios.create({
    baseURL: 'http://localhost:8080/api/bank-accounts/'
})

const bankAccountService = {
    get: async () => {
        const { data } = await httpBankAccount.get()
        return data
    },
    create: async (payload) => {
        const { data } = await httpBankAccount.post('/', payload)
        return data
    },
    remove: async (id) => {
        const { data } = await httpBankAccount.delete(`/${id}`)
        return data
    }
}

export default bankAccountService
