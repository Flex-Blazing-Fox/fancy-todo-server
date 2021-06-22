const { Todo } = require('../models')

class TodosController {
  static getTodos(req, res) {
    const { id } = res.locals.user

    Todo.findAll({
      where: { user_id: +id },
    })
      .then((todos) => {
        return res.status(200).json(todos)
      })
      .catch((err) => {
        return res.status(500).json(err)
      })
  }

  static getTodo(req, res) {
    const { id } = req.params

    Todo.findOne({
      where: { id: +id },
    })
      .then((todo) => {
        if (!todo) return res.status(404).json({ message: 'todo not found' })
        return res.status(200).json({ todo })
      })
      .catch((err) => {
        return res.status(500).json(err)
      })
  }

  static postTodo(req, res) {
    const { title, description, due_date } = req.body
    const { id } = res.locals.user

    Todo.create({
      user_id: +id,
      title,
      description,
      due_date,
    })
      .then((todo) => {
        return res.status(201).json(todo)
      })
      .catch((err) => {
        if (err.name === 'SequelizeValidationError') {
          return res.status(400).json({ err: err.name })
        }
        return res.status(500).json(err)
      })
  }

  static putTodo(req, res) {
    const { id } = req.params
    const { title, description, status, due_date } = req.body

    Todo.update(
      {
        title,
        description,
        status,
        due_date,
      },
      {
        where: { id: +id },
        returning: true,
      }
    )
      .then((todo) => {
        if (todo[0] === 1) {
          const updatedTodo = todo[1][0]
          return res.status(200).json({ todo: updatedTodo })
        }

        return res.status(404).json({ message: 'todo not found' })
      })
      .catch((err) => {
        if (err.name === 'SequelizeValidationError') {
          return res.status(400).json(err)
        }

        return res.status(500).json(err)
      })
  }

  static patchTodo(req, res) {
    const { id } = req.params
    const { status } = req.body

    Todo.update(
      { status },
      {
        where: { id: +id },
        returning: true,
      }
    )
      .then((todo) => {
        const status = todo[0]

        if (status === 1) {
          const updatedTodo = todo[1][0]
          return res.status(200).json({ todo: updatedTodo })
        }

        return res.status(404).json({ message: 'todo not found' })
      })
      .catch((err) => {
        if (err.name === 'SequelizeValidationError') {
          return res.status(400).json(err)
        }

        return res.status(500).json(err)
      })
  }

  static deleteTodo(req, res) {
    const { id } = req.params

    Todo.destroy({
      where: { id: +id },
    })
      .then((row) => {
        if (row === 0) {
          return res.status(404).json({ message: 'todo not found' })
        }

        return res.status(200).json({ message: 'todo success to delete' })
      })
      .catch((err) => {
        return res.status(500).json(err)
      })
  }
}

module.exports = TodosController
