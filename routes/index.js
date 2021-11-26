const express = require('express')
const router = express.Router()
const _config = require('./../config/app.json')

const api_url = _config.app_base+_config.api._url+_config.api._version

/**  API routes **/
router.use(api_url + '/auth', require('./auth'))
router.use(api_url + '/booking', require('./booking'))
router.use(api_url + '/airport', require('./airport'))
router.use(api_url + '/utility', require('./utility'))
router.use(api_url + '/user', require('./user'))
router.use(api_url + '/invoice', require('./invoice'))
// router.use(api_url + '/order', require('./order'))

module.exports = router