const jwt = require('jsonwebtoken')
const {Todo} = require('../models')

const authentication = (req, res, next) => {
    if (!req.headers.access_token) return next( {name: "Missing access token"})

    try{
        const decoded = jwt.verify(req.headers.access_token, "secret")
        req.userId = decoded.id
        next()
    }
    catch(err) {
        next( {name: "Invalid access_token"})
    }
}

const authorization = (req, res, next) => {
    const {id} = req.params

    Todo.findOne({ where: {
        id : id,
        userId : req.userId
    }})
    .then((todo) => {
        if(!todo) throw ( {name: "Todo Not Found"})

        req.todo = todo
        next()
    })
    .catch(err => [
        next(err)
    ])
}

module.exports = {authentication, authorization}