const { Schema, model } = require('mongoose')

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true},
    amount: { type: Number, required: true },
    categoryID: { type: Schema.Types.ObjectId, ref: 'Category' },
    type: { type: String, required: true },
    bankAccountsID: [{ type: Schema.Types.ObjectId, ref: 'bankAccount'}],
    comment: { type: String }
}, {
    timestamps: true
})

module.exports = model('Transaction', schema)
