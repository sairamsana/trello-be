const mongoose = require('mongoose')
const Schema = mongoose.Schema


const CardSchema = new Schema({}, { strict: false })

module.exports = mongoose.model('cards', CardSchema);