const express = require('express')
const router = express.Router()
const Util = require('./../libraries/Utility')
const airport = require('./../controllers/Airport')

router.post('/create', (req, res) => {
    airport.create(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/modify', (req, res) => {
    airport.update(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/by-identity', (req, res) => {
    airport.by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/pull', (req, res) => {
    airport.pull(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router