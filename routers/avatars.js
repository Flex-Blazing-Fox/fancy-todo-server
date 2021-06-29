const router = require('express').Router()
const AvatarController = require('../controllers/AvatarControlller')

router.get('/:user_id', AvatarController.getAvatar)

module.exports = router