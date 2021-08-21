var Base = require('./BaseModel')
var schemaInit = require('./schema/BookSchema')

var modelInit = Base.extend('BookModel', {
    init: function(){
        this._super(schemaInit,"BOOK");
    }
})
module.exports = new modelInit()