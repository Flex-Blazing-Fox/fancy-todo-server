const {User, Todo} = require('../models')
const jwt = require('jsonwebtoken')

const authentication = (req, res, next)=>{
    if(!req.headers.access_token){
        return res.status(401).json({messsage: 'Please SignIn First'})
    }
    try{
        const decoded = jwt.verify(req.headers.access_token, 'ROMANOVA')
        req.user_id = decoded.user_id
        next()
    }
    catch(err){
        res.status(401).json({messsage: 'Invalid Access Token'})
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
            res.status(404).json({message: "Todo Not Found"})
        }else{
            req.todo = result
            next()
        }
    })
    .catch(err=>{
        res.status(500).json(err)
    })
}

module.exports = {authentication, authorization}