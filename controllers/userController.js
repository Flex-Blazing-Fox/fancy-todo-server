const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

class UserController {
    static register(req, res, next) {
        const { email, password } = req.body 

        User.create({ email, password })
            .then((user) => {
                res.status(201).json({"message": "Pendaftaran Berhasil"})
            })
            .catch(err => {
               next(err)
            })
    }

    static login(req, res){
        const { email, password} = req.body

        User.findOne({ where: {email}})
            .then((user) => {
                if(user && bcrypt.compareSync(password,user.password)) {
                    const payload = {
                        id : user.id
                    }

                    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN)

                    res.status(200).json({"message":"Success", access_token})
                } else {
                   throw {name:'LOGIN_FAILED'}
                }
            })
            .catch(err => {
               next(err)
            })
    }
}

module.exports = UserController