const router = require('express').Router()
const AvatarController = require('../controllers/AvatarControlller')

router.get('/:email', AvatarController.getAvatar)

module.exports = router