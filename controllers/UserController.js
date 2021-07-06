const { User } = require('../models')
const { generateToken } = require('../helpers/jsonwebtoken')
const bcrypt = require('bcrypt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

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
        email: user.email,
      }

      const token = generateToken(payload)

      return res.status(200).json({ token })
    } catch (err) {
      next(err)
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const { id_token } = req.body
      const ticket = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.CLIENT_ID,
      })
      const payload = ticket.getPayload()
      const email = payload['email']

      const user = await User.findOne({ where: { email } })

      if (!user) {
        const newUser = await User.create({
          email,
          password: process.env.DEFAULT_PASSWORD
        })

        const token = generateToken({
          id: newUser.id,
          email: newUser.email,
        })

        return res.status(201).json({ token, email: newUser.email })
      }

      const clientPayload = {
        id: user.id,
        email: user.email,
      }

      const token = generateToken(clientPayload)

      return res.status(200).json({ token, email })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = UserController
