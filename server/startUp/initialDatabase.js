const TypeBankAccount = require('../models/TypeBankAccount')
const typeBankAccountMock = require('../mock/typeBankAccount.json')
const Category = require('../models/Category')
const categoryMock = require('../mock/category.json')

module.exports = async () => {

    const categories = await Category.find()
    // if (categories.length !== categoryMock.length) {
    //     await createInitialEntity(Category, categoryMock)
    // }

    const typeBankAccount = await TypeBankAccount.find()
    // if (typeBankAccount.length !== typeBankAccountMock.length) {
    //     await createInitialEntity(TypeBankAccount, typeBankAccountMock)
    // }
    // await createInitialEntity(Category, categoryMock)
    await createInitialEntity(TypeBankAccount, typeBankAccountMock)
}

async function createInitialEntity(Model, data) {
    // await Model.collection.drop()
    return Promise.all(
        data.map(async item => {
            try {
                const category = await Model.findOne({ name: item.name })
                if (!category) {
                    item?._id && delete item._id
                    const newItem = new Model(item)
                    await newItem.save()
                    return item
                }
            } catch (e) {
                return e
            }
        })
    )
}
