const { User } = require('../models')

class UserController {
    static register(req, res) {
        const { email, password } = req.body
        User.create({ email, password })
        .then((user) => {
            res
            .status(201)
            .json({ success: true, message : "User Created" })
        })
        .catch((err) => {
            res
            .status(err.status || 500)
            .json({ success: false, error: err.message || err})
        })
    }
}

module.exports = UserController