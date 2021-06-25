const {User} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController{
    static signUp(req, res){
        const {email, password} = req.body
        
        User.create({email, password})
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(err=>{
            if(err.name === 'SequelizeValidationError'){
                res.status(400).json({message: err.errors[0].message})
            }else if(err.name === 'SequelizeUniqueConstraintError'){
                res.status(400).json({message: 'Email already registered'})
            }else{
                res.status(500).json(err)
            }
        })
    }

    static signIn(req, res){
        const {email, password} = req.body
        User.findOne({
            where: {email}
        })
        .then(result=>{
            const compare = bcrypt.compareSync(password, result.password)
            if(compare){
                const payload = {
                    user_id: result.id
                }
                const access_token = jwt.sign(payload, 'ROMANOVA')
                res.status(200).json({message: 'Login Success', access_token})
            }else{
                throw{code: 401, message: 'Invalid email/password'}
            }
        })
        .catch(err=>{
            res.status(500).json(err)
        })
    }
}

module.exports = UserController