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
        todo_list.findByPk(+id)
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(err =>{
            res.status(500)
        })
    }
    static putTodo(req,res){
        const {id} = req.params
        const {title,description,status,due_date} = req.body
        todo_list.update({title,description,status,due_date},{
            where:{
                id:+id
            },
            returning:true
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
           res.status(500).json({err})
          })
    }

    static addTodo(req,res){
        const {title,description,status,due_date} = req.body
        todo_list.create({title,description,status,due_date})
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
           res.status(500).json({"message":err.message})
          })
    }

    static deleteTodo(req,res){
        const {id} = req.params
        todo_list.destroy({
            where:{
                id:+id
            }
        })
        .then(() => {
            res.status(200).json({"message":"todo success to delete"})
        })
        .catch(err => {
           res.status(500).json(err)
          })
    }

}
module.exports = todo