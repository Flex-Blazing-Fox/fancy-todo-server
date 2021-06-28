const { Todo } = require('../models')
const todo = require('../models/todo')

class TodosController {
    static getAll (req, res, next) {
        Todo.findAll({where: {userId: req.userId}})
        .then(todo => {
            res.status(200).json({data: todo})
        })
        .catch(err => {
            next(err)
        })
    }

    static addTodo (req, res, next) {
        let { title, description, status, due_date } = req.body
        Todo.create(
            {
                title,
                description,
                status,
                due_date,
                userId: req.userId
            }
        )
        .then(todo => {
            res.status(201).json({data : todo})
        })
        .catch(err => {
            next(err)
        })
    }

    static findById (req, res, next) {
        const { id } = req.params
        Todo.findByPk(+id)
        .then(todo => {
            res.status(200).json({data : todo})
        })
        .catch(err => {
            next(err)
        })
    }

    static putTodo(req, res, next) {
        const {todo} = req
        const { title, description, status, due_date, userId } = req.body
        todo.title = title
        todo.description = description
        todo.status = status
        todo.due_date = due_date
        todo.save()
        .then(todo => {
            res.status(200).json({data : todo})
        })
        .catch(err => {
            next(err)
        })
    }

    static patchTodo(req, res, next) {
        const {todo} = req
        const { status } = req.body
        todo.status = status
        todo.save()
        .then(todo => {
            res.status(200).json({data: todo})
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteTodo(req, res, next) {
        const { id } = req.params
        Todo.destroy({
            where: {id: +id},
            returning: true,
        })
        .then(() => {
            res.status(200).json({"message":"todo success to delete" })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TodosController