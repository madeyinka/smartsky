const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const userModel = require('./../model/UserModel')

const userInit = {

    by_identity: (identity, callback) => {
        userModel.findOne({conditions:{_id:identity}},function(state){
            if(state && !state.error)
                return callback(Resp.success({msg:"Data result found",resp:state}));
            else
                return callback(Resp.error({msg:'No data found for Query',resp:null}))
        }) 
    }
}

module.exports = userInit