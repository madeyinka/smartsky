const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const bookModel = require('./../model/BookModel')

const initBooking = {

    make_booking: (req, callback) => {
        const param = req.body
        const data = {uuid:Util.rand_str(13, '1234567890'), origin:param.origin, destination:param.destination, shipment_date:param.shipment_date,
        submission:param.submission,location:param.location,recipient:param.recipient,cargoes:param.cargoes,total_cost:param.total_cost,
        unit:param.unit,dim_weight:param.dim_weight,actual_weight:param.actual_weight,chargable_weight:param.chargable_weight,user:req.userInfo.id,status:param.status}
        bookModel.save(data, (resp) => {
            if (!resp._id)
                return callback(Resp.error({msg:"Something went wrong saving information", resp:null}))
            else 
                return callback(Resp.success({msg:"Booking added successfully", resp:resp}))
        })
    },

    update_booking: (req, callback) => {
        const param = req.body
        var error = [], data = {}
        if(!param.identity)error.push('Provide Identity')
        if(param.origin) data.origin = param.origin
        if(param.destination)data.destination = param.destination
        if(param.shipment_date)data.shipment_date = param.shipment_date
        if(param.submission)data.submission = param.submission
        if(param.location)data.location = param.location
        if(param.recipient)data.recipient = param.recipient
        if(param.cargoes)data.cargoes = param.cargoes
        if(param.dim_weight)data.dim_weight = param.dim_weight
        if(param.actual_weight)data.actual_weight = param.actual_weight
        if(param.chargable_weight)data.chargable_weight = param.chargable_weight
        if(param.total_cost)data.total_cost = param.total_cost

        if (error.length == 0) {
            if (data) {
                bookModel.update(data, {_id:param.identity}, (resp) => {
                    if (!resp._id) {
                        return callback(Resp.error({msg:"Error in updating booking information"})) 
                    } else {
                        return callback(Resp.success({msg:"Update Successful", resp:resp}))
                    }
                })
            }
        }else
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))

    },

    by_identity: (identity, callback) => {
        bookModel.findOne({conditions:{_id:identity}},function(state){
            if(state && !state.error)
                return callback(Resp.success({msg:"Data result found",resp:state}));
            else
                return callback(Resp.error({msg:'No data found for Query',resp:null}))
        }) 
    },

    pull: (param, callback) => {
        bookModel.findAll((Util.param_filter(param)), (state) => {
            if (!state.error) {
                return callback(Resp.success({msg:state.length + " result(s) found", total:state.length, resp:state}))
            } else 
                return callback(Resp.error({msg:"No result found", resp:null}))
        })
    }

}

module.exports = initBooking