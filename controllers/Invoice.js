const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const invoiceModel = require('./../model/InvoiceModel')
const date = require('date-and-time')

const init = {

    generate: (param, callback) => {
        var bookModel = require('./../model/BookModel')
        var userModel = require('./../model/UserModel')
        bookModel.findOne({conditions:{_id:param.identity}}, (resp) => {
            if (resp) {
                bookModel.update({item:param.item,description:param.description}, {_id:param.identity}, (item) => {
                    if (item) {
                        invoiceModel.findOne({conditions:{quote_id:resp._id}}, (state)=> {
                            if (!state) {
                                userModel.findOne({conditions:{_id:resp.user}}, (user) => {
                                    if (user) {
                                        const data = {uuid:Util.rand_str(6, '0123456789'),quote_id:resp._id,amount:resp.cost,user:user._id,email:user.email,item:item.item,
                                        description:item.description,issue_date:Util.date_time(new Date()), due_date:Util.date_time(date.addDays(new Date(), 2))}
                                        invoiceModel.save(data, (response) => {
                                            if (response._id){
                                                return callback(Resp.success({msg:"Invoice generated.", resp:response}))
                                            } else 
                                            return callback(false)
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
                
            } 
        })
    },

    pull: (param, callback) => {
        invoiceModel.findAll((Util.param_filter(param)), (state) => {
            if (!state.error) {
                return callback(Resp.success({msg:state.length + " result(s) found", total:state.length, resp:state}))
            } else 
                return callback(Resp.error({msg:"No result found", resp:null}))
        })
    },

    by_identity: (identity, callback) => {
        invoiceModel.findOne({conditions:{_id:identity}},function(state){
            if(state && !state.error)
                return callback(Resp.success({msg: + "Data result found", total:1, resp:state}));
            else
                return callback(Resp.error({msg:'No data found for Query',resp:null}))
        })
    }

}

module.exports = init