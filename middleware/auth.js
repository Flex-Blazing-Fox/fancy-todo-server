const jwt = require('jsonwebtoken')
const { Todo, User } = require('../models')

const authentication = (req, res, next) => {
    if(!req.headers.access_token){
        throw {name: 'IS_NOT_LOGIN'}
    }

    try {
        const decoded = jwt.verify(req.headers.access_token, process.env.ACCESS_TOKEN)
        req.userId = decoded.id

        User.findOne({
            where: {id:decoded.id}
        })
        .then(result => {
            if(result){
                next()
            } else {
                throw {name:'USER_DATA_NOT_FOUND'}
            }
        })
        .catch(err => {
            next(err)
        })
    }
    catch(err){
        throw {name:'INVALID_TOKEN'}
    }
}

const authorization = (req, res, next) => {
    const { id } = req.params
    Todo.findOne({
        where: {id, userId: req.userId}
    })
    .then(result => {
        if(!result){
            throw {name:'TODO_NOT_FOUND'}
        } else {
            req.todos = result
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = { authentication, authorization}