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
    Utility.gen_order(req, (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/payment-feedback', (req, res) => { //updates invoice data
    Utility.bill_response(req.query, (state) => {
        Util.resp(res).json(state)
    })
})


module.exports = router