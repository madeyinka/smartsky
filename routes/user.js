const express = require('express')
const router = express.Router()
const Util = require('./../libraries/Utility')
const User = require('./../controllers/User')

router.get('/by-identity', (req, res) => {
    User.by_identity(req.query.identity, (state) => {
        Util.resp(res).json(state)
    })
})

module.exports = router