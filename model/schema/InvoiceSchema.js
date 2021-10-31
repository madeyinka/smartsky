const mongoose = require('mongoose')
const _config = require('./../../config/app.json')
const _collection = _config.mongodb.collections

var Schema = mongoose.Schema
var SchemaDef = new Schema({
    uuid: {type:String, unique:true, default:""},
    quote_id:{type:String},
    item: {type:String, default:""},
    description: {type:String, default:""},
    amount: {type:Number},
    email:{type:String},
    issue_date:{type:Date},
    due_date:{type:Date},
    user:{type:Object},
    status: {type:String, enum:["Unpaid", "Paid", "Cancelled"], default:"Unpaid"}
},{timestamps:true})

var modelInit = mongoose.model(_collection.invoice, SchemaDef)
module.exports = modelInit