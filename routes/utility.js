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


module.exports = router