const { Schema, model } = require('mongoose')

const schema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: 'User'},
    name: { type: String },
    amount: Number,
    typeID: { type: Schema.Types.ObjectId, ref: 'TypeBankAccount' },
    icon: { type: String }
}, {
    timestamps: true
})

module.exports = model('BankAccount', schema)
