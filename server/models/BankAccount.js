const { Schema, model } = require('mongoose')

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User'},
    groupId: { type: Schema.Types.ObjectId, ref: 'GroupBankAccount'},
    name: { type: String },
    amount: Number,
    typeId: { type: Schema.Types.ObjectId, ref: 'TypeBankAccount' },
    icon: { type: String },
    existing: { type: Boolean, default: true }
}, {
    timestamps: true
})

module.exports = model('BankAccount', schema)
