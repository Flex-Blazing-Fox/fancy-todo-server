const TodosController = require('../controllers/TodosController')
const { authorization } = require('../middlewares/auth')
const router = require('express').Router()

router.get('/', TodosController.getAll)
router.post('/', TodosController.addTodo)
router.get('/:id', authorization, TodosController.findById)
router.put('/:id', authorization, TodosController.putTodo)
router.patch('/:id', authorization, TodosController.patchTodo)
router.delete('/:id', authorization, TodosController.deleteTodo)

module.exports = router