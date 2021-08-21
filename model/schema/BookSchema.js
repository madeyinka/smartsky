const mongoose = require('mongoose')
const _config = require('./../../config/app.json')
const _collection = _config.mongodb.collections

var Schema = mongoose.Schema
var SchemaDef = new Schema({
    quote_id: {type:String, unique:true, default:""},
    origin: {type:String, default:""},
    destination: {type:String, default:""},
    shipment_date: {type:Date},
    submission: {type:String, enum:["pickup","dropoff"]},
    location: {type:String, default:""},
    recipient: {type:Object}, //name, email, phone, address
    cargo: {type:Array}, //length, width, height, weight, package
    total_cost:{type:Number},
    total_weight: {type:Number},
    total_volume: {type:Number},
    user: {type:String},
    status: {type:String, enum:["pending","active"], default:"pending"}
}, {timestamps:true})

var modelInit = mongoose.model(_collection.booking, SchemaDef)
module.exports = modelInit