const mongoose = require('mongoose')
const _config = require('./../../config/app.json')
const _collection = _config.mongodb.collections

var Schema = mongoose.Schema
var SchemaDef = new Schema({
    fname: {type:String, default:""},
    lname: {type:String, default:""},
    email: {type:String, unique:true, lower:true, default:""},
    phone: {type:String, default:""},
    password: {type:String},
    passkey: {type:String, default:""},
    type: {type:String, enum:["regular", "agent"], default:"regular"},
    address: {type:String, default:""},
    state: {type:String, default:""},
    zipcode: {type:String, default:""},
    avatar: {type:String, default:""},
    status: {type:String, enum:["active", "inactive", "pending"], default:"pending"}
},{timestamps:true})

var modelInit = mongoose.model(_collection.user, SchemaDef)
module.exports = modelInit