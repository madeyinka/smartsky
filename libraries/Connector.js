const _config = require('./../config/app.json')
const dotenv = require('dotenv').config()

const Connector = {

    _mongo: null,

    MongoDB: () => {
        if (Connector._mongo == null) {
            const mongoose = require('mongoose')
            const url = process.env.MONGODB_URI
            //const url = 'mongodb://'+_config.mongodb.host+':'+_config.mongodb.port+'/'+_config.mongodb.db
            Connector._mongo = mongoose.connection

            Connector._mongo.once('open', () => {})
            Connector._mongo.on('error', () => {})
            mongoose.Promise = global.Promise;
            mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
            return Connector._mongo
        }
    }
 
}

module.exports = Connector