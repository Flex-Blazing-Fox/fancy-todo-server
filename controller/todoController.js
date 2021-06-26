const { Todo, User } = require('../models')


class TodoController{
    static readAll(req, res, next) {
        Todo.findAll({where:{
            user_id: req.user_id
        }})
        .then(result => {
            if(result.length>0){
                res.status(200).json(result)
            }
            else{
                throw{name: 'TODO_NOT_FOUND'}
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static addTodo(req, res, next) {
        const { title, desc, status, due_date } = req.body
        Todo.create({ title, desc, status, due_date,  user_id: req.user_id})
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            next(err)
        })
    }

    static readDetail(req, res, next) {
        const todo = req.todo
        res.status(200).json({todo})
    }

    static updateAll(req, res, next) {
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
            next(err)
        })
    }
    
    static updateStatus(req, res, next) {
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
            next(err)
        })
    }

    static delete(req, res, next) {
        const todo = req.todo
        Todo.destroy({
            where:{id: todo.id}
        })
        .then(() => {
            res.status(200).json({message: "Success deleted todo"})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TodoController
