const mongoose = require('mongoose');
const { rand_str } = require('../../libraries/Utility');
const _config = require('./../../config/app.json')
const _collection = _config.mongodb.collections

const BookingSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['pick-up', 'drop-off'],
        default: 'pick-up'
    },
    // ================ Uncomment when middleware is up =================== //
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'user',
    // },
    status: {
        type: String,
        enum: ['processing', 'completed'],
        default: 'processing',
    },

    shippingDate: {
        type: Date,
        default: Date.now()
    },
    reciever: {
        name: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
    },
    origin: {
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: {
            type: String,
            default: null
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            default: null
        },
    },
    destination: {
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: {
            type: String,
            default: null
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipcode: {
            type: String,
            default: null
        },
    },
    cargoType: {
        type: String,

    },

    // image: {
    //     type: String,
    //     required: true,
    // },
    trackingNumber: {
        type: String,
        default: rand_str(10)
    },
    dimensions: {
        length: {
            type: Number,
        },
        height: {
            type: Number,
        },
        width: {
            type: Number,
        },
        weight: {
            type: Number,
            required: true
        }
    },
    price: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

var modelInit = mongoose.model(_collection.booking, BookingSchema)
module.exports = modelInit