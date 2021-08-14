const { validationResult } = require('express-validator');
const Utility = require('../../libraries/Utility');
const Resp = require('../Response');

module.exports = (req, res, next) =>
{

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().forEach((err) =>
    {
        if (err.param === 'phone_number') {
            extractedErrors.push({ message: `${err.msg}` });
        } else {
            extractedErrors.push({ message: `${err.param} ${err.msg}` });
        }
    });
    // Response validation
    return Utility.resp(res).json(Resp.error({
        msg: "Invalid Parameter", resp: extractedErrors
    }, 422));

};