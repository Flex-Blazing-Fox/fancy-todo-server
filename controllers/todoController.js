const { Todo } = require('../models')

class TodoController{
    static getAll(req, res, next) {
        Todo.findAll({
            where: {userId: req.userId}
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
           next(err)
        })
    }

    static addTodos(req, res, next) {
        let { title, description, status, due_date } = req.body
        Todo.create(
            { 
                title, 
                description, 
                status, 
                due_date,
                userId : req.userId 
            }
        )
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static findById(req, res) {
       
        res.status(200).json(req.todos)
    }

    static updateTodos(req, res, next) {

        const { title, description, status, due_date } = req.body
        const { todos } = req

        todos.title = title
        todos.description = description
        todos.status = status
        todos.due_date = due_date

        todos
        .save()
        .then((_) => {
            res.status(200).json({data:todos})
        })
        .catch(err => {
            next(err)
        })
    }

    static statusUpdate(req, res, next) {
        const { status } = req.body
        const { todos } = req
       
        todos.status = status
        
        todos
        .save()
        .then((_) => {
            res.status(200).json({data:todos})
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteTodos(req, res, next) {
        const { todos } = req

        todos
        .destroy()
        .then((_)=> {
            res.status(200).json({ message: "Todo deleted successfully!" })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TodoController