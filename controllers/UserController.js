const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {
    static register(req, res, next) {
        const { email, password } = req.body
        User.create({ email, password })
        .then((user) => {
            res
            .status(201)
            .json({ success: true, message : "User Created" })
        })
        .catch((err) => {
            next(err)
        })
    }

    static login(req, res, next) {
        const { email, password } = req.body

        User.findOne({
            where: {email}
        })
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const payload = {
                    id: user.id
                }
                const access_token = jwt.sign(payload, "secret")
                res.status(200).json({success:true, access_token})
            } else {
                throw {
                    name: "Email or Password is wrong"
                }
            }
        })
        .catch((err) => {
            next(err)
        })
        
    }
}

module.exports = UserController