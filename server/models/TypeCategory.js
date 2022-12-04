const { Schema, model } = require('mongoose')

const schema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true},
    name: { type: String, required: true },
}, {
    timestamps: true
})

module.exports = model('TypeCategory', schema)
