const { Schema, model } = require('mongoose')

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true},
    name: { type: String, default: "Мои счета" },
}, {
    timestamps: true
})

module.exports = model('BankAccountGroups', schema)
