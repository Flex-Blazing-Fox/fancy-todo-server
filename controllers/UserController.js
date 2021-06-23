const { User } = require('../models')
const { generateToken } = require('../helpers/jsonwebtoken')
const bcrypt = require('bcrypt')

class UserController {
  static async register(req, res) {
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
      if (err.name === 'SequelizeUniqueConstraintError')
        return res.status(400).json({ err: 'email is already exists' })
      return res.status(500).json(err)
    }
  }

  static async login(req, res) {
    const { email, password } = req.body

    try {
      const user = await User.findOne({
        where: { email },
      })

      if (!user) {
        return res
          .status(400)
          .json({ message: 'email or password is incorrect' })
      }

      const isPasswordCorrect = bcrypt.compareSync(password, user.password)

      if (!isPasswordCorrect) {
        return res
          .status(400)
          .json({ message: 'email or password is incorrect' })
      }

      const payload = {
        id: user.id,
        email: user.id,
      }

      const token = generateToken(payload)

      return res.status(200).json({ token })
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

module.exports = UserController
