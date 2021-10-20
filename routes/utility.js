const express = require('express')
const router = express.Router()
const Util = require('./../libraries/Utility')
const Utility = require('./../controllers/Utility')

router.post('/get-quote', (req, res) => {
    Utility.get_quote(req, (state) => {
        Util.resp(res).json(state)
    })
})


module.exports = router