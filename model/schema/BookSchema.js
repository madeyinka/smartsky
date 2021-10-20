const mongoose = require('mongoose')
const _config = require('./../../config/app.json')
const _collection = _config.mongodb.collections

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var SchemaDef = new Schema({
    uuid: {type:String, unique:true, default:""},
    origin: {type:String, default:""},
    destination: {type:String, default:""},
    shipment_date: {type:Date},
    submission: {type:String, enum:["pickup","dropoff"]},
    location: {type:String, default:""},
    recipient: {type:Object},
    cargoes: {type:Array}, 
    unit:{type:String, default:""},
    dim_weight:{type:Number},
    actual_weight: {type:Number},
    chargable_weight:{type:Number},
    total_cost:{type:Number},
    user: {type:ObjectId},
    user_profile: {type:Object},
    status: {type:String, enum:["pending","active"], default:"pending"}
}, {timestamps:true})

var modelInit = mongoose.model(_collection.booking, SchemaDef)
module.exports = modelInit