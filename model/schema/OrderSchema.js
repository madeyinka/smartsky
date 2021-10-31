const mongoose = require('mongoose')
const _config = require('./../../config/app.json')
const _collection = _config.mongodb.collections

var Schema = mongoose.Schema
var SchemaDef = new Schema({
    uuid: {type:String, unique:true, default:""},
    invoice: {type:String, default:""},
    quote: {type:String, default:""},
    user: {type:String, default:""},
    method: {type:String, enum:["dropoff", "card", "transfer"]},
    status: {type:String, enum:["complete", "pending"], default:"pending"},
    track_id: {type:String, default:""},
    track_status: {type:String, enum:["processing", "in-transit", "delivered"]}
},{timestamps:true})

var modelInit = mongoose.model(_collection.order, SchemaDef)
module.exports = modelInit