const express = require('express')
const router = express.Router()
const _config = require('./../config/app.json')

const api_url = _config.app_base+_config.api._url+_config.api._version

/**  API routes **/
router.use(api_url + '/auth', require('./auth'))


module.exports = router