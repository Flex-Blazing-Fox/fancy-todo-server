const { Todo } = require('../models')

class TodosController {
  static async getTodos(req, res, next) {
    const { id } = req.user

    try {
      const todos = await Todo.findAll({ where: { user_id: +id } })

      return res.status(200).json(todos)
    } catch (err) {
      next(err)
    }
  }

  static async getTodo(req, res, next) {
    const { id } = req.params

    try {
      const todo = await Todo.findByPk(+id)

      if (!todo) return next({ name: 'NotFoundError' })

      return res.status(200).json(todo)
    } catch (err) {
      next(err)
    }
  }

  static async postTodo(req, res, next) {
    const { title, description, due_date } = req.body
    const { id } = req.user

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
        return next({ name: 'SequelizeValidationError' })
      }

      next(err)
    }
  }

  static async putTodo(req, res, next) {
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

        return res.status(200).json(updatedTodo)
      }

      return next({ name: 'NotFoundError' })
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        return next({ name: 'SequelizeValidationError' })
      }

      next(err)
    }
  }

  static async patchTodo(req, res, next) {
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
        return res.status(200).json(updatedTodo)
      }

      return next({ name: 'NotFoundError' })
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        return next({ name: 'SequelizeValidationError' })
      }

      next(err)
    }
  }

  static async deleteTodo(req, res, next) {
    const { id } = req.params

    try {
      const row = await Todo.destroy({ where: { id: +id } })

      if (row === 0) {
        return next({ name: 'NotFoundError' })
      }

      return res.status(200).json({ message: 'todo success to delete' })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = TodosController
