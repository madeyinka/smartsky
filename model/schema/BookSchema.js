const mongoose = require('mongoose')
const _config = require('./../../config/app.json')
const _collection = _config.mongodb.collections

var Schema = mongoose.Schema,
    SchemaDef = new Schema({
    uuid: {type:String, unique:true, default:""},
    origin: {type:String, default:""},
    destination: {type:String, default:""},
    shiping_date: {type:Date},
    service_type: {type:String, enum:["Pick up","Drop off"], default:"dropoff"},
    location: {type:String, default:""},
    receiver: {type:Object},
    length:{type:Number},
    width:{type:Number},
    height:{type:Number},
    weight:{type:Number},
    quantity:{type:Number},
    dim_weight:{type:Number},
    act_weight: {type:Number},
    charge_weight:{type:Number},
    cost:{type:Number},
    express:{type:String},
    insurance:{type:String},
    packaging:{type:String},
    user: {type:String},
    item:{type:String},
    description:{type:String},
    status: {type:String, enum:["pending","active"], default:"pending"}
}, {timestamps:true})

var modelInit = mongoose.model(_collection.booking, SchemaDef)
module.exports = modelInit