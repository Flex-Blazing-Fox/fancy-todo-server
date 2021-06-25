const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    if (!req.headers.token) {
        return res.status(401).json({"message":"token invalid"})
    }
    else{
        try {
            const tokenDecode = jwt.verify(req.headers.token, process.env.JWT_KEY)
            req.user_id = tokenDecode.id
            next()
          }
          catch (err) {
            res.status(401).json({ "message": "invalid access token" })
          }
    }
}

module.exports = auth