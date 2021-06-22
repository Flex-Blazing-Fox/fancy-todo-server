const { Todo } = require('../models')

class TodoController{
    static readAll(req, res) {
        Todo.findAll()
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static addTodo(req, res) {
        let { title, description, status, due_date } = req.body
        Todo.create({ title, description, status, due_date })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static readDetail(req, res) {
        const { id } = req.params
        Todo.findOne({
            where: {id: +id}
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static updateAll(req, res) {
        const { id } = req.params
        let { title, description, status, due_date } = req.body
        Todo.update({ title, description, status, due_date },
            {
                where: {id: +id},
                returning: true
            })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static updateStatus(req, res) {
        const { id } = req.params
        const { status } = req.body
        Todo.update({status}, {
            where: {id: +id},
            returning: true
        })
        .then(result => {
            res.status(200).json(result[1])
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static delete(req, res) {
        const { id } = req.params
        Todo.destroy({
            where:{id: +id}
        })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = TodoController
