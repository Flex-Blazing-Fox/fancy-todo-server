const { Todo } = require('../models')

class TodoController{
    static getAll(req, res) {
        Todo.findAll({
            where: {userId: req.userId}
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static addTodos(req, res) {
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
            if(err.name = 'SequelizeValidationError'){
                res.status(400).json({"message":err.errors[0].message})
            }else {
                res.status(500).json(err)
            }
        })
    }

    static findById(req, res) {
       
        res.status(200).json(req.todos)
    }

    static updateTodos(req, res) {

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
            if(err.name = 'SequelizeValidationError'){
                res.status(400).json({"message":err.errors[0].message})
            }else {
                res.status(500).json(err)
            }
        })
    }

    static statusUpdate(req, res) {
        const { status } = req.body
        const { todos } = req
       
        todos.status = status
        
        todos
        .save()
        .then((_) => {
            res.status(200).json({data:todos})
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static deleteTodos(req, res) {
        const { todos } = req

        todos
        .destroy()
        .then((_)=> {
            res.status(200).json({ message: "Todo deleted successfully!" })
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = TodoController