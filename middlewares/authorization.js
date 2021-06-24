const { Todo } = require('../models')

const authorization = async (req, res, next) => {
  const { id } = req.params
  const user_id = req.user.id

  try {
    const todoById = await Todo.findByPk(id)
  
    if (!todoById) {
      return res.status(404).json({ message: 'todo not found' })
    }
  
    if (user_id !== todoById.user_id) {
      return res.status(403).json({ message: 'FORBIDDEN' })
    }

    next()
  } catch (err) {
    res.status(500).json(err)
  }


}

module.exports = authorization
