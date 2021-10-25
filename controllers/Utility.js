const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const _config = require('./../config/app.json')

var Utility = {
    get_quote: (req, callback) => {
        var error = [], param = req.body
        if (!param.identity)error.push('Provide identity')
        var bookModel = require('./../model/BookModel')
        var invoiceModel = require('./../model/InvoiceModel')
        var date = require('date-and-time')
        
        if (error.length == 0) {
            const data = {item:param.item,description:param.description,status:"active"}
            bookModel.update(data, {_id:param.identity}, (resp) => {
                if (!resp.error) {
                    const payload = {uuid:Util.rand_str(8, '1234567890'),uuid:resp.uuid,item:param.item,description:param.description,
                    amount:resp.cost,user:resp.user, issue_date:Util.date_time(new Date()),due_date:Util.date_time(date.addDays(new Date(), 2))}
                    invoiceModel.save(payload, (inv) => {
                        if (!inv.error) {
                            return callback(Resp.success({msg:"Invoice generated", resp:inv}))
                        }
                    })
                }
            })
        } else
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
        //get booking id //update booking info create invoice payload//create invoice abd return message
    },

    get_invoices: (param, callback)  => {
        var invoiceModel = require('./../model/InvoiceModel')
        invoiceModel.findAll((Util.param_filter(param)), (state) => {
            if (!state.error) {
                return callback(Resp.success({msg:state.length + " result(s) found", total:state.length, resp:state}))
            } else 
                return callback(Resp.error({msg:"No result found", resp:null}))
        })
    }
}

module.exports = Utility