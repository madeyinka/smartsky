var Base = require('./BaseModel')
var schemaInit = require('./schema/OrderSchema')

var modelInit = Base.extend('OrderModel', {
    init: function(){
        this._super(schemaInit,"ORDER");
    }
})
module.exports = new modelInit()