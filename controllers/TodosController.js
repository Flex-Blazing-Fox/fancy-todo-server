const { Todo } = require('../models')

class TodosController {
  static async getTodos(req, res) {
    const { id } = res.locals.user

    try {
      const todos = await Todo.findAll({ where: { user_id: +id } })

      return res.status(200).json(todos)
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  static async getTodo(req, res) {
    const { id } = req.params

    try {
      const todo = await Todo.findByPk(+id)

      if (!todo) return res.status(404).json({ message: 'todo not found' })

      return res.status(200).json({ todo })
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  static async postTodo(req, res) {
    const { title, description, due_date } = req.body
    const { id } = res.locals.user

    try {
      const todo = await Todo.create({
        user_id: +id,
        title,
        description,
        due_date,
      })

      return res.status(201).json(todo)
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        return res.status(400).json(err)
      }

      return res.status(500).json(err)
    }
  }

  static async putTodo(req, res) {
    const { id } = req.params
    const { title, description, status, due_date } = req.body

    try {
      const todo = await Todo.update(
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

      if (todo[0] === 1) {
        const updatedTodo = todo[1][0]

        return res.status(200).json({ todo: updatedTodo })
      }

      return res.status(404).json({ message: 'todo not found' })
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        return res.status(400).json(err)
      }

      return res.status(500).json(err)
    }
  }

  static async patchTodo(req, res) {
    const { id } = req.params
    const { status } = req.body

    try {
      const todo = await Todo.update(
        { status },
        {
          where: { id: +id },
          returning: true,
        }
      )

      if (todo[0] === 1) {
        const updatedTodo = todo[1][0]
        return res.status(200).json({ todo: updatedTodo })
      }

      return res.status(404).json({ message: 'todo not found' })
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        return res.status(400).json(err)
      }

      return res.status(500).json(err)
    }
  }

  static async deleteTodo(req, res) {
    const { id } = req.params

    try {
      const row = await Todo.destroy({ where: { id: +id } })

      if (row === 0) {
        return res.status(404).json({ message: 'todo not found' })
      }

      return res.status(200).json({ message: 'todo success to delete' })
    } catch (err) {
      return res.status(500).json(err)
    }
  }
}

module.exports = TodosController
