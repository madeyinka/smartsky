const Resp = require('./Response')
const Util = require('./../libraries/Utility')
const userModel = require('./../model/UserModel')
const mailer = require('./../libraries/Mailer')
const { verify } = require('./../templates/notification')

const initAuth = {

    register: (param, callback) => {
        var error = []
        if (!param.firstname)error.push('Provide first name')
        if (!param.lastname)error.push('Provide last name')
        if (!param.email)error.push('Provide email address')
        if (!param.password)error.push('Pasword cannot be empty')
        if (!param.address)error.push('Provide address of user')
        if (!param.state)error.push('User must select a state')
        if (!param.zipcode)error.push('Provide zip code')

        if (error.length == 0) {
            var data = {
                fname: param.firstname,
                lname: param.lastname,
                email: param.email,
                password: Util.get_hash(param.password),
                passkey: Util.rand_str(25),
                address: param.address,
                state: param.state,
                zipcode: param.zipcode
            }
            userModel.save(data, (resp) => {
                if (!resp._id) 
                    return callback(Resp.error({msg:"User information already exists", resp:null}))
                else {
                    //send validation message to user...
                    const option = {email:resp.email,subject:_config.subject.verify,message:verify(resp)}
                    mailer.sendMail(option, (msg) => {
                        if (msg && msg.id) 
                            return callback(Resp.success({msg: "Check your email for verification", resp:resp}))
                        else
                            return callback(Resp.error({msg: "Email service unavailable", resp:resp}))
                    })
                }
            })
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    }
}

module.exports = initAuth