const TodoController = require('../controllers/todoController')
const { authorization } = require('../middleware/auth')

const router = require('express').Router()

router.get('/', TodoController.getAll)
router.post('/', TodoController.addTodos)
router.get('/:id', authorization, TodoController.findById)
router.put('/:id', authorization, TodoController.updateTodos)
router.patch('/:id', authorization, TodoController.statusUpdate)
router.delete('/:id', authorization, TodoController.deleteTodos)

module.exports = router