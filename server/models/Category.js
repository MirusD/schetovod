const { Schema, model } = require('mongoose')

const schema = new Schema({
    name: { type: String },
    type: { type: String },
    icon: { type: String }
}, {
    timestamps: true
})

module.exports = model('Category', schema)
