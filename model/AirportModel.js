var Base = require('./BaseModel')
var schemaInit = require('./schema/AirportSchema')

var modelInit = Base.extend('AirportModel', {
    init: function(){
        this._super(schemaInit,"AIRPORT");
    }
})
module.exports = new modelInit()