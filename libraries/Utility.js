const _config = require('./../config/app.json')
const dotenv = require('dotenv').config()

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

    param_filter: function(param) {
        var _condition = {}, _sort = {}
        var excluded_list = ["limit", "sortby", "orderby", "skip", "page"]
        for (key in param) {
            if (param[key] != "" && excluded_list.indexOf(key) == -1){
                _condition[key] = param[key]
            }
        }
        if (!param.limit) param.limit = _config.api_query_limit
        if (!param.page) param.page = _config.page_start
        if (param.sortby && param.orderby) {
            _sort[param.sortby] = param.orderby === 'asc' ? 1 : -1
        }
        var _skip = ((parseInt(param.limit) * param.page) - parseInt(param.limit))
        var search_param = {conditions:_condition,sort:_sort,skip:_skip,limit:parseInt(param.limit)}
        return search_param
    },

    resp: function(res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        return res;
    },

    check_password: function(value1, value2) {
        const bcrypt = require('bcrypt')
        const result = bcrypt.compareSync(value1, value2)
        return result
    },

    generate_token:  function(payload) {
        const jwt = require('jsonwebtoken')
        const token = jwt.sign(payload, process.env.JWT_SECRET)
        return token;
    },

    compare_param: function(a,b) {
        if (a === b){
            return true;
        } else 
            return false;
    }

}

module.exports = Utility