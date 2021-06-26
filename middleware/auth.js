const {User, Todo} = require('../models')
const jwt = require('jsonwebtoken')

const authentication = (req, res, next)=>{
    if(!req.headers.access_token){
        throw {name: 'NOT_LOGIN'}
    }
    try{
        const decoded = jwt.verify(req.headers.access_token, process.env.JWT_SECRET)
        req.user_id = decoded.user_id
        
        User.findOne({where:{
            id: decoded.user_id
        }})
        .then(result=>{
            if(result){
                next() 
            }else{
                throw{name: 'USER_NOT_FOUND'}
            }
        })
        .catch(err=>{
            next(err)
        })
    }
    catch(err){
        next({name: 'INVALID_TOKEN'})
    }
}
const authorization = (req, res, next)=>{
    const { id } = req.params
    Todo.findOne({
        where:{
            id, 
            user_id: req.user_id
        }
    })
    .then(result=>{
        if(!result){
            throw {name: 'TODO_NOT_FOUND'}
        }else{
            req.todo = result
            next()
        }
    })
    .catch(err=>{
        next(err)
    })
}

module.exports = {authentication, authorization}