const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const airportModel = require('./../model/AirportModel')

const initAirport = {

    create: (param, callback) => {
        var error = []
        if (!param.label)error.push('Provide label for airport')

        if (error.length == 0) {
            const data = {
                label: param.label,
                iata_code: param.iata_code,
                icao_code: param.icao_code
            }
            airportModel.save(data, (resp) => {
                if (!resp._id) 
                    return callback(Resp.error({msg:"Something went wrong - possibly content already exist."}))
                else 
                    return callback(Resp.success({msg:"Content successfully added.", resp: resp}))
            })
        } else
            return callback(Resp.error({msg: "Invalid Parameter", resp: error})) 
    },

    update: (param, callback) => {
        var error = [], data = {}
        if (!param.identity)error.push('Provide an identity')
        if (param.label)data.label = param.label
        if (param.iata_code)data.iata_code = param.iata_code
        if (param.icao_code)data.icao_code = param.icao_code

        if (error.length == 0) {
            if (data) {
                airportModel.update(data, {_id:param.identity}, (resp) => {
                    if (!resp._id)
                        return callback(Resp.error({msg:"Something went wrong updating airport information"}))
                    else  
                        return callback(Resp.success({msg: "Airport successfully updated", resp: resp}))
                })
            } else 
                return callback(Resp.error({msg: 'Provide at least one data to update'}))
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp: error}))
    },

    by_identity: (identity,callback) => {
        airportModel.findOne({conditions:{_id:identity}},function(state){
            if(state && !state.error)
                return callback(Resp.success({msg:"Data result found",resp:state}));
            else
                return callback(Resp.error({msg:'No data found for Query',resp:null}))
        })
    },

    pull: (param, callback) => {
        airportModel.findAll(Util.param_filter(param), (state) => {
            if (!state.error) {
                return callback(Resp.success({msg:"Query Results",total:state.length,resp:state}))
            } else {
                return callback(Resp.error({msg:"No result found for search", resp:null}))
            }
        })
    }
}

module.exports = initAirport