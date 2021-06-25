const { Todo, User } = require('../models')


class TodoController{
    static readAll(req, res) {
        Todo.findAll({where:{
            user_id: req.user_id
        }})
        .then(result => {
            if(result.length>0){
                res.status(200).json(result)
            }
            else{
                res.status(404).json({message: "Todo Not Found"})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static addTodo(req, res) {
        const { title, desc, status, due_date } = req.body
        Todo.create({ title, desc, status, due_date,  user_id: req.user_id})
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            if(err.name === "SequelizeValidationError"){
                res.status(400).json({message: err.errors[0].message})
            }else{
                res.status(500).json(err)
            }
        })
    }

    static readDetail(req, res) {
        const todo = req.todo
        res.status(200).json({todo})
    }

    static updateAll(req, res) {
        const todo = req.todo
        const { title, desc, status, due_date } = req.body
        Todo.update({ title, desc, status, due_date },
            {
                where: {id:todo.id},
                returning: true
            })
        .then(result => {
            res.status(200).json(result[1])
        })
        .catch(err => {
            if(err.name === "SequelizeValidationError"){
                res.status(400).json({message: err.errors[0].message})
            }else{
                res.status(500).json(err)
            }
        })
    }
    
    static updateStatus(req, res) {
        const todo = req.todo
        const { status } = req.body
        Todo.update({status}, {
            where: {id: todo.id},
            returning: true
        })
        .then(result => {
            res.status(200).json(result[1])
        })
        .catch(err => {
            if(err.name === "SequelizeValidationError"){
                res.status(400).json({message: err.errors[0].message})
            }else{
                res.status(500).json(err)
            }
        })
    }

    static delete(req, res) {
        const todo = req.todo
        Todo.destroy({
            where:{id: todo.id}
        })
        .then(() => {
            res.status(200).json({message: "Success deleted todo"})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = TodoController
