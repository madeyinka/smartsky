const express = require('express'), router = express.Router()
const Util = require('./../libraries/Utility')
const invoice = require('./../controllers/Invoice')

router.post('/generate-invoice', (req, res) => {
    invoice.generate(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/all-invoices', (req, res) => {
    invoice.pull(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/by-identity', (req, res) => {
    invoice.by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router