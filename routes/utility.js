const express = require('express')
const router = express.Router()
const Util = require('./../libraries/Utility')
const Utility = require('./../controllers/Utility')
const { authenticate } = require('./../middleware/Authenticate')

router.post('/get-quote', (req, res) => {
    Utility.get_quote(req, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/get-invoices', authenticate, (req, res) => {
    Utility.get_invoices(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/get-orders', authenticate, (req, res) => {
    Utility.get_orders(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/get-invoice', (req, res) => {
    Utility.get_invoice(req.query.quote_id, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/invoice-by-identity', (req, res) => {
    Utility.invoice_by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/generate-order', (req, res) => {
    Utility.generate_order(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/payment-feedback', (req, res) => {
    Utility.bill_response(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})


module.exports = router