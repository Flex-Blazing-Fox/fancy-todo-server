const GameController = require('../controllers/gameController')

const router = require('express').Router()

router.get('/dota2', GameController.dota)

module.exports = router