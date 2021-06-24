const { Todo } = require('../models')

const authorization = async (req, res, next) => {
  const { id } = req.params
  const user_id = req.user.id

  try {
    const todoById = await Todo.findByPk(id)

    if (!todoById) {
      return next({ name: 'NotFoundError' })
    }

    if (user_id !== todoById.user_id) {
      return next({ name: 'ForbiddenError' })
    }

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = authorization
