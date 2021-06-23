const TodosController = require('../controllers/TodosController')
const router = require('express').Router()

router.get('/', TodosController.getAll)
router.post('/', TodosController.addTodo)
router.get('/:id', TodosController.findById)
router.put('/:id', TodosController.putTodo)
router.patch('/:id', TodosController.patchTodo)
router.delete('/:id', TodosController.deleteTodo)

module.exports = router