const{user} = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class userController{
    static register(req,res){
        const {email,password} = req.body
        user.create({email,password})
        .then(data =>{
            res.status(201).json({"message":"Account has been created","hasil":{email:data.email,password:data.password}})
        })
        .catch(err=>{
            res.status(400).json({"message":err.message})
        })
    }

    static login(req,res){
        const {email,password} = req.body
        
        user.findOne({
            where:{
                email:email
            }
        })
        .then(result =>{
            const comparePassword = bcrypt.compareSync(password,result.password)
            if (user && comparePassword){
                const payload ={id:result.id}
                const token = jwt.sign(payload, process.env.JWT_KEY);
                res.status(200).json({"message":`Login success`,token})
            }else{
                throw {
                    code:401,
                    message:"Password or email is wrong"
                }
            }
        })
        .catch(err=>{
            res.status(500).json({"message":err.message})
        })
    }
}
module.exports = userController