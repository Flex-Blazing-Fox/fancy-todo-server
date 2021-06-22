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
        let { title, description, status, due_data } = req.body
        Todo.create(
            {
                title,
                description,
                status,
                due_data
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
        Todo.findOne({
            where: {id: +id}
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    
}

module.exports = TodosController