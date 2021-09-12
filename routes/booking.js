const express = require('express')
const router = express.Router()
const Util = require('./../libraries/Utility')
const Booking = require('./../controllers/Booking')
const authenticate = require('./../middleware/Authenticate')

router.post('/create', authenticate, (req, res) => {
    Booking.make_booking(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/modify', (req, res) => {
    Booking.modify(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/by-identity', (req, res) => {
    Booking.by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router