const { Todo } = require('../models')

class TodoController{
    static getAll(req, res) {
        Todo.findAll()
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
                due_date 
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
        const { id } = req.params
        Todo.findOne({
            where: {id: +id}
        })
        .then(data => {
            if (!data) {
                res.status(404).json({"message":"Data Not Found"})
            } else {
                res.status(200).json(data)
            }
        })
        .catch(err => {
            res.status(404).json(err)
        })
    }

    static updateTodos(req, res) {
        const { id } = req.params
        let { title, description, status, due_date } = req.body
        Todo.create(
            { 
                title, 
                description, 
                status, 
                due_date 
            },
            {
                where: {id: +id},
                returning: true
            }
        )
        .then(data => {
            if (data[0] === 1) {
                res.status(200).json(data[1])
            } else {
                res.status(404).json({"message":"Data Not Found"})
            }
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
        const { id } = req.params
        const { status } = req.body
        Todo.update({status}, {
            where: {id: +id},
            returning: true
        })
        .then(data => {
            if (data[0] === 1) {
                res.status(200).json(data[1])
            } else {
                res.status(404).json({"message":"Data Not Found"})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static deleteTodos(req, res) {
        const { id } = req.params
        Todo.destroy({
            where:{id: +id}
        })
        .then(data => {
            if (data !== 0) {
                res.status(201).json({"message":"Delete Successfull",data})
            } else {
                res.status(404).json({"message":"Data Not Found"})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = TodoController