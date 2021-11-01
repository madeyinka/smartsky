const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const _config = require('./../config/app.json')

var Utility = {
//get booking item //update booking data, check if invoice exists before, save if not
    get_quote: (req, callback) => {
        var param = req.body, error = []
        if (!param.identity)error.push('Provide Identity')
        var bookModel = require('./../model/BookModel')
        bookModel.findOne({conditions:{_id:param.identity}}, (state) => {
            if (state) {
                var data = {item:param.item, description:param.description, status:"active"}
                bookModel.update(data, {_id:param.identity}, (resp) => {
                    var invoiceModel = require('./../model/InvoiceModel')
                    invoiceModel.findOne({conditions:{quote_id:state.uuid}}, (quote) => {
                        if (quote) 
                            return callback(Resp.error({msg:"Invoice in existence already!", resp:null}))
                        else {
                            var userModel = require('./../model/UserModel')
                            userModel.findOne({conditions:{_id:resp.user}}, (user) => {
                                var date = require('date-and-time')
                                const _invoice = {uuid:"INV-"+Util.rand_str(8, '1234567890'),quote_id:state.uuid,item:resp.item,description:resp.description,
                                amount:resp.cost,user:resp.user, email:user.email,issue_date:Util.date_time(new Date()),due_date:Util.date_time(date.addDays(new Date(), 2))}
                                invoiceModel.save(_invoice, (inv) => {
                                    if (inv && !inv.error) {
                                        return callback(Resp.success({msg:"Invoice generated", resp:inv}))
                                    }
                                })
                            })
                        }
                    })
                })
            }
        })
    },

    get_invoices: (param, callback)  => {
        var invoiceModel = require('./../model/InvoiceModel')
        invoiceModel.findAll((Util.param_filter(param)), (state) => {
            if (!state.error) {
                return callback(Resp.success({msg:state.length + " result(s) found", total:state.length, resp:state}))
            } else 
                return callback(Resp.error({msg:"No result found", resp:null}))
        })
    },

    get_orders: (param, callback)  => {
        var orderModel = require('./../model/OrderModel')
        orderModel.findAll((Util.param_filter(param)), (state) => {
            if (!state.error) {
                return callback(Resp.success({msg:state.length + " result(s) found", total:state.length, resp:state}))
            } else 
                return callback(Resp.error({msg:"No result found", resp:null}))
        })
    },

    get_invoice: (identity, callback) => {
        var invoiceModel = require('./../model/InvoiceModel')
        invoiceModel.findOne({conditions:{quote_id:identity}},function(state){
            if(state && !state.error)
                return callback(Resp.success({msg: + "Data result found", total:1, resp:state}));
            else
                return callback(Resp.error({msg:'No data found for Query',resp:null}))
        })
    },

    invoice_by_identity: (identity, callback) => {
        var invoiceModel = require('./../model/InvoiceModel')
        invoiceModel.findOne({conditions:{_id:identity}},function(state){
            if(state && !state.error)
                return callback(Resp.success({msg: + "Data result found", total:1, resp:state}));
            else
                return callback(Resp.error({msg:'No data found for Query',resp:null}))
        })
    },

    gen_order: (req, callback) => {
        var param = req.body, error = []
        if (!param.identity)error.push('Provide Identity')
        var invoiceModel = require('./../model/InvoiceModel')
        invoiceModel.findOne({conditions:{_id:param.identity}}, (state) => {
            if (state) {
                var orderModel = require('./../model/OrderModel')
                orderModel.findOne({conditions:{invoice:state.uuid}}, (order) => {
                    if (order) 
                        return callback(Resp.error({msg:"order already exists."}))
                    else {
                        const order_data = {uuid:Util.rand_str(8, '1234567890'),invoice:state.uuid,quote:state.quote_id,user:state.user,method:param.method,track_id:Util.rand_str(15)}
                        orderModel.save(order_data, (resp) => {
                            if (resp._id) {
                                return callback(Resp.success({msg:"order has been generated"}))
                            }
                        })
                    }
                })
            }
        })
    },

    bill_response: (param, callback) => {
        var invoiceModel = require('./../model/InvoiceModel')
        invoiceModel.findOne({conditions:{_id:param.identity}}, (state) => {
            if (state) {
                const bill_data = {status:param.status,reference:param.reference,trans:param.trans}
                invoiceModel.update(bill_data, {_id:param.identity}, (resp)=>{
                    if (resp._id) {
                        const order_data = {uuid:Util.rand_str(8, '1234567890'),invoice:resp.uuid,quote:resp.quote_id,user:resp.user,status:"complete",track_id:Util.rand_str(15),method:param.method}
                        var orderModel = require('./../model/OrderModel')
                        orderModel.findOne({conditions:{invoice:resp.uuid}}, (response) => {
                            if (!response) {
                                orderModel.save(order_data, (orderInfo) => {
                                    if (orderInfo._id) {
                                        return callback(Resp.success({msg:"Order has been generated", resp:orderInfo}))
                                    }
                                })
                            } else 
                                return callback(Resp.error({msg:"Order already exists."}))
                        })
                    }
                })
            }
        })
    }
}

module.exports = Utility