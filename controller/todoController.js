const { Todo } = require('../models')
var today = new Date()

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
        let { title, desc, status, due_date } = req.body
        Todo.create({ title, desc, status, due_date })
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            if(err.errors[0].message=="Validation isAfter on due_date failed"){
                res.status(400).json({"message": "DueDate Cannot Previus Date"})
            }else{
                res.status(500).json(err)
            }
        })
    }

    static readDetail(req, res) {
        const { id } = req.params
        Todo.findOne({
            where: {id: +id}
        })
        .then(result => {
            if(result){
                res.status(200).json(result)
            }
            else{
                res.status(404).json({"message":"Todo Not Found"})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static updateAll(req, res) {
        const { id } = req.params
        let { title, desc, status, due_date } = req.body
            Todo.update({ title, desc, status, due_date },
                {
                    where: {id: +id},
                    returning: true
                })
            .then(result => {
                if(result[0]!==0){
                    res.status(200).json(result[1])
                }
                else{
                    res.status(404).json({"message":"Todo Not Found"})
                }
            })
            .catch(err => {
                if(err.errors[0].message=="Validation isAfter on due_date failed"){
                    res.status(400).json({"message": "DueDate Cannot Previus Date"})
                }else{
                    res.status(500).json(err)
                }
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
            if(result[0]!==0){
                res.status(200).json(result[1])
            }
            else{
                res.status(404).json({"message":"Todo Not Found"})
            }
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
            if(result!==0){
                res.status(200).json({"message":"Success deleted todo"})
            }
            else{
                res.status(404).json({"message":"Todo Not Found"})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = TodoController
