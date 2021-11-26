const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const _config = require('./../config/app.json')
const mailer = require('../libraries/Mailer')
const {waybill} = require('./../templates/waybill')


var Utility = {

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

    // gen_order: (req, callback) => { //append this to bill response
    //     var param = req.body, error = []
    //     if (!param.identity)error.push('Provide Identity')
    //     var invoiceModel = require('./../model/InvoiceModel')
    //     invoiceModel.findOne({conditions:{_id:param.identity}}, (state) => {
    //         if (state) {
    //             var orderModel = require('./../model/OrderModel')
    //             orderModel.findOne({conditions:{invoice:state.uuid}}, (order) => {
    //                 if (order) 
    //                     return callback(Resp.error({msg:"order already exists."}))
    //                 else {
    //                     const order_data = {uuid:Util.rand_str(8, '1234567890'),invoice:state.uuid,quote:state.quote_id,user:state.user,item:state.item,method:param.method,track_id:Util.rand_str(15)}
    //                     orderModel.save(order_data, (resp) => {
    //                         if (resp._id) {
    //                             return callback(Resp.success({msg:"order has been generated"}))
    //                         }
    //                     })
    //                 }
    //             })
    //         }
    //     })
    // },

    generate_order: (param, callback) => { //invoiceid, method, referenceid, transid, email, status
        const orderModel = require('./../model/OrderModel')
        orderModel.findOne({conditions:{invoice:param.identity}}, (state) => {
            if (!state) {
                const invoiceModel = require('./../model/InvoiceModel')
                invoiceModel.findOne({conditions:{_id:param.identity}}, (resp) => {
                    if (!resp) 
                        return callback(false)
                    else {
                        const order_info = {uuid:Util.rand_str(8, '1234567890'),invoice:resp._id,quote:resp.quote_id,user:resp.user,
                                            item:resp.item,method:param.method,track_id:Util.rand_str(15, '0123456789')}
                        orderModel.save(order_info, (data) => {
                            if (data._id && param.trans) {
                                Utility.bill_response(param)
                            } else {
                                const option = {email:param.email,subject:_config.subject.waybill,message:waybill()}
                                mailer.sendMail(option, (msg) => {
                                    if (msg && msg.id) 
                                        return callback(Resp.success({msg:"Order has been generated"}))
                                    else 
                                        return callback(false)
                                })
                            }
                        })
                    }
                })

            } else 
                return callback(false)
        }) 
    },

    bill_response: (param, callback) => { //check user//check invoice
        if (param.trans){
            const invoiceModel = require('./../model/InvoiceModel')
            invoiceModel.findOne({conditions:{_id:param.invoice}}, (state) => {
                // console.log(state)
                const data = {status:param.status, reference:param.reference,trans:param.trans}
                invoiceModel.update(data, {_id:param.invoice}, (resp) => {
                    // console.log(resp)
                    const orderModel = require('./../model/OrderModel')
                    orderModel.update({status:"complete"}, {invoice:param.invoice}, (order_info) => {
                        // const option = {email:param.email,subject:_config.subject.waybill,message:waybill()}
                        // mailer.sendMail(option, (msg) => {
                        //     if (msg && msg.id){
                        //         callback(Resp.success({msg:"billing successful"}))
                        //     }
                        // })
                        return callback(Resp.success({msg:"billing successful"}))
                    })
                })
            })
        } else
            return callback(false) 
    },

    waybill_info: (invoice) => {
        const data = {}
        const invoiceModel = require('./../model/InvoiceModel')
        invoiceModel.findOne({conditions:{_id:invoice}}, (state) => {
            if (state) {
                const bookModel = require('./../model/BookModel')
                bookModel.findOne({conditions:{_id:state.quote_id}}, (book) => {
                    if(book) {
                        const orderModel = require('./../model/OrderModel')
                        orderModel.findOne({conditions:{invoice:invoice}}, (order) => {
                            if (order) {
                                data.invoice = state
                                data.book = book
                                data.order = order
                            }
                            return data
                        })
                    }
                })
            }
        })
    }

    // bill_response: (param, callback) => { //update invoice, send waybill 
    //     var invoiceModel = require('./../model/InvoiceModel')
    //     invoiceModel.findOne({conditions:{_id:param.identity}}, (state) => {
    //         if (state) {
    //             const bill_data = {status:param.status,reference:param.reference,trans:param.trans}
    //             invoiceModel.update(bill_data, {_id:param.identity}, (resp)=>{
    //                 if (resp._id) {
    //                     const order_data = {uuid:Util.rand_str(8, '1234567890'),invoice:resp.uuid,quote:resp.quote_id,user:resp.user,item:state.item,status:"complete",track_id:Util.rand_str(15),method:param.method}
    //                     var orderModel = require('./../model/OrderModel')
    //                     orderModel.findOne({conditions:{invoice:resp.uuid}}, (response) => {
    //                         if (!response) {
    //                             orderModel.save(order_data, (orderInfo) => {
    //                                 if (orderInfo._id) {
    //                                     return callback(Resp.success({msg:"Order has been generated", resp:orderInfo}))
    //                                 }
    //                             })
    //                         } else 
    //                             return callback(Resp.error({msg:"Order already exists."}))
    //                     })
    //                 }
    //             })
    //         }
    //     })
    // }
}

module.exports = Utility