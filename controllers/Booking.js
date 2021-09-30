const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const bookModel = require('./../model/BookModel')

const initBooking = {

    make_booking: (req, callback) => {
        const param = req.body
        const id = "#QUO-" + Util.rand_str(8, '1234567890')
        const data = {quote_id:id, origin:param.origin, destination:param.destination, shipment_date:param.shipment_date,
        submission:param.submission,location:param.location,recipient:param.recipient,cargoes:param.cargoes,total_cost:param.total_cost,
        unit:param.unit,dim_weight:param.dim_weight,actual_weight:param.actual_weight,chargable_weight:param.chargable_weight,user:req.userInfo.id,status:param.status}
        bookModel.save(data, (resp) => {
            if (!resp._id)
                return callback(Resp.error({msg:"Something went wrong saving information", resp:null}))
            else 
                return callback(Resp.success({msg:"Booking added successfully", resp:resp}))
        })
    },

    update_booking: (req, callback) => { //ensure sender is user

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