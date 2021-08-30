const _config = require('./../config/app.json')

const notify = {

    verify: (option) => {
        const html =`
        <p>Hi ${option.fname},</p>
        <p>Thank you for your registration. Click the button below to activating your account.</p>
        <a href="${'https://smart-sky.herokuapp.com/smartsky/api/1.0/auth/verify?user='+option._id+'&passkey='+option.passkey}">Verify</a>
        `
        return html
    },

    pass_reset: (option) => {
        const html = `
        <p>Hi ${option.fname},</p>
        <p>Click on the link below to reset your password</p>
        <a href="${'https://smart-sky.herokuapp.com/smartsky/api/1.0/reset?id='+option._id+'&key='+option.passkey}">Reset</a>
        `
        return html
    }
}

module.exports = notify