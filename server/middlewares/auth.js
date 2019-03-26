const jwt = require('jsonwebtoken')
require('dotenv').config

function auth(req,res,next){
    console.log(req.headers.token)
    try {
        const decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
        req.user = {
            id : decoded.id,
            email : decoded.email
        }
        console.log(req.user)
        next()
    }
    catch (error){
        res.status(401).json({msg:`Unauthenticated User`})
    }
}

module.exports = auth