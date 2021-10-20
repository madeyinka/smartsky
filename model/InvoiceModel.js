var Base = require('./BaseModel')
var schemaInit = require('./schema/InvoiceSchema')

var modelInit = Base.extend('InvoiceModel', {
    init: function(){
        this._super(schemaInit,"INVOICE");
    }
})
module.exports = new modelInit()