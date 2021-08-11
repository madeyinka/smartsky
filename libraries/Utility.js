const _config = require('./../config/app.json')

const Utility = {
    date_time: function(dt){
        var moment = require('moment-timezone');
        return moment.tz(dt, "Africa/Lagos").format('YYYY-MM-DD HH:mm:ss');
    },

    rand_str:function(len,charset){
        if(!len) len = 3;
        if(!charset) charset = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";
        var text = "";
        for( var i=0; i < len; i++ )
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    },

    param_extract: function(req){
        var data = {}
        if (req.fields)
            data = req.fields
        else if(req.body)
            data = req.body;

        return data
    },

    get_hash: function(value) {
        const bcrypt = require('bcrypt')
        const saltRounds = bcrypt.genSaltSync(_config.rounds)
        return bcrypt.hashSync(value, saltRounds)    
    },

    resp: function(res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return res;
    }

}

module.exports = Utility