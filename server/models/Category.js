const { Schema, model } = require('mongoose')

const schema = new Schema({
    userID: { type: Schema.Types.ObjectId, ref: "User", required: true},
    name: { type: String },
    type: { type: String },
    icon: { type: String }
}, {
    timestamps: true
})

module.exports = model('Category', schema)
