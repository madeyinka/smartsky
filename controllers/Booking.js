const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const bookModel = require('./../model/BookModel')

const initBooking = {

    make_booking: (param, callback) => { //check if userid is passed
        const id = "#QUO-" + Util.rand_str(8, '1234567890')
        const data = {quote_id: id, origin:param.origin, destination:param.destination, shipment_date:param.shipment_date,
        submission:param.submission, location:param.location, recipient:param.recipient, cargo:param.cargo, total_cost:param.total_cost,
        total_volume:param.total_volume, total_weight:param.total_weight,status:param.status}
        bookModel.save(data, (resp) => {
            if (!resp._id)
                return callback(Resp.error({msg:"Something went wrong saving information", resp:null}))
            else 
                return callback(Resp.success({msg:"Booking added successfully", resp:resp}))
        })
    },

    by_identity: (identity, callback) => {
        bookModel.findOne({conditions:{_id:identity}},function(state){
            if(state && !state.error)
                return callback(Resp.success({msg:"Data result found",resp:state}));
            else
                return callback(Resp.error({msg:'No data found for Query',resp:null}))
        }) 
    }

}

module.exports = initBooking