const mongoose = require('mongoose')
const _config = require('./../../config/app.json')
const _collection = _config.mongodb.collections

var Schema = mongoose.Schema
var SchemaDef = new Schema({
    name: {type:String, default:""},
    fname: {type:String, default:""},
    lname: {type:String, default:""},
    email: {type:String, unique:true, lower:true, default:""},
    organisation:{type:String, default:""},
    phone: {type:String, default:""},
    password: {type:String},
    passkey: {type:String, default:""},
    type: {type:String, enum:["individual", "organisation", "agent", "admin"], default:"regular"},
    address: {type:String, default:""},
    state: {type:String, default:""},
    lga:{type:String, default:""},
    zipcode: {type:String, default:""},
    avatar: {type:String, default:""},
    status: {type:String, enum:["active", "inactive", "pending"], default:"active"}
},{timestamps:true})

var modelInit = mongoose.model(_collection.user, SchemaDef)
module.exports = modelInit