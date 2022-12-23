const { Schema, model } = require('mongoose')

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true},
    name: { type: String, default: "Мои счета" },
    existing: { type: Boolean, default: true }
}, {
    timestamps: true
})

module.exports = model('BankAccountGroups', schema)
