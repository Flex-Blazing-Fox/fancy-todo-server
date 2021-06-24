const { User } = require('../models')
const { generateToken } = require('../helpers/jsonwebtoken')
const bcrypt = require('bcrypt')

class UserController {
  static async register(req, res, next) {
    const { email, password } = req.body

    try {
      const user = await User.create({ email, password })

      return res.status(201).json({
        user: {
          id: user.id,
          email: user.email,
        },
      })
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return next({ name: 'UniqueEmailError' })
      }
      return next(err)
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body

    try {
      const user = await User.findOne({
        where: { email },
      })

      if (!user) {
        return next({ name: 'IncorrectCredentialsError' })
      }

      const isPasswordCorrect = bcrypt.compareSync(password, user.password)

      if (!isPasswordCorrect) {
        return next({ name: 'IncorrectCredentialsError' })
      }

      const payload = {
        id: user.id,
        email: user.id,
      }

      const token = generateToken(payload)

      return res.status(200).json({ token })
    } catch (err) {
      return next(err)
    }
  }
}

module.exports = UserController
