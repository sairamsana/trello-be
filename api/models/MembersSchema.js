const mongoose = require('mongoose')
const Schema = mongoose.Schema


const MembersSchema = new Schema({}, { strict: false })

module.exports = mongoose.model('members', MembersSchema);