const{user} = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class userController{
    static register(req,res,next){
        const {email,password} = req.body
        user.create({email,password})
        .then(data =>{
            res.status(201).json({"message":"Account has been created","data":{email:data.email,password:data.password}})
        })
        .catch(err=>{
            next(err)
        })
    }

    static login(req,res,next){
        const {email,password} = req.body
        
        user.findOne({
            where:{
                email:email
            }
        })
        .then(result =>{
            const comparePassword = bcrypt.compareSync(password,result.password)
            if (result && comparePassword){
                const payload ={id:result.id}
                const token = jwt.sign(payload, process.env.JWT_KEY);
                res.status(200).json({"message":"Login success"})
            }else{
                throw {
                    name:'Login gagal'
                }
            }
        })
        .catch(err=>{
           next(err)
        })
    }
}
module.exports = userController