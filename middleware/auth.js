const jwt = require('jsonwebtoken')
const { Todo } = require('../models')

const authentication = (req, res, next) => {
    if(!req.headers.access_token){
        return res.status(401).json({"message":"Silahkan login terlebih dahulu"})
    }

    try {
        const decoded = jwt.verify(req.headers.access_token, process.env.ACCESS_TOKEN)
        req.userId = decoded.id
        next()
    }
    catch(err){
        res.status(404).json({"message":"Invalid access token"})
    }
}

const authorization = (req, res, next) => {
    const { id } = req.params
    Todo.findOne({
        where: {id, userId: req.userId}
    })
    .then(result => {
        if(!result){
            res.status(404).json("Todo Not Found")
        } else {
            req.todos = result
            next()
        }
    })
    .catch(err => {
        res.status(505).json(err)
    })
}

module.exports = { authentication, authorization}