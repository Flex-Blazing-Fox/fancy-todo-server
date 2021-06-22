const TodosController = require('../controllers/TodosController')
const router = require('express').Router()

router.get('/', TodosController.getAll)
router.post('/', TodosController.addTodo)
router.get('/:id', TodosController.findById)

module.exports = router