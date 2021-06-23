const { User } = require('../models')
const { decode } = require('../helpers/jsonwebtoken')

const authenticate = async (req, res, next) => {
  try {
    const token = req.get('token')
    const userDecoded = decode(token)

    const user = await User.findByPk(userDecoded.id)

    if (!user) {
      return res.status(401).json({ message: 'Authentication Error' })
    }

    res.locals.user = user

    next()
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = authenticate