const Resp = require('./Response')
const Util = require('../libraries/Utility')
const userModel = require('../model/UserModel')
const mailer = require('../libraries/Mailer')
const { verify, pass_reset } = require('../templates/notification')
const _config = require('../config/app.json')

const initAuth = {

    register: (param, callback) => {
        var error = []
        if (!param.name)error.push('Name is required')
        if (!param.email)error.push('Email is required')
        if (!param.phone)error.push('Phone Number is required')
        if (!param.address)error.push('Address is required')

        if (error.length == 0) {
            var data = {
                name:param.name,
                email:param.email,
                phone:param.phone,
                address:param.address,
                state:param.state,
                lga:param.lga,
                password:Util.get_hash(param.password),
                organisation:param.organisation,
                passkey: Util.rand_str(25),
                type: param.type,
                status: param.status
            }
            userModel.save(data, (resp) => {
                if (!resp._id) 
                    return callback(Resp.error({msg:"User information already exists", resp:null}))
                else {
                    return callback(Resp.success({msg: "User account created", resp:resp}))
                    // const option = {email:resp.email,subject:_config.subject.verify,message:verify(resp)}
                    // mailer.sendMail(option, (msg) => {
                    //     if (msg && msg.id) 
                    //         return callback(Resp.success({msg: "Check your email for verification", resp:resp}))
                    //     else
                    //         return callback(Resp.error({msg: "Email service unavailable", resp:resp}))
                    // })
                }
            })
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    verify: (param, callback) => {
        if (param && param.user && param.passkey) {
            userModel.findOne({conditions:{_id:param.user}}, (state) => {
                if (state && !state.error) {
                    if (Util.compare_param(param.passkey, state.passkey)) {
                        const data = {status: "active", passkey:Util.rand_str(25)}
                        userModel.update(data, {_id:state._id}, (resp) => {
                            if (resp._id) {
                                //redirect to login page
                            }
                        })
                    } else {
                        return callback(Resp.error({msg:"Link may be invalid or expired"}))
                    }
                } else {
                    return callback(Resp.error({msg:"User not found!"}))
                }
            })
        }
    },

    login: (param, callback) => {
        var error = []
        if (!param.email)error.push('Provide email address of user')
        if (!param.password)error.push('Password cannot be empty')

        if (error.length == 0) {
            userModel.findOne({conditions:{email:param.email}}, (user) => {
                if (user) {
                    if (Util.check_password(param.password, user.password)){
                        if (user.status == 'active') {
                            const payload = {id:user._id,name:user.fname,email:user.email,type:user.type,status:user.status}
                            const token = Util.generate_token(payload)
                            return callback(Resp.success({msg:"Login Successful", resp:token}))
                        } else if (user.status == 'pending')
                            return callback(Resp.error({msg:"Account is not active, Check your email."}))
                        else 
                            return callback(Resp.error({msg:"User account is inactive. Contact Admin"})) 
                    }else 
                        return callback(Resp.error({msg:"Invalid Credentials"}))
                } else 
                    return callback(Resp.error({msg:"Invalid Credentials"}))
            })
        } else 
            return callback(Resp.error({msg:"Invalid Parameter", resp:error}))
    },

    reset_pass: (param, callback) => {
        var error = []
        if (!param.email)error.push('Provide user email address')

        if (error.length == 0) {
            userModel.findOne({conditions:{email:param.email}}, (user) => {
                if (!user) 
                    return callback(Resp.error({msg:"User not found!"}))
                else {
                    const option = {email:user.email, subject:_config.subject.reset_pass, message:pass_reset(user)}
                    mailer.sendMail(option, (msg) => {
                        if (msg && msg.id) {
                            return callback(Resp.success({msg:"Check your email for reset link."}))
                        } else 
                            return callback(Resp.error({msg:"Error sending password reset link"}))
                    })
                }
            })
        }
    },

    userContext: (param, callback) => {
        userModel.findOne({conditions:{_id:param}}, (user) => {
            if (user) {
                const id = user._id
                return callback(Resp.success({msg:"user information found", resp:id}))
            } else {
                return callback(Resp.error({msg:"Unauthorized user"}))
            }
        })
    }
}

module.exports = initAuth