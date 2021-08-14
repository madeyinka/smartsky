const express = require('express')
const router = express.Router()
const Util = require('./../libraries/Utility')
const bookingCTR = require('./../controllers/bookingCTR')
const { bookingValidationRule, getBookingValidationRule } = require('../controllers/validators/bookingValidator')
const bodyValidator = require('../controllers/validators/bodyValidator')

// -------------- Create Booking -------------------//
router.post('/', bookingValidationRule(), bodyValidator, (req, res) =>
{
    bookingCTR.createBooking(Util.param_extract(req), (state) =>
    {
        Util.resp(res).json(state)
    })
});

// -------------- Get Single Booking -------------------//
router.get('/:id', getBookingValidationRule(), bodyValidator, (req, res) =>
{
    bookingCTR.getBooking(req.params, (state) =>
    {
        Util.resp(res).json(state)
    })
});

// -------------- Get All Booking -------------------//
router.get('/', (req, res) =>
{
    bookingCTR.getAllBooking(req.params, (state) =>
    {
        Util.resp(res).json(state)
    })
})


module.exports = router