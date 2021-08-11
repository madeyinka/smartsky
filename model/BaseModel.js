// grab the user model
var Class = require('class.extend');
var Mongo = require('../libraries/Mongo');

var BaseModel = Class.extend('BaseModel', {

    _instance: function(){
        return this;
    },

    init: function(schema,flag){
        this._schema = schema
        this._flag = flag.toLowerCase()
    },

    findAll: function (param, callback) {
        Mongo._get_bulk(this._schema, param, function (data) {
            return callback(data);
        });
    },

    findOne: function (param, callback) {
        Mongo._get(this._schema, param, function (data) {
            return callback(data);
        });
    },

    count: function(param,callback){
        Mongo._count(this._schema, param, function(data) {
            return callback(data)
        });
    },

    findAggregate: function(param,callback){
        Mongo._aggregriate(this._schema, param, function (data) {
            return callback(data);
        });
    },

    save : function(data, callback){
        Mongo._save(this._schema(data),function (state) {
            return callback(state);
        });
    },

    update: function (data,condition,callback){
        Mongo._update(this._schema,condition,data,function(state){
            if(state){
                return callback(state)
            }else
                return callback(false)
        });
    },
    
    del: function(identity,callback){
        var condition = {_id:identity}
        var schema = this._schema
        Mongo._update(this._schema,condition,{del_flag:1},function(state){
            Mongo._delete(schema,condition,function(err){
                return callback(true)
            })
        })
    },

    search: function (param,callback){
        var options = {}
        if(param.from) options.from = param.from
        if(param.size) options.size = param.size
        if(param.sort) options.sort = param.sort
        if(param.aggs) options.aggs = param.aggs
        Mongo._search(this._schema,param.query,options,function(data){
            return callback(data);
        })
    },

    aggreg: function(param,callback){
        Mongo._aggregriate(this._schema,param,function(data){
            return callback(data)
        })
    },

    remove_bulK_id:function(ids,callback){
        Mongo._remove_bulK_id(this._schema,ids,function(data){
            return callback(data)
        })
    },

    count: function(param,callback){
        Mongo._count(this._schema,param,function(data){
            return callback(data)
        })
    }

});
module.exports = BaseModel;