const router = require('express').Router();
const { auth } = require('../helpers/auth');
const errorHandle = require('../helpers/errorHandler');
const todo = require('./todoRoute')
const user = require('./userRoute')

router.use('/',user)
router.use(auth)
router.use('/todos',todo)
router.use(errorHandle)

module.exports = router