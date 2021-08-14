const Base = require('./BaseModel')
const BookingSchema = require('./schema/BookingSchema')

const modelInit = Base.extend('BookingModel', {
    init: function ()
    {
        this._super(BookingSchema, "BOOKING");
    }
})
module.exports = new modelInit()