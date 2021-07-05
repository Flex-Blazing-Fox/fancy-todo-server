const {User} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const nodemailer = require("nodemailer");

class UserController{
    static signUp(req, res, next){
        const {email, password} = req.body
        const link = `http://localhost:8080/${email}`
        const transporter = nodemailer.createTransport({
            host: process.env.NODEMAILER_HOST,
            port: 465,
            secure: true,
            auth: {
              user: process.env.NODEMAILER_ACCOUNT,
              pass: process.env.NODEMAILER_PASSWORD
            }
        });

        const info = {
            from: 'no-reply@to.do', // sender address
            to: email, // list of receivers
            subject: "Verifikasi Register New User", // Subject line
            html: `<p>klik link berikut ini untuk melanjutkan proses registrasi: ${link}</p>
                    <p>OTP bersifat rahasia, mohon tidak memberikan kepada siapapun<p>
                    <p><i>*abaikan jika anda tidak bermaksud register</i></p>`
        }
        transporter.sendMail(info, (err, result)=>{
            if (err) {
                next(err)
            }else{
                res.status(200).json(result)
            }
        })

        User.create({email, password, confirmed:'false'})
        .then(result=>{
            res.status(201).json(result)
        })
        .catch(err=>{
            next(err)
        })        
    }

    static confirmed (req, res, next){
        const {email} = req.params
        User.findOne({
            where : {email}
        })
        .then(result=>{
            if (!result){
                throw{name: 'USER_NOT_FOUND'}
            }else{
                return User.update({'confirmed': 'true'},{
                    where: {email},
                    returning: true
                })
            }
        })
        .then(result => {
            res.status(200).json(result[1])
        })
        .catch(err => {
            next(err)
        })
    }

    static signIn(req, res, next){
        const {email, password} = req.body
        User.findOne({
            where: {email}
        })
        .then(result=>{
            const compare = bcrypt.compareSync(password, result.password)
            if(compare){
                const payload = {
                    user_id: result.id
                }
                const access_token = jwt.sign(payload, process.env.JWT_SECRET)
                res.status(200).json({message: 'Login Success', access_token})
            }else{
                throw{name: 'LOGIN_FAILED'}
            }
        })
        .catch(err=>{
            next({name: 'LOGIN_FAILED'})
        })
    }
    
    static googleSignIn(req, res, next){
        const {token} = req.body
        let email
        const password = `GOO${process.env.DEFAULT_PASSWORD}`
        let status = 200
        client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket=>{
            email = ticket.payload.email
            return User.findOne({
                where: {email}
            })
        })
        .then(user=>{
            if(user) return user
            status = 201
            return User.create({email, password})
        })
        .then(result=>{
            const payload = {
                user_id: result.id
            }
            const access_token = jwt.sign(payload, process.env.JWT_SECRET)
            res.status(status).json({message: 'Login Success', access_token})
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = UserController