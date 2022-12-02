const { Schema, model } = require('mongoose')

const schema = new Schema({
    amount: { type: Number },
    categoryID: { type: Schema.Types.ObjectId, ref: 'Category' },
    type: { type: String },
    bankAccountsID: [{ type: Schema.Types.ObjectId, ref: 'bankAccount'}],
    comment: { type: String }
}, {
    timestamps: true
})

module.exports = model('Transaction', schema)
