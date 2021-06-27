const{todo_list} = require('../models')
class todo{
    static listTodo(req,res,next){
        todo_list.findAll({where:{user_id:req.user_id}})
        .then(result=>{
            if (result.length === 0) {
                res.status(204).json({"message":"Todo tidak ditemukan"})
            }else{
                res.status(200).json(result)
            }
        })
        .catch((err) => {
              next(err)
          });
    }
    static listTodo_Id(req,res){
        res.status(200).json({data:req.todo})
    }
    static putTodo(req,res,next){
        const {title,description,status,due_date} = req.body
        const {todo} = req
        todo.title = title
        todo.description = description
        todo.status = status
        todo.due_date = due_date
        todo.save()
        .then(()=>{
            res.status(200).json({data:todo,message:"todo successfully updated"})
        })
        .catch((err) => {
            next(err)
          });
    }

    static addTodo(req,res,next){
        const {title,description,status,due_date} = req.body
        const{user_id} = req 
        todo_list.create({title,description,status,due_date,user_id})
        .then(result => {
            res.status(201).json({messsage:"todo successfully added",data:result})
        })
        .catch((err) => {
           next(err)
          });
    }

    static deleteTodo(req,res,next){
        const {todo} = req
        todo.destroy()
        .then(() => {
            res.status(200).json({"message":"todo success to delete"})
        })
        .catch((err) => {
           next(err)
          });
    }

    static patchTodo(req,res,next){
        const {todo} = req
        const {status} = req.body
        todo.status = status
        todo.save()
        .then(()=>{
            res.status(200).json({data:todo,message:"status successfully updated"})
        })
        .catch((err) => {
            next(err)
          });
    }

}
module.exports = todo