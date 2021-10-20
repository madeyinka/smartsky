const jwt= require('jsonwebtoken')
const dotenv = require('dotenv')

const Authenticate = {

    authenticate: (req,res,next) => {
        if (!req.headers.authorization) {
            return res.status(401).json({message: "Authorization required"})
        }
        let splitHeader = req.headers.authorization.split(' ')
        if (splitHeader[0] !== 'Bearer') {
            return res.status(401).json({message: "Invalid token format"})
        }
        let token = splitHeader[1];
        jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
            if (error && error.name == 'TokenExpiredError') {
                return res.status(401).json({message:"Expired Token"})
            }
            if (!decodedToken ) {
                return res.status(401).json({message: "Invalid authorization token"})
            }
            req.userInfo = decodedToken
            next()
        })
    }
}

module.exports = Authenticate