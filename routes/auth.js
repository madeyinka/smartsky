const express = require('express')
const router = express.Router()
const Util = require('./../libraries/Utility')
const authCTR = require('./../controllers/AuthCTR')

router.post('/register', (req, res) => {
    authCTR.register(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})


module.exports = router