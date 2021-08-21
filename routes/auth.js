const express = require('express')
const router = express.Router()
const Util = require('./../libraries/Utility')
const authCTR = require('./../controllers/Auth')

router.post('/register', (req, res) => {
    authCTR.register(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})

router.get('/verify', (req, res) => {
    authCTR.verify(req.query, (state) => {
        Util.resp(res).json(state)
    })
})

router.post('/login', (req, res) => {
    authCTR.login(Util.param_extract(req), (state) => {
        Util.resp(res).json(state)
    })
})


module.exports = router