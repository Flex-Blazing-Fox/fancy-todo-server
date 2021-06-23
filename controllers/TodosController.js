const { Todo } = require('../models')

class TodosController {
    static getAll (req, res) {
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static addTodo (req, res) {
        let { title, description, status, due_date, userId } = req.body
        Todo.create(
            {
                title,
                description,
                status,
                due_date,
                userId
            }
        )
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static findById (req, res) {
        const { id } = req.params
        Todo.findByPk(+id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static putTodo(req, res) {
        const { id } = req.params
        const { title, description, status, due_date, userId } = req.body

        Todo.update(
            {
                title,
                description,
                status,
                due_date,
                userId
            },
            {
                where: { id: +id },
                returning: true,
            }
        )
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static patchTodo(req, res) {
        const { id } = req.params
        const { status } = req.body
        Todo.update({ status }, {
            where: {id: +id},
            returning: true
        })
        .then(data => {
            res.status(200).json(data[1])
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static deleteTodo(req, res) {
        const { id } = req.params
        Todo.destroy({
            where: {id: +id},
            returning: true,
        })
        .then(data => {
            res.status(201).json(data[1])
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
    
}

module.exports = TodosController