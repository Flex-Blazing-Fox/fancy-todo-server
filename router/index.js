const router = require('express').Router()
const todoRouter = require('./todoRouter')
const UserController = require('../controller/userController')
const { authentication } = require('../middleware/auth')

router.use('/todos', authentication, todoRouter)
router.post('/signUp', UserController.signUp)
router.post('/signIn', UserController.signIn)
router.post('/googleSignIn', UserController.googleSignIn)
router.post('/:email', authentication, UserController.confirmed)
module.exports = router