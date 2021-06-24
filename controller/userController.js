const {User} = require('../models')

class UserController{
    static register(req, res){
        const {email, password} = req.body
        
        User.create({email, password})
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(err=>{
            if(err.name === "SequelizeValidationError"){
                res.status(400).json({"Error": err.errors[0].message})
            }else if(err.name === "SequelizeUniqueConstraintError"){
                res.status(400).json({"Error": "Email already registered"})
            }else{
                res.status(500).json(err)
            }
        })
    }
}

module.exports = UserController