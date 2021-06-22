const router = require('express').Router();
const todo = require('./todoRoute')

router.use('/todos',todo)

module.exports = router