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
                    const payload = {uuid:"INV-"+Util.rand_str(13, '1234567890'),quote_id:resp.uuid,item:param.item,description:param.description,
                    amount:resp.total_cost,user:resp.user_profile, issue_date:Util.date_time(new Date()),due_date:Util.date_time(date.addDays(new Date(), 2))}
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
    }
}

module.exports = Utility