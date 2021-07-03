const axios = require('axios')
const { User } = require('../models')

class AvatarController {
  static async getAvatar(req, res, next) {
    try {
      const { email } = req.params
      const user = await User.findOne({ where: { email } })

      if (!user) {
        throw { name: 'UserNotFound' }
      }

      let userAvatar = await axios.get(
        `https://avatars.dicebear.com/api/avataaars/${email}.svg`
      )

      res.status(200).send(userAvatar.data)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = AvatarController
