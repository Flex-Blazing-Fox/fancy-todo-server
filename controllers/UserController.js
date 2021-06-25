const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

    static login(req, res) {
        const { email, password } = req.body

        User.findOne({
            where: {email}
        })
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({success:true, message:"Login Success"})
            } else {
                throw {
                    code: 401,
                    message: "Email or Password npt found"
                }
            }
        })
        
    }
}

module.exports = UserController