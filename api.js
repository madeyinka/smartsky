const express = require('express')
const bodyParser = require('body-parser')
const _config = require('./config/app.json')
const Logger = require('./libraries/Logger')
const dotenv = require('dotenv').config()
const app = express()

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
app.use(require('./routes'))

app.listen(process.env.PORT, function(){
    Logger.init({msg:_config.app_name+ ' version '+_config.app_version+ ' Listening on http://[:]'+process.env.PORT+_config.app_base+_config.api._url+_config.api._version })
})