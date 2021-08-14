const Resp = require('./Response');
const bookingModel = require('./../model/BookingModel');

// const mailer = require('./../libraries/Mailer')
// const { verify } = require('./../templates/notification')

module.exports = {

    createBooking: (param, callback) =>
    {
        // --------------- Calculate Pice Per Kg -------------------//
        param.price = param.dimensions.weight * process.env.PRICE_PER_KG;

        bookingModel.save(param, (resp) =>
        {
            if (resp.error) {
                return callback(Resp.error({ msg: "Error trying to create booking", resp: resp.message }));
            }
            return callback(Resp.success({ msg: "Booking created successfully", resp: resp }));

        });

    },

    getBooking: (param, callback) =>
    {
        // --------------- Set Find Conditoin -------------------//
        param.conditions = { _id: param.id };

        bookingModel.findOne(param, (resp) =>
        {
            if (resp.error) {
                return callback(Resp.error({ msg: "Error trying to get booking", resp: resp.message }));
            }
            return callback(Resp.success({ msg: "Booking fetched successfully", resp: resp }));

        });

    },

    getAllBooking: (param, callback) =>
    {
        // ------------------ Restrict to only Current User(Logged In) when your done with the middileware -----------------// 
        bookingModel.findAll(param, (resp) =>
        {
            if (resp.error) {
                return callback(Resp.error({ msg: "Error trying to get booking", resp: resp.message }));
            }
            return callback(Resp.success({ msg: "Bookings fetched successfully", resp: resp }));

        });

    }

}