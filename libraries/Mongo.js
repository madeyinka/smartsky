var Connector = require('./Connector');
var _config = require('./../config/app.json');

var Mongo = {
    _client: Connector.MongoDB(),
    key: null,

    _get: function(model,params,callback){
        var query = model.findOne(params.conditions);
        if(params.fields)
            query.select(params.fields);
        query.exec(function(err,model_data){
            if(err) return callback(Mongo.handleError(err));
            else
                return callback(model_data);
        });
    },


    _count: function(model,params,callback){
      model.count(params,function(err,data){
          if (err != null)
              return callback(Mongo.handleError(err));
          else
              return callback(data);
      })
    },

    _get_bulk: function(model,params,callback){
        if(!params.limit)
            params.limit = _config.query_limit;

        var query = model.find(params.conditions).limit(params.limit);

        if(params.skip)
            query.skip(params.skip)

        if(params.sort)
            query.sort(params.sort);

        if(params.fields)
            query.select(params.fields);

        query.exec(function(err,model_data){
            if(err) return callback(Mongo.handleError(err));
            else
                return callback(model_data);
        });
    },

    _get_random: function(model,params,callback){
        model.count(params.conditions,function(err, count) {
            if (err) return callback(Mongo.handleError(err));
            var rand = Math.floor(Math.random() * count);

            var query = model.findOne(params.conditions).skip(rand);

            if(params.fields)
                query.select(params.fields);

            query.exec(function(in_err,model_data){
                if(in_err) return callback(Mongo.handleError(in_err));
                else
                    return callback(model_data);
            });

        });

    },

     _aggregriate: function(model,params,callback){
        var query = model.aggregate(params.conditions);
        query.exec(function(err,model_data) {
            if(err) return callback(Mongo.handleError(err));
            else
                return callback(model_data);
        });
    },

    _remove_bulK_id: function(model,ids,callback){
        var query = model.remove({_id:{$in:ids}})
        query.exec(function(err,model_data) {
            if(err) return callback(Mongo.handleError(err));
            else
                return callback(model_data);
        });
    },

    _save: function(model,callback){
        model.save(function(err,data){
            if (err != null)
                return callback(Mongo.handleError(err));
            else
                return callback(data);
        });
    },

    _delete: function(model,condition,callback){
        model.remove(condition, function(err,state) {
            if (err) return callback(Mongo.handleError(err))
            else return callback(state)
        });
    },

    _update: function(model,condition,data,callback){
        model.findOneAndUpdate(condition,{$set:data},{new:true},function(err,resp){//{multi: true},
            if (err)
                return callback(Mongo.handleError(err));
            else
                return callback(resp);
        });
    },

    _update_bulk: function(model,condition,data,callback){
        model.update(condition,{$set:data},function(err,resp){
            if (err)
                return callback(Mongo.handleError(err));
            else
                return callback(resp);
        });
    },
    
    _search: function(model,condition,options,callback){
      model.search(condition,options,function(err,resp){
          if (err)
              return callback(Mongo.handleError(err));
          else {
              if(options.aggs)
                  return callback(resp.aggregations)
              else
                  return callback(resp.hits);
          }
      });
    },

    close: function() {
      this._client.close();
    },

    handleError: function(report){
        return {"error":true,"message":report};
    }
};

module.exports = Mongo;