const{todo_list} = require('../models')
class todo{
    static listTodo(req,res){
        todo_list.findAll()
        .then(result=>{
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500)
        })
    }
    static listTodo_Id(req,res){
        const {id} = req.params
        todo_list.findOne({
            where:{
                id:+id
            }
        })
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500)
        })
    }
    static addTodo(req,res){
        const {title,description,status,due_date} = req.body
        todo_list.create({title,description,status,due_date})
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
           res.status(500).json({err:err.message})
          })
    }

}
module.exports = todo