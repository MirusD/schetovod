const BankAccount = require('../models/BankAccount')
const bankAccountMock = require('../mock/bankAccounts.json')
const TypeBankAccount = require('../models/TypeBankAccount')
const typeBankAccountMock = require('../mock/typeBankAccount.json')
const Category = require('../models/Category')
const categoryMock = require('../mock/category.json')
const Transaction = require('../models/Transaction')
const transactionsMock = require('../mock/transactions.json')
const User = require('../models/User')
const userMock = require('../mock/user.json')

module.exports = async () => {
    const bankAccounts = await BankAccount.find()
    if (bankAccounts.length !== bankAccountMock.length) {
        await createInitialEntity(BankAccount, bankAccountMock)
    }

    const categories = await Category.find()
    if (categories.length !== categoryMock.length) {
        await createInitialEntity(Category, categoryMock)
    }

    const typeBankAccount = await TypeBankAccount.find()
    if (typeBankAccount.length !== typeBankAccountMock.length) {
        await createInitialEntity(TypeBankAccount, typeBankAccountMock)
    }

    const transactions = await Transaction.find()
    if (transactions.length !== transactionsMock.length) {
        await createInitialEntity(Transaction, transactionsMock)
    }

    const user = await User.find()
    if (user.length !== userMock.length) {
        await createInitialEntity(User, userMock)
    }
}

async function createInitialEntity(Model, data) {
    console.log(data)
    await Model.collection.drop()
    return Promise.all(
        data.map(async item => {
            try {
                item?._id && delete item._id
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            } catch (e) {
                return e
            }
        })
    )
}
