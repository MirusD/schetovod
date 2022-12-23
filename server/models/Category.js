const { Schema, model } = require('mongoose')

const schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null},
    name: { type: String },
    type: { type: String },
    existing: { type: Boolean, default: true }
}, {
    timestamps: true
})

module.exports = model('Category', schema)
