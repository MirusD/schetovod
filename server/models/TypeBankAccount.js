const { Schema, model } = require('mongoose')

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true }
}, {
    timestamps: true
})

module.exports = model('TypeBankAccount', schema)
