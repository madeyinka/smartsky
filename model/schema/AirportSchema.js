const mongoose = require('mongoose')
const _config = require('./../../config/app.json')
const _collection = _config.mongodb.collections

var Schema = mongoose.Schema
var SchemaDef = new Schema ({
    label: {type:String, default:""},
    iata_code: {type:String, default:""},
    icao_code: {type:String, default:""}
}, {timestamps:true})

var modelInit = mongoose.model(_collection.airport, SchemaDef)
module.exports = modelInit