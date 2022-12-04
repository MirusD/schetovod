const { Schema, model } = require('mongoose')

const schema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String }
}, {
    timestamps: true
})

module.exports = model('User', schema)
