const jwt = require('jsonwebtoken');
const{todo_list} = require('../models')
const auth = (req,res,next)=>{
    if (!req.headers.token) {
        return next({name:'Invalid Token'})
    }
    else{
        try {
            const tokenDecode = jwt.verify(req.headers.token, process.env.JWT_KEY)
            req.user_id = tokenDecode.id
            next()
          }
          catch (err) {
            next({name:'invalid access token'})
          }
    }
}

const author = (req,res,next)=>{
      const {id} = req.params
      todo_list.findOne({where:{id:id,user_id:req.user_id}})
      .then(data =>{
        if (!data){
          throw{name:'Todo not found'}
        }else{
          req.todo = data
          next()
         }
      })
      .catch(err=>{
        next(err)
      })
}

module.exports = {auth,author}