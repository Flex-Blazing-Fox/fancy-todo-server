const { User } = require('../models')
const { decode } = require('../helpers/jsonwebtoken')

const authenticate = async (req, res, next) => {
  try {
    if (!req.headers.token) {
      return next({ name: 'MissingAccessTokenError' })
    }
    const token = req.headers.token
    const userDecoded = decode(token)

    const user = await User.findByPk(userDecoded.id)

    if (!user) {
      return next({ name: 'AuthenticationError' })
    }

    req.user = user

    next()
  } catch (err) {
    return next({ name: 'AuthenticationError' })
  }
}

module.exports = authenticate
